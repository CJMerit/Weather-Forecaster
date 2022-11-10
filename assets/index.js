//API variables
const weatherApiKey = '7111e0330db1c901da17d4e52da93ee5';
const currentWeather = 'https://api.openweathermap.org/data/2.5/weather?';
const weatherForecast = 'https://api.openweathermap.org/data/2.5/forecast?';
//document elements
const searchBtn = $('#searchBtn');
const recent = $('#recentSearches');
const searchTerms = $('#citySearch');
const cityDisplay = $('#city');
const cTemp = $('#temp');
const cWind = $('#wind');
const cHumid = $('#humidity');
const dayOne = $('#day-one');
const dayTwo = $('#day-two');
const dayThree = $('#day-three');
const dayFour = $('#day-four');
const dayFive = $('#day-five');

let currentDate = dayjs().format('M/D/YYYY');

const getAverages = (array) => {
    let sum = 0;
    for (let i = 0; i < array.length; i++) {
        sum += array[i]
    }
    let average = (sum/array.length).toFixed(2)
    return average;
}

const initialLoad = () => {
    cityDisplay[0].textContent = `(${currentDate})`;
    dayOne[0].children[0].textContent = dayjs().add(1, 'day').format('M/D/YYYY');
    dayTwo[0].children[0].textContent = dayjs().add(2, 'day').format('M/D/YYYY');
    dayThree[0].children[0].textContent = dayjs().add(3, 'day').format('M/D/YYYY');
    dayFour[0].children[0].textContent = dayjs().add(4, 'day').format('M/D/YYYY');
    dayFive[0].children[0].textContent = dayjs().add(5, 'day').format('M/D/YYYY');

    dayOne[0].children[2].textContent = `High:`;
    dayOne[0].children[3].textContent = `Low:`;
    dayOne[0].children[4].textContent = `Wind:`;
    dayOne[0].children[5].textContent = `Humidity:`;

    dayTwo[0].children[2].textContent = `High:`;
    dayTwo[0].children[3].textContent = `Low:`;
    dayTwo[0].children[4].textContent = `Wind:`;
    dayTwo[0].children[5].textContent = `Humidity:`;

    dayThree[0].children[2].textContent = `High:`;
    dayThree[0].children[3].textContent = `Low:`;
    dayThree[0].children[4].textContent = `Wind:`;
    dayThree[0].children[5].textContent = `Humidity:`;

    dayFour[0].children[2].textContent = `High:`;
    dayFour[0].children[3].textContent = `Low:`;
    dayFour[0].children[4].textContent = `Wind:`;
    dayFour[0].children[5].textContent = `Humidity:`;

    dayFive[0].children[2].textContent = `High:`;
    dayFive[0].children[3].textContent = `Low:`;
    dayFive[0].children[4].textContent = `Wind:`;
    dayFive[0].children[5].textContent = `Humidity:`;
}

const getRecentSearches = () => {
    let keys = Object.keys(localStorage);

    for (let i = 0; i < keys.length; i++) {
        let checkKey = JSON.parse(localStorage.getItem(keys[i]));
        if(checkKey.city && checkKey.url && checkKey.zipCode) {
            let recentSearchDisplay = $('<button>');
            recentSearchDisplay.attr('type', 'button')
            recentSearchDisplay.attr('class', 'btn m-2')
            recentSearchDisplay[0].textContent = keys[i].replace(/%20/g,' ');
            recent.append(recentSearchDisplay);
        }
    }

}

