import getCommaFormattedNumbers from "../get-formatted-num.js"
import { getData } from "../get-data.js"
class Class {
  constructor(type, perWeek, term, cashPrice, creditPrice) {
    this.class_type = type,  
    this.times_a_week = perWeek,  
    this.class_term = term,  
    this.cash_price = cashPrice,
    this.card_price = creditPrice  
  }
}
// ㅋㅋㅋㅋ 내가짰던건지 기억이안남 수업목록
const classDic = {
  pt : new Class('pt', 10, 3, 600000, 600000),
  group_try : new Class('group', 30, 3, 0, 0),
  group_coupon : new Class('group', 10, 3, 230000, 250000),
  group_two_one : new Class('group', 2, 1, 129000, 143000),
  group_two_three1 : new Class('group', 2, 3, 330000, 367000),
  group_two_three2 : new Class('group', 2, 3, 347000, 386000),
  group_three_one : new Class('group', 3, 1, 149000, 165000),
  group_three_three1 : new Class('group', 3, 3, 360000, 400000),
  group_three_three2 : new Class('group', 3, 3, 378000, 420000),
  group_three_six1 : new Class('group', 3, 6, 677000, 752000),
  group_three_six2 : new Class('group', 3, 6, 713000, 792000),
  group_three_twelve1 : new Class('group', 3, 12, 1190000, 1320000),
  group_three_twelve2 : new Class('group', 3, 12, 1250000, 1390000),
  group_four_twelve : new Class('group', 4, 12, 1150000, 0),
  group_five_one : new Class('group', 5, 1, 168000, 187000),
  group_five_three1 : new Class('group', 5, 3, 408000, 453000),
  group_five_three2 : new Class('group', 5, 3, 429000, 477000),
  group_five_six1 : new Class('group', 5, 6, 768000, 853000),
  group_five_six2 : new Class('group', 5, 6, 810000, 898000),
  group_five_twelve1 : new Class('group', 5, 12, 1340000, 1490000),
  group_five_twelve2 : new Class('group', 5, 12, 1410000, 1570000),
}

function tableClickHandler(evt) {
  const target = evt.target
  let radio
  if (target.parentElement.tagName == "TR") { //td일때
    radio = target.parentElement.querySelector("input[type='radio']")
  } else if (target.parentElement.tagName == "TBODY"){ //tr일때
    radio = target.querySelector("input[type='radio']")
  } else { //input일때는 change알아서 발생, 위 두경우만 change이벤트로 propagation해주면된다.
    return
  }

  radio.checked = "true" //이건 change이벤트 발생안하는듯 
  const event = new Event("change", {bubbles : true}) 
  radio.dispatchEvent(event)
}

function tableMouseLeaveHandler(evt) {
  const table = evt.target
  console.log(table);
  const isRadioChecked = table.querySelector("input[type='radio']:checked")
  if (isRadioChecked) { //체크된요소가존재
    console.log(isRadioChecked);
    const checkedRow = isRadioChecked.closest('tr')
    console.log(checkedRow);
    const checkedRowIndex = Array.from(document.querySelectorAll('tr')).indexOf(checkedRow)
    const rectObj = checkedRow.getBoundingClientRect()
    console.log(rectObj);
    const rowScrollVal = rectObj.height * checkedRowIndex
    table.scrollTo({
      top : rowScrollVal,
      behavior : 'smooth'
    })
  } else { // 체크된요소존재안하면 맨위로 스크롤
    console.log('아직체크안됌');
    table.scrollTo({
      top : 0,
      behavior : 'smooth'
    })
  } 
}

function formHandler(evt) {
  // console.log(evt.currentTarget);
  const radios = evt.currentTarget.querySelectorAll('input[type = "radio"]:checked')
  if(radios.length == 3) {
    console.log('three filled');
    showPaymentDiv()
  }
}

function showPaymentDiv() {
  const formData = new FormData(document.querySelector('form'))
  console.log(formData);
  const memberObj = Object.fromEntries(formData)
  console.log(memberObj);
  let { class : classKey, method, teacher} = memberObj


  console.log(classKey, method, teacher);
  let [ type, timesaweek, term ] = [ classDic[classKey].class_type, classDic[classKey].times_a_week, classDic[classKey].class_term ]
  type = (type == 'group') ? '요가' : '개인레슨'
  let payDate = new Date()
  let expireDate = payDate
  payDate = payDate.toLocaleDateString().slice(0, -1)
  expireDate.setMonth(expireDate.getMonth() + term)
  expireDate = expireDate.toLocaleDateString().slice(0, -1)
  const fee = classDic[classKey][`${method}_price`]
  method = (method == 'card' ? '카드' : '현금')
  const commaFormattedFee = getCommaFormattedNumbers(String(fee))
  const paymentDiv = document.querySelector('#payment-info')
  // const paymentDiv = document.querySelector('#info')
  
  if (paymentDiv) { //있다면 텍스트만 교체
    paymentDiv.querySelector("#text-class-info").textContent = `${type} 주${timesaweek}회 ${term}개월반`
    paymentDiv.querySelector("#text-class-term").textContent = `${payDate} ~ ${expireDate}`
    paymentDiv.querySelector("#text-pay-date").textContent = payDate
    paymentDiv.querySelector("#text-pay-teacher").textContent = teacher 
    paymentDiv.querySelector("#text-pay-fee").textContent = `${commaFormattedFee}원 [${method}]`
  } else { //없다면 추가
    const paymentDiv = `
    <div id="payment-info">
    <hr>
    <!-- 스크립트로 추가!! -->
    <div class="head-text-wrap">
      <span class="head-text">결제정보</span>
    </div>
    <div id="payment-content">
      <div class="wrap">
        <div class="text">수강항목</div>
        <div class="val"><span id="text-class-info">${type} 주${timesaweek}회 ${term}개월반</span></div>
      </div>
      <div class="wrap">
        <div class="text">수강기한</div>
        <div class="val"><span id="text-class-term">${payDate} ~ ${expireDate}</span></div>
      </div>
      <div class="wrap">
        <div class="text">결제날짜</div>
        <div class="val"><span id="text-pay-date">${payDate}</span></div>
      </div>
      <div class="wrap">
        <div class="text">결제강사</div>
        <div class="val"><span id="text-pay-teacher">${teacher}</span></div>
      </div>
      <div class="wrap">
        <div class="text">결제금액</div>
        <div class="val"><span id="text-pay-fee">${commaFormattedFee}원 [${method}]</span></div>
      </div>
    </div>
    <button type="submit">결제등록</button>
  </div>`
  const form = document.querySelector('#info')
  form.innerHTML += paymentDiv
  }
}

