import moduleDB from './init-firestore.js'
import { collection, getDocs, query, where } from 'https://www.gstatic.com/firebasejs/10.4.0/firebase-firestore.js';

const db = moduleDB

// getData함수 export
export async function getData(collectionName, ...queries) {
  const length = queries.length
  let q

  if (length == 0) {
    // console.log('조건없는', collectionName);
    q = query(collection(db, collectionName))
  } else if(length == 1) { // 조건 1개 ex) user_id == 1547
    // console.log('조건1개', collectionName);
    const query1 = queries[0]
    q = query(collection(db, collectionName), where(query1.field, query1.compare_op, query1.value))
  } else { // 조건 2개 ex) pay_date <= 20240819 && pay_date >= 20240915
    // 조건이 2개
    // console.log('조건2개', collectionName);
    const [query1, query2] = [queries[0], queries[1]]
    q = query(collection(db, collectionName), where(query1.field, query1.compare_op, query1.value), where(query2.field, query2.compare_op, query2.value))
  }

  const datas = []
  const snapShots = await getDocs(q)
  snapShots.forEach(doc => {
    datas.push(doc.data())
  });

  return datas
}

/*
const payments1 = await getData("payments", {
  field : "user_id",
  compare_op : "==",
  value : 1312
})
*/