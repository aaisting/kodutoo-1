let clockFontSize = 50;

const weekdays = [
    "Pühapäev",
    "Esmaspäev",
    "Teisipäev",
    "Kolmapäev",
    "Neljapäev",
    "Reede",
    "Laupäev"
];

function updateClock() {
    const now = new Date();

    let hours = now.getHours();
    let minutes = now.getMinutes();
    let seconds = now.getSeconds();

    if (hours < 10) hours = "0" + hours;
    if (minutes < 10) minutes = "0" + minutes;
    if (seconds < 10) seconds = "0" + seconds;

    document.getElementById("hours").textContent = hours;
    document.getElementById("minutes").textContent = minutes;
    document.getElementById("seconds").textContent = seconds;
}

function updateDate() {
    const now = new Date();

    let day = now.getDate();
    let month = now.getMonth() + 1;
    let year = now.getFullYear();
    let weekdayIndex = now.getDay();

    if (day < 10) day = "0" + day;
    if (month < 10) month = "0" + month;

    document.getElementById("weekday").textContent = weekdays[weekdayIndex];
    document.getElementById("day").textContent = day + ".";
    document.getElementById("month").textContent = month + ".";
    document.getElementById("year").textContent = year;
}

function updateFontSize() {
    document.getElementById("clockContainer").style.fontSize = clockFontSize + "px";
    document.getElementById("dateContainer").style.fontSize = (clockFontSize / 2) + "px";
}

function increaseFontSize() {
    clockFontSize += 5;
    if (clockFontSize > 200) clockFontSize = 200;
    updateFontSize();
}

function decreaseFontSize() {
    clockFontSize -= 5;
    if (clockFontSize < 10) clockFontSize = 10;
    updateFontSize();
}

function getColorWith(colorValue, variable){
    let red = parseInt(colorValue.substring(1,3),16);
    let green = parseInt(colorValue.substring(3,5),16);
    let blue = parseInt(colorValue.substring(5,7),16);

    return "rgba(" + red + "," + green + "," + blue + "," + variable + ")";
}

function applyColors(){
    let textColorValue = document.getElementById("textColorInput").value;
    let textvariable = document.getElementById("textAlpha").value;
    let textColor = getColorWith(textColorValue, textvariable);

    let backgroundColorValue = document.getElementById("bgColorInput").value;
    let backgroundvariable = document.getElementById("bgAlpha").value;
    let backgroundColor = getColorWith(backgroundColorValue, backgroundvariable);

    document.getElementById("clockContainer").style.color = textColor;
    document.getElementById("dateContainer").style.color = textColor;

    document.body.style.backgroundColor = backgroundColor;
}

function makeDraggable(elementId) {  //siit sain teada, kuidas seda teha, siis täiendasin: https://www.youtube.com/watch?v=UjSeQialywA
    const element = document.getElementById(elementId);

    let offsetX = 0;
    let offsetY = 0;

    element.addEventListener("mousedown", (e) => {
        offsetX = e.clientX - element.offsetLeft;
        offsetY = e.clientY - element.offsetTop;

        function move(e) {
            element.style.left = (e.clientX - offsetX) + "px";
            element.style.top = (e.clientY - offsetY) + "px";
        }

        document.addEventListener("mousemove", move);

        document.addEventListener("mouseup", () => {
            document.removeEventListener("mousemove", move);
        }, { once: true });
    });
}

document.addEventListener("DOMContentLoaded", () => {

    updateClock();
    updateDate();

    setInterval(updateClock, 1000);
    setInterval(updateDate, 60000);

    document.getElementById("bigger").addEventListener("click", increaseFontSize);
    document.getElementById("smaller").addEventListener("click", decreaseFontSize);

    document.getElementById("applyColor").addEventListener("click", applyColors);

    window.addEventListener("keydown", (e) => {
        if (e.key === "+") increaseFontSize();
        if (e.key === "-") decreaseFontSize();
    });

    makeDraggable("clockContainer");
    makeDraggable("dateContainer");
});