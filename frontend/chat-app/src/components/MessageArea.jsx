// import React, { useState, useRef } from "react";
// import { chatUser } from "../patanhi/chatEv";
// import imageCompression from "browser-image-compression";

// const MessageArea = () => {
//   const [text, setText] = useState("");
//   const [image, setImage] = useState(null);
//   const [preview, setPreview] = useState(null);
//   const fileInputRef = useRef(null);
//   const { sendMessages } = chatUser();

//  const handleImageChange = async (e) => {
//   const file = e.target.files[0];
//   const base64 = await convertToBase64(file);
//   setImage(base64);
// };

// function convertToBase64(file) {
//   return new Promise((resolve, reject) => {
//     const reader = new FileReader();
//     reader.readAsDataURL(file);
//     reader.onload = () => resolve(reader.result);
//     reader.onerror = (error) => reject(error);
//   });
// }

//   const removeImage = () => {
//     setImage(null);
//     setPreview(null);
//     if (fileInputRef.current) fileInputRef.current.value = "";
//   };

 
//   const handleSendMessage = async (e) => {
//     e.preventDefault();
//     if (!text.trim() && !image) return;

//     try {
//       const formData = new FormData();
//       formData.append("text", text.trim());
//       if (image) formData.append("image", image);

//       await sendMessages(formData);

     
//       setText("");
//       removeImage();
//     } catch (err) {
//       console.error("Failed to send message:", err);
//     }
//   };

//   return (
//     <div className="p-3 border-t border-purple-200 bg-purple-50 flex flex-col gap-3">
   
//       {preview && (
//         <div className="relative w-fit">
//           <img
//             src={preview}
//             alt="Preview"
//             className="w-20 h-20 object-cover rounded-lg shadow-md border border-purple-200"
//           />
//           <button
//             onClick={removeImage}
//             type="button"
//             className="absolute -top-2 -right-2 bg-purple-500 text-white rounded-full p-1 hover:bg-purple-600 transition"
//           >
//             ✕
//           </button>
//         </div>
//       )}

//       {/* Message Input */}
//       <form
//         onSubmit={handleSendMessage}
//         className="flex items-center gap-3 bg-white rounded-full shadow-sm px-4 py-2 border border-purple-200 focus-within:ring-2 focus-within:ring-purple-300 transition"
//       >
//         <input
//           type="text"
//           placeholder="Type a message..."
//           value={text}
//           onChange={(e) => setText(e.target.value)}
//           className="flex-1 bg-transparent outline-none text-gray-700 placeholder-gray-400"
//         />

//         <input
//           type="file"
//           accept="image/*"
//           ref={fileInputRef}
//           onChange={handleImageChange}
//           className="hidden"
//         />

//         <button
//           type="button"
//           onClick={() => fileInputRef.current?.click()}
//           className="text-purple-600 hover:text-purple-800 transition text-xl"
//           title="Attach Image"
//         >
//           📷
//         </button>

//         <button
//           type="submit"
//           className="bg-purple-500 text-white px-4 py-1.5 rounded-full hover:bg-purple-600 transition font-medium"
//         >
//           Send
//         </button>
//       </form>
//     </div>
//   );
// };

// export default MessageArea;
import React, { useState } from "react";
import { chatUser } from "../patanhi/chatEv";
import { Send } from "lucide-react";

const MessageArea = () => {
  const { sendMessage, selectedUser } = chatUser();
  const [text, setText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    sendMessage({ to: selectedUser._id, text });
    setText("");
  };

  return (
    <form onSubmit={handleSubmit} className="p-3 flex items-center gap-3 bg-white">
      <input
        className="flex-1 px-3 py-2 border rounded-lg focus:outline-none"
        placeholder="Type a message..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button type="submit" className="p-2 rounded-md bg-purple-600 text-white">
        <Send className="w-4 h-4" />
      </button>
    </form>
  );
};

export default MessageArea;
