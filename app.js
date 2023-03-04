const express = require('express');
const routes = require('./routes/routes');
const {sequelize,info,eventRegistartion}=require('./models');
const cors = require('cors');
const  bodyParser = require('body-parser');
const passport = require('passport')
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const dbFunct = require("./controllers/functions/database.js");


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
    // var obj1={"userID":2023007,"E101":false,"E102":false,"E103":false,"E104":false,"E105":false,"E106":false,"E107":false,"E108":false,"E109":false,"E110":false};
    // var obj2={"userID":2023008,"E101":false,"E102":false,"E103":false,"E104":false,"E105":false,"E106":false,"E107":false,"E108":false,"E109":false,"E110":false};
    // var obj3={"userID":2023009,"E101":false,"E102":false,"E103":false,"E104":false,"E105":false,"E106":false,"E107":false,"E108":false,"E109":false,"E110":false};
    // var obj4={"userID":2023011,"E101":false,"E102":false,"E103":false,"E104":false,"E105":false,"E106":false,"E107":false,"E108":false,"E109":false,"E110":false};
    // await dbFunct.getListOfEvent("E101");
    // await eventRegistartion.create(obj1);
    // await eventRegistartion.create(obj2);
    // await eventRegistartion.create(obj3);
    // await eventRegistartion.create(obj4);
    // const userList=await dbFunct.getListOfEvent("E101");
    // console.log(userList);
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