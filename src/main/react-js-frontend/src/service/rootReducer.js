import { combineReducers } from "redux";
import mapsReducer from "./maps/mapsReducer";

const rootReducer = combineReducers({
  maps: mapsReducer,
});

export default rootReducer;
