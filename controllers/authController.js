const {user}=require('../models')
const dbFunct = require("../database.js");
const emailFunct = require("./mail.js");



// controller actions

module.exports.home = (req, res) => {
  //Just to remember how to store data
  if(req.session.count)req.session.count=req.session.count+1;
  else req.session.count=1;

  res.locals.user =req.user;
  res.render("home");
}

module.exports.signup_get = (req, res) => {
  res.locals.user =req.user;
  res.render("signup");
  }
  
  module.exports.login_get = (req, res) => {
    res.locals.user =req.user;
    if(!(req.session.failStatus))req.session.failStatus=false;
    res.locals.failStatus=req.session.failStatus;
    req.session.failStatus=false;
    res.render("login");
  }
  
  module.exports.signup_post = async (req, res) => {
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
      res.redirect("/");

    }
    else{
      res.json({"msg":"User Email already Exist"});
    }
    
  
   
  }
  
  module.exports.loginFail = async (req, res) => {
    res.locals.user =req.user;
    req.session.failStatus = true;
    res.redirect("/login"); 
  }

  
  module.exports.logout = (req, res,next) => {
    req.logout(function(err) {
      if (err) { return next(err); }
      res.redirect('/');
    });
    
  }