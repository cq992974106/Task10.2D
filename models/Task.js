const mongoose = require("mongoose")

const taskSchema = new mongoose.Schema(
    {
        
        Type1: String,
        Type2:String,
        Type3:String,
        Type4:String,
        Title: String,
        Description: String,
        Expiry: String,
        Question1:String,
        Question2:String,
        Question3:String,
        Question4:String,
        Answer1:String,  
        Answer2:String,
        Answer3:String,
        MasterYes:String,
        MasterNo:String,
        Reward:Number,
        Number:Number,
    }
)

module.exports  =  mongoose.model("Task", taskSchema)
