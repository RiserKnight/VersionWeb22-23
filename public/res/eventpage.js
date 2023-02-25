import {eventsdata} from './eventsData.js'

// fetching registerData
const registerData = document.getElementById("registerData").value;
const registerData1= JSON.parse(registerData)
// console.log(registerData1)
// modal Elements
const modal = document.getElementById("myModal");
// <span> element that closes the modal
const span = document.getElementsByClassName("close")[0];
const messageLine = document.getElementById("msg");
span.onclick = function() {
  modal.style.display = "none";
}
export let modalTrigger=(eventName,eventDetails,eventID)=>{
  const modal = document.getElementById("myModal");
        // <span> element that closes the modal
        const span = document.getElementsByClassName("close")[0];
        const evedet = document.getElementById("evedet");
        const evename = document.getElementById("evename");
        const regBtn=document.getElementById('btn-reg');
        span.onclick = function() {
            if(eventName=="Attention") location.assign('/events');
            modal.style.display = "none";
        }
        window.onclick = function(event) {
            if (event.target == modal) {
              if(eventName=="Attention") location.assign('/events');
              modal.style.display = "none";
            }
        }
        evename.innerText=eventName;
        evedet.innerText=eventDetails;
        // console.log(registerData1['E'+eventID])
        if(registerData1['E'+eventID]){
          regBtn.innerText='Registered'
          regBtn.setAttribute('disabled',true)
        }
        else{
          regBtn.innerText='Register'
          regBtn.removeAttribute('disabled')
        }
        if(eventName=='Attention')
          regBtn.style.display = "none";
        modal.style.display="block";
        const eventIDInput = document.getElementById('eventID');
        eventIDInput.value = eventID;
}

function createCard(teamMember,container,ids){
    let posterLink  = teamMember.posterImg;
        let photo = posterLink;
        let cardCover = document.createElement("div");
        cardCover.classList.add("card-cover");
        let card = document.createElement("div");
        card.classList.add("card");
        let image = document.createElement("img");
        image.src = photo;
        let detdiv = document.createElement("div");
        detdiv.classList.add("hide");
        let detname = document.createElement("h4");
        detname.innerText=teamMember.eventName;
        let detdet = document.createElement("p");
        detdet.innerText=teamMember.eventDetails;
        detdiv.appendChild(detname);
        detdiv.appendChild(detdet);
        //console.log(teamMember.eventId)
        card.setAttribute("id",`"${teamMember.eventID}"`);
        card.appendChild(detdiv);
        card.appendChild(image);
        cardCover.appendChild(card);
        container.appendChild(cardCover);
        let action = document.getElementById(`"${teamMember.eventID}"`);
    
        action.addEventListener('click',function(e){
            modalTrigger(teamMember.eventName,teamMember.eventDetails,teamMember.eventID);
        });
        image.loading = "lazy";
}
let eventsContainer = document.querySelector('.card-container');
function createTeamData(eventsdata,eventsContainer){
    let ids=1;
    eventsdata.forEach(eve => {
        createCard(eve,eventsContainer,ids++);
    });
}
createTeamData(eventsdata,eventsContainer);

const registerBtn = document.getElementById('btn-reg');

registerBtn.addEventListener('click', async function(event) {
    event.preventDefault();

    
    const eventIDReg = document.getElementById('eventID').value;
    try {
        const res = await fetch('/register/event/'+`${eventIDReg}`, { 
          method: 'POST', 
          body: JSON.stringify({}),
          headers: {'Content-Type': 'application/json'}
        });
        // console.log(locals.registerData);
        const data = await res.json();
        if(data.msg=="Login") location.assign('/login');
        if(data.code ==="100")
        {
          //triggering modal
          const eventIDInput = document.getElementById('eventID');
          await modalTrigger('Attention',data.msg,eventIDInput.value);
          // location.assign('/events');
        }
        
        else{
          const eventIDInput = document.getElementById('eventID');
          await modalTrigger('Attention','There was some problem in signup. Please try again',eventIDInput.value);
        }
  
      }
       catch (err) {
        console.log(err);
      }
  });