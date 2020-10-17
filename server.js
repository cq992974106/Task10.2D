const express = require("express")
const bodyParser = require("body-parser")
const https = require("https")
const User = require("./models/User");
const mongoose = require("mongoose")
const cors = require("cors")
const Task = require("./models/Task");
const Image = require("./models/Image");

var path = require('path');
var multer = require('multer');
var fs =require('fs');

const app = express()
app.use(bodyParser.urlencoded({extended:true}))
app.use(cors())
app.use(bodyParser.json())

app.use(express.static(path.join(__dirname, 'public')));
var multer = require('multer');
const { SSL_OP_DONT_INSERT_EMPTY_FRAGMENTS } = require("constants");
app.use(multer({ dest: '/tmp/'}).array('image'));

// mongoose
mongoose.connect("mongodb://localhost:27017/DeakinDB", {useNewUrlParser: true, useUnifiedTopology: true})


//home route
app.get ('/', (req, res)=>{
  const user = {
        username: "deakin",
        password : "sit313",
  }
  res.send(user)
})

//register route
app.post('/register', (req,res)=>{
  
  const user = new User({
    username: req.body.username,
    password: req.body.password
    });
    user.save()
    .catch((err) => console.log(err));
    res.json(('saved to db: ' + user));
    
})

//login route
app.post('/login', (req,res)=>{
    User.findOne({ username: req.body.username},(error,user)=>{
      if(user!= null){
          if(!user.password.localeCompare(req.body.password)){
              res.json('success');
          }
          else{
              res.json('Password is wrong!')
          }
      }else{
        res.json('Username is not registered!')
      }
  });
});

//submit task route
app.post('/submit', (req,res)=>{
  const task = new Task({
    Type1: req.body.Type1,
        Type2:req.body.Type2,
        Type3:req.body.Type3,
        Type4:req.body.Type4,
        Title: req.body.Title,
        Description: req.body.Description,
        Expiry: req.body.Expiry,
        Question1:req.body.Question1,
        Question2:req.body.Question2,
        Question3:req.body.Question3,
        Question4:req.body.Question4,
        Answer1:req.body.Answer1,  
        Answer2:req.body.Answer2,
        Answer3:req.body.Answer3,
        MasterYes:req.body.MasterYes,
        MasterNo:req.body.MasterNo,
        Reward:req.body.Reward,
        Number:req.body.Number,

    });
    task.save()
    .catch((err) => console.log(err));
    res.json(('saved to db: ' + task));
    
})

app.post('/upload', function(req, res) {
  
  var imgData = req.body.imgData;
  if (imgData) {
      
      let base64Data = imgData.replace(/^data:image\/\w+;base64,/, " ");
      console.log(base64Data);
      let dataBuffer = new Buffer.from(base64Data, 'base64');
      //get now time 
      let saveUrl = "./client/src/images/" + (new Date()).getTime() + ".png";
      fs.writeFile(saveUrl, dataBuffer, function(err) {
          if (err) {
            console.log("save failed")
              res.send(err+"save failed");
          } else {
            const image = new Image({
              Title:req.body.Title,
              imageUrl:saveUrl.slice(12)
            })
            image.save()
            .catch((err) => console.log(err));
            res.json(('saved to db: ' + image));
            console.log("saved！")
      
          
          }
      });
  }
});

app.post('/findTask', function(req, res) {
  Task.find({},function (err, task){
    if(err) { 
      console.log("error")
              res.send(err+"error");
  }
    else if(!task)
    {
      res.send("not find");
    }
    else
    {
      res.json((task));
    }
  }




  )


});


app.post('/deleteTask', function(req, res) {
  var Title=req.body.Title;
  Task.deleteOne({Title:Title},function (err, task){
    if(err) { 
      console.log("error")
              res.send(err+"error");
  }
    else if(!task)
    {
      res.send("not find");
    }
    else
    {

      res.json((task));
    }
  }




  )


});

app.post('/moreInfo', function(req, res) {
  var Title=req.body.Title;
  Task.findOne({Title:Title},function (err, task){
    if(err) { 
      console.log("error")
              res.send(err+"error");
  }
    else if(!task)
    {
      res.send("not find");
    }
    else
    {

      res.json((task));
    }
  }

  )


});


app.post('/findImg', function(req, res) {
  var Title=req.body.Title;
  Image.findOne({Title:Title},function (err, image){
    if(err) { 
      console.log("error")
              res.send(err+"error");
  }
    else if(!image)
    {
      res.send("not find");
    }
    else
    {
      res.json((image));
    }
  }

  )


});


let port = process.env.PORT;
if (port == null || port == "") {
  port = 5000;
}

app.listen(port, (req,res)=>{
    console.log("Server is running successfullly!")
})
