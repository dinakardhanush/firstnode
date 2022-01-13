//Here we are going to receive data from mongodb so we are using mongoose.
const mongoose = require('mongoose');


const AuthorSchema = mongoose.Schema({
    authorName:{
        type:String,
        required:true,
        minlength:3,
        maxlength:100
    },
    authorAge:{
        type:Number,
        required:true,
        minlength:5,
        maxlength:100
    }
})

//We should export model schema like below
module.exports = mongoose.model("Author",AuthorSchema)