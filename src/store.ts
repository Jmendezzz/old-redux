//Redux
// Old way of doing things
import { createStore } from "redux";

const initialState = {
    balance:0,
    loan:0,
    loanPurpose:'',

}

function reducer(state=initialState, action:any) {
    switch(action.type) {
        case 'account/deposit':
            return {
                ...state,
                balance: state.balance + action.payload
            }
        case 'account/withdraw':
            return {
                ...state,
                balance: state.balance - action.payload
            }
        case 'account/requestLoan':
            if(state.loan > 0) return state;
            return{
                ...state,
                loan: action.payload.amount,
                loanPurpose: action.payload.purpose,
                balance: state.balance + action.payload.amount
            }
        case 'account/payLoan':
            return{
                ...state,
                loan: 0,
                loanPurpose: '',
                balance: state.balance - state.loan
            }

        default:
            return state
    }
}

//Store
const store = createStore(reducer);
// Action Creators: They are just functions that return actions to be dispatched by the store
function deposit(amount:number) {
    return {
        type: 'account/deposit',
        payload: amount
    }
}
function withdraw(amount:number) {
    return {
        type: 'account/withdraw',
        payload: amount
    }
}
function requestLoan(amount:number, purpose:string) {
    return {
        type: 'account/requestLoan',
        payload: {amount, purpose}
    }
}
function payLoan() {
    return {
        type: 'account/payLoan',
    }
}

store.dispatch(deposit(100));
store.dispatch(withdraw(50));
store.dispatch(requestLoan(500, 'Buy a cheap keyboard'));
store.dispatch(payLoan());

console.log(store.getState());

