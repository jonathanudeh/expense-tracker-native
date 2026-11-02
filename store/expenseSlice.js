import { createSlice } from "@reduxjs/toolkit";

const expenseSlice = createSlice({
  name: "expenses",
  initialState: {
    expenses: [],
  },
  reducers: {
    addExpense: (state, action) => {
      // data obj property
      state.expenses.push(action.payload);
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

export const { addExpense, deleteExpense, updateExpense } =
  expenseSlice.actions;

export default expenseSlice.reducer;
