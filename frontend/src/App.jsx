import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { getStations } from "./reducers/bikeReducer"
import BikeWidget from "./components/BikeWidget"
import { getStops } from "./reducers/stopReducer"

const App = () => {
  const stationIds = ['033', '070', '162']
  const stopIds = ['HSL:1130439', 'HSL:1130125']

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getStations(stationIds))
    dispatch(getStops(stopIds))
  }, [])

  return (
    <BikeWidget />
  )
}

export default App
