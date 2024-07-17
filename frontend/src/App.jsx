import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getStations } from "./reducers/bikeReducer"
import BikeWidget from "./components/BikeWidget"
import { getStops } from "./reducers/stopReducer"
import StopWidget from "./components/StopWidget"

const App = () => {
  const stationIds = ['033', '070', '162']
  const stopIds = ['HSL:1130439', 'HSL:1130125']

  const dispatch = useDispatch()

  const stops = useSelector(state => state.stops)

  useEffect(() => {
    dispatch(getStations(stationIds))
    dispatch(getStops(stopIds))
  }, [])

  return (
    <>
      <BikeWidget />
      {stops.map(stop =>
        <StopWidget stop={stop} />
      )}
    </>

  )
}

export default App
