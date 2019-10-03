import { combineReducers } from "redux";

import ClientReducer from "./reducers/ClientReducer";


const Reducers = combineReducers({
    cliente: ClientReducer,
});

export default Reducers;
