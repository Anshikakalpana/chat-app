import Message from "../models/messageSchema";
import { v2 as cloudinary } from "cloudinary";


cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const getContacts= async(req ,res)=>{
     try{
        const currUser= req.user._id;
        const filteredUsers= await User.find({
            _id:{
                $ne: currUser
            }

        }).select("-password");
        res.status(200).json(filteredUsers);

         }catch(err){
            console.error("error from getting users");
            res.status(500).json({error:"pataaa nhi"})
         }

        }

const getmessages= async (req,res)=>{
    try{
        const {id:receiverId} = req.params
        const senderId= req.user._id;

        const messages = await Message.find({
            $or:[
                {
                    senderId: senderId, receiverId:receiverId
                },
                 {
                    senderId: receiverId, receiverId:senderId
                }

            ]
        })

   return res.send({
    message:"everything fine with getmessages"
   })
    }catch(err){
         return res.send({
    message:"nothing fine with getmessages"
   })
      
    }
}

const sendMessages= async(req , res)=>{
    try{
        const {text, image}= req.body;
         const {id:receiverId} = req.params;
         const senderId= req.user._id;

         let newImage ;
         if(image){
            
            const uploadResponse = await cloudinary.uploader.upload(image, {
                folder: "chat_images",
                transformation: [
                    { width: 1080, crop: "limit" }, // limit large image sizes
                    { quality: "auto", fetch_format: "auto" } // compress automatically
                ]
            });
            newImage = uploadResponse.secure_url;
         }

         const newmess= new Message({
            senderId, receiverId , text , image:newImage

         })

      await newmess.save();
   res.status(201).json({
 message:"message sent successfully"
   })
    }
catch(err){
  console.error("message delivery failed:", err);
  return res.status(500).send("message delivery failed");
}
}

export default message={
    getContacts,
    getmessages,
    sendMessages
}
