import StopWidget from "./StopWidget"
import { useSelector } from "react-redux"

const StopHolder = () => {
  const stops = useSelector(state => state.stops)

  return (
    <div className="flex flex-col h-full gap-2">
      {stops.map(stop =>
        <StopWidget stop={stop} />
      )}
    </div>
  )
}

export default StopHolder