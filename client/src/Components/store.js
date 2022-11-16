import { applyMiddleware,createStore} from "redux";
//import { legacy_createStore as createStore} from "redux";
import thunk from "redux-thunk";
import {composeWithDevTools} from "redux-devtools-extension";
import rootreducers from "./Redux/Reducers/main";

const middleware = [thunk];

const store = createStore(
    rootreducers,
    composeWithDevTools(applyMiddleware(...middleware))
);


export default store;
