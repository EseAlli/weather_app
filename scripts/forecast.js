const key = 'SEF3Qyud1PlcYoHAi7lkHdw7DYbcSrap';

//get Weather information
const getWeather = async (id) =>{

    const base = 'http://dataservice.accuweather.com/forecasts/v1/daily/5day/';
    const query = `${id}?apikey=${key}`;

    const response = await fetch(base + query);
    const data = await response.json();
  
    const {DailyForecasts} = data;
    return DailyForecasts;
};



// Get City Info
const getCity = async (city) => {

    const base = 'http://dataservice.accuweather.com/locations/v1/cities/search';
    const query = `?apikey=${key}&q=${city}`;

    const response = await fetch(base + query);
    const data = await response.json();

     return data[0];

};
