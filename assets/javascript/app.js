const cityForm = document.querySelector("form");
const locationDetails = document.querySelector(".left");
const dateTimeDetails = document.querySelector(".right");
const tempDetails = document.querySelector(".weather-temp");
const weatherContextDetails = document.querySelector(".weather-ctx-wrapper");
const realFeelDetails = document.querySelector(".real-feel-data-container");
const forecastTodayHeadline = document.querySelector(".forecast-headline-today");
const forecastTonightHeadline = document.querySelector(".forecast-headline-tonight");
const todayWeather = document.querySelector(".today-weather-ctx");
const tonightWeather = document.querySelector(".tonight-weather-ctx");
const todayDate = document.querySelector(".forecast-today-date");
const tonightDate = document.querySelector(".forecast-tonight-date");
const dayProbability = document.querySelector(".probability-today");
const nightProbability = document.querySelector(".probability-tonight");

const updateUI = (data) => {
  const cityDets = data.cityDetails;
  const weather = data.cityWeather;
  const localDate = new Date(weather.LocalObservationDateTime);
  const forecastDets = data.cityForecast;
  const forecastData = forecastDets.DailyForecasts[0];
  
  //updating location details
  locationDetails.innerHTML = `
    <span class="container-title">Current Weather</span>
    <span class="location-details">${cityDets.EnglishName}, ${cityDets.AdministrativeArea.EnglishName}</span>
    <span class="country-details">${cityDets.Country.EnglishName}</span>
  `;

  // updating time details -- start
    
  const dateOptions = { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric' };
  const weekdayDate = { weekday: 'long' };

  dateTimeDetails.innerHTML = `
    <span class="date">${localDate.toLocaleDateString('en-US', weekdayDate)}</span>   
  `;
  // updating time details -- end

  // updating temperature and temperature phrase
  weatherContextDetails.innerHTML = `
    <span class="weather-temp">${weather.Temperature.Metric.Value}°C</span>
    <span class="weather-context">${weather.WeatherText}</span>
  `;

  // updating real feel temperature
  realFeelDetails.innerHTML = `
    <span class="real-feel-temp">Real Feel: ${weather.RealFeelTemperature.Metric.Value}°C</span>
    <span class="real-feel-phrase">"${weather.RealFeelTemperature.Metric.Phrase}"</span>
  `;

  // updating weather forecast - day
  forecastTodayHeadline.innerHTML = `
    <span class="forecast-headline-text">${forecastData.Day.LongPhrase}</span>
  `;

  const forecastTodayDate = new Date(forecastData.Date);
  todayDate.innerHTML = `
    <span class="date">${forecastTodayDate.toLocaleDateString('en-US', dateOptions[0])}</span>
  `;

  todayWeather.innerHTML = `
    <span class="weather-context">${forecastData.Day.IconPhrase}</span>
  `;

  // checking if theres precipitation present - day
  if (forecastData.Day.HasPrecipitation) {
    dayProbability.innerHTML = `
      <span class="precipitation-probability">Precipitation Probability: ${forecastData.Day.PrecipitationProbability}%</span>
      <span class="thunderstorm-probability">Thunderstorm Probability: ${forecastData.Day.ThunderstormProbability}%</span>
      <span class="precipitation-type">${forecastData.Day.HoursOfPrecipitation} hour/s of ${forecastData.Day.PrecipitationIntensity} ${forecastData.Day.PrecipitationType}</span>
    `;
  } else {
    dayProbability.innerHTML = `
      <span class="precipitation-probability">Precipitation Probability: ${forecastData.Day.PrecipitationProbability}%</span>
      <span class="thunderstorm-probability">Thunderstorm Probability: ${forecastData.Day.ThunderstormProbability}%</span>
    `;
  };

  // updating weather forecast - night
  forecastTonightHeadline.innerHTML = `
    <span class="forecast-headline-text">${forecastData.Night.LongPhrase}</span>
  `;

  const forecastTonightDate = new Date(forecastData.Date);
  tonightDate.innerHTML = `
    <span class="date">${forecastTonightDate.toLocaleDateString('en-US', dateOptions)}</span>
  `;

  tonightWeather.innerHTML = `
    <span class="weather-context">${forecastData.Night.IconPhrase}</span>
  `;

  // checking if theres precipitation present - night
  if (forecastData.Night.HasPrecipitation) {
    nightProbability.innerHTML = `
      <span class="precipitation-probability">Precipitation Probability: ${forecastData.Night.PrecipitationProbability}%</span>
      <span class="thunderstorm-probability">Thunderstorm Probability: ${forecastData.Night.ThunderstormProbability}%</span>
      <span class="precipitation-type">${forecastData.Night.HoursOfPrecipitation} hour/s of ${forecastData.Night.PrecipitationIntensity} ${forecastData.Night.PrecipitationType}</span>
    `;
  } else {
    nightProbability.innerHTML = `
      <span class="precipitation-probability">Precipitation Probability: ${forecastData.Night.PrecipitationProbability}%</span>
      <span class="thunderstorm-probability">Thunderstorm Probability: ${forecastData.Night.ThunderstormProbability}%</span>
    `;
  };
  
  console.log(forecastDets);
  console.log(forecastData);
  console.log(weather);

};
  
const updateCity = async(city) => {
  const cityDetails = await getCity(city);
  const cityWeather = await getWeather(cityDetails.Key);
  const cityForecast = await getForecast(cityDetails.Key);
  
  return {
    cityDetails: cityDetails,
    cityWeather: cityWeather,
    cityForecast: cityForecast,
  };
};
  
cityForm.addEventListener("submit", (e) => {
  //preventing default
  e.preventDefault();
  
  //getting city value
  const city = cityForm.city.value;
  cityForm.reset();
  
  //updating UI
  updateCity(city)
    .then((data) => {
      updateUI(data);
    })
    .catch((err) => console.log(err));

});