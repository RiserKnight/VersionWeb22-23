const {eventRegistartion}=require('../models')

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

    module.exports.events_get=async(req,res)=>{
    res.locals.user =req.user;
    if(req.user){
      const userID = req.user.userID;
      const registerData = await eventRegistartion.findOne({where:{userID}});
      res.locals.registerData =registerData.dataValues;
    }
    
    res.render("events");
    }

    module.exports.forgotUserID_get=(req,res)=>{
    res.locals.user =req.user;
    res.render("forgotUserID");
    }
    
    module.exports.forgotPass_get=(req,res)=>{
    res.locals.user =req.user;
    res.render("forgotPass");
    }

    module.exports.verifyOTP_get=(req,res)=>{
    res.locals.user =req.user;
    console.log(req.session.tempUser);
    if(Object.keys(req.session.tempUser).length === 0) res.redirect("/");
    else
    {
      const date = new Date();
      const validTime =parseInt(req.session.tempUser.userValid);
      const currTime = parseInt(date.getTime()+330*60*1000);
      if(currTime>validTime)
      {
        req.session.tempUser={};
        res.redirect("/login")
      }
      else res.render("verifyOTP");
    }

      }