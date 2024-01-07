//Redux
// Old way of doing things
import { applyMiddleware, combineReducers, createStore, compose } from "redux";
import accountReducer from "./features/accounts/accountSlice";
import customerReducer from "./features/customers/customerSlice";
import { thunk } from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

const rootReducer = combineReducers({
    account: accountReducer,
    customer: customerReducer,
});

// Install Redux DevTools extension

const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(thunk))
);

export default store;