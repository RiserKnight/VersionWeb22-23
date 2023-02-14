const {user,info}=require('../../models')

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