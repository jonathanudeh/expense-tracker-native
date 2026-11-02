import { useSelector } from "react-redux";
import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";

function AllExpenses() {
  const { expenses } = useSelector((state) => state.expense);

  return (
    <ExpensesOutput
      expenses={expenses}
      periodName="Total"
      fallbackText="No registed expenses found."
    />
  );
}

export default AllExpenses;
