const {user,eventRegistartion,info,tempUser,userOTP,session}=require('../models');
const dbFunct = require("./functions/database.js");
const bcrypt = require('bcrypt');
const ExcelJS = require('exceljs');
const fs = require('fs');
const path = require('path');
const { log } = require('console');

module.exports.adminHome = (req, res) => {

   res.render("admin/admin");
   
  }


module.exports.readDirectory = (req, res) => {
  const directoryPath = './sheets';
  var files1=[];
  if(!fs.existsSync(directoryPath))
  {
   fs.mkdirSync(directoryPath);
  }

  fs.readdir(directoryPath, (err, files) => {
    if (err) {
      console.error('Error reading directory:', err);
      return;
    }
    console.log(files);
    res.render("admin/files",{users:files});
  });
}

  module.exports.download = (req, res) => {
    const fileName = req.params.fileName;
    const filePath = path.join('./sheets/'+fileName);
    
  
    fs.readFile(filePath, (err, data) => {
      if (err) {
        console.error('Error reading file:', err);
        res.status(500).send('Error reading file');
        return;
      }
  
      res.set({
        'Content-Type': 'application/octet-stream',
        'Content-Disposition': `attachment; filename=${fileName}`,
      });
  
      res.send(data);
    });
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
/******************************* Search Record *******************************/
if(adminCall==31)
{
  search={};
   const userID1=req.body.userID1;
   const userID2=req.body.userID2;
   const userID3=req.body.userID3;
   const inputOpt1 =req.body.inputOpt1;
   const inputOpt2 =req.body.inputOpt2;
   const inputOpt3 =req.body.inputOpt3;
   if(userID1)search[inputOpt1] = userID1;
   if(userID2)search[inputOpt2] = userID2;
   if(userID3)search[inputOpt3] = userID3;

  const users= await dbFunct.getUsers(search);
  res.render("admin/tables",{users:users});
}
if(adminCall==32)
{
  search={};
   const userID1=req.body.userID1;
   const userID2=req.body.userID2;
   const userID3=req.body.userID3;
   const inputOpt1 =req.body.inputOpt1;
   const inputOpt2 =req.body.inputOpt2;
   const inputOpt3 =req.body.inputOpt3;
   if(userID1)search[inputOpt1] = userID1;
   if(userID2)search[inputOpt2] = userID2;
   if(userID3)search[inputOpt3] = userID3;

  const users= await dbFunct.getTempUsers(search);
  res.render("admin/tables",{users:users});
}
if(adminCall==33)
{
   search={};
   const userID1=req.body.userID1;
   const userID2=req.body.userID2;
   const userID3=req.body.userID3;
   const inputOpt1 =req.body.inputOpt1;
   const inputOpt2 =req.body.inputOpt2;
   const inputOpt3 =req.body.inputOpt3;
   if(userID1)search[inputOpt1] = userID1;
   if(userID2)search[inputOpt2] = userID2;
   if(userID3)search[inputOpt3] = userID3;

  const users= await dbFunct.getUserOTPs(search);
  res.render("admin/tables",{users:users});
}
/******************************* Delete Record *******************************/
if(adminCall==51) 
{
  const userID=req.body.userID;
  const user = await user.findOne({where:{userID:userID}});
  user.destroy();
  const users= await dbFunct.getAllUsers();
  res.render("admin/tables",{users:users});
}
if(adminCall==52) 
{
  const userID=req.body.userID;
  const user = await tempUser.findOne({where:{tempID:userID}});
  user.destroy();
  const users= await dbFunct.getAllTempUsers();
  res.render("admin/tables",{users:users});
}
if(adminCall==53) 
{
  const userID=req.body.userID;
  const user = await userOTP.findOne({where:{tempID:userID}});
  user.destroy();
  const users= await dbFunct.getAllUsersOTP();
  res.render("admin/tables",{users:users});
}
if(adminCall==54) 
{
  const userID=req.body.userID;
  const user = await session.findOne({where:{sid:userID}});
  user.destroy();
  const users= await dbFunct.getAllUsersSession();
  res.render("admin/tables",{users:users});
}
if(adminCall==55) 
{
  const userID=req.body.userID;
  const user = await eventRegistartion.findOne({where:{userID:userID}});
  user.destroy();
  const users= await dbFunct.getAllUsersOTP();
  res.render("admin/tables",{users:users});
}
if (adminCall==61) 
{
  const eventID=req.body.userID;
  const userList=await dbFunct.getListOfEvent(eventID);
  var userDataList=[];
  for (let index = 0; index < userList.length; index++) {
    const element = userList[index];
    console.log(element);
   const userData = await user.findOne({where:{userID:element},attributes: ['userID','userName','email','contact','university','roll']});
   if(userData){
   const obj ={"Serial":index+1,"userID":userData.dataValues.userID,"userName":userData.dataValues.userName,
   "email":userData.dataValues.email,"contact":userData.dataValues.contact,"university":userData.dataValues.university,
   "roll":userData.dataValues.roll};
   userDataList.push(obj);
  }
}
  res.render("admin/tables",{users:userDataList});
  
}
if(adminCall==62)
{
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet('My Sheet');

  worksheet.columns = [
    { header: 'Registration ID', key: 'userID' },
    { header: 'Name', key: 'userName' },
    { header: 'Email Address', key: 'email' },
    { header: 'Mobile', key: 'contact' },
    { header: 'University', key: 'university' },
    { header: 'Roll Number', key: 'roll' },
  ];
  
  const eventID=req.body.userID;
  const userList=await dbFunct.getListOfEvent(eventID);

  for (let index = 0; index < userList.length; index++) {
    const element = userList[index];
    console.log(element);
   const userData = await user.findOne({where:{userID:element},attributes: ['userID','userName','email','contact','university','roll']});
   if(userData){
   worksheet.addRow(userData.dataValues);
  }
}
  workbook.xlsx.writeFile('./sheets/'+eventID+'_Registered_User.xlsx')
  res.redirect("/Version@2023/admin")
}
if(adminCall==63)
{
  let users=[];
   const demo=await user.findAll({attributes: ['userID','userName','email','contact','university','roll']});
   demo.forEach(user => {
       users.push(user.dataValues);
   });
   res.render("admin/tables",{users:users});

}
if(adminCall==64)
{
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet('My Sheet');
  worksheet.columns = [
    { header: 'Registration ID', key: 'userID' },
    { header: 'Name', key: 'userName' },
    { header: 'Email Address', key: 'email' },
    { header: 'Mobile', key: 'contact' },
    { header: 'University', key: 'university' },
    { header: 'Roll Number', key: 'roll' },
  ];
  const demo=await user.findAll({attributes: ['userID','userName','email','contact','university','roll']});
   demo.forEach(user => {
    worksheet.addRow(user.dataValues);
   });
   workbook.xlsx.writeFile('./sheets/Registered_User.xlsx')
   res.redirect("/Version@2023/admin");

}
if(adminCall==41)
{
  const userID =req.body.userID;
  const userName=req.body.userName;
  const roll=req.body.roll;
  const email=req.body.email;
  const contact=req.body.contact;
  const university=req.body.university;
  var pass=req.body.pass;

  const salt = await bcrypt.genSalt(10);
  pass  = await bcrypt.hash(pass, salt);

  await user.create({userID,userName,roll,email,contact,university,pass});
  res.redirect("/Version@2023/admin");
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