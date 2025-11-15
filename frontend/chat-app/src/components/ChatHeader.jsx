// import React from "react";
// import { chatUser } from "../patanhi/chatEv";
// import { ArrowLeft, Circle } from "lucide-react";

// const ChatHeader = () => {
//   const { selectedUser, setSelectedUser, onlineUsers } = chatUser();

//   if (!selectedUser) return null;

//   const isOnline = onlineUsers?.includes(selectedUser._id);

//   return (
//     <div className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-purple-50 to-purple-100 border-b border-purple-200 shadow-sm">
      
  
//       <button
//         onClick={() => setSelectedUser(null)}
//         className="sm:hidden p-2 rounded-full hover:bg-purple-100 transition"
//       >
//         <ArrowLeft size={20} className="text-purple-500" />
//       </button>


//       <div className="flex items-center gap-3">
//         <div className="relative">
//           <img
//             src={selectedUser.profile || "/avatar.png"}
//             alt={selectedUser.name}
//             className="w-10 h-10 rounded-full object-cover border-2 border-purple-200"
//           />
//           {isOnline && (
//             <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 rounded-full border-2 border-white"></span>
//           )}
//         </div>

//         <div className="flex flex-col text-left">
//           <h2 className="text-gray-800 font-medium text-base">
//             {selectedUser.name}
//           </h2>
//           <p className={`text-sm ${isOnline ? "text-green-500" : "text-gray-400"}`}>
//             {isOnline ? "Online" : "Offline"}
//           </p>
//         </div>
//       </div>

      
//       <div className="hidden sm:flex items-center gap-3">
//         <Circle size={18} className="text-purple-400" />
//       </div>
//     </div>
//   );
// };

// export default ChatHeader;
import React from "react";
import { ArrowLeft } from "lucide-react";
import { chatUser } from "../patanhi/chatEv";

const ChatHeader = ({ onBack = () => {} }) => {
  const { selectedUser } = chatUser();

  return (
    <div className="flex items-center gap-3 p-3 border-b bg-white">
      {/* mobile back button */}
      <button className="sm:hidden p-2 rounded-md" onClick={onBack}>
        <ArrowLeft className="w-5 h-5 text-gray-600" />
      </button>

      <img src={selectedUser?.profilePic || "/avatar.png"} alt="avatar" className="w-10 h-10 rounded-full" />
      <div className="flex-1">
        <div className="font-semibold text-gray-800">{selectedUser?.fullName || selectedUser?.name}</div>
        <div className="text-xs text-gray-400">{selectedUser?.email}</div>
      </div>
    </div>
  );
};

export default ChatHeader;
