import bikeIcon from '../assets/bikeIcon.svg';

const BikeStation = ({ bikeStopData }) => {
  const percentageFull = Math.round(100 * bikeStopData.bikesAvailable / bikeStopData.spacesAvailable)

  return (
    <div className="flex flex-row h-16 justify-center items-center gap-3 bg-widgets rounded-xl px-4">
      <p className='p-2 flex-none w-60 font-semibold text-primary text-2xl'>{bikeStopData.name}</p>
      <div className="bg-background h-1/2 w-full overflow-hidden rounded-2xl">
        <div className="bg-alepa_yellow h-full" style={{ width: `${percentageFull}%` }} />
      </div>
      <div className='flex flex-row mx-2 w-20 flex-none gap-2 justify-end items-center'>
        <p className='text-right font-semibold text-alepa_yellow text-xl'>{bikeStopData.bikesAvailable}/{bikeStopData.spacesAvailable}</p>
        <img src={bikeIcon} alt="bike icon" className='w-20' />
      </div>
    </div>
  )
}

export default BikeStation