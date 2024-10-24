let input = document.querySelector("#weather");
let btn = document.querySelector("button")
let img = document.querySelector("img")
let cityh2 = document.querySelector(".city")
let degrees = document.querySelector(".degrees")
let condition = document.querySelector(".condition")
let time = document.querySelector(".time")
let primaryContainer = document.querySelector(".container")
let container = document.querySelector(".cont1")
let loading = document.querySelector(".loading")

btn.addEventListener("click", (e) => {
  e.preventDefault()
  weather(input.value)
  input.value = ""
}) 

async function weather(city) {
 if (city == "") city = "Moscow" 
try {
  loadingAll()
let weatherAPI = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?unitGroup=metric&key=MAWF42H6H9JFUJD7D4KE55FWQ&contentType=json`)
let weatherObj = await weatherAPI.json()
let celsius = Math.round(weatherObj.currentConditions.temp)
let farenh = Math.round((celsius * 9/5) + 32)
let humidity = Math.round(weatherObj.currentConditions.humidity)
let dateTime = weatherObj.currentConditions.datetime.slice(0, 5)
let conditions = weatherObj.currentConditions.conditions
let day = new Date().getDay();
let dayName = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Satudray"]
setBackground(dateTime)

primaryContainer.setAttribute("id", "visible")
loading.setAttribute("id", "")
cityh2.textContent = weatherObj.resolvedAddress
degrees.textContent = celsius + "°C | " + farenh + "°F"
img.src = `./images/${conditions}.png`
condition.textContent = conditions
time.textContent = dayName[day] + " " + dateTime
console.log("Humidity: " + humidity + "%")
} catch {
  alert("Not correct city")
 }
}

function setBackground(dateTime) {
  if (dateTime.slice(0,2) >= 18) {
    container.className += " evening"
  } else {
    container.className += " morning"
 }
}

function loadingAll() {
  primaryContainer.setAttribute("id", "")
  loading.setAttribute("id", "visible")
}