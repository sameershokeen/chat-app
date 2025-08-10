import User from "../models/user.modle.js"
import Message from "../models/message.model.js";

//all users
export const getAllUsers = async (req, res) => {
try {
    const loggedInUserId = req.user._id;
    const usersFiltered = await User.find({ _id: { $ne: loggedInUserId } }).select("-password -__v");
    res.status(200).json({ users: usersFiltered });
    //remove in production.
    console.log("Fetched all users successfully:", usersFiltered);

} catch (error) {
    console.log("Error fetching users:", error.message);
    return res.status(500).json({ message: "Internal server error." });
}

}


//message between two users

export const getmessages = async (req, res) => {
    try {
        const {id}  = req.params.id;
        const myId = req.user._id;

const messages = await Message.find({
            $or: [
                { sender: myId, receiver: id },
                { sender: id, receiver: myId }
            ]
        })
    res.status(200).json({ messages });
        //remove in production.
        console.log("Fetched messages successfully:");

    } catch (error) {
        res.status(500).json({ message: "Internal server error." });
        console.error("Error fetching messages:", error.message);
    }
}


export const sendmessages = async (req, res) => {

try {
    const {text,image}= req.body;
const {id:receiverid} = req.params;

const senderid = req.user._id;
let imageUrl ;
    if (image) {
        const uploadResponse = await cloudinary.uploader.upload(image);
        imageUrl = uploadResponse.secure_url;
        // Log the image URL for debugging
        console.log("Image uploaded successfully:", imageUrl);
    }

    const newMessage = await Message.create({
        text,
        image: imageUrl,
        sender: senderid,
        receiver: receiverid
    }); 
  

    await newMessage.save();



 
res.status(200).json({ message: "Message sent successfully.", newMessage });
    //remove in production.
    console.log("Message sent successfully:", newMessage);

} catch (error) {
    res.status(500).json({ message: "Internal server error." });
    console.error("Error sending message:", error.message);
}

};