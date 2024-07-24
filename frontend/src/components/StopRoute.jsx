import { useSelector } from 'react-redux'

const StopRoute = ({ route, type }) => {

  const vehicleColor = (() => {
    switch (type) {
      case 'TRAM':
        return 'bg-tram_green';
      case 'BUS':
        return 'bg-bus_blue';
      case 'SUBWAY':
        return 'bg-metro_red';
      default:
        return 'bg-bus_blue';
    }
  });

  const departureHour = Math.floor(route.departure / 3600) % 24;
  const remainingSeconds = route.departure % 3600;

  // Calculate minutes from the remaining seconds
  const departureMinute = Math.floor(remainingSeconds / 60);

  const now = new Date(useSelector(state => state.time))
  const secondsNow = now.getHours() * 3600 + now.getMinutes() * 60 + now.getSeconds()
  const minutesToDeparture = Math.floor((route.departure - secondsNow) / 60)

  const minutesDisplay =
    minutesToDeparture < 0
      ? '0min'
      : minutesToDeparture < 10
        ? `${minutesToDeparture}min`
        : ''

  return (
    <li className="flex flex-row items-center justify-between">
      <div className={`${vehicleColor()} text-white rounded-xl w-36 py-1 text-center text-5xl`}>
        {route.routeNumber}
      </div>
      <p className="font-bold text-primary text-4xl">
        {departureHour > 9 ? departureHour : `0${departureHour}`}
        :
        {departureMinute > 9 ? departureMinute : `0${departureMinute}`}
      </p>
      <div className="w-12 text-right text-3xl">
        <p className="text-danger font-bold">
          {minutesDisplay}
        </p>
      </div>
    </li>
  )
}

export default StopRoute