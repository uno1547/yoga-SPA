export default function getTermToday(pay) {
  const today = new Date()
  // console.log('오늘 날짜객체', today.toLocaleDateString()); 
  const [year, month, day] = [pay.expire_date.slice(0,4), pay.expire_date.slice(4, 6), pay.expire_date.slice(6)]
  const expDate = new Date(year, month-1, day)
  // console.log('만료 날짜객체', expDate.toLocaleDateString()); 
  expDate.setHours(23)
  expDate.setMinutes(59)
  expDate.setSeconds(59)
  // 24/8/16 00 시 - 24/8/15 20시 시간간격에 4시간 밖에 안되니 당연히 1일로 인식못하는 건가 
  const diffSec = expDate.getTime() - today.getTime()
  const diffTerm = Math.floor(diffSec / (1000 * 60 * 60 * 24))
  // console.log(diffTerm);
  return diffTerm
}