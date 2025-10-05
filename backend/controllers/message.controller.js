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


export const getMessage = async (req, res) => {

     try
     {

       const {id:chatToUserId} = req.params;
       const userId = req.user._id;

       const conversation = await Conversation.findOne(
        {
            participants: { $all: [userId, chatToUserId] } ,

       }).populate("messages");

      

       
         if(!conversation){
            return res.status(404).json({ message: "No conversation found" });
         }
	       const messages = conversation.messages;
     
         return  res.status(200).json({messages});
          

     }
     catch (error) {
        
        console.log("Error in getMessage controller",error.message);
        return res.status(500).json({ error: "Server Error" });

     }


}