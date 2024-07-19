import { useSelector } from "react-redux"
import WeatherEmblem from "./WeatherEmblem"
import WeatherHour from "./WeatherHour"
import { getWeatherType } from "../helpers/weather"
import Snow from "../assets/SNOW.svg"
import Rain from "../assets/RAIN.svg"
import Windy from "../assets/WINDY.svg"
import Cloudy from "../assets/CLOUDY.svg"
import Sunny from "../assets/SUNNY.svg"
import PouringRain from "../assets/POURING_RAIN.svg"

const WeatherWidget = () => {
  const weather = useSelector(state => state.weather)

  const getWeatherIcon = (weather) => {
    switch (getWeatherType(weather)) {
      case "SNOWING":
        return Snow;
      case "POURING RAIN":
        return PouringRain;
      case "RAINING":
        return Rain;
      case "WINDY":
        return Windy;
      case "CLOUDY":
        return Cloudy;
      case "SUNNY":
        return Sunny;
      default:
        return Sunny;
    }
  }

  return (
    <div className="flex flex-col w-64 rounded-xl bg-white overflow-hidden flex-grow h-full">
      <WeatherEmblem city={weather.city} weather={weather.byTime[0]} icon={getWeatherIcon(weather.byTime[0])} />
      <ul className="bg-primary flex flex-col gap-1 overflow-auto h-full justify-between py-2">
        {weather.byTime.slice(1, 13).map(weather =>
          <WeatherHour weather={weather} icon={getWeatherIcon(weather)} key={weather.time} />
        )}
      </ul>
    </div>
  )

}

export default WeatherWidget