import { createSlice } from "@reduxjs/toolkit";

const initialToken = localStorage.getItem('userToken')

const authInitialState = {
    isLogin:false,
    token:initialToken || '',
    isLoggedIn: !!initialToken
}

const authSlice = createSlice({
    name:'auth',
    initialState:authInitialState,
    reducers:{
        changeAuthMode(state){
            state.isLogin = !state.isLogin
        },
        loggingIn(state,action){
            state.token = action.payload
            localStorage.setItem('userToken',action.payload)
        }
    }
})


export const authActions = authSlice.actions
export default authSlice.reducer