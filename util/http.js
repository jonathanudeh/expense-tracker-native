import axios from "axios";

export function storeExpense(expenseData) {
  axios.post(
    "https://fb-react-native-course-default-rtdb.firebaseio.com/expenses.json",
    expenseData,
  );
}
