
const loginForm = document.querySelector(".login");
  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const rollErr = document.getElementById("roll");
    const emailErr = document.getElementById("email");
    const contactErr = document.getElementById("contact");

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

    if(rollErr.style.display=="block")
    {rollErr.style.display="none";}
    if(emailErr.style.display=="block")
    {emailErr.style.display="none";}
    if(contactErr.style.display=="block")
    {contactErr.style.display="none";}

    const roll = document.getElementById("rollInput").value;
    const email = document.getElementById("emailInput").value;
    const contact = document.getElementById("contactInput").value;

    var flag=0;

    if(!roll){rollErr.style.display="block";flag=1;}
    if(!email){emailErr.style.display="block";flag=1;}
    if(!contact){contactErr.style.display="block";flag=1;}

    if(flag===0)
    {
     try {
        const res = await fetch('/forgot_regno', { 
        method: 'POST', 
        body: JSON.stringify({roll,email,contact}),
        headers: {'Content-Type': 'application/json'}
      });
      const data = await res.json();
      if(data.code ==="100")
      {
        //triggering modal
        await modalTrigger("Successful",`Your Registration number is ${data.userID}`);

        span.onclick = function() {
            modal.style.display = "none";
            location.assign('/');
          }
             
      }
      
      else if(data.code==="200"){

        await modalTrigger("Unsuccessful",data.msg);
        span.onclick = function() {
            modal.style.display = "none";
            location.assign('/forgot-reg');
          }
  
      }
      else{
        await modalTrigger("Unsuccessful","There was some problem in signup. Please try again");
        span.onclick = function() {
            modal.style.display = "none";
            location.assign('/forgot-reg');
          }
      }

    }
     catch (err) {
      console.log(err);
    }

    }
});