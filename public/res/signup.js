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

const loginForm = document.querySelector(".login");
  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const userNameErr = document.getElementById("userName");
    const rollErr = document.getElementById("roll");
    const emailErr = document.getElementById("email");
    const universityErr = document.getElementById("university");
    const contactErr = document.getElementById("contact");
    const passErr = document.getElementById("pass");
    const passRErr = document.getElementById("passR");


    if(userNameErr.style.display=="block")
    {userNameErr.style.display="none";}
    if(rollErr.style.display=="block")
    {rollErr.style.display="none";}
    if(emailErr.style.display=="block")
    {emailErr.style.display="none";}
    if(universityErr.style.display=="block")
    {universityErr.style.display="none";}
    if(contactErr.style.display=="block")
    {contactErr.style.display="none";}
    if(passErr.style.display=="block")
    {passErr.style.display="none";}
    if(passRErr.style.display=="block")
    {passRErr.style.display="none";}


    var flag=0;
    const userName = document.getElementById("userNameInput").value;
    const roll = document.getElementById("rollInput").value;
    const email = document.getElementById("emailInput").value;
    const university = document.getElementById("universityInput").value;
    const contact = document.getElementById("contactInput").value;
    const pass = document.getElementById("passInput").value;
    const passR = document.getElementById("passRInput").value;

    if(!userName){userNameErr.style.display="block";flag=1;}
    if(!roll){rollErr.style.display="block";flag=1;}
    if(!email){emailErr.style.display="block";flag=1;}
    if(!university){universityErr.style.display="block";flag=1;}
    if(!contact){contactErr.style.display="block";flag=1;}

    if(pass.length<8){passErr.style.display="block";flag=1;passErr.innerHTML="Weak Password"}
    if(!pass){passErr.style.display="block";flag=1;}
    

    if(!passR){passRErr.style.display="block";flag=1;}
    
    if(pass!=passR){document.getElementById("passR").style.display="block";flag=1;}

    if(flag===0)
    {
     try {
      const res = await fetch('/register', { 
        method: 'POST', 
        body: JSON.stringify({ userName,roll,email,university,contact, pass}),
        headers: {'Content-Type': 'application/json'}
      });
      const data = await res.json();
      if(data.code ==="100")
      {
        //triggering modal
        await modalTrigger("Signup Successful",data.msg);
        span.onclick = function() {
          modal.style.display = "none";
          location.assign('/');
        }
         
      }
      
      else if(data.code==="200"){
        document.getElementById("email").style.display="block";
        document.getElementById("email").innerHTML=data.msg;
      }
      else if(data.code==="300"){
        //triggering modal
        await modalTrigger("Signup Unsuccessful",data.msg);
        span.onclick = function() {
          modal.style.display = "none";
          location.assign('/');
        }
      }
      else{
        await modalTrigger("Signup Unsuccessful","There was some problem in signup. Please try again");
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

  window.onload = async function() {
    await modalTrigger("Alert","Please enter your email carefully all the future communication will be done via email.");
    span.onclick = function() {
      modal.style.display = "none";
    }
  };
