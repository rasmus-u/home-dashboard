import bikeIcon from '../assets/bikeIcon.svg';

const BikeStation = ({ bikeStopData }) => {
  const percentageFull = Math.round(100 * bikeStopData.bikesAvailable / bikeStopData.spacesAvailable)

  return (
    <div className="flex flex-row h-16 justify-center items-center gap-3 bg-white rounded-xl">
      <p className='p-2 ml-2 flex-none w-40 font-semibold'>{bikeStopData.name}</p>
      <div className="bg-primary h-1/2 w-full overflow-hidden rounded-2xl">
        <div className="bg-primary-dark h-full" style={{ width: `${percentageFull}%` }} />
      </div>
      <div className='flex flex-row mr-2 w-16 flex-none gap-2 justify-end items-center'>
        <p className='text-right font-semibold'>{bikeStopData.bikesAvailable}/{bikeStopData.spacesAvailable}</p>
        <img src={bikeIcon} alt="bike icon" />
      </div>
    </div>
  )
}

export default BikeStation