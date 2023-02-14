module.exports.adminHome = (req, res) => {

   res.render("admin/admin");
   
  }

    //   app.post("/admin/:btID",sessionAdmin,async(req,res)=>{
    //    btID=parseInt(req.params.btID);
    //    if(btID==1)
    //    {
    //      const users= await dbFunct.getAllUsers();
    //      res.render("userTable",{users:users});
    //    }
  
    
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