import React from "react";
import { chatUser } from "./patanhi/chatEv";
import Sidebar from "./components/Sidebar";
import NoChat from "./components/NoChat";
import ChatWindow from "./components/ChatWindow";
import ChatHeader from "./components/ChatHeader";

const Dashboard = () => {
  const { selectedUser } = chatUser();

  return (
    <div className="flex h-screen bg-purple-50">
     
      <div className="w-full sm:w-72 md:w-80 border-r border-purple-200 bg-white shadow-md">
        <Sidebar />
      </div>

      
      <div className="flex-1 flex flex-col">
        {selectedUser ? (
          <>
          
            <ChatWindow />
          </>
        ) : (
          <NoChat />
        )}
      </div>
    </div>
  );
};

export default Dashboard;
