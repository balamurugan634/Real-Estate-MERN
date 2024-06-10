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
            },
            Updatesuccess:(state,action)=>{
                state.currentUser=action.payload
                state.load=false
                state.error=null
            },
            Updatefailure:(state,action)=>{
                state.load=false
                state.error=action.payload
            }, Updatestart:(state)=>{
                state.load=true
                state.error=null
            },
        }
    }
)
export const {Signinstart,SigninSuccess,Signinfailure,Updatefailure,Updatestart,Updatesuccess}=userSlice.actions
export default userSlice.reducer