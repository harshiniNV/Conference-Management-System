var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
const express=require('express');
const app=express();
const bodyParser=require("body-parser");
const cors=require('cors');
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}));


var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    user: 'conferencemanagement6@gmail.com',
    pass: 'gowthamabi12'
  }
});



app.get('/api/getResearcher',(req,res)=>{
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("users");
        dbo.collection("researcher").find({}).toArray(function(err, result) {
          if (err) throw err;
          res.send(result);
          db.close();
        });
      });
    
     
  });

  app.get('/api/getWorkshopPresenter',(req,res)=>{
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("users");
        dbo.collection("workshopPresenter").find({}).toArray(function(err, result) {
          if (err) throw err;
          res.send(result);
          db.close();
        });
      });
    
     
  });


  app.post("/api/updateResearcher",(req,res)=>{
    const Rid=req.body.Rid;
    const status=req.body.status;
    
   
    MongoClient.connect(url, function(err, db) {
      if (err) throw err;
      var dbo = db.db("users");
      dbo.collection("researcher").findOne({researcherId:Rid},function(err, result) {
        if (err) throw err;
      
        console.log(result.emailId);
        if(status=="Approved")
    {
        var mailOptions = {
            from: 'conferencemanagement6@gmail.com',
            to: result.emailId,
            subject: 'APPROVAL',
            text: "Your research has been approved",
          };
        transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log(error);
            } else {
              console.log('Email sent: ' + info.response);
            }
          });
    }
    else if(status=="Declined")
    {
        var mailOptions = {
            from: 'conferencemanagement6@gmail.com',
            to: result.emailId,
            subject: 'Rejection Notice',
            text: "Your research presentation has been declined",
          }; 
          transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log(error);
            } else {
              console.log('Email sent: ' + info.response);
            }
          });
    }
      })
      dbo.collection("researcher").findOneAndUpdate(
        {researcherId: Rid},
        { $set: { status: status}}
    )
    db.close();
    });
    


});

    app.post("/api/updateWorkshopPresenter",(req,res)=>{
        const Wid=req.body.Wid;
        const status=req.body.status;
        
        var email;
        MongoClient.connect(url, function(err, db) {
          if (err) throw err;
          var dbo = db.db("users");
          dbo.collection("workshopPresenter").findOne({workshopPresenterId:Wid},function(err, result) {
            if (err) throw err;
           // email=result.emailId;
            console.log(result.emailId);
            if(status=="Approved")
        {
            var mailOptions = {
                from: 'conferencemanagement6@gmail.com',
                to: result.emailId,
                subject: 'APPROVAL',
                text: "Your workshop presentation has been approved",
              };
            transporter.sendMail(mailOptions, function(error, info){
                if (error) {
                  console.log(error);
                } else {
                  console.log('Email sent: ' + info.response);
                }
              });
        }
        else if(status=="Declined")
        {
            var mailOptions = {
                from: 'conferencemanagement6@gmail.com',
                to: result.emailId,
                subject: 'Rejection Notice',
                text: "Your workshop presentation has been declined",
              }; 
              transporter.sendMail(mailOptions, function(error, info){
                if (error) {
                  console.log(error);
                } else {
                  console.log('Email sent: ' + info.response);
                }
              });
        }
          })
          dbo.collection("workshopPresenter").findOneAndUpdate(
            {workshopPresenterId: Wid},
            { $set: { status: status}}
        )
        db.close();
        });
        


    });
  app.listen(3001,()=>{
    console.log("running on port 3001");  
}) 