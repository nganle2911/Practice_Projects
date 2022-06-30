const API_ID = '9ed786f255e3eca41897fbb976f9db1a';
const DEFAULT_VALUE = '--';  

const searchInput = document.querySelector('#search-input');

// Elements displayed in info-wrapper section
const cityName = document.querySelector('.city-name'); 
const weatherState = document.querySelector('.weather-state');
const weatherIcon = document.querySelector('.weather-icon');
const temp = document.querySelector('.temperature');

// Elements displayed in additional section
const sunrise = document.querySelector('.sunrise');
const sunset = document.querySelector('.sunset');
const humidity = document.querySelector('.humidity');
const wind = document.querySelector('.wind-speed');

searchInput.addEventListener('change', (e) => {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${e.target.value}&appid=${API_ID}&units=metric`).then(async res => {
        const data = await res.json(); 
        console.log('[Search Input]', data);

        cityName.innerHTML = data.name || DEFAULT_VALUE; 
        weatherState.innerHTML = data.weather[0].description || DEFAULT_VALUE;
        weatherIcon.setAttribute('src', `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`) || DEFAULT_VALUE;
        temp.innerHTML = Math.round(data.main.temp) || DEFAULT_VALUE;

        sunrise.innerHTML = moment.unix(data.sys.sunrise).format('H:mm') || DEFAULT_VALUE;
        sunset.innerHTML = moment.unix(data.sys.sunset).format('H:mm') || DEFAULT_VALUE;
        humidity.innerHTML = data.main.humidity || DEFAULT_VALUE;
        wind.innerHTML = (data.wind.speed * 3.6).toFixed(2) || DEFAULT_VALUE; 
    });
});