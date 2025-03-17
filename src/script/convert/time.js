export function timeToTime(time) {
  const date = new Date(time)
  const testFormat = date.toLocaleTimeString([], {
    hour: '2-digit',
    hour12: true,
  })

  const is12Hour = testFormat.includes('AM') || testFormat.includes('PM')

  return date.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
    hour12: is12Hour,
  })
}
