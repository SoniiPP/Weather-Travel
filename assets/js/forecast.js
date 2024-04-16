const apiKey = "5f2df38a3d319841b9713aa74fcff4ff";
const apiUrl ="https://api.openweathermap.org/data/2.5/forecast?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");


async function checkWeather(City){
    const response = await fetch(apiUrl + City + `&appid=${apiKey}`);

    if (response.status == 404){
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";
    }else{
        var data = await response.json();


    document.querySelector(".city").innerHTML = data.city.name;
    document.querySelector(".temp").innerHTML = Math.round(data.list[0].main.temp) + "°c";
    document.querySelector(".humidity").innerHTML = data.list[0].main.humidity + "%";
    document.querySelector(".wind").innerHTML = data.list[0].wind.speed + "Km/h";
 
    if (data.list[0].weather[0].main == "Clouds"){

        weatherIcon.src = "assets/images/clouds.png";
    } 
    else if(data.list[0].weather[0].main == "Clear"){
        weatherIcon.src = "assets/images/clear.png";
    }
    else if(data.list[0].weather[0].main == "Drizzle"){
        weatherIcon.src = "assets/images/drizzle.png";
    }
    else if(data.list[0].weather[0].main == "Mist"){
        weatherIcon.src = "assets/images/mist.png";

}

  document.querySelector(".weather").style.display = "block";
  document.querySelector(".error").style.display = "none";


    }
    
}

searchBtn.addEventListener("click", ()=>{
    checkWeather(searchBox.value);  
});

