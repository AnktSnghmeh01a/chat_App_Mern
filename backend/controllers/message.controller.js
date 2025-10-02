import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";


export const sendMessage = async (req, res) => {

    try {
       
        const {message} = req.body;
         
        const senderId = req.user._id;  // Authenticated user's ID from protectRoute middleware
        const receiverId = req.params.id; 

       let conversation = await Conversation.findOne({
          
           participants: { $all: [senderId, receiverId] } ,

       })

       if(!conversation){
            
            conversation = await Conversation.create({
                participants:[senderId,receiverId],
            })

       }
       const newMessage = new Message({
          senderId,
          receiverId,
          messageText : message,
       });

       console.log(newMessage);
      if(newMessage){
           conversation.messages.push(newMessage._id);
       }

         await Promise.all([newMessage.save(),conversation.save()]);  


        res.status(201).json({ message: "Message sent successfully", newMessage  });
    } 
      
    catch (error) {     
        console.error("Error in sendMessage controller:", error.message);
        res.status(500).json({ error: "Server Error" });  
    }

}