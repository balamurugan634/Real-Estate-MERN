import { createSlice } from "@reduxjs/toolkit";

const initialState={
    currentUser:null,
    load:false,
    error:null,
}
const userSlice=createSlice(
    {
        name:'user',
        initialState,
        reducers:{
            Signinstart:(state)=>{
                state.load=true;
            },
            SigninSuccess:(state,action)=>{
                state.currentUser=action.payload
                state.load=false;
                state.error=null
            },
            Signinfailure:(state,action)=>{
                state.error=action.payload;
                state.load=false;
            }
        }
    }
)
export const {Signinstart,SigninSuccess,Signinfailure}=userSlice.actions
export default userSlice.reducer