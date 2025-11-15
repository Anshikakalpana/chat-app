// import { authcheck } from "../patanhi/authEv";
// import { chatUser } from "../patanhi/chatEv";
// import { useEffect, useRef } from "react";
// import ChatHeader from "./ChatHeader";
// import MessageArea from "./MessageArea";
// import MessageSkeleton from "./MessageSkeleton";


// const ChatContainer = () => {
//   const {
//     messages,
//     getMessages,
//     isMessageLoading,
//     selectedUser,
//     subscribeToMessages,
//     unsubscribeFromMessages,
//   } = chatUser(); 

//   const { authUser } = authcheck();
//   const messageEndRef = useRef(null);


//   useEffect(() => {
//     if (!selectedUser?._id) return;

//     getMessages(selectedUser._id);
//     subscribeToMessages();

//     return () => unsubscribeFromMessages();
//   }, [selectedUser?._id, getMessages, subscribeToMessages, unsubscribeFromMessages]);


//   useEffect(() => {
//     if (messageEndRef.current && messages?.length) {
//       messageEndRef.current.scrollIntoView({ behavior: "smooth" });
//     }
//   }, [messages]);


//   if (isMessageLoading) {
//     return (
//       <div className="flex-1 flex flex-col overflow-auto">
 
//         <MessageSkeleton />
    
//       </div>
//     );
//   }


//   return (
//     <div className="flex-1 flex flex-col overflow-auto">
     

//       <div className="flex-1 overflow-y-auto p-4 space-y-4">
//         {messages.map((message) => (
//           <div
//             key={message._id}
//             className={`chat ${message.senderId === authUser?._id ? "chat-end" : "chat-start"}`}
//             ref={messageEndRef}
//           >
//             <div className="chat-image avatar">
//               <div className="size-10 rounded-full border">
//                 <img
//                   src={
//                     message.senderId === authUser?._id
//                       ? authUser?.profilePic || "/avatar.png"
//                       : selectedUser?.profilePic || "/avatar.png"
//                   }
//                   alt="profile pic"
//                 />
//               </div>
//             </div>

          
//             <div className="chat-header mb-1">
//               <time className="text-xs opacity-50 ml-1">
             
//                 {new Date(message.createdAt).toLocaleTimeString([], {
//                   hour: "2-digit",
//                   minute: "2-digit",
//                 })}
//               </time>
//             </div>

//             {/* Chat Bubble */}
//             <div className="chat-bubble flex flex-col">
//               {message.image && (
//                 <img
//                   src={message.image}
//                   alt="Attachment"
//                   className="sm:max-w-[200px] rounded-md mb-2"
//                 />
//               )}
//               {message.text && <p>{message.text}</p>}
//             </div>
//           </div>
//         ))}
//       </div>

//     </div>
//   );
// };

// export default ChatContainer;
import { authcheck } from "../patanhi/authEv";
import { chatUser } from "../patanhi/chatEv";
import { useEffect, useRef } from "react";
import MessageSkeleton from "./MessageSkeleton";

const ChatContainer = () => {
  const {
    messages = [],
    getMessages,
    isMessageLoading,
    selectedUser,
    subscribeToMessages,
    unsubscribeFromMessages,
  } = chatUser();

  const { authUser } = authcheck();
  const messageEndRef = useRef(null);

  useEffect(() => {
    if (!selectedUser?._id) return;
    getMessages(selectedUser._id);
    subscribeToMessages();
    return () => unsubscribeFromMessages();
  }, [selectedUser?._id, getMessages, subscribeToMessages, unsubscribeFromMessages]);

  useEffect(() => {
    // scroll to bottom after messages change
    if (messageEndRef.current) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages?.length]);

  if (isMessageLoading) {
    return (
      <div className="flex-1 flex flex-col overflow-auto">
        <MessageSkeleton />
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col overflow-auto">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => {
          const mine = message.senderId === authUser?._id;
          return (
            <div key={message._id} className={`chat ${mine ? "chat-end" : "chat-start"}`}>
              <div className="chat-image avatar">
                <div className="size-10 rounded-full border">
                  <img src={mine ? (authUser?.profilePic || "/avatar.png") : (selectedUser?.profilePic || "/avatar.png")} alt="profile" />
                </div>
              </div>

              <div className="chat-bubble flex flex-col">
                {message.image && <img src={message.image} alt="attachment" className="sm:max-w-[200px] rounded-md mb-2" />}
                {message.text && <p>{message.text}</p>}
                <time className="text-xs opacity-50 mt-2 self-end">
                  {new Date(message.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                </time>
              </div>
            </div>
          );
        })}

        {/* dummy element to scroll into view */}
        <div ref={messageEndRef} />
      </div>
    </div>
  );
};

export default ChatContainer;
