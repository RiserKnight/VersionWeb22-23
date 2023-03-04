const {user,tempUser,info,userOTP,session,eventRegistartion,feedback}=require('../../models')


/*******************************************************************Create Operations******************************************** */
exports.storeUser=async(userName,roll,email,contact,university,pass)=>{
   
    try {
        const infoI=await info.findOne({where:{infoID:101}});

        const userID = parseInt(infoI.dataValues.value)+1;
        await info.update({value: userID},{where:{infoID:101}});

        const userN = await user.create({userID,userName,roll,email,contact,university,pass})
        return userN.dataValues;
    } catch (err) {
       return(err);
    }
}

exports.storeInfo=async(infoID,purpose,type,value)=>{
   
    try {
        await info.create({infoID,purpose,type,value});
        return "Info stored Successfully";
    } catch (err) {
        console.log(err);
    }
    return "Info not stored";
}
/*******************************************************************Read Operations******************************************** */

exports.findByID=async(userID)=>{
   
    try {
        const userR = user.findOne({where:{userID:userID}});
        return userR.dataValues;
    } catch (err) {
        console.log(err);
    }
    return "User Not Found";
}

exports.getUser=async(userID)=>{
   
    try {
        const userR = user.findOne({where:{userID:userID}});
        return userR.dataValues;
    } catch (err) {
        console.log(err);
    }
    return "User Not Found";
}

/*************************************************Admin Operations(Get All)******************************************** */

exports.getAllUsers=async()=>{
    let users=[];
    try{
     const demo=await user.findAll();
     demo.forEach(user => {
         users.push(user.dataValues);
     });
     return users
    }
    catch(err){
        console.log(err);
            }
}
exports.getAllTempUsers=async()=>{
    let users=[];
    try{
     const demo=await tempUser.findAll();
     demo.forEach(user => {
         users.push(user.dataValues);
     });
     return users
    }
    catch(err){
        console.log(err);
            }
}

exports.getAllUsersOTP=async()=>{
    let users=[];
    try{
     const demo=await userOTP.findAll();
     demo.forEach(user => {
         users.push(user.dataValues);
     });
     return users
    }
    catch(err){
        console.log(err);
            }
}

exports.getAllUsersSession=async()=>{
    let users=[];
    try{
     const demo=await session.findAll();
     demo.forEach(user => {
         users.push(user.dataValues);
     });
     return users
    }
    catch(err){
        console.log(err);
            }
}

exports.getAllUsersRegistration=async()=>{
    let users=[];
    try{
     const demo=await eventRegistartion.findAll();
     demo.forEach(user => {
         users.push(user.dataValues);
     });
     return users
    }
    catch(err){
        console.log(err);
            }
}

exports.getAllUsersInfo=async()=>{
    let users=[];
    try{
     const demo=await info.findAll();
     demo.forEach(user => {
         users.push(user.dataValues);
     });
     return users
    }
    catch(err){
        console.log(err);
            }
}

exports.getAllUsersFeedback=async()=>{
    let users=[];
    try{
     const demo=await feedback.findAll();
     demo.forEach(user => {
         users.push(user.dataValues);
     });
     return users
    }
    catch(err){
        console.log(err);
            }
}
/*****************************************************Admin Operations(Specific)******************************************** */
exports.getUser=async(userID)=>{
    let users=[];
    try{
     const demo=await user.findAll({where:{userID}});
     demo.forEach(user => {
         users.push(user.dataValues);
     });
     return users
    }
    catch(err){
        console.log(err);
            }
}
exports.getUserOTP=async(userID)=>{
    let users=[];
    try{
     const demo=await userOTP.findAll({where:{userID}});
     demo.forEach(user => {
         users.push(user.dataValues);
     });
     return users
    }
    catch(err){
        console.log(err);
            }
}
exports.getUserEventRegistration=async(userID)=>{
    let users=[];
    try{
     const demo=await eventRegistartion.findAll({where:{userID}});
     demo.forEach(user => {
         users.push(user.dataValues);
     });
     return users
    }
    catch(err){
        console.log(err);
            }
}
exports.getInfo=async(infoID)=>{
    let users=[];
    try{
     const demo=await info.findAll({where:{infoID}});
     demo.forEach(user => {
         users.push(user.dataValues);
     });
     return users
    }
    catch(err){
        console.log(err);
            }
}
exports.getUserFeedback=async(userID)=>{
    let users=[];
    try{
     const demo=await feedback.findAll({where:{userID}});
     demo.forEach(user => {
         users.push(user.dataValues);
     });
     return users
    }
    catch(err){
        console.log(err);
            }
}
/*****************************************************Admin Operations(Search)******************************************** */
exports.getUsers=async(search)=>{
    let users=[];
    try{
     const demo=await user.findAll({where:search});
     demo.forEach(user => {
         users.push(user.dataValues);
     });
     return users
    }
    catch(err){
        console.log(err);
            }
}
exports.getTempUsers=async(search)=>{
    let users=[];
    try{
     const demo=await tempUser.findAll({where:search});
     demo.forEach(user => {
         users.push(user.dataValues);
     });
     return users
    }
    catch(err){
        console.log(err);
            }
}

exports.getUserOTPs=async(search)=>{
    let users=[];
    try{
     const demo=await userOTP.findAll({where:search});
     demo.forEach(user => {
         users.push(user.dataValues);
     });
     return users
    }
    catch(err){
        console.log(err);
            }
}
/*****************************************************Admin Operations(Search)******************************************** */
exports.getListOfEvent=async(eventID)=>{
    let usersList=[];
    try {
        const users = await eventRegistartion.findAll({attributes: ['userID',`${eventID}`]});
        users.forEach(user => {
            if(user.dataValues[`${eventID}`]){
            usersList.push(user.dataValues.userID);}
        });
        return usersList ;
    } catch (error) {
        console.log(error);
    }
}