const displayForecast = (forecast) => {
    dayOne[0].children[2].textContent = `High: ${forecast.dayOneHigh}°F`;
    dayOne[0].children[3].textContent = `Low: ${forecast.dayOneLow}°F`;
    dayOne[0].children[4].textContent = `Wind: ${forecast.dayOneWindAvg} MPH`;
    dayOne[0].children[5].textContent = `Humidity: ${forecast.dayOneHumidAvg} %`;

    dayTwo[0].children[2].textContent = `High: ${forecast.dayTwoHigh}°F`;
    dayTwo[0].children[3].textContent = `Low: ${forecast.dayTwoLow}°F`;
    dayTwo[0].children[4].textContent = `Wind: ${forecast.dayTwoWindAvg} MPH`;
    dayTwo[0].children[5].textContent = `Humidity: ${forecast.dayTwoHumidAvg} %`;

    dayThree[0].children[2].textContent = `High: ${forecast.dayThreeHigh}°F`;
    dayThree[0].children[3].textContent = `Low: ${forecast.dayThreeLow}°F`;
    dayThree[0].children[4].textContent = `Wind: ${forecast.dayThreeWindAvg} MPH`;
    dayThree[0].children[5].textContent = `Humidity: ${forecast.dayThreeHumidAvg} %`;

    dayFour[0].children[2].textContent = `High: ${forecast.dayFourHigh}°F`;
    dayFour[0].children[3].textContent = `Low: ${forecast.dayFourLow}°F`;
    dayFour[0].children[4].textContent = `Wind: ${forecast.dayFourWindAvg} MPH`;
    dayFour[0].children[5].textContent = `Humidity: ${forecast.dayFourHumidAvg} %`;

    dayFive[0].children[2].textContent = `High: ${forecast.dayFiveHigh}°F`;
    dayFive[0].children[3].textContent = `Low: ${forecast.dayFiveLow}°F`;
    dayFive[0].children[4].textContent = `Wind: ${forecast.dayFiveWindAvg} MPH`;
    dayFive[0].children[5].textContent = `Humidity: ${forecast.dayFiveHumidAvg} %`;
}

const fetchForecast = (forecasturl) => {
    let dayOneTemps = [];
    let dayOneWind = [];
    let dayOneHumid = [];
    let dayTwoTemps = [];
    let dayTwoWind = [];
    let dayTwoHumid = [];
    let dayThreeTemps = [];
    let dayThreeWind = [];
    let dayThreeHumid = [];
    let dayFourTemps = [];
    let dayFourWind = [];
    let dayFourHumid = [];
    let dayFiveTemps = [];
    let dayFiveWind = [];
    let dayFiveHumid = [];
    fetch(forecasturl)
        .then((response) => {
            if (!response.ok) {
                initialLoad();
                throw response.json();
            }
    
            return response.json();
        })
        .then((data) => {
            console.log(data);
            for (let i = 0; i < 40; i++) {
                let forecastDate = data.list[i].dt_txt.split(' ')[0];
                switch(forecastDate) {
                    case dayjs().add(1, 'day').format('YYYY-M-D'):
                        dayOneTemps.push(data.list[i].main.temp_max);
                        dayOneTemps.push(data.list[i].main.temp_min);
                        dayOneWind.push(data.list[i].wind.speed);
                        dayOneHumid.push(data.list[i].main.humidity);
                        break;
                    case dayjs().add(2, 'day').format('YYYY-M-D'):
                        dayTwoTemps.push(data.list[i].main.temp_max);
                        dayTwoTemps.push(data.list[i].main.temp_min);
                        dayTwoWind.push(data.list[i].wind.speed);
                        dayTwoHumid.push(data.list[i].main.humidity);
                        break;
                    case dayjs().add(3, 'day').format('YYYY-M-D'):
                        dayThreeTemps.push(data.list[i].main.temp_max);
                        dayThreeTemps.push(data.list[i].main.temp_min);
                        dayThreeWind.push(data.list[i].wind.speed);
                        dayThreeHumid.push(data.list[i].main.humidity);
                        break;
                    case dayjs().add(4, 'day').format('YYYY-M-D'):
                        dayFourTemps.push(data.list[i].main.temp_max);
                        dayFourTemps.push(data.list[i].main.temp_min);
                        dayFourWind.push(data.list[i].wind.speed);
                        dayFourHumid.push(data.list[i].main.humidity);
                        break;
                    case dayjs().add(5, 'day').format('YYYY-M-D'):
                        dayFiveTemps.push(data.list[i].main.temp_max);
                        dayFiveTemps.push(data.list[i].main.temp_min);
                        dayFiveWind.push(data.list[i].wind.speed);
                        dayFiveHumid.push(data.list[i].main.humidity);
                        break;
                    default:
                        break;
                }
                
            }

            let forecastObj = {
                dayOneHigh: Math.max(...dayOneTemps),
                dayOneLow: Math.min(...dayOneTemps),
                dayOneWindAvg: getAverages(dayOneWind),
                dayOneHumidAvg: getAverages(dayOneHumid),

                dayTwoHigh: Math.max(...dayTwoTemps),
                dayTwoLow: Math.min(...dayTwoTemps),
                dayTwoWindAvg: getAverages(dayTwoWind),
                dayTwoHumidAvg: getAverages(dayTwoHumid),

                dayThreeHigh: Math.max(...dayThreeTemps),
                dayThreeLow: Math.min(...dayThreeTemps),
                dayThreeWindAvg: getAverages(dayThreeWind),
                dayThreeHumidAvg: getAverages(dayThreeHumid),

                dayFourHigh: Math.max(...dayFourTemps),
                dayFourLow: Math.min(...dayFourTemps),
                dayFourWindAvg: getAverages(dayFourWind),
                dayFourHumidAvg: getAverages(dayFourHumid),

                dayFiveHigh: Math.max(...dayFiveTemps),
                dayFiveLow: Math.min(...dayFiveTemps),
                dayFiveWindAvg: getAverages(dayFiveWind),
                dayFiveHumidAvg: getAverages(dayFiveHumid)
            }

            displayForecast(forecastObj);
        })
}

