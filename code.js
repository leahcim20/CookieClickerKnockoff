const cookie = document.getElementById("cookie");
const text = document.getElementById("text");
const clickpowertext = document.getElementById("clickpower");
const names = ["Cursor", "Grandma", "Farm", "Mine", "Factory", "Bank", "Temple", "Wizard Tower", "Shipment", "Alchemy Lab", "Portal", "Time Machine", "Antimatter Condenser", "Prism", "Chancemaker", "Fractal Engine", "Javascript Console", "Idleverse", "Cortex Baker", "You"]
let gameinfo = {cookies: 0, taxes: 1.15, clickpower: 1, cps : 0}
let upgrades = [
    {bp: 15,  value: 0.1},
    {bp: 100,  value: 1},
    {bp: 1100,  value: 8},
    {bp: 12000,  value: 47},
    {bp: 130000, value: 260},
    {bp: 1400000, value: 1400},
    {bp: 20000000, value: 7800},
    {bp: 330000000, value: 44000},
    {bp: 5100000000, value: 260000},
    {bp: 75000000000, value: 1600000},
    {bp: 1000000000000, value: 10000000},
    {bp: 14000000000000, value: 665000000},
    {bp: 170000000000000, value: 430000000},
    {bp: 2100000000000000, value: 2900000000},
    {bp: 26000000000000000, value: 21000000000},
    {bp: 310000000000000000, value: 150000000000},
    {bp: 71000000000000000000, value: 1100000000000},
    {bp: 12000000000000000000000, value: 8300000000000},
    {bp: 1900000000000000000000000, value: 64000000000000},
    {bp: 5400000000000000000000000, value: 51000000000000},
]

for (let i = 0; i < upgrades.length; i++) {
    upgrades[i].price = upgrades[i].bp
    upgrades[i].amount = 0
    upgrades[i].name = names[i]

    const container = document.getElementById("upgrades")
    let btn = document.createElement("button")
    btn.id = upgrades[i].name.toLowerCase().replace(/\s+/g, "")
    container.appendChild(btn)
    upgrades[i].upgrade = document.getElementById(btn.id)
    upgrades[i].upgrade.addEventListener("click", () => Buy(i))
}

function Save() {
    localStorage.setItem("gameinfo", JSON.stringify(gameinfo))
    localStorage.setItem("upgrades", JSON.stringify(upgrades))
}

window.onload = function() {
    let info = JSON.parse(localStorage.getItem("gameinfo"))

    if (info) {
        gameinfo = info
    }

    info = JSON.parse(this.localStorage.getItem("upgrades"))

    if (info) {
        for (let i = 0; i < info.length; i++) {
            upgrades[i].price = info[i].price
            upgrades[i].amount = info[i].amount
        }
    }

    this.document.getElementById("game").style.visibility = "visible"
    UpdateGui();
}

function UpdateGui() {
    for (let i = 0; i < upgrades.length; i++) {
        upgrades[i].upgrade.innerText = upgrades[i].name + " Price: " + formatNumber(upgrades[i].price) + " Amount: " + upgrades[i].amount.toLocaleString()
    }
    text.innerText = gameinfo.cookies.toLocaleString()
    clickpowertext.innerText = gameinfo.cps.toLocaleString()
    Save()
}

function formatNumber(num) {
    if (num < 1000) return num.toLocaleString();

    const units = ["K","M","B","T","Qa","Qi","Sx","Sp","Oc","No","Dc"];
    let unitIndex = -1;

    while (num >= 1000 && unitIndex < units.length - 1) {
        num /= 1000;
        unitIndex++;
    }

    return num.toFixed(2) + units[unitIndex];
}

function Buy(i) {
    if (gameinfo.cookies >= upgrades[i].price - 1) {
        gameinfo.cookies -= upgrades[i].price
        gameinfo.cps += upgrades[i].value 
        upgrades[i].amount += 1
        upgrades[i].price = Math.round(upgrades[i].bp * Math.pow(gameinfo.taxes, upgrades[i].amount))
        UpdateGui()
    }
}

function PassiveCookies() {
    gameinfo.cookies += gameinfo.cps
    UpdateGui()
}

setInterval(PassiveCookies, 1000)

function CookieClicked() {
    gameinfo.cookies += gameinfo.clickpower
    UpdateGui()
}

cookie.addEventListener("click", CookieClicked)

cookie.addEventListener("mousedown", () => {
    cookie.classList.add("clicked");
});

cookie.addEventListener("mouseup", () => {
    cookie.classList.remove("clicked");
});
