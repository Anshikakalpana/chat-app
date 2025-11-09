import React from "react";
import { chatUser } from "./patanhi/chatEv";
import Sidebar from "./components/Sidebar";
import NoChat from "./components/NoChat";
import ChatWindow from "./components/ChatWindow";
import ChatHeader from "./components/ChatHeader";

const Dashboard = () => {
  const { selectedUser } = chatUser();

 return (
  <div className="flex h-screen bg-purple-50 overflow-hidden">
    {/* Sidebar */}
    <div className="w-full sm:w-72 md:w-80 border-r border-purple-200 bg-white shadow-md">
      <Sidebar />
    </div>

    {/* Chat Area */}
    <div className="flex-1 flex flex-col overflow-hidden">
      {selectedUser ? (
        <>
          <div className="flex flex-col h-full">
            {/* Header */}
          

            {/* Chat Messages - scrollable */}
            <div className="flex-1 overflow-y-auto">
              <ChatWindow />
            </div>

            {/* Chat Bar */}
            <div className="flex-shrink-0">
              {/* If your input bar is part of ChatWindow, no need to repeat */}
              {/* Otherwise put <ChatInput /> or similar here */}
            </div>
          </div>
        </>
      ) : (
        <NoChat />
      )}
    </div>
  </div>
);

};

export default Dashboard;
