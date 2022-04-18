let fromLocalStorage = localStorage.getItem('COUNTDOWN')

let getTimeNow = new Date();

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
chooseMenuBar('Countdown')
// Hamburger Menu End in here

// Menu Bar Start in here
let menuBar = document.getElementsByClassName('card');
let containerCountdown = document.getElementById('countdown');
let containerClock = document.getElementById('clock')
function chooseMenuBar(activity){
    let menuBar = document.getElementsByClassName('card');
    let containerCountdown = document.getElementById('countdown');
    let containerClock = document.getElementById('clock')
    switch(activity) {
        case 'Clock':
            containerCountdown.style.display = "none";
            containerClock.style.display = "flex";
            menuBar[0].classList.add('active');
            menuBar[1].classList.remove('active');
            break;
        case 'Countdown':
            containerCountdown.style.display = "flex";
            containerClock.style.display = "none";
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
const btnClockFullScrn = document.querySelector('#clock .fa-expand');
const btnCountdownFullScrn = document.querySelector('#countdown .fa-expand');

btnClockFullScrn.addEventListener('click', ()=> {
    FullscrnClock(containerClock)
})

btnCountdownFullScrn.addEventListener('click', ()=> {
    FullscrnClock(containerCountdown);
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

// Form Start in here

// Open Form / Btn Set
const btnSetTime = document.getElementById('set-time');
const btnCancelTime = document.getElementById('cancel-time');
const btnCancelForm = document.getElementById('cancel');
const btnSaveForm = document.getElementById('save');
const getDate = document.getElementById('date');
const getDateTime = document.getElementById('datetime');
const getTittle = document.getElementById('tittle');
const containerForm = document.getElementById('container-form');

// Function Form Start in here
function setDate_DateTimeToMinMaxValue(value, day) {
    let setToNvalue = new Date(getTimeNow.getTime() + 1000 * 60 * 60 * 24 * day);
    getDate.setAttribute(`${value}`,`${setToNvalue.getFullYear()}-${addZeroNumber('ALL',setToNvalue.getMonth() + 1)}-${addZeroNumber('ALL',setToNvalue.getDate())}`);
}

// Mindate = TimeNow
setDate_DateTimeToMinMaxValue('min', 0)

// Value = 10dayfrom now
setDate_DateTimeToMinMaxValue('value', 10)

// Maxdate = 100 days from now
setDate_DateTimeToMinMaxValue('max', 100)
// Function Form End in here

btnSetTime.addEventListener('click', ()=> {
    containerForm.style.display = "flex";
})

// Cancel Form
btnCancelForm.addEventListener('click', ()=> {
    containerForm.style.display = "none";
})

// Save Form
btnSaveForm.addEventListener('click', ()=> {
    countdownTimer(getDate.value, getDateTime.value)
    SyncToLocalStorage('SET', getDate.value,getDateTime.value,getTittle.value)
    containerForm.style.display = "none";
    btnSetTime.style.display = "none";
    btnCancelTime.style.display = "block";
    newTittle.innerText = `"${fromLocalStorage['tittle']}"`;
})
// Cancel Countdown Time
btnCancelTime.addEventListener('click', ()=> {
    TimeforCountdown();
    btnSetTime.style.display = "block";
    btnCancelTime.style.display = "none";
    SyncToLocalStorage('CANCEL')
    clearInterval(countdownInterval)
    newTittle.innerText = `${fromLocalStorage['tittle']}`;
})
// Form End in here

// Countdown Start in here
// Countdown interval
let countdownInterval;

const newDayTime = document.getElementById('day');
const newHourTime = document.getElementById('hour');
const newMinuteTime = document.getElementById('minute');
const newSecondTime = document.getElementById('second');
const newTittle = document.querySelector('section.container .container-right section.container-time .tools h1');

function countdownTimer(date, datetime, tittle){
    countdownInterval = setInterval(() => {
        getTimeNow = new Date().getTime();
        const getTimeUser = new Date(`${date}T${datetime}`).getTime();
        const differentDate = getTimeUser - getTimeNow;
        const dayTime = addZeroNumber('ALL',Math.floor(differentDate / (1000 * 60 * 60 * 24)));
        const hourTime = addZeroNumber('ALL',Math.floor(differentDate % (1000 * 60 * 60 * 24) / (1000 * 60 * 60)));
        const minuteTime = addZeroNumber('ALL',Math.floor(differentDate % (1000 * 60 * 60) / (1000 * 60)));
        const secondTime = addZeroNumber('ALL',Math.floor(differentDate % (1000 * 60) / 1000));

        TimeforCountdown(dayTime, hourTime, minuteTime, secondTime)

        if ( differentDate <= 0 ) {
            btnCountdownFullScrn.click();
            clearInterval(countdownInterval);
            TimeforCountdown();
            btnSetTime.style.display = "block";
            btnCancelTime.style.display = "none";
        }
    }, 100)
}
// Countdown End in here

// Clock Start in here
/*
 *
 * Clock in here
 *
 */
const dateClock = document.getElementById('date-clock');
const monthClock = document.getElementById('month-clock');
const yearClock = document.getElementById('year-clock');
const hourClock = document.getElementById('hour-clock');
const minuteClock = document.getElementById('minute-clock');
const secondClock = document.getElementById('second-clock');
const miliSecondClock = document.getElementById('milisecond-clock');
const dayClock = document.getElementById('name-day')

setInterval(()=>{
    const arrDay = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', "Jum'at", 'Sabtu']
    const clockTime = new Date();
     // Get Date
    dateClock.innerHTML = addZeroNumber('ALL',clockTime.getDate());
    // Get Day
    dayClock.innerHTML = addZeroNumber('ALL', arrDay[clockTime.getDay()])
    // Get Month
    monthClock.innerHTML = addZeroNumber('ALL',clockTime.getMonth() + 1);
    // Get Year
    yearClock.innerHTML = addZeroNumber('ALL',clockTime.getFullYear());
    // Get Hour
    hourClock.innerHTML = addZeroNumber('ALL',clockTime.getHours());
    // Get Minute
    minuteClock.innerHTML = addZeroNumber('ALL',clockTime.getMinutes());
    // Get second
    secondClock.innerHTML = addZeroNumber('ALL',clockTime.getSeconds());
    // Get milisecond
    // miliSecondClock.innerHTML = addZeroNumber('MILISECOND', clockTime.getMilliseconds());
},1000)
// Clock End in here


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

function TimeforCountdown(day = '00', hour = '00', minute = '00', second = '00') {
    newDayTime.innerHTML = `${day}`;
    newHourTime.innerHTML = `${hour}`;
    newMinuteTime.innerHTML = `${minute}`;
    newSecondTime.innerHTML = `${second}`;
}

// Sync To Local Storage// SYNC TO LOCAL STORAGE
let arrCountdown;

function SyncToLocalStorage(activity, date = 0, datetime = 0, tittle = '') {
    switch(activity) {
        case 'SET' :
            arrCountdown = {
                'date' : `${date}`,
                'datetime' : `${datetime}`,
                'tittle' : `${tittle}`,
                'active' : true,
            };
            break;
        case 'CANCEL' :
            arrCountdown = {
                'date' : '',
                'datetime' : '',
                'tittle' : '',
                'active' : false,
            };
            break;
        default :
            break;
    }
    localStorage.setItem('COUNTDOWN', JSON.stringify(arrCountdown))
}
// GET LOCAL STORAGE
if (fromLocalStorage = JSON.parse(localStorage.getItem('COUNTDOWN'))) {
    if ( fromLocalStorage['date'] === '' && fromLocalStorage['datetime'] ==='') {
        TimeforCountdown();
        btnSetTime.style.display = "block";
        btnCancelTime.style.display = "none";
        newTittle.innerText = `${fromLocalStorage['tittle']}`;
    } else {
        countdownTimer(fromLocalStorage['date'], fromLocalStorage['datetime'],)
        btnSetTime.style.display = "none";
        btnCancelTime.style.display = "block";
        newTittle.innerText = `${fromLocalStorage['tittle']}`;
    }
};

// Notification
// const notification = Notification.permission;
// console.log(notification)
// if ( notification === "default" || notification === "denied" ) {
//     alert('Allow permission notification for get notification')
//     Notification.requestPermission().then(permission => {
//         if( notification === "granted" ) {
//             console.log(notification)
//     }})
// } else if( notification === "granted" ) {
//     console.log(notification)
// }

// function textNotification(message) {
//     if ( notification === "granted" ) {
//         const NotificationText = new Notification('Your time has been caught', {
//             body : `${message}`,
//             icon : "img/Logo Web.png"
//         })
//     } else {
//         showNotification()
//     }
// }
// Notification