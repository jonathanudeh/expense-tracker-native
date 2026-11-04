import { createSlice } from "@reduxjs/toolkit";

const expenseSlice = createSlice({
  name: "expenses",
  initialState: {
    expenses: [],
  },
  reducers: {
    addExpense: (state, action) => {
      // data obj property
      state.expenses.unshift(action.payload);
    },

    setExpenses: (state, action) => {
      // for firebase http request
      const inverted = action.payload.reverse();
      state.expenses = inverted;
    },

    deleteExpense: (state, action) => {
      // id property
      state.expenses = state.expenses.filter(
        (expense) => expense.id !== action.payload,
      );
    },

    updateExpense: (state, action) => {
      // id and data obj property
      const { id, expenseData } = action.payload;

      const updatableExpenseIndex = state.expenses.findIndex(
        (expense) => expense.id === id,
      );

      if (updatableExpenseIndex !== -1) {
        const updatableExpense = state.expenses[updatableExpenseIndex];

        //   {description, amount, date}
        const updatedItem = { ...updatableExpense, ...expenseData };

        state.expenses[updatableExpenseIndex] = updatedItem;
      }
    },
  },
});

export const { addExpense, deleteExpense, updateExpense, setExpenses } =
  expenseSlice.actions;

export default expenseSlice.reducer;
