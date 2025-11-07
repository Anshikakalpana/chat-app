import React, { useEffect } from 'react'
import { chatUser } from '../patanhi/chatEv'
import { Loader } from 'lucide-react'
import ChatHeader from './ChatHeader'
import MessageArea from './MessageArea'

const ChatWindow=()=> {
   const {messages , getMessages , isMessagesLoading , selectedUser} = chatUser()

   useEffect(()=>{
    getMessages(selectedUser._id)
   },[selectedUser._id , getMessages])

   if(isMessagesLoading)return <Loader/>
  return (
    <div>
        <ChatHeader/>
        <MessageArea/>
    </div>
  )
}

export default ChatWindow