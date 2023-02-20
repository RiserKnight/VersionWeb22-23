import {eventsdata} from './eventsData.js'

// modal Elements
const modal = document.getElementById("myModal");
// <span> element that closes the modal
const span = document.getElementsByClassName("close")[0];
const messageLine = document.getElementById("msg");
span.onclick = function() {
  modal.style.display = "none";
}
export let modalTrigger=(eventName,eventDetails)=>{
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
        card.setAttribute("id",`"${ids}"`);
        card.appendChild(detdiv);
        card.appendChild(image);
        cardCover.appendChild(card);
        container.appendChild(cardCover);
        let action = document.getElementById(`"${ids}"`);
        action.addEventListener('click',function(e){
            modalTrigger(teamMember.eventName,teamMember.eventDetails);
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