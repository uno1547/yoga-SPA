import { getData } from '../get-data.js'
import getDateString from '../get-date-string.js'; 
import getTermToday from '../get-term-today.js';
import getCommaFormattedNumbers from '../get-formatted-num.js';
async function getQueries(member, userid, info) {
  console.log(userid, info);
  console.log('쿼리함수');
  info.currentMemberPayments = await getData("payments", {
    field : "user_id",
    compare_op : "==",
    value : userid
  })

  info.currentMemberAttendances = await getData("attendances", {
    field : "user_id",
    compare_op : "==",
    value : userid
  })
  console.log(info);

  viewer(member, info.currentMemberPayments, info.currentMemberAttendances)
}

function viewer(member, payments, attendances) {
  showMemberInfo(member)
  showMemberClass(payments)
  showMemberPayments(payments)
  showMemberAttendance(attendances)
}

function showMemberInfo(member) {
  for (let prop in member) {
    let tdEl = document.querySelector(`td.${prop}`)
    if (prop == "gender") {
      document.querySelector(".gender-span").textContent = `[${member[prop]}]`
    } else if (prop == "name"){
      document.querySelector(".name-span").textContent = member[prop]
    } else if(prop == "group") {
      switch(member[prop]) {
        case "group":
          tdEl.textContent = "그룹레슨"
          break
        case "misole":
          tdEl.textContent = "마이솔"
          break
        case "pt":
          tdEl.textContent = "개인레슨"
          break
      }
    } else {
      tdEl.textContent = member[prop]
    }
  }
}

