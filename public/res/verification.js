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
    const code = document.getElementById("code").value;

    window.onload = async function() {
        if(code=="100")
    {
        //triggering modal
     await modalTrigger("Verification Successful","Account Verified Successfully. Please check your email for registration ID.");
     span.onclick = function() {
       modal.style.display = "none";
       location.assign('/login');
     }

    }
    else
    {
    await modalTrigger("Verification Unsuccessful","Your Account is already verified if not, Please contact our Team.");
     span.onclick = function() {
       modal.style.display = "none";
       location.assign('/');
     }

    }
        
      };
    
     