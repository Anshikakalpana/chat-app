// import React, { useState } from "react";
// import Sidebar from "./Sidebar";
// import ChatWindow from "./ChatWindow";
// import { chatUser } from "../patanhi/chatEv";

// const ChatPage = () => {
//   const { selectedUser } = chatUser();
//   const [isSidebarVisible, setSidebarVisible] = useState(true);

//   const handleUserSelect = () => {

//     if (window.innerWidth < 640) setSidebarVisible(false);
//   };

//   const handleBack = () => {
    
//     setSidebarVisible(true);
//   };

//   return (
//     <div className="flex h-screen bg-gradient-to-b from-purple-50 to-purple-100">
//       {/* Sidebar */}
//       <div
//         className={`${
//           isSidebarVisible ? "block" : "hidden"
//         } sm:block w-full sm:w-72 md:w-80 border-r border-purple-200`}
//       >
//         <Sidebar onUserSelect={handleUserSelect} />
//       </div>

//       {/* Chat Window */}
//       <div
//         className={`flex-1 ${
//           isSidebarVisible && window.innerWidth < 640 ? "hidden" : "block"
//         }`}
//       >
//         {selectedUser ? (
//           <ChatWindow onBack={handleBack} />
//         ) : (
//           <div className="flex items-center justify-center h-full text-purple-400">
//             Select a chat to start messaging
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ChatPage;
"use client";
import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import ChatWindow from "../components/ChatWindow";

export default function ChatPage() {
  const [isSidebarVisible, setSidebarVisible] = useState(true);
  const [screenWidth, setScreenWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1024
  );

  useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);

    // hide sidebar by default on mobile
    if (screenWidth < 640) setSidebarVisible(false);

    return () => window.removeEventListener("resize", handleResize);
  }, [screenWidth]);

  const handleUserSelect = () => {
    if (screenWidth < 640) setSidebarVisible(false);
  };

  const handleBack = () => setSidebarVisible(true);

  return (
    <div className="flex h-screen w-full overflow-hidden bg-gradient-to-b from-purple-50 to-purple-100">

      {/* SIDEBAR */}
      <div
        className={`
          ${isSidebarVisible ? "block" : "hidden"} 
          sm:block 
          w-full 
          sm:w-72 sm:min-w-72 sm:max-w-72 
          md:w-80 md:min-w-80 md:max-w-80 
          border-r bg-white overflow-hidden
        `}
      >
        <Sidebar onUserSelect={handleUserSelect} />
      </div>

      {/* CHAT WINDOW */}
      <div
        className={`
          flex-1 overflow-hidden
          ${isSidebarVisible && screenWidth < 640 ? "hidden" : "block"}
        `}
      >
        <ChatWindow onBack={handleBack} />
      </div>

    </div>
  );
}
