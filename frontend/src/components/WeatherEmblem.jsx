import RainDrop from '../assets/RAIN_DROP.svg'

const WeatherEmblem = ({ city, weather, icon }) => {

  return (
    <div className="flex flex-col w-full text-center gap-2 py-3 bg-widgets">
      <h1 className='text-xl font-medium text-primary'>{city}</h1>
      <div className="flex flex-row justify-center gap-2 font-semibold text-7xl text-primary">
        {Math.round(weather.temperature.value)}°
        <img src={icon} alt="weather icon" className='w-16' />
      </div>
      <div className='flex flex-row justify-center text-xl gap-1 text-rain'>
        <img src={RainDrop} alt="raindrop" />
        {weather.precipitationamount.value.toFixed(1)} {weather.precipitationamount.unit}
      </div>
    </div>
  )
}

export default WeatherEmblem