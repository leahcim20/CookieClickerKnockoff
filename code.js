const cookie = document.getElementById("cookie");
const text = document.getElementById("text");
const clickpowertext = document.getElementById("clickpower");
let gameinfo = {cookies: 0, taxes: 1.15, clickpower: 1, cps : 0}
let upgrades = [
    {amount: 0, basePrice: 15, upgrade: document.getElementById("cursor"), value: 0.1, name: "Cursor"},
    {amount: 0, basePrice: 100, upgrade: document.getElementById("grandma"), value: 1, name: "Grandma"},
    {amount: 0, basePrice: 1100, upgrade: document.getElementById("farm"), value: 4, name: "Farm"}
]

for (let i = 0; i < upgrades.length; i++) {
    upgrades[i].price = upgrades[i].basePrice
}

UpdateGui()

function UpdateGui() {
    for (let i = 0; i < upgrades.length; i++) {
        upgrades[i].upgrade.innerText = upgrades[i].name + " Price: " + upgrades[i].price + " Amount: " + upgrades[i].amount
    }
    text.innerText = gameinfo.cookies.toLocaleString()
    clickpowertext.innerText = gameinfo.cps.toLocaleString()
}

function Buy(i) {
    if (gameinfo.cookies >= upgrades[i].price) {
        gameinfo.cookies -= upgrades[i].price
        gameinfo.cps += upgrades[i].value 
        upgrades[i].amount += 1
        upgrades[i].price = Math.round(upgrades[i].basePrice * Math.pow(gameinfo.taxes, upgrades[i].amount))
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
for (let i = 0; i < upgrades.length; i++) {
    upgrades[i].upgrade.addEventListener("click", () => Buy(i))
}