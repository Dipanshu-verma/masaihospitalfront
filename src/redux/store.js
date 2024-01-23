import { applyMiddleware, legacy_createStore } from "redux";
import { doctorReducers } from "./reducer";
import { thunk } from "redux-thunk";


export const Store =  legacy_createStore(doctorReducers,applyMiddleware(thunk))