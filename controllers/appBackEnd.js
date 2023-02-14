const {user,userOTP}=require('../models')
const dbFunct = require("../database.js");
const emailFunct = require("./functions/welcomeMail.js");
const emailFunct1 = require("./functions/otpMail.js");
const otpFunct = require("./functions/genOTP.js");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

/*********************************************App Register**********************************************/

module.exports.app_register = async (req, res) => {

    var userNew,code="000";
    try 
    {
      const userName=req.body.userName;
      const roll=req.body.roll;
      const email=req.body.email;
      const contact=req.body.contact;
      const university=req.body.university;
      const pass=req.body.pass;
      const app_key=req.body.app_key;
  
      if(process.env.APP_KEY!=app_key) 
    {
      res.json({"success": "false","msg":"Unauthorized","code":code});
      return 0;
    }
  
      
      const emailN = await user.findOne({where:{email:email}});
      if(!emailN){
          userNew=await dbFunct.storeUser(userName,roll,email,contact,university,pass);
         
          if (userNew.message)code="300";
          else code="100";

      }
      else code="200";  
    } 
    
    catch (error) 
    {
      console.log(error);
    }
  
    finally
    {
      if(code==="100")
      {
        const data ={userName: userNew.userName,reg: userNew.userID};
        emailFunct.mail(req,res,userNew.email,data);
        res.json({"success": "true","userID": userNew.userID,"code":code});
      }
      else if(code==="200") res.json({"success": "false","msg":"User Email already Exist","code":code});
      else if(code==="300") res.json({"success": "false","msg":"Validation Error","code":code});
      else res.json({"success": "false","msg":"Unxepected error","code":"400"});
  
    }
   
  }
  
  /*********************************************App Login**********************************************/

  module.exports.app_login = async (req, res) => {
    var code="000";
  
    const obj={"success":"false",
    "code":"200",
    "message":"Credential is not valid",
    "data":{
             "token":"",
             "userID": "",
             "name":"",
             "university":""
    }
    }
    try {
    const userID=req.body.userID;
    const passIn=req.body.pass;
    const app_key=req.body.app_key;
  
    if(process.env.APP_KEY!=app_key) {
      res.json({"success": "false","msg":"Unauthorized","code":code});
      return 0;
    }
  
    const pass=await user.findOne({where:{userID:userID}});
  
    if(!pass){
      res.json(obj);
      return 0;
    }
    
    bcrypt.compare(passIn, pass.dataValues.pass, async(err, result)=> {
      const maxAge = 3 * 24 * 60 * 60*1000;
      if(result){
        obj.data.token=jwt.sign({ userID }, 'Version23', {expiresIn: maxAge});
        obj.data.userID=pass.dataValues.userID;
        obj.data.name=pass.dataValues.userName;
        obj.data.university=pass.dataValues.university;
        obj.success="true";
        obj.message="Credential is valid"
        obj.code="100";
        res.json(obj);
        return 0;
      }  
      else res.json(obj);
  });
  
    } catch (error) {
      console.log(error);
    }
    
  }
  
  /*********************************************App Forget userID**********************************************/

  module.exports.app_forget_userID = async (req, res) => {
    var code = "000",userNew;
  
  try {

    const app_key=req.body.app_key;
    if(process.env.APP_KEY!=app_key) {
      res.json({"success": "false","msg":"Unauthorized","code":code});
      return 0;
    }
  
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

    /*********************************************App Forget Password**********************************************/

    module.exports.app_forget_password = async (req, res) => {

      var userNew,code = "000",validTime,currTime;

      try {

      const app_key=req.body.app_key;
      if(process.env.APP_KEY!=app_key) {
        res.json({"success": "false","msg":"Unauthorized","code":code});
        return 0;
      }

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
        if(code=="100")res.json({"verifyOTP": "true","userID": userNew.userID,"code": code});
        else if(code=="200")res.json({"verifyOTP": "false","msg": "User doesn't exist","code": code});
        else res.json({"verifyOTP": "false","msg": "Unexpected Error","code": code});
      }
    
    }

    /*********************************************App Verify OTP**********************************************/
    async function checkOTP(OTP, hash) {
  
      const match = await bcrypt.compare(OTP,hash);
      return match;
  }

    module.exports.app_verify_otp = async (req, res) => {
      var userNew,code = "000",validTime,currTime;
      const date = new Date();
      currTime = parseInt(date.getTime()+330*60*1000);

    try {
      
      const app_key=req.body.app_key;
      if(process.env.APP_KEY!=app_key) {
        res.json({"success": "false","msg":"Unauthorized","code":code});
        return 0;
      }

      const userID=req.body.userID;
      const OTP=req.body.OTP;
      const pass=req.body.pass;
      userNew = await userOTP.findOne({where:{userID:userID}});

      if(userNew)
      {
        validTime =parseInt(userNew.dataValues.validTill);
        if(currTime>validTime) code="250";
      }
      else code="200";

      if(code!="250" && code!="200")
      {
        const result = await checkOTP(OTP,userNew.dataValues.otpHash)
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
