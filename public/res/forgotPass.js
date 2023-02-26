const loginForm = document.querySelector(".login");
  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const userIDErr = document.getElementById("userID");

    
        // modal Elements
        const modal = document.getElementById("myModal");
        // <span> element that closes the modal
        const span = document.getElementsByClassName("close")[0];
        const messageLine = document.getElementById("bodyA");
        const msgHead = document.getElementById("headA");
        console.log(messageLine)
        const modalTrigger =async(headMsg,alertMessage)=>{
          messageLine.innerText=alertMessage;
          msgHead.innerText=headMsg;
          modal.style.display="block";
        }

    if(userIDErr.style.display=="block")
    {userIDErr.style.display="none";}

    var flag=0;
    const userID = document.getElementById("userIDInput").value;

    if(!userID){userIDErr.style.display="block";flag=1;}

    if(flag===0)
    {
     try {
      const res = await fetch('/forgot_pass', { 
        method: 'POST',
        body: JSON.stringify({ userID}),
        headers: {'Content-Type': 'application/json'}
      });
      const data = await res.json();
      if(data.code ==="100")
      {
          location.assign('/verifyOTP');
      }
      
      else if(data.code==="200"){
        await modalTrigger("Unsuccessful",data.msg);
        span.onclick = function() {
          modal.style.display = "none";
          location.assign('/login');
        }
      }
      else{
        await modalTrigger("Unsuccessful","There was some problem in reset. Please try again");
        span.onclick = function() {
          modal.style.display = "none";
          location.assign('/login');
        }
      }

    }
     catch (err) {
      console.log(err);
    }

    }
});