const mongoose = require('mongoose');
const author = require('./author');
const yup = require('yup');


const BookSchema = mongoose.Schema({
    bookName:{
        type:String,
        required:true,
        minlength:3,
        maxlength:100
    },
    author:author.schema,
    genre:{
        type:String,
        required:true,
        minlength:3,
        maxlength:100
    }
});

const validateBook = book=>{
    const schema =yup.object().shape({
        bookName:yup.string().required().min(3,"name is less than 10").max(100),
        authorName:yup.string().required().min(3,"AuthName is less than 10").max(100),
        authorAge:yup.number().required().min(5,"age is less than 10").max(100),
        genre:yup.string().required().min(3,"genere is less than 10").max(100)
    })

    return schema.validate(book).then(book=> book).catch(error=>{
        return{
            message:error.message
        }
    });
}

exports.Book = mongoose.model("Book",BookSchema);
exports.validateBook = validateBook;
