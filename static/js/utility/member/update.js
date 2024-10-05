import moduleDB from "../init-firestore.js";
import { getData } from "../get-data.js";
// import updateData from "../update-data.js";
import { doc, query, collection, getDocs, where, updateDoc, deleteDoc, writeBatch} from 'https://www.gstatic.com/firebasejs/10.4.0/firebase-firestore.js';

function inputHandler(evt) {
  console.log(evt);
  console.log(evt.target);
  const curInput = evt.target.value
  const length = curInput.length
  const inputVal = Number(evt.data)
  console.log(inputVal);
  const isNotNumber = isNaN(inputVal)
  if (isNotNumber) {
    // evt.target.value = null
  } else {
    if (length === 3 || length === 8) {
      evt.data !== null ? evt.target.value += "-" : 0
    }
  }
  /*
  telPopUpHandler() 이함수 내에서 input태그에 접근할수없다
  */
}

async function getMemInfo(id) {
  console.log(id);
  const currentMember = await getData("members", {
    field : "user_id",
    compare_op : "==",
    value : id
  })
  console.log(currentMember);
  showLastInfo(currentMember[0])
  /*
  const q = query(collection(db, "members"), where("user_id", "==", id))
  const memberQuery = await getDocs(q)
  const currentMemberArr = []
  memberQuery.forEach(element => {
    currentMemberArr.push(element.data())
  });
  const currentMember = currentMemberArr[0]
  console.log(currentMember)
  showLastInfo(currentMember)
  */
}

function showLastInfo(info) { //해당회원의 지난 입력을 표시
  for(let key in info) {
    // console.log(key, info[key]);
    const keyInfoWrap = document.querySelectorAll(`[name = ${key}]`)
    // console.log(keyInfoWrap);
    if (!keyInfoWrap) { // sign-in-date, user-id 등등
      continue
    } else {
      if (keyInfoWrap.length == 1) { //라디오 제외 input들
        keyInfoWrap[0].value = info[key]
      } else { //라디오라면 현재 info[key]의 라디오에 체크표시
        keyInfoWrap.forEach(input => {
          input.value == info[key] ? input.checked = 'true' : 0
        })
      }
    }
  }
}

function submitHandler(id, evt) {
  evt.preventDefault()
  // console.log('submit!!')
  const formData = new FormData(evt.target)
  const memberObj = Object.fromEntries(formData)
  memberObj.user_id = id
  console.log(memberObj);
  updateMember(memberObj)
}

async function updateMember(obj) { // 여기서 firestore추가할때 doc이름이 무작위 id로 들어가는데 따로 지정해줘야하나?
  const docRef = doc(moduleDB, "members", `member-${obj.user_id}`)
  console.log(docRef);
  await updateDoc(docRef, obj)
}

async function deleteMember(id) {
  console.log(id);
  const docRef = doc(moduleDB, "members", `member-${id}`)
  await deleteDoc(docRef)
  alert("멤버가 삭제되었습니다!!!")
  await deleteDocs("attendance", id)
  await deleteDocs("payments", id)
  // await deleteMemberAttendence(id)
  // await deleteMemberPayments(id)
  //해당멤버의 결제, 출석 정보도 모두 삭제해야할듯 그러네???
  // location.href = "/src/member-manage.html"
}

async function deleteDocs(collectionType, id) {
  const collectionRef = (collectionType == "payments") ? collection(moduleDB, `payments`) : collection(moduleDB, `attendances`)
  const q = query(collectionRef, where("user_id", "==", Number(id)))
  const batch = writeBatch(moduleDB)
  const querySnapshots = await getDocs(q)
  querySnapshots.forEach((doc) => {
    batch.delete(doc.ref)
  })
  await batch.commit()
  // console.log(`모든 ${collectionType} 삭제`);
}

export { inputHandler, getMemInfo, showLastInfo, submitHandler, deleteMember }