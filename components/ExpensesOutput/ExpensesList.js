import { FlatList, Text, View } from "react-native";
import ExpenseItem from "./ExpenseItem";

function renderexpenseItem(itemData) {
  return <ExpenseItem {...itemData.item} />;
}

function ExpensesList({ expenses }) {
  return (
    <FlatList
      data={expenses}
      renderItem={renderexpenseItem}
      keyExtractor={(item) => item.id}
    />
  );
}

export default ExpensesList;
