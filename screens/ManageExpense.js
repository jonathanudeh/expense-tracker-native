import { useLayoutEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import IconButton from "../components/ui/IconButton";
import { GlobalStyles } from "../constants/styles";
import { useDispatch, useSelector } from "react-redux";
import {
  addExpense,
  updateExpenseStore,
  deleteExpenseStore,
} from "../store/expenseSlice";
import ExpenseForm from "../components/ManageExpense/ExpenseForm";
import { deleteExpense, storeExpense, updateExpense } from "../util/http";
import LoadingOverlay from "../components/ui/LoadingOverlay";
import ErrorOverlay from "../components/ui/ErrorOverlay";

function ManageExpense({ route, navigation }) {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const editedExpenseId = route.params?.expenseId;
  const isEditing = !!editedExpenseId;

  const dispatch = useDispatch();

  const { expenses } = useSelector((state) => state.expense);
  const selectedExpense = expenses.find(
    (expense) => expense.id === editedExpenseId,
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? "Edit Expense" : "Add Expense",
    });
  }, [navigation, isEditing]);

  async function deleteExpensehandler() {
    setIsLoading(true);
    try {
      await deleteExpense(editedExpenseId);
      dispatch(deleteExpenseStore(editedExpenseId));
      navigation.goBack();
    } catch (err) {
      setError("Could not delete expense, please try again later");
    } finally {
      setIsLoading(false);
    }
    // since we are navigating back we dont necessarily need to set loading to false
  }

  function cancelHandler() {
    navigation.goBack();
  }

  async function confirmHandler(expenseData) {
    setIsLoading(true);
    try {
      if (isEditing) {
        dispatch(
          updateExpenseStore({
            id: editedExpenseId,
            expenseData,
          }),
        );

        await updateExpense(editedExpenseId, expenseData);
      } else {
        // backend communication with firebase
        const id = await storeExpense(expenseData);

        dispatch(addExpense({ ...expenseData, id }));
      }
      navigation.goBack();
    } catch (err) {
      setError(`Could not ${isEditing ? "update expense" : "create expense"}`);
    } finally {
      setIsLoading(false);
    }
  }

  function errorHandler() {
    setError(null);
  }

  if (isLoading) {
    return <LoadingOverlay />;
  }

  if (error && !isLoading) {
    return <ErrorOverlay message={error} onConfirm={errorHandler} />;
  }

  return (
    <View style={styles.container}>
      <ExpenseForm
        submitButtonLabel={isEditing ? "Update" : "Add"}
        onSubmit={confirmHandler}
        onCancel={cancelHandler}
        defaultValues={selectedExpense}
      />

      {isEditing && (
        <View style={styles.deleteContainer}>
          <IconButton
            icon="trash"
            color={GlobalStyles.colors.error500}
            size={36}
            onPress={deleteExpensehandler}
          />
        </View>
      )}
    </View>
  );
}

export default ManageExpense;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary800,
  },
  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderColor: GlobalStyles.colors.primary200,
    alignItems: "center",
  },
});
