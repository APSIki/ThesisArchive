import { combineReducers } from "redux";
import config from "./configReducers";
import currentThesis from './currentThesisReducers'

export default combineReducers ({
    config,
    currentThesis
})