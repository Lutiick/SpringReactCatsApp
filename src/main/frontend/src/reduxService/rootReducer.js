import {combineReducers} from "redux";
import catReducer from "./cat/catReducer";
import messageReducer from "./user/auth/messageReducer";
import authReducer from "./user/auth/authReducer";

const rootReducer = combineReducers({
    cat: catReducer,
    message: messageReducer,
    auth: authReducer
});

export default rootReducer;