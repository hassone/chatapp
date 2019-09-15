var express = require('express');
var io = require('socket.io')(http);
var users= require('./routes/user') ; 
const mongoose = require('mongoose');

var app =express() ;
var http = require('http').Server(app);

// establish connection
mongoose.connect('mongodb://localhost:27017/chatappdb',{useNewUrlParser :true}).then(()=>{console.log('connected')}).catch((err)=>{console.log(err)}) ;

app.use(express.json()) ;
app.use('/api/user',users) ;
app.use('/', users);


http.listen(3000, ()=>
    console.log('listening on localhost:3000')
 );