// member의 수강정보 표시(by 결제내역의 pay_class)
function showMemberClass(payments) {
  payments.sort(function(a, b) { // 만기일 기준 내림차순 정렬(제일최근결제선택)
    if(a.pay_date < b.pay_date) {
      return 1
    } else if(a.pay_date > b.pay_date) {
      return -1
    } else {
      return 0
    }
  })
  let recentPay = payments[0]
  // console.log('제일최근결제', recentPay)
  const classTd = document.querySelector("table.info td.class")
  if (recentPay) {
    let typeStr
    if (recentPay.pay_class.class_type == "group") {
      typeStr = "요가"
    } else { 
      typeStr = "개인레슨"
    }
    let payDate = getDateString(recentPay.pay_date)
    let expireDate = getDateString(recentPay.expire_date)
    // console.log(payDate, expireDate);
    const term = getTermToday(recentPay)
    // console.log(term);
    if((term <= 15) && (term >= 0)) { //만기일이 15일 이내라면
      classTd.innerHTML = `${typeStr} 주 ${recentPay.pay_class.times_a_week}회 [${recentPay.pay_class.class_term}개월] <br> <span class = "small-date alert">${payDate} ~ ${expireDate} [만료 ${term}일전]</span>`
    } else { //여유있을경우
      classTd.innerHTML = `${typeStr} 주 ${recentPay.pay_class.times_a_week}회 [${recentPay.pay_class.class_term}개월] <br> <span class = "small-date">${payDate} ~ ${expireDate}</span>`
    }
  } else {
    classTd.innerHTML = `등록된 수업이없습니다<br><span class = "small-date">수업을 등록해주세요</span>`
  }
}
//해당회원의 모든결제정보로 결제내역 목록 표시
function showMemberPayments(payments) {
  /* /???? 이거 진짜 뭐지
  let tableArea = document.querySelector('#payment-list table')
  tableArea.innerHTML = `<tr id = "key">
            <th>번호</th>
            <th>결제일</th>
            <th>수강 종목</th>
            <th>수강 기간</th>
            <th>상태</th>
            <th>결제 금액</th>
          </tr>
  `
  */
  let tableArea = document.querySelector('table.val')
  tableArea.innerHTML = ""
  // 없다면 종료
  if(payments.length == 0) {
    tableArea.innerHTML += `<span id = "empty">결제내역이 없습니다</span>`
    return
  }
  for (let i = 0; i < payments.length; i++) {
    //모든 결제에 대하여 순회하면서 정보 표시후 추가
    let payment = payments[i]
    let [classType, classPerWeek, classTerm] = [payment.pay_class.class_type, payment.pay_class.times_a_week, payment.pay_class.class_term]
    if (classType == 'group') {
      classType = '요가'
    } else {
      classType = '개인레슨'
    }

    let payDate = getDateString(payment.pay_date)
    let expireDate = getDateString(payment.expire_date)
    let fee = String(payment.pay_fee)
    let commaFormattedFee = getCommaFormattedNumbers(fee)
    let status 
    let trEls
    const leftDays = getTermToday(payment)
    //제일 최근의 결제에 대해서만 만기 검사 실행후 빨강표시
    if(i == 0 && (leftDays <= 15) && (leftDays >= 0)) { 
      status = `만료임박`
      trEls = `
      <tr class = "alert">
        <td>${i + 1}</td>
        <td>${payDate}</td>
        <td>${classType} 주 ${classPerWeek}회 [${classTerm}개월]</td>
        <td>${payDate} ~ ${expireDate}</td>
        <td>${status}</td>
        <td>${commaFormattedFee} 원</td>
      </tr>
      `
      tableArea.innerHTML += trEls
      continue
    }
     // 만료된 결제(수업)에 대해서 폐기 줄그음 처리
    if(leftDays < 0) {
      status = '만료'
      trEls = `
      <tr class ='expire'>
        <td>${i + 1}</td>
        <td>${payDate}</td>
        <td>${classType} 주 ${classPerWeek}회 [${classTerm}개월]</td>
        <td>${payDate} ~ ${expireDate}</td>
        <td>${status}</td>
        <td>${commaFormattedFee} 원</td>
      </tr>
      `
      tableArea.innerHTML += trEls
      continue
    }
    // 나머지 일반결제
    status = "유효"
    trEls = `
    <tr>
      <td>${i + 1}</td>
      <td>${payDate}</td>
      <td>${classType} 주 ${classPerWeek}회 [${classTerm}개월]</td>
      <td>${payDate} ~ ${expireDate}</td>
      <td>${status}</td>
      <td>${commaFormattedFee} 원</td>
    </tr>
    `
    tableArea.innerHTML += trEls
    /*
    if(condition A) {
      do A
    } else if(condition B) {
      do B 
    } else {
      do C 
    }
    
    if(condition A) {
      do A  
      continue
    } 
    if(condition B) {
      do B
      continue
    }
    do C
    위 두가지는 같은 동작을 하지않을까
    */
  }
  return
  // 없다면 종료
  if(payments.length == 0) {
    tableArea.innerHTML += `<span id = "empty">결제내역이 없습니다</span>`
    return
  }
  for (let i = 0; i < payments.length; i++) {
    //모든 결제에 대하여 순회하면서 정보 표시후 추가
    let payment = payments[i]
    let [classType, classPerWeek, classTerm] = [payment.pay_class.class_type, payment.pay_class.times_a_week, payment.pay_class.class_term]
    if (classType == 'group') {
      classType = '요가'
    } else {
      classType = '개인레슨'
    }

    let payDate = getDateString(payment.pay_date)
    let expireDate = getDateString(payment.expire_date)
    let fee = String(payment.pay_fee)
    let commaFormattedFee = getCommaFormattedNumbers(fee)
    let status 
    let trEls
    const leftDays = getTermToday(payment)
    //제일 최근의 결제에 대해서만 만기 검사 실행후 빨강표시
    if(i == 0 && (leftDays <= 15) && (leftDays >= 0)) { 
      status = `만료임박`
      trEls = `
      <tr class = "alert">
        <td>${i + 1}</td>
        <td>${payDate}</td>
        <td>${classType} 주 ${classPerWeek}회 [${classTerm}개월]</td>
        <td>${payDate} ~ ${expireDate}</td>
        <td>${status}</td>
        <td>${commaFormattedFee} 원</td>
      </tr>
      `
      tableArea.innerHTML += trEls
      continue
    }
     // 만료된 결제(수업)에 대해서 폐기 줄그음 처리
    if(leftDays < 0) {
      status = '만료'
      trEls = `
      <tr class ='expire'>
        <td>${i + 1}</td>
        <td>${payDate}</td>
        <td>${classType} 주 ${classPerWeek}회 [${classTerm}개월]</td>
        <td>${payDate} ~ ${expireDate}</td>
        <td>${status}</td>
        <td>${commaFormattedFee} 원</td>
      </tr>
      `
      tableArea.innerHTML += trEls
      continue
    }
    // 나머지 일반결제
    status = "유효"
    trEls = `
    <tr>
      <td>${i + 1}</td>
      <td>${payDate}</td>
      <td>${classType} 주 ${classPerWeek}회 [${classTerm}개월]</td>
      <td>${payDate} ~ ${expireDate}</td>
      <td>${status}</td>
      <td>${commaFormattedFee} 원</td>
    </tr>
    `
    tableArea.innerHTML += trEls
    /*
    if(condition A) {
      do A
    } else if(condition B) {
      do B 
    } else {
      do C 
    }
    
    if(condition A) {
      do A  
      continue
    } 
    if(condition B) {
      do B
      continue
    }
    do C
    위 두가지는 같은 동작을 하지않을까
    */
  }
}
// 해다회원의 출석정보로 달력에 출석 표시
function showMemberAttendance(attendances) { 
  let attendEvents = []
  attendances.forEach((attendance) => {
    let event = {}
    const [year, month, day] = [attendance.attend_date.slice(0, 4), attendance.attend_date.slice(4, 6), attendance.attend_date.slice(6)]
    let date = `${year}-${month}-${day}`
    event.start = date
    event.end = date
    event.display = 'background'
    event.color = '#8fdf82'
    attendEvents.push(event)
  })
  const calendarEl = document.querySelector('#attend-calender')
  const calendar = new FullCalendar.Calendar(calendarEl, {
    initialView : 'dayGridMonth',
    locale : 'ko',
    buttonText : {
      today : '오늘'
    },
    headerToolbar : {
      start : 'today',
      center : 'title',
      end : 'prev,next'
    },
    events : attendEvents,
  })
  calendar.render()
}

// export {viewer, getQueries, showMemberInfo, showMemberClass, showMemberPayments, showMemberAttendance}
export { getQueries } //여러개 export할때는 {} 필수인듯함 한개만 export할경우, export default