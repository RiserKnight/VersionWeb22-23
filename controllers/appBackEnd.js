const {user}=require('../models')
const dbFunct = require("../database.js");
const emailFunct = require("./mail.js");
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
    const app_key=req.body.app_key;
    if(process.env.APP_KEY!=app_key) {
      res.json({"success": "false","msg":"Unauthorized","code":code});
      return 0;
    }
  
  try {
  
    const email = req.body.email;
    const contact = req.body.contact;
    const roll = req.body.roll;
  
    userNew = await user.findOne({where:{email:email}});
  
    if(userNew){
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