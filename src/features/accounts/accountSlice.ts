const initialState = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
};

export default function accountReducer(state = initialState, action: any) {
  switch (action.type) {
    case "account/deposit":
      return {
        ...state,
        balance: state.balance + action.payload,
      };
    case "account/withdraw":
      return {
        ...state,
        balance: state.balance - action.payload,
      };
    case "account/requestLoan":
      if (state.loan > 0) return state;
      return {
        ...state,
        loan: action.payload.amount,
        loanPurpose: action.payload.purpose,
        balance: state.balance + action.payload.amount,
      };
    case "account/payLoan":
      return {
        ...state,
        loan: 0,
        loanPurpose: "",
        balance: state.balance - state.loan,
      };

    default:
      return state;
  }
}

// Action Creators: They are just functions that return actions to be dispatched by the store

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
export function withdraw(amount: number) {
  return {
    type: "account/withdraw",
    payload: amount,
  };
}
export function requestLoan(amount: number, purpose: string) {
  return {
    type: "account/requestLoan",
    payload: { amount, purpose },
  };
}
export function payLoan() {
  return {
    type: "account/payLoan",
  };
}
