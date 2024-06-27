 async function getWeather(country){
    let response = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=3c91b11d4dcb4bed830114706242606&q=${country}&days=3`);
    let finalres = await response.json()
    console.log(finalres);
    displayWeather(finalres);
}
getWeather();
function displayWeather(data){
    let dataArr=data.forecast.forecastday;
    console.log(dataArr);
    let x=``;
    for( i=0;i<dataArr.length;i++){
        let dateNow= new Date(dataArr[i].date);
        let day=dateNow.toLocaleString("en-us",{weekday:"long"});
        x += ` <div class="today flex-grow-1 m-2">
                    <div class="innerCard bg-primary-subtle rounded-3 py-2 px-4">
                        <p class="weekDay text-center fw-bolder text-black ">${day}</p>
                        <div class="d-flex justify-content-between">
                            <div class="text-center">
                                <p id="maxTemp" class="temp-type fw-bold m-1">Max Temp</p>
                                <p class="">${dataArr[i].day.maxtemp_c}</p>
                            </div>
                            <div class="text-center">
                                <p id="avgTemp" class="temp-type fw-bold m-1">Avg Temp</p>
                                <p class="">${dataArr[i].day.avgtemp_c}</p>
                            </div>
                            <div class="text-center m-0 p-0">
                                <p id="minTemp" class="temp-type fw-bold m-1">Min Temp</p>
                                <p class="">${dataArr[i].day.mintemp_c}</p>
                                <p class=""></p>
                            </div>
                        </div>
                        <p class="text-center fw-semibold text-dark-emphasis m-0 p-0">${dataArr[i].day.condition.text}</p>
                        <img src="https://${dataArr[i].day.condition.icon}" width="50px" class="m-auto d-block" alt="">
                    </div>
                </div>`
    }
    document.querySelector(".weatherCards").innerHTML=x;
    document.querySelector("#location").innerHTML=data.location.country;
    document.querySelector(".today-weather").innerHTML=` <h1 class="cityName fw-bolder fs-3">${data.location.name}</h1>
        <h2 class="fs-5 fw-bolder display-4 " id="weatherTemp">${data.current.temp_c}</h2>
        `;

}
let findLocation=document.querySelector("#findLocation");
findLocation.addEventListener("change",function(){
    getWeather(findLocation.value);
})