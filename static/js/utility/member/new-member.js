import moduleDB from "../init-firestore.js"
import { query, collection, doc, where, getDocs, setDoc } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-firestore.js"



function setSignDate(obj) {
  const signInDate = new Date()
  const signInYear = signInDate.getFullYear()
  const signInMonth = (String(signInDate.getMonth() + 1)).padStart(2, "0")
  const signInDay = (String(signInDate.getDate())).padStart(2, "0")
  let dateStr = `${signInYear}-${signInMonth}-${signInDay}`
  obj["sign_in_date"] = dateStr
}

// member중 중복되지않는 random ID 생성
async function setUserId(obj) {
  let valid = false
  let randId = 0
  while(!valid) {
    const dupMems = []
    randId = Math.floor(Math.random() * (9999 - 1000) + 1000);
    // console.log(randId);
    const q = query(collection(moduleDB, "members"), where("user_id", "==", randId))
    const querySnapshot = await getDocs(q)
    querySnapshot.forEach((el) => dupMems.push(el.data()))
    dupMems.length == 0 ? valid = true : 0
  }
  obj["user_id"] = randId
  createNewMember(obj)
}
// 받은 member obj를 DB에 추가
async function createNewMember(obj) {
  const name = obj.name
  const id = obj.user_id
  // console.log(name, id);
  await setDoc(doc(moduleDB, "members", `member-${id}`), obj);
  alert("새멤버가 추가되었습니다")
  // location.href = "/src/member-manage.html"
}

export { setSignDate, setUserId, createNewMember }