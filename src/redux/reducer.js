import { ADD_DOCTOR_ONBOARD, DELETE_DOCTOR, EDIT_DOCTOR, GET_DOCTORS } from "./actiontype";

const intitalState={
    doctors:null
}


export const doctorReducers = (state=intitalState ,action)=>{
    const {type,payload}  = action;

switch(type){
case GET_DOCTORS:return{...state,doctors:payload}
case EDIT_DOCTOR:
    const updetedData = state.doctors.map((elm)=> elm._id == payload._id?payload:elm);

    return {doctors:updetedData}
   case DELETE_DOCTOR:

    const Deleted = state.doctors.map((elm)=> elm._id !== payload._id?elm:"");

    return {doctors:Deleted}
    case ADD_DOCTOR_ONBOARD:return {...state,payload}
default: return state
}
}