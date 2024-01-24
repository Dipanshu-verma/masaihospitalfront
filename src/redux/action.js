import { ADD_DOCTOR_ONBOARD, EDIT_DOCTOR, GET_DOCTORS } from "./actiontype";
import axios from "axios";
export const OnboardDoctor = (dataform) => async(dispatch)=>{
    try {

        const data=  await axios.post("https://hospital-server-masai.onrender.com/appointments",dataform)
        dispatch({
            type:ADD_DOCTOR_ONBOARD,
            payload:data.data
        })
  
      } catch (error) {
        console.log(error);
      }
}
export const GetAppointments = (queryval) => async(dispatch)=>{
    try {

        const data =  await axios.get(`https://hospital-server-masai.onrender.com/appointments?search=${queryval.search}&sort=${queryval.sort}&specialization=${queryval.specialization}`)
        console.log(data);
        dispatch({
            type:GET_DOCTORS,
            payload:data.data
        })
    
  
      } catch (error) {
        console.log(error);
      }
}
export const editAppointments = (dataAppoin,id) => async(dispatch)=>{
    console.log(dataAppoin,id);
    try {

        const data =  await axios.put(`https://hospital-server-masai.onrender.com/appointments/${id}`,dataAppoin)
        console.log(data);
        dispatch({
            type:EDIT_DOCTOR,
            payload:data.data
        })
    
  
      } catch (error) {
        console.log(error);
      }
}

export const DeleteAppoint = (id) => async(dispatch)=>{
     
    try {

        const data =  await axios.delete(`https://hospital-server-masai.onrender.com/appointments/${id}`)
        console.log(data);
        dispatch({
            type:EDIT_DOCTOR,
            payload:data.data
        })
    
  
      } catch (error) {
        console.log(error);
      }
}