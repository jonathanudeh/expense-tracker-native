import { useSelector } from "react-redux";
import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";

function AllExpenses() {
  const expenses = useSelector();

  return <ExpensesOutput expenses={expenses} periodName="total" />;
}

export default AllExpenses;
