import { createSlice } from "@reduxjs/toolkit";
import { initialEmail } from "./auth-slice";

const mailInitialState = {
mails:[],
unread:0
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
        },
        updateUnread(state){
            const received = state.mails.filter(item=>item[1].receiver === initialEmail && initialEmail !== item[1].sender)
            const unreadArr = received.filter(item=>item[1].read === false)
            const unreadLength = unreadArr.length
            state.unread = unreadLength
        }
    }
})

export const mailActions = mailSlice.actions

export default mailSlice.reducer