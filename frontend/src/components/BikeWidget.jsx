import { useSelector } from "react-redux"
import BikeStation from "./BikeStation"


const BikeWidget = () => {
  const bikeStations = useSelector(state => state.bikeStations)

  return (
    <div className="flex flex-col bg-primary-light rounded-xl gap-3">
      {bikeStations.map(station =>
        <BikeStation key={station.stationId} bikeStopData={station} />
      )}
    </div>
  )
}

export default BikeWidget