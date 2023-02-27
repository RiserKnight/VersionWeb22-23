exports.genOTP=()=>{

    var arrayOTP=[],x=0,OTP="";

    for (let index = 0; index < 20; index++) {
      arrayOTP[index]="A";
    }


    for (let index = 0; index < 100; index++) {
      var charOTP="A";
      const decision=Math.floor(Math.random() * 2);

      if(decision===0)
      {
        x=Math.floor(Math.random() * 14);
        charOTP=String.fromCharCode(x+65);
      } 
      else 
      {
        x=Math.floor(Math.random() * 9);
        charOTP=String.fromCharCode(x+49);
      }

      x=Math.floor(Math.random() * 20);
      arrayOTP[x]=charOTP;
    }

    x=Math.floor(Math.random() * 17);
    arrayOTP=arrayOTP.slice(x,x+4);

    arrayOTP.forEach(element => {
      OTP=OTP+element;
    });

    return OTP;
    
    
} 
 
exports.validOTP=()=>{

  var arrayOTP=[],x=0,OTP="";

  for (let index = 0; index < 20; index++) {
    arrayOTP[index]="A";
  }


  for (let index = 0; index < 100; index++) {
    var charOTP="A";
    const decision=Math.floor(Math.random() * 2);

    if(decision===0)
    {
      x=Math.floor(Math.random() * 14);
      charOTP=String.fromCharCode(x+65);
    } 
    else 
    {
      x=Math.floor(Math.random() * 9);
      charOTP=String.fromCharCode(x+49);
    }

    x=Math.floor(Math.random() * 20);
    arrayOTP[x]=charOTP;
  }

  x=Math.floor(Math.random() * 13);
  arrayOTP=arrayOTP.slice(x,x+8);

  arrayOTP.forEach(element => {
    OTP=OTP+element;
  });

  return OTP;
  
  
}
 
 //ASCII A-Z 65-90 0-9 48-57
       // const x=Math.floor(Math.random() * 25);
      // x gives a random number bw 0-24(inclusive)

    // const citrus = fruits.slice(1, 3);
    // 1 is inclusive and 3 is exclusive


      
   
 
  