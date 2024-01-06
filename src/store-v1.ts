//Redux
// Old way of doing things
import { combineReducers, createStore } from "redux";

const initialState = {
    balance:0,
    loan:0,
    loanPurpose:'',

}

function accountReducer(state=initialState, action:any) {
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
const initialStateCustomer = {
    name: '',
    nationalId: '',
    createdAt: ''
}

function customerReducer(state=initialStateCustomer, action:any) {
    switch(action.type) {
        case 'customer/create':
            return {
                ...state,
                ...action.payload
            }
        case 'customer/updateName':
            return {
                ...state,
                name: action.payload
            }
        default:
            return state
    }

}

const rootReducer = combineReducers({
    account: accountReducer,
    customer: customerReducer

})
const store = createStore(rootReducer);
//Store
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


// Action creators for customer store.
function createCustomer(name:string, nationalId:string) {
    return {
        type: 'customer/create',
        payload: {name, nationalId, createdAt: new Date().toISOString()}
    }
}

function updateCustomerName(name:string) {
    return {
        type: 'customer/updateName',
        payload: name
    }
}

store.dispatch(createCustomer('John Doe', '123456789'));
console.log(store.getState());