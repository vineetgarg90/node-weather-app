weatherForm = document.querySelector('#weatherForm')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const location = document.querySelector('#address').value;
    getWeather(location);
})


getWeather = (location) => {
    document.querySelector('#error').textContent = '';
    document.querySelector('#location').textContent = 'searching...'
    document.querySelector('#forecast').textContent = ''

    fetch('http://localhost:3000/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if(data.error){
                document.querySelector('#location').textContent = ''
                document.querySelector('#error').textContent = data.error
            }
            else{
                document.querySelector('#location').textContent = data.location
                document.querySelector('#forecast').textContent = data.forecast
            }
        })
    })
}
