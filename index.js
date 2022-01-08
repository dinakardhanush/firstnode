const express = require('express');
const res = require('express/lib/response');
const mongoose = require('mongoose');
const app = express();
const port = 8080;
const bookRoute = require('./routes/books')
const winston = require('winston');
const dotenv=require('dotenv').config();
const URI = process.env.MONGO_URI;


//middleware
app.use(express.json());
app.use(express.urlencoded({extended:true}));

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
  console.log(dotenv.parsed.MONGO_URI);

//routes
app.use('/api/books',bookRoute)

mongoose.connect(URI,{useNewUrlParser:true})
.then(()=>{logger.log('info',"connected to mongo db")}).catch((err)=>{
    logger.log("error",err)
});

app.listen(port,()=>console.log("server is now running"));