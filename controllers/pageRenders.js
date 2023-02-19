

  
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

    module.exports.events_get=(req,res)=>{
    res.locals.user =req.user;
    res.render("events");
    }

    module.exports.forgotUserID_get=(req,res)=>{
    res.locals.user =req.user;
    res.render("forgotUserID");
    }