const fetchCurrent = (searchObj) => {
    fetch(searchObj.url)
        .then((response) => {
            if (!response.ok) {
                initialLoad();
                throw response.json();
            }
    
            return response.json();
        })
        .then((data) => {
            localStorage.setItem(`${searchObj.city}`, JSON.stringify(searchObj));
            let recentSearchDisplay = $('<button>');
            recentSearchDisplay.attr('type', 'button')
            recentSearchDisplay.attr('class', 'btn m-2')
            recentSearchDisplay[0].textContent = searchObj.city.replace(/%20/g,' ');
            recent.append(recentSearchDisplay);

            let cityName = data.name;
            let currentTemp = `${data.main.temp}°F`;
            let currentWind = `${data.wind.speed} MPH`;
            let currentHumid = `${data.main.humidity} %`

            cityDisplay[0].textContent = `${cityName} (${currentDate})`;
            cTemp[0].textContent = currentTemp;
            cWind[0].textContent = currentWind;
            cHumid[0].textContent = currentHumid;
            
            let forecastURL = `${weatherForecast}q=${cityName}&zip=${searchObj.zipCode}&appid=${weatherApiKey}&units=imperial`;
            fetchForecast(forecastURL);
        })
}

searchBtn.click((event) => {
    event.preventDefault();

    let url;
    let city;
    let zipCode;
    let termsCleanup = searchTerms[0].value.replace(/,/g,'');
    let termsArray = termsCleanup.split(' ');

    if(termsArray[3]) {
        let lastSearch = {
            city: `${termsArray[0]}%20${termsArray[1]}%20${termsArray[2]}`,
            zipCode: termsArray[3],
            url: `${currentWeather}q=${termsArray[0]}%20${termsArray[1]}%20${termsArray[2]}&zip=${termsArray[3]}&appid=${weatherApiKey}&units=imperial`
        }
        fetchCurrent(lastSearch);
    }
    else if(termsArray[2]) {
        let lastSearch = {
            city: `${termsArray[0]}%20${termsArray[1]}`,
            zipCode: termsArray[2],
            url: `${currentWeather}q=${termsArray[0]}%20${termsArray[1]}&zip=${termsArray[2]}&appid=${weatherApiKey}&units=imperial`
        }
        fetchCurrent(lastSearch);
    }
    else if(termsArray[1]) {
        let lastSearch = {
            city: termsArray[0],
            zipCode: termsArray[1],
            url: `${currentWeather}q=${termsArray[0]}&zip=${termsArray[1]}&appid=${weatherApiKey}&units=imperial`
        }
        fetchCurrent(lastSearch);
    }
    else {
        console.log('Please enter a city and a zip code');
    }

})

initialLoad();
getRecentSearches();
recent.click((event) => {
    if (event.target.classList[0] !== 'btn') {
        return;
    }
    else {
        let getSearch = JSON.parse(localStorage.getItem(`${event.target.textContent.replace(/ /g,'%20')}`));
        fetchCurrent(getSearch);
    }
})