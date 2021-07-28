
var express=require('express');
var application=express();
application.set('view engine', 'ejs');
var session=require('express-session');
application.use('/assets',express.static('assets'));
var controller=require('./controller/mainController');
application.use(session({
    secret:'secret-key',
    resave:false,
    saveUninitialized:false,
}));
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://Mihai:Sarmale@cluster0.p7exz.mongodb.net/Mihai?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true ,useUnifiedTopology: true});
var database;
client.connect(err => {
   database = client.db("Mihai").collection('messages');
   controller(application,database,client);

   application.listen(process.env.PORT || 5000, function () {
    console.log('Haide');
  });



   
 
});

/*
 application.listen(process.env.PORT || 5000, function () {
    console.log('Haide');
  });
*/




