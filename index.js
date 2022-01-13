const express = require('express');
//don't know
const res = require('express/lib/response');
const mongoose = require('mongoose');
const app = express();
const bookRoute = require('./routes/books')
//Winston is for logger
const winston = require('winston');

//This is to access variable inside .env
const dotenv=require('dotenv').config();
const URI = process.env.MONGO_URI;
const port = process.env.PORT || 8080;


//middleware
app.use(express.json());
app.use(express.urlencoded({extended:true}));

//routes
app.use('/api/books',bookRoute);


//create a logger
const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    defaultMeta: { service: 'user-service' },
    transports: [
      new winston.transports.Console({
          format:winston.format.combine(
              winston.format.colorize({all:true})
          )
      }),
      new winston.transports.File({filename: 'error.log',level:'error'}),
    ],
    
  });

mongoose.connect(URI,{useNewUrlParser:true})
.then(()=>{logger.log('info',"connected to mongo db")}).catch((err)=>{
    logger.log("error",err)
});

app.listen(port,()=>console.log("server is now running"));


//If we are hosting this in heroku then Profile is compulsory.
//To ignore files that we dont want upload in github we need .gitignore.
//error.log is to check logs from winston.
//.env is to store variables that we dont want to give access to users