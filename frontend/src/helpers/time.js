const getHourMinute = (time, trailing) => {
  const seconds = Math.round(time / trailing)
  const hour = Math.floor(seconds / (60 * 60))
  const minute = Math.round(seconds % (60 * 60 - 1) / 60)
  console.log(hour, minute)
  return [hour, minute]
}

export { getHourMinute }