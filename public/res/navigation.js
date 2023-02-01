// Navigation JS

const menu = document.getElementById("menu");
const navList = document.getElementById("nav-list");
const overlay = document.getElementById("overlay");
const socialFooter = document.getElementById('social-footer');

let toggleMenu = () => {
    menu.classList.toggle('openmenu'); 
    navList.classList.toggle('opennav');
    overlay.classList.toggle('active');
}

let toggleOverlay = () => {
    menu.classList.toggle('openmenu'); 
    navList.classList.toggle('opennav');
    overlay.classList.toggle('active');
}

let toggleSocial = () => {
    const socialBtns = document.querySelector('.social-btns');
    const add = document.getElementById('add');
    const remove = document.getElementById('remove');
    const socialLinks = document.querySelector('.social-btns').querySelectorAll('a');
    socialBtns.classList.toggle('open');
    if(socialBtns.classList.contains('open')) {
        add.style.display = 'none';
        remove.style.display = 'block';
        socialLinks.forEach((e,i) => {
            bottom = 55 * i;
            e.style.bottom = bottom + "px";
        })
    } else {
        add.style.display = 'block';
        remove.style.display = 'none';
        socialLinks.forEach((e) => {
            e.style.bottom = "0px";
        })
    }
    
}

menu.addEventListener('click', toggleMenu);
overlay.addEventListener('click', toggleOverlay);
socialFooter.addEventListener('click', toggleSocial);