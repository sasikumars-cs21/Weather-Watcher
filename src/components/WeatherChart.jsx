import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import moment from 'moment';

function WeatherChart({ forecast }) {
  const data = forecast.list.slice(0, 8).map(item => ({
    time: moment(item.dt * 1000).format('HH:mm'),
    temp: Math.round(item.main.temp),
    feels_like: Math.round(item.main.feels_like)
  }));

  return (
    <div className="bg-white/20 p-4 rounded-xl backdrop-blur-lg mt-4">
      <h3 className="text-white text-lg font-semibold mb-4">24-Hour Forecast</h3>
      <div className="h-[200px] w-full">
        <ResponsiveContainer>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.2)" />
            <XAxis 
              dataKey="time" 
              stroke="white"
              tick={{ fill: 'white' }}
            />
            <YAxis 
              stroke="white"
              tick={{ fill: 'white' }}
              unit="°C"
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'rgba(255,255,255,0.9)',
                border: 'none',
                borderRadius: '8px'
              }}
            />
            <Line 
              type="monotone" 
              dataKey="temp" 
              stroke="#fff" 
              strokeWidth={2}
              name="Temperature"
            />
            <Line 
              type="monotone" 
              dataKey="feels_like" 
              stroke="#ffd700" 
              strokeWidth={2}
              name="Feels Like"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default WeatherChart;