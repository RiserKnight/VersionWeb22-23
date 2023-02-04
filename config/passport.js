const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

const handleErrors = (err) => {
    console.log(err.message, err.code);
    let errors = { email: '', password: '' };
  
    // incorrect email
    if (err.message ===  'Incorrect Registartion number.') {
      errors.email = 'That user is not registered';
    }
  
    // incorrect password
    if (err.message === 'Incorrect Password.') {
      errors.password = 'That password is incorrect';
    }
  
    // duplicate email error
    if (err.code === 11000) {
      errors.email = 'that email is already registered';
      return errors;
    }
  
    // validation errors
    if (err.message.includes('user validation failed')) {
      // console.log(err);
      Object.values(err.errors).forEach(({ properties }) => {
        // console.log(val);
        // console.log(properties);
        errors[properties.path] = properties.message;
      });
    }
  
    return errors;
  }

const {user}=require('../models')
const customFields = {
    usernameField: 'userID',
    passwordField: 'passIN'
};

const verifyCallback = (userID, passIN, done) => {
  
   
    user.findOne({where:{userID:userID}})
        .then((user) => {

            if (!user) { return done(null, false,{ message: 'Incorrect Registartion number.' }) }
            
            bcrypt.compare(passIN, user.dataValues.pass, async(err, result)=> {
                console.log("Result: "+result);
                if (result) {
                    return done(null, user.dataValues);
                } else {
                    return done(null, false,{ message: 'Incorrect Password.' });
                }
            });               
        })
        .catch((err) => {   
            done(err);
        });

}

const strategy  = new LocalStrategy(customFields, verifyCallback);

passport.use(strategy);

//serialize sets the userID to req.session.passport.user
passport.serializeUser((user, done) => {
    done(null, user.userID);
});

//just after that userID is retrieved from req.session.passport.user and user is set to req.user

passport.deserializeUser((userID, done) => {
    user.findOne({where:{userID:userID}})
        .then((user) => {
            const {userID,userName} = user;

            done(null, {userID,userName});
        })
        .catch(err => done(err))
});

