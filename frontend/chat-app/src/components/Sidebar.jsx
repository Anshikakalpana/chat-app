// import React, { useEffect } from "react";
// import { chatUser } from "../patanhi/chatEv";
// import { Loader2 } from "lucide-react";

// import { authcheck } from "../patanhi/authEv";


// const Sidebar = () => {
//   const {
//     getUsers,
//     users,
//     selectedUser,
//     setSelectedUser,
//     UsersLoading,
//   } = chatUser();

//   const { onlineUsers } = authcheck();

//   useEffect(() => {
//     getUsers();
//   }, [getUsers]);

//   if (UsersLoading) {
//     return (
//       <div className="flex items-center justify-center h-full bg-gradient-to-b from-purple-50 to-purple-100">
//         <Loader2 className="animate-spin text-purple-300" size={36} />
//       </div>
//     );
//   }

//   return (
//     <aside className="w-full sm:w-72 md:w-80 bg-gradient-to-b from-purple-50 to-purple-100 border-r border-purple-200 h-screen flex flex-col shadow-md transition-all">
//       <div className="px-6 py-4 border-b border-purple-200 flex justify-between items-center bg-gradient-to-r from-purple-100 to-purple-50">
//         <h2 className="text-xl font-semibold text-purple-500">Chats</h2>
//         <span className="text-sm text-purple-400">{users.length} users</span>
//       </div>

//       <div className="flex-1 overflow-y-auto px-2 py-3 scrollbar-thin scrollbar-thumb-purple-200">
//         {users.map((user) => {
//           const isSelected = selectedUser?._id === user._id;
//           const isOnline = onlineUsers?.includes(user._id); // ✅ Works now

//           return (
//             <button
//               key={user._id}
//               onClick={() => setSelectedUser(user)}
//               className={`w-full flex items-center gap-4 p-3 rounded-xl transition-all duration-300 shadow-sm ${
//                 isSelected
//                   ? "bg-purple-100 ring-1 ring-purple-200"
//                   : "hover:bg-purple-50"
//               }`}
//             >
//               <div className="relative">
//                 <img
//                   src={user.profile || "/avatar.png"}
//                   alt={user.name}
//                   className="w-12 h-12 rounded-full object-cover border-2 border-purple-200"
//                 />
//                 {isOnline && (
//                   <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 rounded-full border-2 border-white"></span>
//                 )}
//               </div>

//               <div className="flex flex-col items-start text-left">
//                 <p
//                   className={`font-medium ${
//                     isSelected ? "text-purple-500" : "text-gray-700"
//                   }`}
//                 >
//                   {user.name}
//                 </p>
//                 <p className="text-sm text-gray-400">
//                   {isOnline ? "Online" : "Offline"}
//                 </p>
//               </div>
//             </button>
//           );
//         })}

//         {users.length === 0 && (
//           <p className="text-center text-purple-400 mt-10">No users found</p>
//         )}
//       </div>
//     </aside>
//   );
// };

// export default Sidebar;
import React, { useEffect } from "react";
import { chatUser } from "../patanhi/chatEv";
import { Loader2 } from "lucide-react";
import { authcheck } from "../patanhi/authEv";

const Sidebar = ({ onUserSelect = () => {} }) => {
  const { getUsers, users, selectedUser, setSelectedUser, UsersLoading } =
    chatUser();

  const { onlineUsers } = authcheck();

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  if (UsersLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <Loader2 className="animate-spin text-purple-300" size={36} />
      </div>
    );
  }

  return (
    <aside className="w-full h-full flex flex-col bg-white">
      <div className="px-6 py-4 border-b flex justify-between items-center">
        <h2 className="text-xl font-semibold text-purple-600">Chats</h2>
        <span className="text-sm text-gray-500">{users.length} users</span>
      </div>

      <div className="flex-1 overflow-y-auto px-2 py-3">
        {users.map((user) => {
          const isSelected = selectedUser?._id === user._id;
          const isOnline = onlineUsers?.includes(user._id);

          return (
            <button
              key={user._id}
              onClick={() => {
                setSelectedUser(user);
                onUserSelect();
              }}
              className={`w-full flex items-center gap-4 p-3 rounded-xl transition-all duration-200 ${
                isSelected
                  ? "bg-purple-50 ring-1 ring-purple-200"
                  : "hover:bg-gray-50"
              }`}
            >
              <div className="relative">
                <img
                  src={user.profile || "/avatar.png"}
                  alt={user.name}
                  className="w-12 h-12 rounded-full object-cover border-2 border-purple-100"
                />
                {isOnline && (
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 rounded-full border-2 border-white" />
                )}
              </div>

              <div className="flex flex-col items-start text-left">
                <p
                  className={`font-medium ${
                    isSelected ? "text-purple-600" : "text-gray-700"
                  }`}
                >
                  {user.name}
                </p>
                <p className="text-sm text-gray-400">
                  {isOnline ? "Online" : "Offline"}
                </p>
              </div>
            </button>
          );
        })}

        {users.length === 0 && (
          <p className="text-center text-gray-400 mt-6">No users found</p>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
