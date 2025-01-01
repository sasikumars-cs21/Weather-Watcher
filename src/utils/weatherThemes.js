// utils/weatherThemes.js
export const getWeatherTheme = (icon) => {
  switch (icon) {
    case '01d': // Clear sky day
      return { gradient: 'from-blue-500 via-blue-600 to-blue-700', icon: '☀️' };
    case '01n': // Clear sky night
      return { gradient: 'from-indigo-800 via-indigo-900 to-indigo-900', icon: '🌙' };
    case '02d': // Few clouds day
      return { gradient: 'from-orange-400 to-orange-600', icon: '⛅' };
    case '02n': // Few clouds night
      return { gradient: 'from-purple-800 via-purple-900 to-purple-900', icon: '⛅' };
    case '03d': // Scattered clouds
      return { gradient: 'from-gray-300 to-gray-500', icon: '☁️' };
    case '03n': // Scattered clouds night
      return { gradient: 'from-gray-800 to-gray-900', icon: '☁️' };
    // Add other weather conditions based on OpenWeather icons
    default:
      return { gradient: 'from-gray-700 via-gray-800 to-gray-900', icon: '🌍' }; // Default theme
  }
};
