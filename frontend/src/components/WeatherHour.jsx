const WeatherHour = ({ weather, icon }) => {
  const time = new Date(weather.time)

  return (
    <li className="flex justify-between bg-widgets rounded-xl px-8 h-11 items-center flex-grow">
      <span className="font-semibold text-primary text-xl">{time.getHours()}:{time.getMinutes() < 10 ? `0${time.getMinutes()}` : time.getMinutes()}</span>
      <img src={icon} alt="weather icon" className="w-8" />
      <span className="font-medium text-primary text-xl">{Math.round(weather.temperature.value)}°</span>
      <span className="text-rain font-medium text-xl">{weather.precipitationamount.value.toFixed(1)} {weather.precipitationamount.unit}</span>
    </li>
  )
}

export default WeatherHour