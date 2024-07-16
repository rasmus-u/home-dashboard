import { useSelector } from "react-redux"
import BikeStop from "./BikeStop"


const BikeWidget = () => {
  const bikeStations = useSelector(state => state.bikeStations)

  return (
    <div className="flex flex-col bg-primary-light rounded-xl m-2 p-2 gap-2">
      {bikeStations.map(station =>
        <BikeStop bikeStopData={station} />
      )}
    </div>
  )
}

export default BikeWidget