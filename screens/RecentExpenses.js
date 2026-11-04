import { useSelector } from "react-redux";
import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import { getDateMinusDays } from "../util/date";
import { useEffect } from "react";
import { getExpenses } from "../util/http";

function RecentExpenses() {
  const { expenses } = useSelector((state) => state.expense);

  useEffect(() => {
    async function getFetchedExpenses() {
      const expenses = await getExpenses();
    }

    getFetchedExpenses();
  }, []);

  const today = new Date();
  const date7DaysAgo = getDateMinusDays(today, 7);

  const recentExpenses = expenses.filter((expense) => {
    return new Date(expense.date) > date7DaysAgo;
  });

  return (
    <ExpensesOutput
      expenses={recentExpenses}
      periodName="Last 7 Days"
      fallbackText="No expenses registered for the last 7 days."
    />
  );
}

export default RecentExpenses;
