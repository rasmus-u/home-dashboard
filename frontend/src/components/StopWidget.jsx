import HSL_tram_logo from '../assets/HSL_tram_logo.png'
import HSL_bus_logo from '../assets/HSL_bus_logo.png'
import StopRoute from './StopRoute'

const StopWidget = ({ stop }) => {

  const logo = (() => {
    switch (stop.vehicleMode) {
      case 'TRAM':
        return HSL_tram_logo
      case 'BUS':
        return HSL_bus_logo
      default:
        return HSL_bus_logo
    }
  })

  return (
    <div className='w-52 p-2 bg-white rounded-xl'>
      <div className='flex flex-row items-center justify-start gap-3 py-2'>
        <img src={logo()} alt="tram" className='w-10 h-auto' />
        <h2 className='font-bold text-xl'>{stop.name}</h2>
      </div>
      <ul>
        {stop.routes.map((route, index) =>
          <StopRoute key={index} route={route} type={stop.vehicleMode} />
        )}
      </ul>
    </div>
  )
}

export default StopWidget