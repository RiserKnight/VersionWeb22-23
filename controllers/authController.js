const {user}=require('../models')
const dbFunct = require("../database.js");
const emailFunct = require("./mail.js");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
require('dotenv').config();

// controller actions

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

module.exports.signup_get = (req, res) => {
  res.locals.user =req.user;
  res.render("signup");
  }

  module.exports.teams_get=(req,res)=>{
  res.locals.user =req.user;
  res.render("teams");
  }

  module.exports.about_get=(req,res)=>{
  res.locals.user =req.user;
  res.render("about");
  }

  module.exports.contact_get=(req,res)=>{
  res.locals.user =req.user;
  res.render("contact");
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
      const data ={name: userName,reg: userNew.userID};
      emailFunct.mail(req,res,email,data);
      console.log(userNew);
    }
    catch(err){
      console.log(err);
    }
    res.json({"code":"100","msg":"User Registered Successfully"});

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

/*********************************************App Backend**********************************************/

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
      const data ={name: userNew.userName,reg: userNew.userID};
      emailFunct.mail(req,res,userNew.email,data);
      res.json({"success": "true","userID": userNew.userID,"code":code});
    }
    else if(code==="200") res.json({"success": "false","msg":"User Email already Exist","code":code});
    else if(code==="300") res.json({"success": "false","msg":"Validation Error","code":code});
    else res.json({"success": "false","msg":"Unxepected error","code":"400"});

  }
 
}

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


// const eventD = new Date(2023,2,18,9,10,11);
// eventD.setMilliseconds(12);
// console.log(eventD.getTime())
//