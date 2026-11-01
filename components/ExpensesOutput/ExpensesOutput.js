import { View } from "react-native";
import ExpensesSummary from "./ExpensesSummary";
import ExpensesList from "./ExpensesList";

function ExpensesOutput({ expenses, periodName }) {
  return (
    <View>
      <ExpensesSummary periodName={periodName} expenses={expenses} />
      <ExpensesList />
    </View>
  );
}

export default ExpensesOutput;
