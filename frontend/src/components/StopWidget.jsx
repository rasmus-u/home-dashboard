import HSL_tram from '../assets/HSL_tram.svg'
import HSL_bus from '../assets/HSL_bus.svg'
import HSL_metro from '../assets/HSL_metro.svg'
import StopRoute from './StopRoute'

const StopWidget = ({ stop }) => {

  const logo = (() => {
    switch (stop.vehicleMode) {
      case 'TRAM':
        return HSL_tram
      case 'BUS':
        return HSL_bus
      case 'SUBWAY':
        return HSL_metro
      default:
        return HSL_bus
    }
  })

  return (
    <div className='w-full px-4 py-3 bg-widgets rounded-xl h-full overflow-hidden'>
      <div className='flex flex-row items-center justify-start gap-3 py-2'>
        <img src={logo()} alt="tram" className='w-10 h-auto' />
        <h2 className='font-bold text-xl text-primary'>{stop.name}</h2>
      </div>
      <ul className='w-52'>
        {stop.routes.slice(0, 5).map((route, index) =>
          <StopRoute key={index} route={route} type={stop.vehicleMode} />
        )}
      </ul>
    </div>
  )
}

export default StopWidget