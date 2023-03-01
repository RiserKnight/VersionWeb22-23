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
        
        let datetime = document.createElement("div");
        let dateIcon = document.createElement('i');
        dateIcon.classList.add("bi","bi-calendar2-heart-fill","mx-3");
        let date = document.createElement("span");
        date.appendChild(dateIcon);
        date.innerHTML+=teamMember.date;
        datetime.appendChild(date);
        datetime.appendChild(document.createElement("br"));

        let timeIcon = document.createElement('i');
        timeIcon.classList.add("bi","bi-clock-fill","mx-3");
        let time = document.createElement("span");
        time.appendChild(timeIcon);
        time.innerHTML+=teamMember.time;
        datetime.appendChild(time);
        datetime.classList.add("datetime");
        
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
        cardCover.appendChild(document.createElement("hr"));
        cardCover.appendChild(datetime);
        container.appendChild(cardCover);

        let nonBlurEvents=['102','109'];
        if(nonBlurEvents.includes(teamMember.eventID)){
          let action = document.getElementById(`"${teamMember.eventID}"`);
          action.addEventListener('click',function(e){
              modalTrigger(teamMember.eventName,teamMember.eventDetails,teamMember.eventID);
          });
        }
        else{
          image.classList.add('closeEvent');
          // datetime.classList.add('closeEvent');
        }
        
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

    
    const eventIDReg = "E"+document.getElementById('eventID').value;
    
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