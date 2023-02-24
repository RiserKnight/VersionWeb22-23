import {eventsdata} from './eventsData.js'

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
        span.onclick = function() {
            modal.style.display = "none";
        }
        window.onclick = function(event) {
            if (event.target == modal) {
              modal.style.display = "none";
            }
        }
        evename.innerText=eventName;
        evedet.innerText=eventDetails;
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
        
        const data = await res.json();
        if(data.msg=="Login") location.assign('/login');
        if(data.code ==="100")
        {
          //triggering modal
        //   await modalTrigger(data.msg);
        //   span.onclick = function() {
        //     modal.style.display = "none";
        //     location.assign('/events');
        //   }
        location.assign('/events');
        }
        
        else{
        //   await modalTrigger("There was some problem in signup. Please try again");
        //   span.onclick = function() {
        //     modal.style.display = "none";
        //     location.assign('/events');
        //   }

          location.assign('/events');
        }
  
      }
       catch (err) {
        console.log(err);
      }
  });