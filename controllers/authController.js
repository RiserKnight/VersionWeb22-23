const {user}=require('../models')
const dbFunct = require("./functions/database.js");
const emailFunct = require("./functions/welcomeMail.js");
const otpFunct = require("./functions/genOTP.js");

require('dotenv').config();


 /*********************************************Home Get**********************************************/
module.exports.home = (req, res) => {

  try {
     //Just to remember how to store data
  if(req.session.count)req.session.count=req.session.count+1;
  else req.session.count=1;

  res.locals.user =req.user;
  res.render("home");
    
  } catch (error) {
    console.log(error);
  }
 
}


  /*********************************************Login Get**********************************************/
  module.exports.login_get = (req, res) => {

    try {
    res.locals.user =req.user;
    if(!(req.session.failStatus))req.session.failStatus=false;
    res.locals.failStatus=req.session.failStatus;
    req.session.failStatus=false;
    res.render("login");
    } catch (error) {
      console.log(error);
    }

  }
  
  /*******************************************SignUp Post********************************************/
  module.exports.signup_post = async (req, res) => {

try {


  res.locals.user =req.user;
  const userName=req.body.userName;
  const roll=req.body.roll;
  const email=req.body.email;
  const contact=req.body.contact;
  const university=req.body.university;
  const pass=req.body.pass;
  var userNew;
  const emailN = await user.findOne({where:{email:email}});
  if(!emailN){
    try{
      userNew=await dbFunct.storeUser(userName,roll,email,contact,university,pass);
      const data ={userName: userNew.userName,reg: userNew.userID};
      emailFunct.mail(req,res,email,data);
      console.log(userNew);
    }
    catch(err){
      console.log(err);
    }
    res.json({"code":"100","msg":"User Registered Successfully\n\n!! Use Registration number sent to your email for login!! "});

  }
  else{
    res.json({"code":"200","msg":"User Email already Exist"});
  }


  
} catch (error) {
  console.log(error);
}
   
  }
  
  module.exports.loginFail = async (req, res) => {
    res.locals.user =req.user;
    req.session.failStatus = true;
    res.redirect("/login"); 
  }

  
  module.exports.logout = (req, res,next) => {

    try {
      
      req.logout(function(err) {
        if (err) { return next(err); }
        res.redirect('/');
      });

    } catch (error) {
      console.log(error);
    }
    
    
  }

  
  module.exports.randi = (req, res,next) => {
    const OTP = otpFunct.genOTP();
    res.send(OTP);
    
  }
// const eventD = new Date(2023,2,18,9,10,11);
// eventD.setMilliseconds(12);
// console.log(eventD.getTime())
//

 /*******************************************ForgotID Post********************************************/

 module.exports.forgotUserID_post=async(req,res)=>{
  res.locals.user =req.user;
  var userNew;

  try {

    const email = req.body.email;
    const contact = req.body.contact;
    const roll = req.body.roll;
  
    userNew = await user.findOne({where:{email:email}});
  
    if(userNew){
      userNew = userNew.dataValues;
      if(userNew.contact===contact&&userNew.roll===roll) code="100";
      else code="200";
      }
    else code="200"; 
    
  } catch (error) {
    code="400";
    console.log(error);
  }
  
  finally{
    if(code=="100")res.json({"success": "true","userID": userNew.userID,"code": code});
    else if(code=="200")res.json({"success": "false","msg": "Invalid Information","code": code});
    else res.json({"success": "false","msg": "Unexpected Error","code": code});
  }
  
  }