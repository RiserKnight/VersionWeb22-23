const { Router } = require('express');
const passport = require('passport');

const authController = require('../controllers/authController');
const adminPanel = require('../controllers/adminPanel');
const appBackEnd = require('../controllers/appBackEnd');
const pageRenders = require('../controllers/pageRenders');
const authMiddleware = require('../controllers/authMiddleware');


const router = Router();

router.get('/',authController.home);
router.post('/register', authController.signup_post);
router.get('/login', authController.login_get);
router.post('/forgot_regno',authController.forgotUserID_post);
router.post('/forgot_pass',authController.forget_password);
router.post('/verifyOTP',authController.verify_otp);
router.post('/register/event/:eventID',authMiddleware.isAuth,authController.registerEvent);
router.get('/verifyAccount',authController.verifyAccount);

router.post('/login',passport.authenticate('local', { failureRedirect: '/login-failure', successRedirect: '/' }));
router.get('/login-failure',authController.loginFail);
router.get('/logout', authController.logout);

router.get('/register', pageRenders.signup_get);
router.get('/teams',pageRenders.teams_get);
router.get('/theme',pageRenders.theme_get);
router.get('/about-us',pageRenders.about_get);
router.get('/contact-us',pageRenders.contact_get);
router.get('/events',pageRenders.events_get);
router.get('/forgot-reg',pageRenders.forgotUserID_get);
router.get('/forgot-pass',pageRenders.forgotPass_get);
router.get('/verifyOTP',pageRenders.verifyOTP_get);

router.post('/app/login',appBackEnd.app_login);
router.post('/app/register',appBackEnd.app_register);
router.post('/app/forgot_regno',appBackEnd.app_forget_userID);
router.post('/app/forgot_pass',appBackEnd.app_forget_password);
router.post('/app/verifyOTP',appBackEnd.app_verify_otp);
router.post('/app/feedback',appBackEnd.app_feedback);
router.post('/app/getFeedback',appBackEnd.app_getFeedbacks);
router.post('/app/getEventData',appBackEnd.app_getEventData);
router.post('/app/getUserRegisterData',appBackEnd.app_getUserEventData);
router.post('/app/userEventReg/:eventID',appBackEnd.app_postUserRegData);
router.post('/checkRegID',appBackEnd.checkRegistration);

router.get('/Version@2023/admin',authMiddleware.isAdmin,adminPanel.adminHome);
router.post('/Version@2023/admin/:adminCall',authMiddleware.isAdmin,adminPanel.adminCall);

module.exports = router;



//app.get('/user/google', function(req, res, next) )
