const cityForm = document.querySelector('form');
const cards = document.querySelector('.cards');
const details = document.querySelector('.details');
const time = document.querySelector('img.time');
const icon = document.querySelector('.icon img');

const updateUI = (data) =>{
    //destructure properties
    const {cityDets, weather } = data;

    //update details template

     weather.forEach(day =>{
         let date = String(day.Date);
         date = date.slice(0, 10);
        const html= `
        <div class="card shadow-lg rounded">
            <img src="img/day.svg" class="time card-img-top" alt="">
            <div class="text-muted text-uppercase text-center details">
            <h5 class="my-3 text-center">${cityDets.EnglishName}</h5>
            <div class="display-4 text-center my-4">
                <h1 class="date">${date}</h1>
                <h5>Day</h5>
                <span>${day.Temperature.Maximum.Value}</span>
                <span>&deg;F</span>
                <span>${day.Day.IconPhrase}</span>
    
                <h5>Night</h5>
                <span>${day.Temperature.Minimum.Value}</span>
                <span>&deg;F</span>
                <span>${day.Night.IconPhrase}</span>
            </div>
            </div>
        </div>   
    `;
    cards.innerHTML += html;
    });
    
    //remove the d-none class if present
    if(cards.classList.contains('d-none')){
        cards.classList.remove('d-none');
    }
};

const updateCity = async (city) =>{

    const cityDets = await getCity(city);
    const weather = await getWeather(cityDets.Key);

    return {cityDets,weather};

};

cityForm.addEventListener('submit', e =>{
    //prevent default action
    e.preventDefault();

    //Get City value
    const city = cityForm.city.value.trim();
    cityForm.reset();


    //update the ui with new city
    updateCity(city)
    .then(data => updateUI(data))
    .then(cards.innerHTML='')
    .catch(err => console.log(err));


    //set local storage
    localStorage.setItem('city', city);
});


if(localStorage.getItem('city')){
    updateCity(localStorage.getItem('city'))
    .then(data => updateUI(data))
    .catch(err => console.log(err));
}; 