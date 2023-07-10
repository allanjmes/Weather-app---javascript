const key = "AAHxnNSxdliHt3Vo2ovYl6p9ztm4u1El";

// getting weather
const getWeather = async (id) => {
    const baseUrl = "http://dataservice.accuweather.com/currentconditions/v1/";
    const query = `${id}?apikey=${key}&details=true`;
  
    const res = await fetch(baseUrl + query);
    const data = await res.json();
  
    return data[0];
};

// getting forecast
const getForecast = async (id) => {
  const baseUrl = "http://dataservice.accuweather.com/forecasts/v1/daily/1day/";
  const query = `${id}?apikey=${key}&details=true&metric=true`;

  const res = await fetch(baseUrl + query);
  const data = await res.json();

  return data;
};
 
// getting city
const getCity = async (city) => {
    const baseUrl =
      "http://dataservice.accuweather.com/locations/v1/cities/search";
    const query = `?apikey=${key}&q=${city}`;
  
    const res = await fetch(baseUrl + query);
    const data = await res.json();
  
    return data[0];
};