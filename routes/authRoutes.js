const { Router } = require('express');
const authController = require('../controllers/authController');
const passport = require('passport');
//const isAuth = require('../controllers/authMiddleware').isAuth;

const router = Router();

router.get('/',authController.home);
router.get('/register', authController.signup_get);
router.post('/register', authController.signup_post);
router.get('/login', authController.login_get);

router.post('/login',passport.authenticate('local', { failureRedirect: '/login-failure', successRedirect: '/' }));
router.get('/login-failure',authController.loginFail);
router.get('/logout', authController.logout);


module.exports = router;



//app.get('/user/google', function(req, res, next) )