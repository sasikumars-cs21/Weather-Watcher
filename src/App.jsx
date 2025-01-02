import { useState, useEffect } from 'react';
import { getWeatherByCity, getHourlyForecast } from './services/weatherApi';
import WeatherCard from './components/WeatherCard';
import WeatherChart from './components/WeatherChart';
import SearchBar from './components/SearchBar';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorMessage from './components/ErrorMessage';
import { getWeatherTheme } from './utils/weatherThemes';

function App() {
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async (city) => {
    try {
      setLoading(true);
      setError(null);
      const weatherData = await getWeatherByCity(city);
      setWeather(weatherData);
      
      // Get forecast data using coordinates
      const forecastData = await getHourlyForecast(
        weatherData.coord.lat,
        weatherData.coord.lon
      );
      setForecast(forecastData);
    } catch (err) {
      setError(err.message);
      setWeather(null);
      setForecast(null);
    } finally {
      setLoading(false);
    }
  };

  const theme = weather ? getWeatherTheme(weather.weather[0].icon) : getWeatherTheme('default');

  return (
    <>
    {/* Background Video */}
<video
  autoPlay
  loop
  muted
  className="fixed top-0 left-0 w-full h-full object-cover -z-10"
>
  <source src={`${import.meta.env.BASE_URL}videos/bg-1.mp4`} type="video/mp4" />
</video>

    <div className={`min-h-screen  ${theme.gradient} p-4 transition-all duration-500`}>
      <div className="max-w-4xl mx-auto pt-10">
        <h1 className="text-4xl font-bold text-white text-center mb-8 flex items-center justify-center gap-2">
          Weather App {theme.icon}
        </h1>
        
        <SearchBar onSearch={handleSearch} isLoading={loading} />
        
        <div className="space-y-4">
          {loading && <LoadingSpinner />}
          {error && <ErrorMessage message={error} />}
          
          {weather && !loading && !error && (
            <>
              <WeatherCard weather={weather} />
              {forecast && <WeatherChart forecast={forecast} />}
            </>
          )}
          
          {!weather && !loading && !error && (
            <div className="text-center text-white text-lg">
              Search for a city to see the weather
            </div>
          )}
        </div>
      </div>
    </div>
    </>
  );
}

export default App;