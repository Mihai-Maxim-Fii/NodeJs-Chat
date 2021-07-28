const session = require("express-session");
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });
var mongoose=require('mongoose');





module.exports=function(application,database,client)
{  
    application.get('/chat',function(req,res)
    {
        database.countDocuments({},function(err,count)
        {   
               
                req.session.Num=count;
                database.find({}).toArray(function(err,data)
                {   if(err) console.log(err);
                

                    res.render("Chat",{User:req.session.User,Messages:data,Nr: req.session.Num,lungime:count});
                });
                
            
        });
      
   
    });
   

    application.post('/login',urlencodedParser,function(req,res){
        database.countDocuments({},function(err,count)
        {   
                req.session.Num=count;
                database.find({}).toArray(function(err,data)
                {   if(err) console.log(err);
                
                    req.session.User=req.body.user;
                    res.render("Chat",{User:req.session.User,Messages:data,Nr: req.session.Num,lungime:count})
                });
                
            
            
        });
      

    });
    application.post('/msg',urlencodedParser,function(req,res){
        database.insertOne(req.body,function(err)
        {
           
            database.countDocuments({},function(err,count)
            {    
                   req.session.Num=count;
                   
                   database.find({}).toArray(function(err,data)
                    {   var x=data.length;
                        if(err) console.log(err);
                        res.render("Chat",{User:req.session.User,Messages:data,Nr: req.session.Num,lungime:count});
                    });
                
            });

        });
     
       
    });
    application.get('/check',function(req,res)
    {   
         
        database.countDocuments({},function(err,count)
    {   
         
           req.session.Num=count;
           var result={number:count};
           database.find({}).toArray(function(err,data)
            {   if(err) console.log(err);
                res.send(result);
            });
            
        
        
    });
   
       
    });
 
    
  
  


}

