import { createSlice } from "@reduxjs/toolkit";

const mailInitialState = {
mails:[],
}

const mailSlice = createSlice({
    name:'Mails',
    initialState:mailInitialState,
    reducers:{
        setMails(state,action){
            state.mails = [...action.payload]
        },
        removeMail(state,action){
            const index = state.mails.findIndex(item=> item[0] === action.payload)
            state.mails.splice(index,1)
        }
    }
})

export const mailActions = mailSlice.actions

export default mailSlice.reducer