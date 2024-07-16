import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getStations } from "./reducers/bikeReducer"

const App = () => {
  const stationIds = ['033', '070', '162']

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getStations(stationIds))
  }, [])

  const bikeStations = useSelector(state => state.bikeStations)

  // console.log(bikeStations)

  return (
    <div className="bg-red-300 text-3xl text-white text-center">
      {bikeStations.map(station => {
        return <p key={station.stationId}>{station.name} has {station.bikesAvailable} bikes</p>
      })}
    </div>
  )
}

export default App