function formSubmitHandler(evt, id) {
  evt.preventDefault()
  const formData = new FormData(evt.target)
  const memberObj = Object.fromEntries(formData)
  console.log(memberObj)
  setPaymentObj(memberObj, id)
}

async function setPaymentObj(obj, id) {
  const payment = {}
  payment.user_id = id
  console.log(id);
  const result = await getData("members", {field : "user_id", compare_op : "==", value : id})
  console.log(result);
  const name = result[0].name
  payment.user_name = name
  const payDate = new Date()
  const payYear = payDate.getFullYear()
  const payMonth = String(payDate.getMonth() + 1).padStart(2, '0')
  const payDay = String(payDate.getDate()).padStart(2, '0')
  payment.pay_date = `${payYear}${payMonth}${payDay}`
  payment.pay_teacher = obj.teacher
  payment.pay_method = obj.method
  const payKey = obj.class
  console.log(payment);
  // setPaymentClassInfo(payment, payKey)
}

function setPaymentClassInfo(obj, key) {
  const payClass = {
    class_type : classDic[key].class_type,
    times_a_week : classDic[key].times_a_week,
    class_term : classDic[key].class_term,
  }
  obj.pay_class = payClass

  obj.pay_fee = classDic[key][`${obj.pay_method}_price`]
  uploadPayment(obj)
}
// setpaymentclassinfo에서 넘어온 obj를 DB에 등록
async function uploadPayment(obj) {
  const docRef = await addDoc(collection(db, "payments"), obj)
  alert("새결제가 등록되었습니다")
  location.href = "/src/member-manage.html"
}

// DB에 올릴 class객체 생성
/*
  1. user_name
  2. user_id
  3. pay_class(타입, 주n회, 개월)
  4. pay_teacher
  5. pay_method
  6. pay_fee
  7. pay_date
  8. expire_date
*/
function makePaymentData(id) {
  const user = getData("members", {field : "user_id", compare_op : "==", value : id}) // promise
  console.log(user);

  const payment = {}
  const form = document.querySelector('form')
  const formData = new FormData(form)
  const memberObj = Object.fromEntries(formData)
  // memberObj = { class : "", methood : 'cash' / 'card', teacher : "" }
  const { class : classKey, method, teacher } = memberObj
  console.log(classKey, method, teacher);
  
  payment.pay_teacher = teacher
  payment.pay_method = method
  const curClass = classDic[classKey]

  const fee = classDic[classKey][`${method}_price`]
  // payment.pay_fee = getCommaFormattedNumbers(String(fee))
  payment.pay_fee = fee
  const { class_type, times_a_week, class_term } = curClass
  payment.pay_class = {
    class_type,
    times_a_week,
    class_term
  }
  const payDate = new Date()
  console.log(payDate);
  const [ pay_year, pay_month, pay_date ] = [ String(payDate.getFullYear()), String(payDate.getMonth() + 1).padStart(2, '0'), String(payDate.getDate()).padStart(2, '0') ]
  const payDateStr = `${pay_year}${pay_month}${pay_date}`
  payDate.setMonth(payDate.getMonth() + class_term)

  console.log(payDate);
  console.log(payDate.getFullYear(), payDate.getMonth() + 1, payDate.getDate());
  const [ expire_year, expire_month, expire_date ] = [ String(payDate.getFullYear()), String(payDate.getMonth() + 1).padStart(2, '0'), String(payDate.getDate()).padStart(2, '0') ]
  const expireDateStr = `${expire_year}${expire_month}${expire_date}`

  payment.pay_date = payDateStr
  payment.expire_date = expireDateStr

  user.then((result) => {
    payment.user_name = result[0].name
    console.log('이름 불러와서 설정!!');
  }) //얘가 실행안되고 지나칠수도있는건가?? 만약 promise가 resolve되기전에 아래문장이 실행될수있는건가? 그러네.. 
  // 모든 비동기는 그러면 await하는게 맞는건가
  payment.user_id = id
  console.log('Id설정!!');

  console.log(payment);
  // console.log(expireDate.toLocaleDateString());
  // let expireDate = payDate
  // payDate = payDate.toLocaleDateString().slice(0, -1)
  // expireDate.setMonth(expireDate.getMonth() + class_term)
  // expireDate = expireDate.toLocaleDateString().slice(0, -1)
  // console.log(payDate, expireDate);
  // console.log(payment);
  /* 
  */
}


/*
// memberObj 받아서 user_id, pay_year, pay_month, pay_day 처리 pay_teacher, pay_method도
//입력후 '결제등록'누르면 formData로 객체데이터 생성


*/

export { tableClickHandler, tableMouseLeaveHandler, formHandler, formSubmitHandler, makePaymentData }