const weatherApiKey = '7111e0330db1c901da17d4e52da93ee5';
const weatherApiEndpoint = 'https://api.openweathermap.org/data/2.5/forecast?';
const searchBtn = $('#search');
const recent = $('#recentSearches');
const searchTerms = $('#citySearch')

const fetchURL = (url) => {
    fetch(url)
        .then((response) => {
            if (!response.ok) {
                throw response.json();
            }
    
            return response.json();
        })
        .then((data) => {
            console.log(data);
        })
}

const initialLoad = () => {
    if(localStorage.getItem('lastSearch')) {
        return;
    }
}

searchBtn.click((event) => {
    event.preventDefault();

    let url;
    let city;
    let zipCode;
    let termsCleanup = searchTerms[0].value.replace(/,/g,'');
    let termsArray = termsCleanup.split(' ');

    if(termsArray[3]) {
        city = `${termsArray[0]}%20${termsArray[1]}%20${termsArray[2]}`;
        zipCode = termsArray[3];
        url = `${weatherApiEndpoint}q=${city}&zip=${zipCode},US&appid=${weatherApiKey}&units=imperial`;
        fetchURL(url);
    }
    else if(termsArray[2]) {
        city = `${termsArray[0]}%20${termsArray[1]}`;
        zipCode = termsArray[2];
        url = `${weatherApiEndpoint}q=${city}&zip=${zipCode},US&appid=${weatherApiKey}&units=imperial`;
        fetchURL(url);
    }
    else if(termsArray[1]) {
        city = termsArray[0];
        zipCode = termsArray[1];
        url = `${weatherApiEndpoint}q=${city}&zip=${zipCode},US&appid=${weatherApiKey}&units=imperial`;
        fetchURL(url);
    }
    else {
        console.log('Please enter a city and a zip code');
    }

})
