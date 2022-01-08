const express = require('express');
const { send } = require('express/lib/response');
const router = express.Router();
const {Book,validateBook} = require('../models/books')

router.post('/',async(req,res)=>{
    const error= await validateBook(req.body);

    if(error.message) res.status(400).send(error.message)
    const book = Book({
        bookName:req.body.bookName,
        author:{
            authorName:req.body.authorName,
            authorAge:req.body.authorAge
        },
        genre:req.body.genre
    });

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

//updatebook based on id
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

router.delete('/:bookId',async(req,res)=>{
    const bookDelete = await Book.findByIdAndDelete(req.params.bookId);
    if(!bookDelete)res.status(404).send('no book da kanna');
    res.send(bookDelete);
})

module.exports = router;