const express = require("express");
const bodyParser = require("body-parser");
const request =require("request");
const https = require("https");

const app = express()

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));


app.get("/", function(req,res){
  res.sendFile(__dirname +"/signup.html")
})


app.get("/", function(req,res){
  res.send("Server is running")
})

app.post("/",function(req,res){
  const firstName=req.body.fname;
  const lastName=req.body.lname;
  const email=req.body.email;

const data = {
    members:[
      {
        email_address:email,
        status:"suscribed",
        merge_field:{
          FNAME: firstName,
          LNAME: lastName
        }
      }
    ]
  };
const jsonData = JSON.stringify(data);
 console.log(firstName,lastName,email);
const url = " https://us9.api.mailchimp.com/3.0/lists/b9d3c1c8e8";
const options = {
  method: "POST",
  auth: "ankit:ddd816faa0dba5548c245533b459eab7-us9"
}

const request = https.request(url,options,function(response){
  if(response.statusCode ==200){

      res.sendFile(__dirname+"/success.html")

  }else{
    res.sendFile(__dirname+"/failure.html")
  }
response.on("data",function(data){
  console.log(JSON.parse(data));
});
});
request.write(jsonData);
request.end();

})
app.post("/failure",function(req,res){
  res.redirect("/")
})

app.listen(3000,function(){
  console.log("Server is running on port 3000")
})
//ddd816faa0dba5548c245533b459eab7-us9 api keys
//b9d3c1c8e8 List Id or audiance Id
