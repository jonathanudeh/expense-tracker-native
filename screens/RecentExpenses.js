import { useDispatch, useSelector } from "react-redux";
import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import { getDateMinusDays } from "../util/date";
import { useEffect, useState } from "react";
import { getExpenses } from "../util/http";
import { setExpenses } from "../store/expenseSlice";
import LoadingOverlay from "../components/ui/LoadingOverlay";

function RecentExpenses() {
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  const { expenses } = useSelector((state) => state.expense);

  useEffect(() => {
    async function getFetchedExpenses() {
      setIsLoading(true);
      const expenses = await getExpenses();
      setIsLoading(false);
      dispatch(setExpenses(expenses));
    }

    getFetchedExpenses();
  }, []);

  const today = new Date();
  const date7DaysAgo = getDateMinusDays(today, 7);

  const recentExpenses = expenses.filter((expense) => {
    return new Date(expense.date) > date7DaysAgo;
  });

  if (isLoading) {
    return <LoadingOverlay />;
  }

  return (
    <ExpensesOutput
      expenses={recentExpenses}
      periodName="Last 7 Days"
      fallbackText="No expenses registered for the last 7 days."
    />
  );
}

export default RecentExpenses;
