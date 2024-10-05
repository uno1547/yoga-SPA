export default async function(obj) {
  const docRef = doc(db, "members", `member-${receivedId}`)
  await updateDoc(docRef, obj)
}