import { combineReducers } from "redux";
import Alert from "./alert";
import auth from "./auth";
import categorias from "./categorias";


export default combineReducers({
Alert,
auth,
categorias,
});
