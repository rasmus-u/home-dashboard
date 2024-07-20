const WeatherHour = ({ weather, icon }) => {
  const time = new Date(weather.time)

  return (
    <li className="flex flex-grow h-full bg-widgets items-center rounded-xl justify-around w-80">
      <div className="flex flex-row gap-2 h-fit w-fit items-center">
        <span className="font-semibold text-primary text-3xl">{time.getHours()}:{time.getMinutes() < 10 ? `0${time.getMinutes()}` : time.getMinutes()}</span>
        <img src={icon} alt="weather icon" className="w-10" />
        <span className="font-medium text-primary text-3xl">{Math.round(weather.temperature.value)}°</span>
        <span className="text-rain font-medium text-2xl text-nowrap">{weather.precipitationamount.value.toFixed(1)} {weather.precipitationamount.unit}</span>
      </div>
    </li>
  )
}

export default WeatherHour