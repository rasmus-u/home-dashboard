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

  const arrivalHour = Math.floor(route.arrival / (60 * 60))
  const arrivalMinute = Math.round(route.arrival % (60 * 60 - 1) / 60)

  const now = new Date(useSelector(state => state.time))
  const timeNow = (now - new Date(now.getFullYear(), now.getMonth(), now.getDate())) / 1000
  const minutesToArrival = Math.round((route.arrival - timeNow) % (60 * 60) / 60)

  const minutesDisplay =
    minutesToArrival < 0
      ? '0min'
      : minutesToArrival < 10
        ? `${minutesToArrival}min`
        : ''

  return (
    <li className="flex flex-row items-center py-1 justify-between">
      <div className={`${vehicleColor()} text-white rounded-xl w-16 text-center`}>
        {route.routeNumber}
      </div>
      <p className="font-bold text-primary">
        {arrivalHour > 9 ? arrivalHour : `0${arrivalHour}`}
        :
        {arrivalMinute > 9 ? arrivalMinute : `0${arrivalMinute}`}
      </p>
      <div className="w-12 text-right">
        <p className="text-danger font-bold">
          {minutesDisplay}
        </p>
      </div>
    </li>
  )
}

export default StopRoute