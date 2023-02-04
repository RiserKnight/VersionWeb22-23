import {eventTeam,alumniTeam,publicTeam,hospitalityTeam,centralTeam,printingTeam} from './teamData.js'
import {data} from './temp.js'

// <div class="card">
// <div class="content">
//     <div class="imgBx">
//         <img src="" alt="Image Not Found" onerror="this.onerror=null; this.src='images/default.png'">
//     </div>
//     <div class="contentBx">
//         <h3>Harish Kumar Meena</h3>
//     </div>
// </div>
// <ul class="sci">
//     <li style="--i:1">
//         <a href=""><i class="fa-brands fa-square-github icon fa-2x"></i></a>
//      </li>
//      <li style="--i:1">
//         <a href=""><i class="fa-brands fa-linkedin icon fa-2x"></i></a>
//      </li>
// </ul>
// </div>


function createCard(teamMember,container,eventHead){
    let driveLink = teamMember.Photo;
        let photo = driveLink;
        if(driveLink[0]=='h')
            photo = data[driveLink];
        let card = document.createElement("div");
        card.classList.add("card");
        let content = document.createElement("div");
        content.classList.add("content");

        let imgBx = document.createElement("div")
        imgBx.classList.add("imgBx");
        let image = document.createElement("img");
        image.src = photo;
        image.onerror = function(){
            image.src = 'images/default.png'

        }
        image.loading = "lazy"
        imgBx.appendChild(image)

        let contentBx = document.createElement("div");
        contentBx.classList.add("contentBx")
        let name = document.createElement("h3");
        name.innerHTML = teamMember.Name;
        let POR = document.createElement("span");
        POR.innerHTML=teamMember.POR;
        contentBx.appendChild(name)
        contentBx.appendChild(POR)

        content.appendChild(imgBx)
        content.appendChild(contentBx)

        let sci = document.createElement("ul");
        sci.classList.add("sci");
        let list1 = document.createElement("li");
        let list2 = document.createElement("li");
        let github = document.createElement("a");
        let githubIcon = document.createElement("i");
        githubIcon.classList.add("fa-brands","fa-square-github" ,"icon","fa-2x");
        github.appendChild(githubIcon)
        github.href=teamMember.Github;
        list1.appendChild(github)
        let linkedIn = document.createElement("a");
        let linkedInIcon = document.createElement("i");
        linkedInIcon.classList.add("fa-brands","fa-linkedin" ,"icon","fa-2x");
        linkedIn.appendChild(linkedInIcon)
        linkedIn.href=teamMember.Linkedin;
        list2.appendChild(linkedIn)
        sci.appendChild(list1)
        sci.appendChild(list2)

        card.appendChild(content);
        card.appendChild(sci);

        container.appendChild(card);
}

function createTeamData(teamData,container,eventHead){
    teamData.forEach(teamMember => {
        let toPlace = container
        if(teamMember.head){
            toPlace = eventHead;
        }
        createCard(teamMember,toPlace)
    });
}
let eventHead = document.querySelector('.event-team-head')
let centralHead = document.querySelector('.central-team-head')
let hospitalityHead = document.querySelector('.hospitality-team-head')
let publicHead = document.querySelector('.public-team-head')
let alumniHead = document.querySelector('.alumni-team-head')
let printingHead = document.querySelector('.printing-team-head')

let eventTeamContainer = document.querySelector('.event-team')
let centralTeamContainer = document.querySelector('.central-team')
let hospitalityTeamContainer = document.querySelector('.hospitality-team')
let publicTeamContainer = document.querySelector('.public-team')
let alumniTeamContainer = document.querySelector('.alumni-team')
let printingTeamContainer = document.querySelector('.printing-team')

function makeEventTeam(){
    createTeamData(eventTeam,eventTeamContainer,eventHead);
}
function makeCentralTeam(){ 
    createTeamData(centralTeam,centralTeamContainer,centralHead);
}
function makeHospitalityTeam(){
    createTeamData(hospitalityTeam,hospitalityTeamContainer,hospitalityHead);
}
function makePublicTeam(){
    createTeamData(publicTeam,publicTeamContainer,publicHead);
}
function makeAlumniTeam(){
    createTeamData(alumniTeam,alumniTeamContainer,alumniHead);
}
function makePrintingTeam(){
    createTeamData(printingTeam,printingTeamContainer,printingHead);
}

makeEventTeam();
makeCentralTeam();
makeHospitalityTeam();
makePublicTeam();
makeAlumniTeam();
makePrintingTeam();