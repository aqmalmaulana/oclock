// Universal Code
function addZeroNumber(chooseCase, i) {
    switch(chooseCase) {
        case 'ALL' :
            if ( i < 10 ) {
                i = "0" + i
            }
            break;
        case 'MILISECOND' :
            if ( i < 100 && i > 10 ) {
                i = "0" + i 
            } else if ( i < 10 ) {
                i = "00" + i
            }
    }
    return i;
}

// Theme Mode Start In Here
let themeLocalStorage = localStorage.getItem('Theme')
const btnThemeMode = document.getElementsByClassName('theme-mode') ;
const themeMode = document.body

const darkModeOn = ()=> {
    themeMode.classList.add('dark-mode')
    localStorage.setItem('Theme', 'dark-mode')
}
const darkModeOff = ()=> {
    themeMode.classList.remove('dark-mode')
    localStorage.setItem('Theme', 'light-mode')
}

if( themeLocalStorage === 'dark-mode' ) {
    darkModeOn();
}

for ( let i = 0; i<btnThemeMode.length;i++ ) {
    btnThemeMode[i].addEventListener('click', ()=> {
        themeLocalStorage = localStorage.getItem('Theme');
        if(themeLocalStorage !== 'dark-mode') {
            darkModeOn();
        } else {
            darkModeOff()
        }
    })
}
// Theme Mode End in here
/*****************************/
// Hamburger Menu Start in here
const hamburgerMenu = document.getElementById('hamburger-menu');
const elHamMenu = hamburgerMenu.getElementsByTagName('span');
const containerMenuBar = document.getElementsByClassName('container-left');

for ( let i = 0; i <elHamMenu.length; i++ ) {
    hamburgerMenu.addEventListener('click', ()=> {
        if( elHamMenu[0].classList.contains('active') ) {
            elHamMenu[0].classList.remove('active')
            elHamMenu[1].classList.remove('active')
            elHamMenu[2].classList.remove('active')

            containerMenuBar[0].style.display = "none";
        } else {
            elHamMenu[0].classList.add('active');
            elHamMenu[1].classList.add('active');
            elHamMenu[2].classList.add('active');
    
            containerMenuBar[0].style.display = "block";
        }
        
    })
}

// Hamburger Menu End in here

// Menu Bar Start in here
const menuBar = document.getElementsByClassName('card');
function chooseMenuBar(activity){
    switch(activity) {
        case 'Clock':
            menuBar[0].classList.add('active');
            menuBar[1].classList.remove('active');
            break;
        case 'Countdown':
            menuBar[1].classList.add('active');
            menuBar[0].classList.remove('active');
            break;
        default:
            break;
    }
}
for ( let i = 0; i < menuBar.length;i++ ){
    menuBar[i].addEventListener('click', ()=> {
        chooseMenuBar(menuBar[i].innerText)
    })
}
// Menu Bar End in here

// Fullscreen Start in here
// const btnClockFullScrn = document.querySelector('#clock .bi-arrows-fullscreen');
const btnCountdownFullScrn = document.querySelector('section.container .container-right section.container-time .tools .bi-arrows-fullscreen');

// btnClockFullScrn.addEventListener('click', ()=> {
//     let menuBarClock = document.getElementById('clock');
//     FullscrnClock(menuBarClock)
// })

btnCountdownFullScrn.addEventListener('click', ()=> {
    let menuBarCountdown = document.getElementById('countdown');
    FullscrnClock(menuBarCountdown);
})
function FullscrnClock(el) {
    if(el.requestFullscreen) {
        el.requestFullscreen()
    } else if (el.webkitRequestFullscreen) {
        el.webkitRequestFullscreen()
    } else if (el.msRequestFullscreen) {
        el.msRequestFullscreen()
    }
}
// Fullscreen End in here