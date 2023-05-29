import { combineReducers } from "redux";
import note from './note';
import category from './category';

export default combineReducers({
    note,
    category,
})