const {user,eventRegistartion,info}=require('../models');
const dbFunct = require("./functions/database.js");
const bcrypt = require('bcrypt');

module.exports.adminHome = (req, res) => {

   res.render("admin/admin");
   
  }
module.exports.adminCall = async(req, res) => {
const adminCall=req.params.adminCall;
try {
  /******************************* full table *******************************/

if(adminCall==1) 
{
  const users= await dbFunct.getAllUsers();
  res.render("admin/tables",{users:users});
}
if(adminCall==2) 
{
  const users= await dbFunct.getAllUsersOTP();
  res.render("admin/tables",{users:users});
}
if(adminCall==3) 
{
  const users= await dbFunct.getAllUsersSession();
  res.render("admin/tables",{users:users});
}
if(adminCall==4) 
{
  const users= await dbFunct.getAllUsersRegistration();
  res.render("admin/tables",{users:users});
}
if(adminCall==5) 
{
  const users= await dbFunct.getAllUsersInfo();
  res.render("admin/tables",{users:users});
}
if(adminCall==6) 
{
  const users= await dbFunct.getAllUsersFeedback();
  res.render("admin/tables",{users:users});
}
if(adminCall==7) 
{
  const users= await dbFunct.getAllTempUsers();
  res.render("admin/tables",{users:users});
}

/******************************* ID specific table *******************************/

if(adminCall==11) 
{
  const userID=req.body.userID;
  const users= await dbFunct.getUser(userID);
  res.render("admin/tables",{users:users});
}
if(adminCall==12) 
{
  const userID=req.body.userID;
  const users= await dbFunct.getUserOTP(userID);
  res.render("admin/tables",{users:users});
}
if(adminCall==13) 
{
  const userID=req.body.userID;
  const users= await dbFunct.getUserEventRegistration(userID);
  res.render("admin/tables",{users:users});
}
if(adminCall==14) 
{
  const infoID=req.body.infoID;
  const users= await dbFunct.getInfo(infoID);
  res.render("admin/tables",{users:users});
}
if(adminCall==15) 
{
  const userID=req.body.userID;
  const users= await dbFunct.getUserFeedback(userID);
  res.render("admin/tables",{users:users});
}

/******************************* Update table *******************************/
if(adminCall==21) 
{
  const userID=req.body.userID;
  var userName=req.body.userName;
  var roll=req.body.roll;
  var email=req.body.email;
  var contact=req.body.contact;
  var university=req.body.university;
  var pass=req.body.pass;

  const existUser = await user.findOne({where:{userID}});
  if(!userName)userName=existUser.dataValues.userName;
  if(!roll)roll=existUser.dataValues.roll;
  if(!email)email=existUser.dataValues.email;
  if(!contact)contact=existUser.dataValues.contact;
  if(!university)university=existUser.dataValues.university;
  if(!pass)pass=existUser.dataValues.pass;
  else{
    const salt = await bcrypt.genSalt(10);
        pass  = await bcrypt.hash(pass, salt);
  }

  await user.update({userName,roll,email,contact,university,pass},{where:{userID}});

  const users= await dbFunct.getUser(userID);
  res.render("admin/tables",{users:users});
}

if(adminCall==22)
{
  const userID = req.body.userID;
  var E101=req.body.E101;
  var E102=req.body.E102;
  var E103=req.body.E103;
  var E104=req.body.E104;
  var E105=req.body.E105;
  var E106=req.body.E106;
  var E107=req.body.E107;
  var E108=req.body.E108;
  var E109=req.body.E109;
  var E110=req.body.E110;
  var E111=req.body.E111;

  const existUser = await eventRegistartion.findOne({where:{userID}});
  
  if(!E101)E101=existUser.dataValues.E101;
  if(!E102)E102=existUser.dataValues.E102;
  if(!E103)E103=existUser.dataValues.E103;
  if(!E104)E104=existUser.dataValues.E104;
  if(!E105)E105=existUser.dataValues.E105;
  if(!E106)E106=existUser.dataValues.E106;
  if(!E107)E107=existUser.dataValues.E107;
  if(!E108)E108=existUser.dataValues.E108;
  if(!E109)E109=existUser.dataValues.E109;
  if(!E110)E110=existUser.dataValues.E110;
  if(!E111)E111=existUser.dataValues.E111;

  await eventRegistartion.update({E101,E102,E103,E104,E105,E106,E107,E108,E109,E110,E111},{where:{userID}});

  const users= await dbFunct.getUserEventRegistration(userID);
  res.render("admin/tables",{users:users});
} 

if (adminCall==23) {
  const infoID = req.body.infoID;
  var purpose = req.body.purpose;
  var dataT = req.body.dataT;
  var value = req.body.value; 

  const existUser = await info.findOne({where:{infoID}});
  if(!purpose)purpose=existUser.dataValues.purpose;
  if(!dataT)dataT=existUser.dataValues.dataT;
  if(!value)value=existUser.dataValues.value;

  await info.update({purpose,dataT,value},{where:{infoID}})

  const users= await dbFunct.getInfo(infoID);
  res.render("admin/tables",{users:users});

}







} catch (error) {
  console.log(error);
}

}


  
    
    //    if(btID==5){
    //      const userID=parseInt(req.body.roll);
    //      const points=parseInt(req.body.points);
    //      await dbFunct.updateUserPoints(userID,points);
    //      const users= await dbFunct.getAllUsers();
    //      res.render("userTable",{users:users});
    //    }
  
    //   if(btID==7){
    //     const userID=parseInt(req.body.roll);
    //     const index=parseInt(req.body.index);
    //     const visit=parseInt(req.body.visit);
    //     await dbFunct.updateIndex1(userID,index);
    //     await dbFunct.updateVisit1(userID,visit);
    //     const users= await dbFunct.getUsersStage1();
    //     res.render("usersStageTable",{stage:"Stage 1",users:users});
    //   }
     
    //    if(btID==9)
    //    {
    //     userID=parseInt(req.body.roll);
    //     await dbFunct.updateUserPoints(userID,0);
    //     await dbFunct.updateUserStage(userID,1);
    //     await dbFunct.updateIndex1(userID,1);
    //     await dbFunct.updateVisit1(userID,0);
    //     await dbFunct.updateIndex2(userID,1);
    //     await dbFunct.updateVisit2(userID,0);
    //     await dbFunct.delStage1QList(userID);
    //     await dbFunct.delStage2QList(userID);
    //     await dbFunct.delStage3Submission(userID);
    //     await dbFunct.delSubmission(userID);
    //     const users= await dbFunct.getAllUsers();
    //     res.render("userTable",{users:users});
    //    }
     
    //    if(btID==14)
    //    {
    //      let submissions=[];
    //      qID=parseInt(req.body.qID);
    //      const submissionsRaw= await dbFunct.getAllSubmissionQ(qID);
    //      submissionsRaw.forEach((question)=>{
    //       submissions.push(question.dataValues);
    //      });
    //      res.render("submissionTable",{submissions:submissions});
    //    }
       
    //       });