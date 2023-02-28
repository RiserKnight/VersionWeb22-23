module.exports.check = (userID)=>{
    var res=true;
    //if(userID.indexOf("@") !== -1 && userID.indexOf(".com") !== -1) res=false;
    for (let i = 0; i < userID.length; i++) {
        //console.log("Number: "+userID[i]);
        if(userID[i] ==' ')res=false;
        const temp=userID[i]-'0';
        if(!(temp||temp==0))res=false;
      }
    return res;
}