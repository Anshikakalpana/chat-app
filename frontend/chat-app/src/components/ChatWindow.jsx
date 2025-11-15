import React, { useEffect } from 'react'
import { chatUser } from '../patanhi/chatEv'
import { Loader } from 'lucide-react'
import ChatHeader from './ChatHeader'
import MessageArea from './MessageArea'
import ChatContainer from './ChatContainer'

const ChatWindow=()=> {
   const {messages , getMessages , isMessagesLoading , selectedUser} = chatUser()

   useEffect(()=>{
    getMessages(selectedUser._id)
   },[selectedUser._id , getMessages])

   if(isMessagesLoading)return <Loader/>
  return (
    <div className="flex flex-col h-full">
      {/* Header - fixed at top */}
      <div className="flex-shrink-0">
        <ChatHeader />
      </div>

      {/* Messages - scrollable area */}
      <div className="flex-1 overflow-y-auto px-4 py-2">
        <ChatContainer />
      </div>

      {/* Input area - fixed at bottom */}
      <div className="flex-shrink-0 border-t border-purple-200 bg-white">
        <MessageArea />
      </div>
    </div>
  )
}

export default ChatWindow
