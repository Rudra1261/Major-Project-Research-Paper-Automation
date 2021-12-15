import { combineReducers } from "redux";
import auth from "./auth";
import alert from "./alert";
import paper from "./paper";
export default combineReducers({
  auth,
  alert,
  paper,
});
