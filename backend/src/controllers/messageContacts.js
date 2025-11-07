
// import cloudinary from "../config/cloudinary.js";

// import User from "../models/userSchema.js";
// import Message from "../models/messageSchema.js";




// const getContacts = async (req, res) => {
//   try {
//     const currUser = req.user._id;
//     const filteredUsers = await User.find({ _id: { $ne: currUser } }).select("-password");
//     res.status(200).json(filteredUsers);
//   } catch (err) {
//     console.error("❌ Error fetching contacts:", err);
//     res.status(500).json({ error: "Failed to fetch contacts" });
//   }
// };

// // ✅ Get all messages between two users
// const getMessages = async (req, res) => {
//   try {
//     const { id: receiverId } = req.params;
//     const senderId = req.user._id;

//     const messages = await Message.find({
//       $or: [
//         { senderId, receiverId },
//         { senderId: receiverId, receiverId: senderId },
//       ],
//     }).sort({ createdAt: 1 });

//     return res.status(200).json(messages);
//   } catch (err) {
//     console.error("❌ Error fetching messages:", err);
//     return res.status(500).json({ error: "Failed to fetch messages" });
//   }
// };

// const sendMessage = async (req, res) => {
//   try {
//     const { text, image } = req.body;
//     const { id: receiverId } = req.params;
//     const senderId = req.user._id;

//     let imageUrl = "";
//     if (image) {
//       const uploadResponse = await cloudinary.uploader.upload(image, {
//         folder: "chat_images",
//         transformation: [
//           { width: 1080, crop: "limit" },
//           { quality: "auto", fetch_format: "auto" },
//         ],
//       });
//       imageUrl = uploadResponse.secure_url;
//     }

//     const newMessage = new Message({
//       senderId,
//       receiverId,
//       text,
//       image: imageUrl,
//     });

//     await newMessage.save();

//     return res.status(201).json({
//       message: "Message sent successfully",
//       data: newMessage,
//     });
//   } catch (err) {
//     console.error("❌ Message delivery failed:", err);
//     return res.status(500).json({ error: "Message delivery failed" });
//   }
// };


// export default {
//   getContacts,
//   getMessages,
//   sendMessage,
// };
import cloudinary from "../lib/cloudinary.js";
import User from "../models/userSchema.js";
import Message from "../models/messageSchema.js";

const getContacts = async (req, res) => {
  try {
    const currUser = req.user._id;
    const filteredUsers = await User.find({ _id: { $ne: currUser } }).select("-password");
    res.status(200).json(filteredUsers);
  } catch (err) {
    console.error("❌ Error fetching contacts:", err);
    res.status(500).json({ error: "Failed to fetch contacts" });
  }
};

const getMessages = async (req, res) => {
  try {
    const { id: receiverId } = req.params;
    const senderId = req.user._id;

    const messages = await Message.find({
      $or: [
        { senderId, receiverId },
        { senderId: receiverId, receiverId: senderId },
      ],
    }).sort({ createdAt: 1 });

    return res.status(200).json(messages);
  } catch (err) {
    console.error("❌ Error fetching messages:", err);
    return res.status(500).json({ error: "Failed to fetch messages" });
  }
};

const sendMessage = async (req, res) => {
  try {
    const { text, image } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user._id;

    console.log("🖼️ Incoming image:", typeof image, image?.slice(0, 50)); // log first 50 chars

    let imageUrl = "";
    if (image) {
      // ensure it’s a base64 string
      if (typeof image !== "string") {
        return res.status(400).json({ error: "Invalid image format" });
      }

      const uploadResponse = await cloudinary.uploader.upload(image, {
        folder: "chat_images",
        transformation: [
          { width: 1080, crop: "limit" },
          { quality: "auto", fetch_format: "auto" },
        ],
      });

      imageUrl = uploadResponse.secure_url;
    }

    const newMessage = new Message({
      senderId,
      receiverId,
      text,
      image: imageUrl,
    });

    await newMessage.save();

    return res.status(201).json({
      message: "Message sent successfully",
      data: newMessage,
    });
  } catch (err) {
    console.error("❌ Message delivery failed:", err);
    return res.status(500).json({ error: "Message delivery failed" });
  }
};


export default { getContacts, getMessages, sendMessage };
