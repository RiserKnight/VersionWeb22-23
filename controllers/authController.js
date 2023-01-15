const {user}=require('../models')
const bcrypt = require('bcrypt');
const dbFunct = require("../database.js");
const jwt = require('jsonwebtoken');


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
      userNew=await dbFunct.storeUser(name,email,contact,university,pass)
    }
    catch(err){
      console.log(err)
    }

    if(userNew)
    {
     const obj={"success": "true","userID": userNew.dataValues.userID}
     res.json(obj)
    }else{
      const obj={"success": "false"}
      res.json(obj);
    }
  
   
  }
  
  module.exports.login_post = async (req, res) => {

    console.log(req.body);
    const userID=req.body.userID;
    const passIn=req.body.pass;
    
    const pass=await user.findOne({where:{userID:userID}});

    const obj={"success":"false",
    "message":"Credential is not valid",
    "data":{
             "token":"",
             "userID": "",
             "name":"",
             "university":""
    }

    }

    bcrypt.compare(passIn, pass.dataValues.pass, async(err, result)=> {
      const maxAge = 3 * 24 * 60 * 60;
      if(result){
        obj.data.token=jwt.sign({ userID }, 'Version23', {expiresIn: maxAge});
        obj.data.userID=pass.dataValues.userID;
        obj.data.name=pass.dataValues.name;
        obj.data.university=pass.dataValues.university;
        obj.success="true";
        obj.message="Credential is valid"
        res.json(obj);
      }

      else
      res.json(obj);
      
  });
  
  }
  
  module.exports.logout = (req, res) => {
    res.send('logout');
  }