const express = require('express');
const authRoutes = require('./routes/authRoutes');
const {sequelize,info}=require('./models');
const cors = require('cors');
const  bodyParser = require('body-parser');

require('dotenv').config();

const app = express();

app.use(express.static(__dirname+"/public"));
app.set('view engine', 'ejs');
app.set('port', process.env.PORT);

// cors policy
app.use(cors());

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));
app.use(express.json());
app.use(authRoutes);

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
    
  });