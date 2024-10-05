import getCommaFormattedNumbers from "../get-formatted-num.js"

function getReducedPayments(arr) {
  const reducedPayments = []
  for (let payment of arr) {
    const prevSale = reducedPayments.find((sale) => {
      return sale.pay_date == payment.pay_date
    })

    if (prevSale) { //동일한 날짜에 해당하는 결제 존재하면 가격 합산
      prevSale[`${payment.pay_method}`] += payment.pay_fee
    } else { //존재하지않는다면 초기화 후 추가
      const sortedPay = {
        pay_date : payment.pay_date,
        card : 0,
        cash : 0
      }
      sortedPay[`${payment.pay_method}`] += payment.pay_fee
      reducedPayments.push(sortedPay)
    }
  }
  return reducedPayments
}

// 날짜별 누적매출을 달력에 표시할 event로 변환
function getReducedEvents(arr) {
  const reducedEvents = []
  for (let pay of arr) {
    const year = pay.pay_date.slice(0,4)
    const month = pay.pay_date.slice(4,6)
    const day = pay.pay_date.slice(6)
    const cardEvt = {
      title : `카드 : ${getCommaFormattedNumbers(String(pay.card))}원`,
      start : `${year}-${month}-${day}`,
      end : `${year}-${month}-${day}`,
    }
    const cashEvt = {
      title : `현금 : ${getCommaFormattedNumbers(String(pay.cash))}원`,
      start : `${year}-${month}-${day}`,
      end : `${year}-${month}-${day}`,
    }
    const totalEvt = {
      title : `총계 : ${getCommaFormattedNumbers(String(pay.card+pay.cash))}원`,
      start : `${year}-${month}-${day}`,
      end : `${year}-${month}-${day}`,
    }
    reducedEvents.push(cashEvt)
    reducedEvents.push(cardEvt)
    reducedEvents.push(totalEvt)
  }
  return reducedEvents
}

export {getReducedEvents, getReducedPayments} 