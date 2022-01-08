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

module.exports = mongoose.model("Author",AuthorSchema)