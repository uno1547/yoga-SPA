/*
const obj2 = {
  name : 'amy',
  age : 24,
}
// obj2["grade"] = 1 // 새로운 프로퍼티 추가
obj2.grade = 1 // 새로운 프로퍼티 추가
console.log(obj2);
console.log(obj2.grade); // 존재하는 프로퍼티 접근 1
console.log(obj2["grade"]); // 존재하는 프로퍼티 접근 1
const hasHome = false
obj2["home"] = hasHome

console.log(obj2);
*/

/*
const name = "peter"
const obj = {
  name, // 이런식으로 프로퍼티명과 일치하는 식별자에 알아서 대응
  age : 20
}
console.log(obj);
console.log(obj.name);
*/


/*
function User(name) {
  this.age = 10
}
const user = new User("보라")
console.log(user);
console.log(user.age);
*/
/*
생성자 함수는 객체를 반환하는 함수!!
생성자 함수는 1. 함수 식별자 첫글자가 대문자!!, 2. 호출시 new붙여서 호출

생성자함수내엔 return문이 없다.(내부로직으로 this생성후 반환해주기때문)
명시적으로 return 사용시
객체 return시 생성했던 this가 아닌 지정한 객체가 return
객체 이외의 값 return시 무시
*/

/*
async function main() {
  await initPage() // 이 내부의 await에도 불구하고, 아래 between, afterFetch()가 먼저 실행됨!
  // 이 initPage도 기다려야함
  console.log('between');
  afterFetch()
}

function fetchData() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("데이터!")
    }, 2000);
  })
}

async function initPage() {
  console.log('fetch 시작');
  await fetchData()
  console.log('fetch 종료');
}

function afterFetch() {
  console.log('after fetch');
}

main()
*/

class Page {
  constructor() {
    this.name = "hello"
  }
  addListener() {
    const prevBtn = document.querySelector("button#prevMember")
    // 1
    prevBtn.addEventListener('click', () => {
      console.log(this);
    })
    // 2
    prevBtn.addEventListener('click', function() {
      console.log(this);
    })
  }
}

/*
1. DOM내의 이벤트 핸들러가 익명함수일때 this는 DOM요소를 가리킴
2. DOM내의 이벤트 핸들러가 화살표함수일때 this는 외부로 나와서 class의 Instance를 가리키는듯?
*/

// issue
/*
  prevBtn을 눌렀을때, 콘솔에도 이전멤버의 결제와, 출석이 출력됨근데, DOM에는 즉시반영이안됨 await로 getQueries를 
  기다리지않고 viewer가 먼저 실행되기때문(데이터가 반영되기전에 DOM이 먼저 바뀌어버림), 
      prevMemberBtn.addEventListener("click", () => {
      console.log(this);
      if (this.curIdx == 0) {
        this.curIdx = this.members.length - 1
      } else {
        this.curIdx -= 1
      }
      this.curMember = this.members[this.curIdx]
      this.curMemberId = this.curMember.user_id
      getQueries(this.curMemberId, this.info)
      viewer(this.curMember, this.info.currentMemberPayments, this.info.currentMemberAttendances)
    })
  
  그렇다고 getQueries에 await를 붙일수가 없음 화살표함수 내부라서, async 익명함수?는 되나?
  그래서 getQueries마지막부분에 viewer물려주기로
*/

/*
question 
이렇게 SPA에서 하나의 HTML내에서 DOM 의 수정으로 페이지 갱신할때, 이에 맞게 스타일이 적용되야하는데
단일한 CSS파일(모든 변경요소에 대한 스타일 존재)로만 스타일 적용하는게 좋은지
아니면 바뀔 변경요소에 대한 각 CSS파일을 마련해두고 속성값만 바꾸는게 좋은지
*/

// question 
/*
  이벤트 핸들러함수 내에서, 익명함수, 화살표 함수에 따라 내부의 this동작이 달라진다!!
*/


const obj = { name : "peter", id : 1547, age : 24 }
const {name, age} = obj // id는 안써도 됌
console.log(name, age); // 알아서 매칭되는듯함


// question 
/*

async function getData() {
    console.log('getting data')
    await new Promise((resolve) => {
      setTimeout(() => {
          resolve()
      },100)
    })
    console.log('data is here')
}

function hello() {
  console.log('next');
}

function main() {
  getData()
  hello()
}
main()

// getting data
// next
// data is here

*/