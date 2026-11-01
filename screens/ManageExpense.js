import { useLayoutEffect } from "react";
import { Text, View } from "react-native";

function ManageExpense({ route, navigation }) {
  const expenseId = route.params?.expenseId;
  const isEditing = !!expenseId;

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? "Edit Expense" : "Add Expense",
    });
  }, [navigation, isEditing]);

  return (
    <View>
      <Text>Manage expenses</Text>
    </View>
  );
}

export default ManageExpense;
