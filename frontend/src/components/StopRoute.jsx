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


  const arrivalHour = Math.floor(route.arrival / 3600);
  const remainingSeconds = route.arrival % 3600;

  // Calculate minutes from the remaining seconds
  const arrivalMinute = Math.floor(remainingSeconds / 60);

  const now = new Date(useSelector(state => state.time))
  const secondsNow = now.getHours() * 3600 + now.getMinutes() * 60 + now.getSeconds()
  const minutesToArrival = Math.floor(route.arrival - secondsNow)

  const minutesDisplay =
    minutesToArrival < 0
      ? '0min'
      : minutesToArrival < 10
        ? `${minutesToArrival}min`
        : ''

  return (
    <li className="flex flex-row items-center justify-between">
      <div className={`${vehicleColor()} text-white rounded-xl w-36 py-1 text-center text-5xl`}>
        {route.routeNumber}
      </div>
      <p className="font-bold text-primary text-4xl">
        {arrivalHour > 9 ? arrivalHour : `0${arrivalHour}`}
        :
        {arrivalMinute > 9 ? arrivalMinute : `0${arrivalMinute}`}
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