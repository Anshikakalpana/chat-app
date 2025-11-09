import { authcheck } from "../patanhi/authEv";
import { chatUser } from "../patanhi/chatEv";
import { useEffect, useRef } from "react";
import ChatHeader from "./ChatHeader";
import MessageArea from "./MessageArea";
import MessageSkeleton from "./MessageSkeleton";
// import { formatMessageTime } from "../lib/utils";

const ChatContainer = () => {
  const {
    messages,
    getMessages,
    isMessageLoading,
    selectedUser,
    subscribeToMessages,
    unsubscribeFromMessages,
  } = chatUser(); // ✅ using your existing store name

  const { authUser } = authcheck();
  const messageEndRef = useRef(null);

  // 🔹 Fetch messages when a user is selected
  useEffect(() => {
    if (!selectedUser?._id) return;

    getMessages(selectedUser._id);
    subscribeToMessages();

    return () => unsubscribeFromMessages();
  }, [selectedUser?._id, getMessages, subscribeToMessages, unsubscribeFromMessages]);

  // 🔹 Auto-scroll when new messages arrive
  useEffect(() => {
    if (messageEndRef.current && messages?.length) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  // 🔹 Loading state
  if (isMessageLoading) {
    return (
      <div className="flex-1 flex flex-col overflow-auto">
 
        <MessageSkeleton />
    
      </div>
    );
  }

  // 🔹 Main chat UI
  return (
    <div className="flex-1 flex flex-col overflow-auto">
     

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message._id}
            className={`chat ${message.senderId === authUser?._id ? "chat-end" : "chat-start"}`}
            ref={messageEndRef}
          >
            {/* Profile Image */}
            <div className="chat-image avatar">
              <div className="size-10 rounded-full border">
                <img
                  src={
                    message.senderId === authUser?._id
                      ? authUser?.profilePic || "/avatar.png"
                      : selectedUser?.profilePic || "/avatar.png"
                  }
                  alt="profile pic"
                />
              </div>
            </div>

          
            <div className="chat-header mb-1">
              <time className="text-xs opacity-50 ml-1">
                {/* Replace with real time formatting if needed */}
                {new Date(message.createdAt).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </time>
            </div>

            {/* Chat Bubble */}
            <div className="chat-bubble flex flex-col">
              {message.image && (
                <img
                  src={message.image}
                  alt="Attachment"
                  className="sm:max-w-[200px] rounded-md mb-2"
                />
              )}
              {message.text && <p>{message.text}</p>}
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};

export default ChatContainer;
