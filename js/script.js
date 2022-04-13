// Selector Button
const btnSetTime = document.getElementById('set-time');
const formSetTime = document.getElementById('container-form');
const btnCancelForm = document.getElementById('cancel');
const btnSaveForm = document.getElementById('save');
const btnCancelCountdown = document.getElementById('cancel-time');

// Untuk sementara
// Menu BAr
const menuBar = document.getElementsByClassName('card');
function chooseMenuBar(activity){
    const menuBarCountdown = document.getElementById('countdown-bar')
    const menuBarClock = document.getElementById('clock');
    switch(activity) {
        case 'Clock':
            menuBarCountdown.style.display = "none";
            menuBarClock.style.display = "flex";
            menuBar[0].classList.add('active');
            menuBar[1].classList.remove('active');
            break;
        case 'Countdown':
            menuBarCountdown.style.display = "flex";
            menuBarClock.style.display = "none";
            menuBar[1].classList.add('active');
            menuBar[0].classList.remove('active');
            break;
        default:
            break;
    }
}
chooseMenuBar('Countdown')

for ( let i = 0; i < menuBar.length;i++ ){
    menuBar[i].addEventListener('click', ()=> {
        chooseMenuBar(menuBar[i].innerText)
    })
}

// Open Form
btnSetTime.addEventListener('click', ()=> {
    formSetTime.style.display = "flex";
})

// Cancel form
btnCancelForm.addEventListener('click', () => {
    formSetTime.style.display = "none";
})

// Fullscreen
const btnClockFullScrn = document.querySelector('#clock .bi-arrows-fullscreen');
const btnCountdownFullScrn = document.querySelector('#countdown-bar .bi-arrows-fullscreen');

btnClockFullScrn.addEventListener('click', ()=> {
    let menuBarClock = document.getElementById('clock');
    FullscrnClock(menuBarClock)
})

btnCountdownFullScrn.addEventListener('click', ()=> {
    let menuBarCountdown = document.getElementById('countdown-bar');
    FullscrnClock(menuBarCountdown);
})


// Selector Add countdown
const newDayTime = document.getElementById('day');
const newHourTime = document.getElementById('hour');
const newMinuteTime = document.getElementById('minute');
const newSecondTime = document.getElementById('second');

// Selector Get Time Countdown
const getDate = document.getElementById('date');
const getDateTime = document.getElementById('datetime');
const getTittle = document.getElementById('tittle');

// Get Time Now
let getTimeNow = new Date();

// Get Time Countdown User
let countdownInterval;

// SYNC TO LOCAL STORAGE
let arrCountdown;

function SyncToLocalStorage(activity, date = 0, datetime = 0, tittle = 0) {
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

// Default or value (00) for time
function TimeforCountdown(day = '00', hour = '00', minute = '00', second = '00') {
    newDayTime.innerHTML = `${day}`;
    newHourTime.innerHTML = `${hour}`;
    newMinuteTime.innerHTML = `${minute}`;
    newSecondTime.innerHTML = `${second}`;
}

// GET LOCAL STORAGE
if (fromLocalStorage = JSON.parse(localStorage.getItem('COUNTDOWN'))) {
    if ( fromLocalStorage['date'] === '' && fromLocalStorage['datetime'] ==='') {
        TimeforCountdown();
        btnSetTime.style.display = "block";
        btnCancelCountdown.style.display = "none";
    } else {
        countdownTimer(fromLocalStorage['date'], fromLocalStorage['datetime'])
        btnSetTime.style.display = "none";
        btnCancelCountdown.style.display = "block";
    }
};


// Save
btnSaveForm.addEventListener('click', ()=> {
    countdownTimer(getDate.value, getDateTime.value)
    SyncToLocalStorage('SET', getDate.value,getDateTime.value,getTittle.value)
    formSetTime.style.display = "none";
    btnSetTime.style.display = "none";
    btnCancelCountdown.style.display = "block";
})

btnCancelCountdown.addEventListener('click', ()=> {
    TimeforCountdown();
    btnSetTime.style.display = "block";
    btnCancelCountdown.style.display = "none";
    SyncToLocalStorage('CANCEL')
    clearInterval(countdownInterval)
})




// Add Time Coutdown to page
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

function countdownTimer(date, datetime){
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
            btnCancelCountdown.style.display = "none";
        }
    }, 1)
}

// SEt date & datetime min,max,value
/* NOTE!!!
 * For To set day
 * 0 = today
 * 1 = Tomorrow
 * etc
*/
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

// Theme Mode
let themeLocalStorage = localStorage.getItem('Theme')
const btnThemeMode = document.getElementsByClassName('theme-mode');
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

// Hamburger Menu 
const hamburgerMenu = document.getElementsByClassName('hamburger-menu')[0];
const elHamMenu = hamburgerMenu.getElementsByTagName('span');
const containerMenuBar = document.getElementsByClassName('section-left');

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
            containerMenuBar[0].style.transform = "translateY(0)"
        }
        
    })
}

// Fullscreen Mode Clock
function FullscrnClock(el) {
    if(el.requestFullscreen) {
        el.requestFullscreen()
    } else if (el.webkitRequestFullscreen) {
        el.webkitRequestFullscreen()
    } else if (el.msRequestFullscreen) {
        el.msRequestFullscreen()
    }
}
