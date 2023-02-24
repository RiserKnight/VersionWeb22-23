const {user,userOTP,eventRegistartion}=require('../models')
const dbFunct = require("./functions/database.js");
const emailFunct = require("./functions/welcomeMail.js");
const otpFunct = require("./functions/genOTP.js");
const bcrypt = require('bcrypt');
const emailFunct1 = require("./functions/otpMail.js");

require('dotenv').config();


 /*********************************************Home Get**********************************************/
module.exports.home = (req, res) => {

  try {
     //Just to remember how to store data
  if(req.session.tempUser)
  {
    const date = new Date();
    const validTime =parseInt(req.session.tempUser.userValid);
    const currTime = parseInt(date.getTime()+330*60*1000);
    if(currTime>validTime) req.session.tempUser=null;

  }

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
  var userNew,code="000";

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

   /*******************************************ForgotPass Post********************************************/

   module.exports.forget_password = async (req, res) => {

    var userNew,code="000",validTime,currTime;

    try {

      const userID = req.body.userID;
      userNew = await user.findOne({where:{userID:userID}});

      if(userNew)
      {
        userNew = await userOTP.findOne({where:{userID:userID}});
        if(userNew)
        {
          userNew = userNew.dataValues;
          const date = new Date();
           validTime =parseInt(userNew.validTill);
           currTime = parseInt(date.getTime()+330*60*1000);
        }
       

        if(userNew!=null && currTime<validTime ) code="100";
        
        else if(userNew)
        {
          userNew = await userOTP.findOne({where:{userID:userID}});
          await userNew.destroy();
        }

        if(code!="100")
        {
          userNew = await user.findOne({where:{userID:userID}});
          userNew = userNew.dataValues;

          const OTP = otpFunct.genOTP();

          const salt = await bcrypt.genSalt(10);
          const otpHash  = await bcrypt.hash(OTP, salt);

          const date = new Date();
          const validTill = date.getTime() + 335*60*1000;

          validTime=validTill;

          await userOTP.create({userID,otpHash,validTill});

          const data ={userName: userNew.userName,OTP: OTP};
          emailFunct1.mail(req,res,userNew.email,data);
          code="100";
        }

      }
      else code="200"



    } catch (error) {
      code="400";
      console.log(error);
    }

    finally{
      if(code=="100")
      {
        req.session.tempUser={
          "userID":userNew.userID,
          "userValid":validTime
        }
        res.json({"verifyOTP": "true","userID": userNew.userID,"code": code});
      }
      
      
      else if(code=="200")res.json({"verifyOTP": "false","msg": "User doesn't exist","code": code});
      else res.json({"verifyOTP": "false","msg": "Unexpected Error","code": code});
    }
  
  }

     /*******************************************VerifyOTP Post********************************************/

     async function checkOTP(OTP, hash) {
  
      const match = await bcrypt.compare(OTP,hash);
      return match;
  }

    module.exports.verify_otp = async (req, res) => {
      var userNew,code = "000",validTime,currTime;
      const date = new Date();
      currTime = parseInt(date.getTime()+330*60*1000);

    try {

      const userID=req.session.tempUser.userID;
      const OTP=req.body.OTP;
      const pass=req.body.pass;
      userNew = await userOTP.findOne({where:{userID:userID}});

      if(userNew)
      {
        validTime =parseInt(userNew.dataValues.validTill);
        if(currTime>validTime) 
        {
          code="250";
          req.session.tempUser=null;
        }
        
      }
      else code="200";

      if(code!="250" && code!="200")
      {
        const result = await checkOTP(OTP,userNew.dataValues.otpHash);

        if(result){
            const salt = await bcrypt.genSalt(10);
            const passH = await bcrypt.hash(pass, salt);
            await user.update({pass: passH},{where:{userID:userID}});
            code="100";
            userNew = await userOTP.findOne({where:{userID:userID}});
            await userNew.destroy();
        }
        else code="300";

      }

    } catch (error) {
      code="400";
      console.log(error);
    }
    finally{

      if(code=="100")res.json({"success": "true","msg": "Password Changed Succesfully","code": code});
      else if(code=="200")res.json({"success": "false","msg": "Invalid Request","code": code});
      else if(code=="250")res.json({"success": "false","msg": "OTP Timeout","code": code});
      else if(code=="300")res.json({"success": "false","msg": "Wrong OTP","code": code});
      else res.json({"success": "false","msg": "Unexpected Error","code": code});
    }


    }
     /*******************************************Event Register********************************************/

     module.exports.registerEvent = async (req, res) => {
     var code = "000";
    try {

      const userID=req.user.userID;
      const eventID="E"+req.params.eventID;
      console.log(eventID);

      let updateValues = {};
      updateValues[eventID] = true;
      
      userNew = await eventRegistartion.findOne({where:{userID:userID}});

      if(!userNew) await eventRegistartion.create({userID});
      
      await eventRegistartion.update(updateValues,{where:{userID}});
      code="100";

    } catch (error) {
      code="400";
      console.log(error);
    }
    finally{

      if(code=="100")res.json({"success": "true","msg": "Registered Succesfully","code": code});
      else res.json({"success": "false","msg": "Unexpected Error","code": code});
    }


    }