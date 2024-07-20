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
    <div className='flex flex-col w-full px-4 py-6 bg-widgets rounded-xl h-full overflow-hidden justify-start gap-6'>
      <div className='flex flex-row items-center justify-start gap-3'>
        <img src={logo()} alt="tram" className='w-16 h-auto' />
        <h2 className='font-bold text-4xl text-primary'>{stop.name}</h2>
      </div>
      <ul className='flex flex-col w-2/3 gap-4'>
        {stop.routes.slice(0, 5).map(route =>
          <StopRoute key={stop.id} route={route} type={stop.vehicleMode} />
        )}
      </ul>
    </div>
  )
}

export default StopWidget