const {user}=require('../models')
const bcrypt = require('bcrypt');
const dbFunct = require("../database.js");
const emailFunct = require("./mail.js");


// controller actions
module.exports.signup = (req, res) => {
    res.send('signup page');
  }
  
  module.exports.login_get = (req, res) => {
    res.send('login page');
  }
  
  module.exports.register = async (req, res) => {


//console.log(req.body);
    const name=req.body.name;
    const email=req.body.email;
    const contact=req.body.contact;
    const university=req.body.university;
    const pass=req.body.pass;
    var userNew;
    try{
      userNew=await dbFunct.storeUser(name,email,contact,university,pass);
      const data ={name: name,reg: userNew.dataValues.userID}
      emailFunct.mail(email,data);
    }
    catch(err){
      console.log(err)
    }

    
    /*req.session.user={
      userID:userID,
      userName:name,
      userEmail:email,
      status:true
    }*/
    res.send("Done "+userNew.dataValues.userID);
    //res.redirect("/");
   
  }
  
  module.exports.login_post = async (req, res) => {

    console.log(req.body);
    const userID=req.body.userID;
    const passIn=req.body.pass;
    
    const pass=await user.findOne({where:{userID:userID}});

    bcrypt.compare(passIn, pass.dataValues.pass, async(err, result)=> {
      
      if(result){
        //const user=await dbFunct.getUser(userID);
        
        /*req.session.user={
          userID:userID,
          userName:user.name,
          userEmail:user.email,
          status:true,
        }*/
        res.send("Logged In")
        //res.redirect("/")
      }
      else
      res.send("Not Logged In")
      //res.redirect("/login")
  });
  
  }
  
  module.exports.logout = (req, res) => {
    res.send('logout');
  }