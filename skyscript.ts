async function getWeather() {
  const city = document.getElementById('cityInput').value.trim();
  const apiKey = 'YOUR_API_KEY'; // Replace with your OpenWeatherMap API key

  if (!city) {
    alert('Please enter a city name');
    return;
  }

  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
    );
    const data = await response.json();

    if (data.cod !== 200) {
      alert('City not found. Try again.');
      return;
    }

    document.getElementById('cityName').innerText = data.name;
    document.getElementById('temp').innerText = `🌡️ ${data.main.temp} °C`;
    document.getElementById('desc').innerText = `📋 ${data.weather[0].description}`;
    document.getElementById('humidity').innerText = `💧 Humidity: ${data.main.humidity}%`;
    document.getElementById('weatherIcon').src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

    document.getElementById('weatherBox').classList.remove('hidden');
  } catch (err) {
    alert('Something went wrong. Please try again.');
  }
}
