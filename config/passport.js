const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const checkUserID = require('../controllers/functions/checkUserID.js');


const {user}=require('../models')
const customFields = {
    usernameField: 'userID',
    passwordField: 'passIN'
};

const verifyCallback = (userID, passIN, done) => {
    var column;
    if (checkUserID.check(userID)) 
    {
        column = 'userID'
        if(userID.length > 9)userID='12345678'
    }
    else column = 'email';
    console.log(column);

    let whereCondition = {};
    whereCondition[column] = userID;
   
    user.findOne({where:whereCondition})
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

