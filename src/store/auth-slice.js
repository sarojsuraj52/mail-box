import { createSlice } from "@reduxjs/toolkit";

const initialToken = localStorage.getItem('userToken')
export const initialEmail = localStorage.getItem('userEmail')

const authInitialState = {
    isLogin:false,
    email: initialEmail || '',
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
            state.token = action.payload.token
            state.email = action.payload.email
            localStorage.setItem('userToken',action.payload.token)
            localStorage.setItem('userEmail',action.payload.email)
        },
        loggingout(state){
            state.token = ''
            state.email = ''
            localStorage.removeItem('userToken')
            localStorage.removeItem('userEmail')
        }
    }
})


export const authActions = authSlice.actions
export default authSlice.reducer