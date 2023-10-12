const mongoose = require("mongoose");

const contactSchema = mongoose.Schema({

    name:{
        type:String,
        required:[true,"name is required"],
    },
    email:{
        type:String,
        required:[true,"email is required"],
    },
    mobile:{
        type:String,
        required:[true,"mobile number is required"],
    },

},{
    timestamps : true,
})

module.exports = mongoose.model("Contact",contactSchema);