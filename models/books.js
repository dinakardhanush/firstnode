//Here we are going to receive data from mongodb so we are using mongoose.
const mongoose = require('mongoose');
const author = require('./author');

//Yup is library for validation purpose.
const yup = require('yup');


const BookSchema = mongoose.Schema({
    bookName:{
        type:String,
        required:true,
        minlength:3,
        maxlength:100
    },
    //accepting schema from another schema
    author:author.schema,
    genre:{
        type:String,
        required:true,
        minlength:3,
        maxlength:100
    }
});

//Inside const validatebook we are creating book object which contains constant schema.

const validateBook = 
book=>{
    //Constant schema contains data,type,required,min,max and etc to validate.
    const schema =yup.object().shape({
        bookName:yup.string().required().min(3,"name is less than 3").max(100),
        authorName:yup.string().required().min(3,"AuthName is less than 3").max(100),
        authorAge:yup.number().required().min(5,"age is less than 5").max(100),
        genre:yup.string().required().min(3,"genre is less than 3").max(100)
    })
    
    //Use the constant schema and validates and book then returns books if any condition in schema is not overruled.
    return schema.validate(book).then(bookFunc=> book).catch(error=>{
        return{
            message:error.message
        }
    });
}
//We should export model schema like below
exports.Book = mongoose.model("Book",BookSchema);

//We should export function or const like belo
exports.validateBook = validateBook;
