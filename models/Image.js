const mongoose = require("mongoose")

const imageSchema = new mongoose.Schema(
    {
        
        Title:  String,
        imageUrl: String
    }
)

module.exports  =  mongoose.model("Image", imageSchema)
