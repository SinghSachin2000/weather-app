const yourWeatherTab = document.querySelector(".yourweathertab");
const searchWeatherTab = document.querySelector(".searchweathertab");
const search = document.querySelector(".searchweather");
const grantaccess = document.querySelector(".grantLocation");
const grantaccessBtn = document.querySelector(".grantAccessBtn");
const weatherShow = document.querySelector(".weatherShow");

let API_KEY = "d1845658f92b31c64bd94f06f7188c9c"; 

let oldtab = yourWeatherTab;
oldtab.classList.add("current-tab");
grantaccess.classList.add("active")

function switchtab(newtab){
    if(newtab != oldtab){
        oldtab.classList.remove("current-tab");
        oldtab = newtab;
        oldtab.classList.add("current-tab");
    }
    if(searchWeatherTab == newtab){
        weatherShow.classList.remove("active");
        grantaccess.classList.remove("active");
        search.classList.add("active");
    }
    else{
        grantaccess.classList.remove("active");
        search.classList.remove("active");
    }
}


yourWeatherTab.addEventListener("click", () =>{
    switchtab(yourWeatherTab);
    weatherShow.classList.add("active");
});

searchWeatherTab.addEventListener("click", () =>{
    switchtab(searchWeatherTab);
    yourWeatherTab.classList.remove("current-tab")
    searchWeatherTab.classList.add("current-tab")
    searchInput.value ="";

});

grantaccessBtn.addEventListener("click", () =>{
    switchtab(yourWeatherTab);
    getlocation();
    weatherShow.classList.add("active");

});

function getlocation(){
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(livelocationdata);
    }
    else{
        alert("geolacation is not supported by this browser")
    }
}


async function livelocationdata(position){

let lat = position.coords.latitude;
let longi = position.coords.longitude;

const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${longi}&appid=${API_KEY}&units=metric`);
const  data = await response.json();
renderweather(data);

}

function renderweather(weatherInfo){

let placename = document.querySelector(".placeName");
let flag = document.querySelector(".flag");
let condition = document.querySelector(".condition");
let conditionimage = document.querySelector(".conditionimage");
let temp = document.querySelector(".temp");
let wind = document.querySelector(".windspeed");
let humidity = document.querySelector(".humidity");
let cloud = document.querySelector(".cloudyness");

placename.innerHTML = weatherInfo?.name;
flag.src = `https://flagcdn.com/144x108/${weatherInfo?.sys?.country.toLowerCase()}.png`;
condition.innerHTML =  weatherInfo?.weather?.[0]?.description;
conditionimage.src = `http://openweathermap.org/img/w/${weatherInfo?.weather?.[0]?.icon}.png`;
temp.innerHTML = `${weatherInfo?.main?.temp} °C`;
wind.innerHTML = `${weatherInfo?.wind?.speed} m/s`;
humidity.innerHTML = `${weatherInfo?.main?.humidity}%`;
cloud.innerHTML =  `${weatherInfo?.clouds?.all}%`;

 }

//  2nd part --------------------------------------------------------
const searchInput = document.querySelector(".searchHere");
const searchBtn = document.querySelector(".searchBtn");

search.addEventListener("click", (e) => {
    e.preventDefault();
    let cityName = searchInput.value;

    if(cityName === "")
        return;
    else 
        searchbycity(cityName);
})

async function searchbycity(city){

    weatherShow.classList.add("active");
    search.classList.remove("active");
    searchWeatherTab.classList.remove("current-tab");
    yourWeatherTab.classList.add("current-tab");
    grantaccess.classList.remove("active");
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);
        const data = await response.json();
        renderweather(data);
    }
    catch(err) {
        alert("error");
    }
}

