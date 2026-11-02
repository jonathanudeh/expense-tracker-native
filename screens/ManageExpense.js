import { useLayoutEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import IconButton from "../components/ui/IconButton";
import { GlobalStyles } from "../constants/styles";
import Button from "../components/ui/Button";
import { useDispatch } from "react-redux";
import {
  addExpense,
  deleteExpense,
  updateExpense,
} from "../store/expenseSlice";
import { nanoid } from "@reduxjs/toolkit";

function ManageExpense({ route, navigation }) {
  const expenseId = route.params?.expenseId;
  const isEditing = !!expenseId;

  const dispatch = useDispatch();

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? "Edit Expense" : "Add Expense",
    });
  }, [navigation, isEditing]);

  function deleteExpensehandler() {
    dispatch(deleteExpense(expenseId));
    navigation.goBack();
  }

  function cancelHandler() {
    navigation.goBack();
  }

  function confirmHandler() {
    //   dummy data until input field is provided
    const dummyData = {
      description: "Text",
      amount: 19.99,
      date: new Date().toISOString(),
    };

    if (isEditing) {
      dispatch(
        updateExpense({
          id: expenseId,
          expenseData: { ...dummyData, description: "updated text" },
        }),
      );
    } else {
      const id = nanoid();
      dispatch(addExpense({ id, ...dummyData }));
    }

    navigation.goBack();
  }

  return (
    <View style={styles.container}>
      <View style={styles.buttons}>
        <Button mode="flat" onPress={cancelHandler} style={styles.button}>
          Cancel
        </Button>
        <Button onPress={confirmHandler} style={styles.button}>
          {isEditing ? "Update" : "Add"}
        </Button>
      </View>

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
  buttons: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    minWidth: 120,
    marginHorizontal: 8,
  },
});
