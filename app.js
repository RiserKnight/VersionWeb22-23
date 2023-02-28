const express = require('express');
const routes = require('./routes/routes');
const {sequelize,info,eventRegistartion}=require('./models');
const cors = require('cors');
const  bodyParser = require('body-parser');
const passport = require('passport')
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const checkUserID = require('./controllers/functions/checkUserID.js');

require('./config/passport');
require('./models/session');
require('dotenv').config();

const app = express();

app.use(express.static(__dirname+"/public"));
app.set('view engine', 'ejs');
app.set('port', process.env.PORT);

// cors policy
app.use(cors());

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 30 * 24 * 60 * 60 * 1000, // 1 month
  },
  store: new SequelizeStore({
    db: sequelize,
    table: 'session',
 }),
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));
app.use(express.json());
app.use(routes);

  app.use(function (req, res, next) {
    res.status(404).send("Sorry can't find that!!")
  });


  app.listen(app.get('port'), async()=> {
   console.log(`Server started on port ${app.get('port')}`);
   await sequelize.authenticate();
    console.log("db connected"); 

    const infoI = await info.findOne({where:{infoID:101}});
    if(!infoI){
      const infoID=101;
      const purpose="userID";
      const dataT="Int";
      const value="2023000";
      await info.create({infoID,purpose,dataT,value})
    }
    // console.log(checkUserID.check("205121002"));
    // console.log(checkUserID.check("a@b.com"));
    // console.log(checkUserID.check("2051 21002"));
    // console.log(checkUserID.check("455ad"));
    // console.log(checkUserID.check("aaa@mmm"));
    // console.log(checkUserID.check("abb.com"));
    // var s = ' !"#$%&\'()*+,-./:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~';
    // var a='0123456789'
    // console.log(checkUserID.check(s));
    // console.log(checkUserID.check(a));

  });