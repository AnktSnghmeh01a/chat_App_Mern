import User from "../models/user.model.js";

export const getUsers = async(req,res)=>{


    try {
          
         const loggedInUserId = req.user._id;   
         
         const users = await User.find({_id:{$ne:loggedInUserId}}).select("-password");

          return res.status(200).json(users); 
         

    } catch (error) {
        
        console.log("Error in getUsers controller:", error.message);
        return res.status(500).json({ error: "Server Error" });  
    }



}
