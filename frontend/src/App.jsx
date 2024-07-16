import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { getStations } from "./reducers/bikeReducer"
import BikeWidget from "./components/BikeWidget"

const App = () => {
  const stationIds = ['033', '070', '162']

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getStations(stationIds))
  }, [])

  return (
    <BikeWidget />
  )
}

export default App
