const loginForm = document.querySelector(".login");
  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const otpErr = document.getElementById("otp");
    const passErr = document.getElementById("pass");
    const passRErr = document.getElementById("passR");

       // modal Elements
       const modal = document.getElementById("myModal");
       // <span> element that closes the modal
       const span = document.getElementsByClassName("close")[0];
       const messageLine = document.getElementById("msg");
       
       const modalTrigger =async(alertMessage)=>{
         modal.style.display="block";
         messageLine.innerText=alertMessage;
       }

       if(otpErr.style.display=="block")
       {otpErr.style.display="none";}
       if(passErr.style.display=="block")
       {passErr.style.display="none";}
       if(passRErr.style.display=="block")
       {passRErr.style.display="none";}

       var flag=0;
       const OTP = document.getElementById("otpInput").value;
       const pass = document.getElementById("passInput").value;
       const passR = document.getElementById("passRInput").value;

       if(pass.length<8){passErr.style.display="block";flag=1;passErr.innerHTML="Weak Password"}

       if(!pass){passErr.style.display="block";flag=1;}
       if(!OTP){otpErr.style.display="block";flag=1;}
       if(!passR){passRErr.style.display="block";flag=1;}
       
       if(pass!=passR){document.getElementById("passR").style.display="block";flag=1;}

       if(flag===0)
       {
        try {
         const res = await fetch('/verifyOTP', { 
           method: 'POST', 
           body: JSON.stringify({OTP,pass}),
           headers: {'Content-Type': 'application/json'}
         });
         const data = await res.json();
         if(data.code ==="100")
         {
           //triggering modal
           await modalTrigger(data.msg);
           span.onclick = function() {
             modal.style.display = "none";
             location.assign('/');
           }
            
         }
         
         else if(data.code==="250"){
            await modalTrigger(data.msg);
            span.onclick = function() {
              modal.style.display = "none";
              location.assign('/login');
            }
         }
         else if(data.code==="300")
         {
            await modalTrigger(data.msg);
            span.onclick = function() {
              modal.style.display = "none";
              location.assign('/verifyOTP');
            }
         }

         else{
           await modalTrigger("There was some problem in signup. Please try again");
           span.onclick = function() {
             modal.style.display = "none";
             location.assign('/register');
           }
         }
   
       }
        catch (err) {
         console.log(err);
       }
   
       }
   
});