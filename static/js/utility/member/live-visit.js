import moduleDB from "../init-firestore.js";
import { collection, addDoc, query, where, getDocs, doc, onSnapshot, updateDoc } from 'https://www.gstatic.com/firebasejs/10.4.0/firebase-firestore.js';
import { getData } from "../get-data.js";
// 현재 날짜 및 시간 표시
// showDate() 
// showCurrentTime() 

// showTodayVisits()

function getTodayStr() {
  const todayDate = new Date()
  const [todayYear, todayMonth, todayDay] = [String(todayDate.getFullYear()), String(todayDate.getMonth() + 1).padStart(2, '0'), String(todayDate.getDate()).padStart(2, '0')]
  const todayString = `${todayYear}${todayMonth}${todayDay}`
  return todayString
}

//현재 날짜 표시
function showDate() {
  const dateEl = document.querySelector("#class-info .text #date span")
  const today = new Date()
  const [year, month, date, day] = [today.getFullYear(), today.getMonth(), today.getDate(), today.getDay()]
  const dayArr = ['일', '월', '화', '수', '목', '금', '토']
  const dayStr = dayArr[day]
  dateEl.textContent = `${year}/${month + 1}/${date} ${dayStr}요일`
}
// 현재 시각표시 interval
function showCurrentTime() {
  const clockEl = document.querySelector("#class-info .text #clock span")
  const now = new Date()
  clockEl.textContent = `현재시각 : ${String(now.getHours()).padStart(2, '0')} : ${String(now.getMinutes()).padStart(2, '0')} : ${String(now.getSeconds()).padStart(2, '0')}`
  setInterval(() => {
    const now = new Date()
    const [hour, minute, second] = [String(now.getHours()).padStart(2, '0'), String(now.getMinutes()).padStart(2, '0'), String(now.getSeconds()).padStart(2, '0')]
    clockEl.textContent = `현재시각 : ${hour} : ${minute} : ${second}`
  }, 1000);
}

async function showTodayVisits() {
  // 오늘날짜에 해당하는 방문배열 불러옴
  const todayVisits = await getTodayVisits()
  console.log(todayVisits);

  const sortedVisits = sortVisits(todayVisits)
  console.log(sortedVisits);

  const visitsArr = await getVisitInfo(sortedVisits)
  console.log(visitsArr);
  /*
  */
  showVisits(visitsArr)
}

async function getTodayVisits() {
  const todayStr = getTodayStr()
  console.log(todayStr);
  const todayVisits = await getData("attendances", {
    field : "attend_date",
    compare_op : "==", 
    value : todayStr
  })
  // console.log(todayVisits);
  return todayVisits
}

function sortVisits(visits) {
  visits.sort((a, b) => {
    if(a.attend_time > b.attend_time) {
      return -1
    } else if(a.attend_time < b.attend_time) {
      return 1
    } else {
      return 0 
    }
  })
  return visits
}

async function getVisitInfo(sortedVisits) {
  // console.log(sortedVisits)
  for (let visit of sortedVisits) { //sortedVisits는 출석객체배열
    // let visitMemberName
    // await getName(visit.user_id).then((res) => visitMemberName = res) //?? await랑 then이랑 같이?
    // visit.visit_name = visitMemberName
    
    // 아래도 가능 둘다 잘됨
    // 사실상 다른게 없는건가
    // let visitMemberName = await getName(visit.user_id) 이거 여러명꺼 기다리면 오래걸릴듯?
    let visitMemberName = await getName(visit.user_id)
    console.log(visitMemberName)
    visit.visit_name = visitMemberName
  }
  return sortedVisits
}

async function getName(userId) {
  const user = await getData("members", {
    field : "user_id",
    compare_op : "==",
    value : userId
  })
  const userName = user[0].name
  return userName
  // const q = query(collection(db, "members"), where("user_id", "==", userId))
  // const querySnapshot = await getDocs(q)
  // querySnapshot.forEach((doc) => userName = doc.data().name)
  // return userName
}

function showVisits(arr) {
  // console.log(arr);
  const container = document.querySelector('#attend-pallette')
  container.innerHTML = ``
  for (let visit of arr) {
    const attendCardEl = `
    <div class="attend">
      <div id="visit-name" class="row">
        <div class="text" id="name">회원이름</div>
        <div class="content" id="name">${visit.visit_name}</div>
      </div>
      <div id="visit-user-id" class="row">
        <div class="text" id="user-id">회원번호</div>
        <div class="content" id="user-id">${visit.user_id}</div>
      </div>
      <div id="visit-time" class="row">
        <div class="text" id="time">방문시각</div>
        <div class="content" id="time">${visit.attend_time}</div>
      </div>
    </div>`
    container.innerHTML += attendCardEl
  }
  //방문자들 카드 표시후 방문자수 표시
  let curVisitors = document.querySelectorAll('.attend').length
  const visitNumText = document.querySelector('#class-info .text #visit-num span')
  visitNumText.textContent = `현재 방문자 수는 ${curVisitors}명 입니다.`
}

function setLiveChangeHandler() {
  const unsubscribe = onSnapshot(query(collection(moduleDB, "attendances"), where("attend_date", "==", getTodayStr())), (querySnapshot) => {
  // let changes = querySnapshot.docChanges()
  // console.log(changes);
  querySnapshot.forEach((doc) => {
      console.log(doc.data());
      showTodayVisits()
    })
  })
}
/*

// 오늘 날짜에 해당하는 방문 불러옴

// 불러온 출석들에 대해 시간순으로 정렬 후 반환
// 출석배열 받아서 각 출석의 user_id, user_name, vist_time 담은 객체배열 생성

//userid로 조회한 name반환
//visitInfoArr배열 받아서 HTML 추가


//아래 waitVisit이랑 checkVisit 대신 realtime으로 해야함
//새로운 방문 갱신,처리,표시하는 interval함수
async function waitForVisit() {
  const newVisits = await checkVisit() // newVisits에 객체배열 반환
  const sortedVisits = sortVisits(newVisits)
  // console.log(newVisits);
  // console.log(sortedVisits);
  const visitInfoArr = await getVisitInfo(sortedVisits)
  showVisits(visitInfoArr)
}
//현재 날짜에 대한 출석 불러오는 함수
//현재 시간대에 대한걸 불러오는게 맞는건가 일단 날짜 일치부터 해결
async function checkVisit() {
  const q = query(collection(db, "attendances"), where("attend_day", "==", new Date().getDate()));
  const querySnapshot = await getDocs(q);
  const todayVisits = []
  querySnapshot.forEach((doc) => {
    todayVisits.push(doc.data())
  })
  return todayVisits
}
// 처음 방문자 표시이후, 추가로 attendance데이터 추가시 실시간으로 반영함
const todayDate = new Date()
const [todayYear, todayMonth, todayDay] = [String(todayDate.getFullYear()), String(todayDate.getMonth() + 1).padStart(2, '0'), String(todayDate.getDate()).padStart(2, '0')]
// console.log(todayYear, todayMonth, todayDay);
const todayString = `${todayYear}${todayMonth}${todayDay}`

*/
export { showDate, showCurrentTime, showTodayVisits, setLiveChangeHandler }