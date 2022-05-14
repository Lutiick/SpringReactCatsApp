import {combineReducers} from "redux";
import catReducer from "./cat/catReducer";

const rootReducer = combineReducers({
    cat: catReducer
});

export default rootReducer;