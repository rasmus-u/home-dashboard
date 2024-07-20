import bikeIcon from '../assets/bikeIcon.svg';

const BikeStation = ({ bikeStopData }) => {
  const percentageFull = Math.round(100 * bikeStopData.bikesAvailable / (bikeStopData.spacesAvailable + bikeStopData.bikesAvailable))

  return (
    <div className="flex flex-row h-20 justify-start items-center gap-3 bg-widgets rounded-xl px-4">
      <p className='p-2 flex-none w-72 font-semibold text-primary text-3xl'>{bikeStopData.name}</p>
      <div className="bg-background h-1/2 w-full overflow-hidden rounded-2xl">
        <div className="bg-alepa_yellow h-full" style={{ width: `${percentageFull}%` }} />
      </div>
      <div className='flex flex-row mx-2 gap-2 justify-end items-center flex-none'>
        <p className='text-right font-semibold text-alepa_yellow text-3xl w-20'>{bikeStopData.bikesAvailable}/{bikeStopData.spacesAvailable + bikeStopData.bikesAvailable}</p>
        <img src={bikeIcon} alt="bike icon" className='w-9' />
      </div>
    </div>
  )
}

export default BikeStation