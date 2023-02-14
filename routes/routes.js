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

router.post('/login',passport.authenticate('local', { failureRedirect: '/login-failure', successRedirect: '/' }));
router.get('/login-failure',authController.loginFail);
router.get('/logout', authController.logout);

router.get('/register', pageRenders.signup_get);
router.get('/teams',pageRenders.teams_get);
router.get('/about-us',pageRenders.about_get);
router.get('/contact-us',pageRenders.contact_get);


router.post('/app/login',appBackEnd.app_login);
router.post('/app/register',appBackEnd.app_register);
router.post('/app/forgot_regno',appBackEnd.app_forget_userID);
router.post('/app/forgot_pass',appBackEnd.app_forget_password);
router.post('/app/verifyOTP',appBackEnd.app_verify_otp);

router.get('/admin',authMiddleware.isAdmin,adminPanel.adminHome);

module.exports = router;



//app.get('/user/google', function(req, res, next) )