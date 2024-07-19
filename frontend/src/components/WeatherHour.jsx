const WeatherHour = ({ weather, icon }) => {
  const time = new Date(weather.time)

  return (
    <li className="flex justify-between bg-widgets rounded-xl px-8 h-11 items-center flex-grow">
      <span className="font-semibold text-primary">{time.getHours()}:{time.getMinutes() < 10 ? `0${time.getMinutes()}` : time.getMinutes()}</span>
      <img src={icon} alt="weather icon" />
      <span className="font-medium text-primary">{Math.round(weather.temperature.value)}°</span>
      <span className="text-rain font-medium">{weather.precipitationamount.value.toFixed(1)} {weather.precipitationamount.unit}</span>
    </li>
  )
}

export default WeatherHour