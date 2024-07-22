import StopWidget from "./StopWidget"
import { useSelector } from "react-redux"

const StopHolder = () => {
  const stops = useSelector(state => state.stops)

  return (
    <div className="flex flex-col h-full gap-4">
      {stops.map(stop =>
        <StopWidget stop={stop} key={stop.id} />
      )}
    </div>
  )
}

export default StopHolder