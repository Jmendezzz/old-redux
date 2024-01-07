import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
  isLoading: false
};

const accountSlice = createSlice({
  name:"account",
  initialState,
  reducers:{
    deposit(state, action) {
      state.balance += action.payload;
      state.isLoading = false;
    },
    withdraw(state, action) {
      if (state.balance < action.payload) return;
      state.balance -= action.payload;
    },
    requestLoan(state, action) {
      if (state.loan > 0) return;
      state.loan = action.payload.amount;
      state.loanPurpose = action.payload.purpose;
      state.balance += action.payload.amount;
    },
    payLoan(state) {
      state.loan = 0;
      state.loanPurpose = "";
      state.balance -= state.loan;
    },
    convertingCurrency(state) {
      state.isLoading = true;
    }
  }
});

//This is not implemented in the real took kit way. This is just to work with the thunk middleware.
export function deposit(amount: number, currency: string) {
  if (currency == "USD") {
    return {
      type: "account/deposit",
      payload: amount,
    };
  }
    // If we want to do something async, we can return a function instead of an object, and redux-thunk will handle it
    return async function(dispatch, getState) {
        const response = await fetch(`https://api.frankfurter.app/latest?amount=${amount}&from=${currency}&to=USD`);
        const data = await response.json();
        const convertedAmount = data.rates.USD;
        dispatch({
            type: 'account/deposit',
            payload: convertedAmount
        })

    }
}
export const { withdraw, requestLoan, payLoan } = accountSlice.actions;

export default accountSlice.reducer;

