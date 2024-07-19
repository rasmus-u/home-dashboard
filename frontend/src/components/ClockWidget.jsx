import { useSelector } from "react-redux"

const ClockWidget = () => {
  const now = new Date(useSelector(state => state.time))

  const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];


  return (
    <div className="flex flex-col text-center bg-primary-light rounded-xl p-8">
      <h1 className="text-9xl font-bold">{now.getHours()}:{now.getMinutes() < 10 ? `0${now.getMinutes()}` : now.getMinutes()}</h1>
      <h2 className="text-4xl font-medium">{weekday[now.getDay()]} {now.getDate()}.{now.getMonth()}.{now.getFullYear()}</h2>
      {/* TODO: Add names here */}
      <h3 className="text-xl font-medium">Aino, Anni, Annu, Anniliina</h3>
    </div>
  )
}

export default ClockWidget