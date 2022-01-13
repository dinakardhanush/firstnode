//In routes we are accessing routes so we are using express.
const express = require('express');
//dont know
const { send } = require('express/lib/response');
const router = express.Router();
//This is to access named module exports from models/books
const {Book,validateBook} = require('../models/books')

// Request is input given or action taken by user.
//Response is what server gives to user with the input given or action taken.


//post request
router.post('/',async(req,res)=>{

    //if any error is catched this will have a custom message that we did set
    const error= await validateBook(req.body);

    //if error is true this will send error message.
    if(error) res.status(400).send(error.message)
    //else the below code will run
    //To post we have to know the object and connect it to models.
    //Accessing Book module from models/books
    const book = Book({
        //requesting parameters
        bookName:req.body.bookName,
        author:{
            authorName:req.body.authorName,
            authorAge:req.body.authorAge
        },
        genre:req.body.genre
    });

    //Saving the book in database and asking for the book details to show in response to know that our process success
    book.save().then(book=>{
        res.send(book);
    }).catch((err)=>{
        res.status(500).send("books was not stored in db");
    });

});

//get all books
router.get('/',(req,res)=>{
    Book.find().then(books=>{
        res.send(books)
    }).catch((err)=>{
         res.status(500).send("something went wrong in recieving")
    })
})

//get by id
router.get('/:bookName',(req,res)=>{
    Book.findById(req.params.bookName).then((book)=>{
        if(book){
            res.send(book);
        }else{
            res.status(404).send('book not found')
        }
    }).catch((err)=>{
        res.status(500).send('something went in getting book by id')
    })
})

//update book based on id
router.put('/:bookId',async (req,res)=>{

    const updatedbook = await Book.findByIdAndUpdate(req.params.bookId,{
        bookName:req.body.bookName,
        author:{
            authorName:req.body.authorName,
            authorAge:req.body.authorAge
        },
        genre:req.body.genre
    },
    //to return updated object add below line code
    {new:true});

    if(!updatedbook)res.status(404).send('book not found');
    res.send(updatedbook);
});

//Deleting data by id
router.delete('/:bookId',async(req,res)=>{
    const bookDelete = await Book.findByIdAndDelete(req.params.bookId);
    if(!bookDelete)res.status(404).send('no book da kanna');
    res.send(bookDelete);
})

//Exporting this router module to access in index.js
module.exports = router;