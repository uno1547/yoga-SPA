import Page from './Page.js'
import { getData } from '../utility/get-data.js'
import { viewer, getQueries, showMemberInfo, showMemberClass, showMemberPayments, showMemberAttendance } from '../utility/member/member.js'

export default class extends Page {
  // 음 아직까지는 상속을 하는 의미를 모르겠음(여기선 사실상 각페이지 메소드로 새로쓰느느건데)
  // 굳이 상속안하고 각자 메서드 정의 해도 되는거 아닌가?
  // 또 constructor를 쓸일이 있나 싶음
  constructor() {
    super() // 얘는 안하면 에러나던데 왜 그런거지? root는 여기서도 필요하니깐 가지고있게하자
    // 클래스 내부에서 쓸 현재 멤버 변수
    this.members
    this.curMember
    this.curIdx = 0
    this.curMemberId
    
    // this.curMemberPayments
    this.info = {
      currentMemberPayments : null,
      currentMemberAttendances : null,
    }
  }

  async initPage() {
    super.initPage() //?
    console.log('initpage시작');
    this.members = await getData("members")
    this.members.sort((a, b) => a.name.localeCompare(b.name)) // 회원 배열 
    console.log('멤버불러오기');
    this.curMember = this.members[0]
    this.curIdx = 0
    this.curMemberId = this.curMember.user_id
    console.log(this.curMemberId);
    console.log(this.curMember);
    console.log(this.curIdx);
    
    this.rootDiv.innerHTML += `
      <div class = "inner">
    <div id = "member-info">
      <div class="row">
        <div id = "personal-data">
          <div class = "update">
            <button id="sign-up">신규 회원 등록</button>
            <button id="new-pay">회원 통합 결제</button>
            <button id="attendance-update">실시간 방문 현황</button>
            <button id="show-expire">만기 회원 현황</button>
          </div>
          <div class = "buttons">
            <button id="prevMember"><</button>
            <button id="nextMember">></button>
            <button id="update-info">정보 수정</button>
          </div>
          <!-- <div id = "photo">사진과 버튼</div> -->
          <table class="info">
            <tr>
              <th>이름 / 성별</th>
              <td class="name gender">
                <span class="name-span"></span>
                <span class="gender-span"></span>
              </td>
            </tr>
            <tr>
              <th>회원 번호</th>
              <td class="user_id"></td>
            </tr>
            <tr>
              <th>연락처</th>
              <td class="phone_number"></td>
            </tr>
            <tr>
              <th>생년월일</th>
              <td class="birth_date"></td>
            </tr>
            <tr>
              <th>가입일</th>
              <td class="sign_in_date"></td>
            </tr>
            <tr>
              <th>회원 그룹</th>
              <td class="group"></td>
            </tr>
            <tr>
              <th>담당 강사</th>
              <td class="teacher"></td>
            </tr>
            <tr>
              <th>수강 정보</th>
              <td class="class"></td>
            </tr>
          </table>
        </div>
        <div id = "attend-calender">
        </div>
      </div>
      <div id = "payment-list">
        결제 내역
        <table class="key">
          <tr>
            <th>번호</th>
            <th>결제일</th>
            <th>수강 종목</th>
            <th>수강 기간</th>
            <th>상태</th>
            <th>결제 금액</th>
          </tr>
        </table>
        <table class="val">
        </table>
      </div>
    </div>
  </div>
    `

    await getQueries(this.curMember, this.curMemberId, this.info)
    // console.log(this.info);
    // viewer(this.curMember, this.info.currentMemberPayments, this.info.currentMemberAttendances)
    /*
    console.log('멤버 페이지의 root',this.rootDiv);
    this.rootDiv.innerHTML = "여긴 멤버페이지"
    console.log('오버라이딩한 Member페이지의 initpage');
    */
    return

    // 처음 멤버 정보 불러오기 getMemberQuery()
    /*
    this.members = getData("members")
    this.members.sort((a, b) => a.name.localeCompare(b.name))
    this.curMember = this.members[this.curIdx]
    this.curMemberId = this.curMember.user_id
    console.log(this.curMember, this.curMemberId);
    console.log(this.info);
    getQueries(this.curMemberId, this.info) //이거 안됌
    console.log(this.info);
    // 정보 초기화 현재멤버, 멤버의 결제, 멤버의 출석
    return `
    <div class = "inner">
      <div id = "member-info">
        <div id = "personal-data">
          <div class = "update">
            <button id="sign-up">신규 회원 등록</button>
            <button id="new-pay">회원 통합 결제</button>
            <button id="attendance-update">실시간 방문 현황</button>
            <button id="show-expire">만기 회원 현황</button>
          </div>
          <div class = "buttons">
            <button id="prevMember"><</button>
            <button id="nextMember">></button>
            <button id="update-info">정보 수정</button>
          </div>
          <table class="info">
            <tr>
              <th>이름 / 성별</th>
              <td class="name gender">
                <span class="name-span"></span>
                <span class="gender-span"></span>
              </td>
            </tr>
            <tr>
              <th>회원 번호</th>
              <td class="user_id"></td>
            </tr>
            <tr>
              <th>연락처</th>
              <td class="phone_number"></td>
            </tr>
            <tr>
              <th>생년월일</th>
              <td class="birth_date"></td>
            </tr>
            <tr>
              <th>가입일</th>
              <td class="sign_in_date"></td>
            </tr>
            <tr>
              <th>회원 그룹</th>
              <td class="group"></td>
            </tr>
            <tr>
              <th>담당 강사</th>
              <td class="teacher"></td>
            </tr>
            <tr>
              <th>수강 정보</th>
              <td class="class"></td>
            </tr>
          </table>
        </div>
        <div id = "attend-calender">
        </div>
      </div>
      <div id = "payment-list">
        <h3>결제 내역</h3>
        <table>
          <tr id = "key">
            <th>번호</th>
            <th>결제일</th>
            <th>수강 종목</th>
            <th>수강 기간</th>
            <th>상태</th>
            <th>결제 금액</th>
          </tr>
        </table>
      </div>
    </div> 
    
    
    `



    return `
    <div class = "inner">
      <div id = "member-info">
        <div id = "personal-data">
          <div class = "update">
            <button id="sign-up">신규 회원 등록</button>
            <button id="new-pay">회원 통합 결제</button>
            <button id="attendance-update">실시간 방문 현황</button>
            <button id="show-expire">만기 회원 현황</button>
          </div>
          <div class = "buttons">
            <button id="prevMember"><</button>
            <button id="nextMember">></button>
            <button id="update-info">정보 수정</button>
          </div>
          <table class="info">
            <tr>
              <th>이름 / 성별</th>
              <td class="name gender">
                <span class="name-span">${this.curMember.name}</span>
                <span class="gender-span">[${this.curMember.gender}]</span>
              </td>
            </tr>
            <tr>
              <th>회원 번호</th>
              <td class="user_id">${this.curMemberId}</td>
            </tr>
            <tr>
              <th>연락처</th>
              <td class="phone_number">${this.curMember.phone_number}</td>
            </tr>
            <tr>
              <th>생년월일</th>
              <td class="birth_date">${this.curMember.birth_date}</td>
            </tr>
            <tr>
              <th>가입일</th>
              <td class="sign_in_date">${this.curMember.sign_in_date}</td>
            </tr>
            <tr>
              <th>회원 그룹</th>
              <td class="group">${this.curMember.group}</td>
            </tr>
            <tr>
              <th>담당 강사</th>
              <td class="teacher">${this.curMember.teacher}</td>
            </tr>
            <tr>
              <th>수강 정보</th>
              <td class="class"></td>
            </tr>
          </table>
        </div>
        <div id = "attend-calender">
        </div>
      </div>
      <div id = "payment-list">
        <h3>결제 내역</h3>
        <table>
          <tr id = "key">
            <th>번호</th>
            <th>결제일</th>
            <th>수강 종목</th>
            <th>수강 기간</th>
            <th>상태</th>
            <th>결제 금액</th>
          </tr>
          <tr class = "val">
            <td>1</td>
            <td>2024. 08. 15</td>
            <td>요가 주 3회 [3개월]</td>
            <td>2024. 08. 16 ~ 2024. 11. 15</td>
            <td>유효</td>
            <td>360,000 원</td>
          </tr>
          <tr class = "val">
            <td>22</td>
            <td>2024. 12. 12</td>
            <td>개인 레슨 주 3회 [3개월]</td>
            <td>2024. 08. 16 ~ 2024. 11. 15</td>
            <td>유효</td>
            <td>360,000 원</td>
          </tr>
          <tr class = "val skeleton">
            <td><span></span></td>
            <td><span></span></td>
            <td><span></span></td>
            <td><span></span></td>
            <td><span></span></td>
            <td><span></span></td>
          </tr>
        </table>
      </div>
    </div> `
    */

  }

  addListeners() {
    console.log('리스너 추가');
    /*
      <button id="prevMember"><</button>
      <button id="nextMember">></button>
    */
    const prevMemberBtn = document.querySelector("button#prevMember")
    const nextMemberBtn = document.querySelector("button#nextMember")
    const updateInfoBtn = document.querySelector("button#update-info")
    /*
      <div class = "update">
        <button id="sign-up">신규 회원 등록</button>
        <button id="new-pay">회원 통합 결제</button>
        <button id="attendance-update">실시간 방문 현황</button>
        <button id="show-expire">만기 회원 현황</button>
      </div>
      <div class = "buttons">
        <button id="prevMember"><</button>
        <button id="nextMember">></button>
        <button id="update-info">정보 수정</button>
      </div>    
    */
    const toSignUpBtn = document.querySelector("button#sign-up")
    const newPaymentBtn = document.querySelector("button#new-pay")
    const toAttendanceBtn = document.querySelector("button#attendance-update")
    const showExpireBtn = document.querySelector("show-expire")

    prevMemberBtn.addEventListener("click", () => {
      console.log(this);
      if (this.curIdx == 0) {
        this.curIdx = this.members.length - 1
      } else {
        this.curIdx -= 1
      }
      this.curMember = this.members[this.curIdx]
      this.curMemberId = this.curMember.user_id
      getQueries(this.curMember, this.curMemberId, this.info)
      // viewer(this.curMember, this.info.currentMemberPayments, this.info.currentMemberAttendances)
      // 이위치에서 viewer로 this.curMember를 전달할방법은 없는건가?
    })

    // prevMemberBtn.addEventListener("click", function () {
    //   console.log(this);
    //   if (this.curIdx == 0) {
    //     this.curIdx = this.members.length - 1
    //   } else {
    //     this.curIdx -= 1
    //   }
    //   this.curMember = this.members[this.curIdx]
    //   this.curMemberId = this.curMember.user_id
    //   getQueries(this.curMemberId)
    // })

    nextMemberBtn.addEventListener("click", () => {
      this.curIdx = Math.abs((this.curIdx + 1) % this.members.length)
      this.curMember = this.members[this.curIdx]
      this.curMemberId = this.curMember.user_id
      getQueries(this.curMember, this.curMemberId, this.info)
      // viewer(this.curMember, this.info.currentMemberPayments, this.info.currentMemberAttendances)
    })

    updateInfoBtn.addEventListener("click", () => {
      super.initPage() //비우고
      this.rootDiv.innerHTML = `
        <div class="inner">
    <!--  -->
    <h2>정보를 수정해 주세요</h2>
    <form action="">
      <div class ="group wrap">
        <div id="group-text">회원 그룹</div>
        <div id="group-radio">
          <label>개인 레슨<input type="radio" name="group" value = "pt" required></label>
          <label>그룹 레슨<input type="radio" name="group" value = "group" required></label>
          <label>마이솔<input type="radio" name="group" value = "misole" required></label>
        </div>
      </div>
      <div class ="teacher wrap">
        <div id="teacher-text">담당 강사</div>
        <div id="teacher-radio">
          <label>김영원<input type="radio" name="teacher" value = "김영원" required></label>
          <label>최수경<input type="radio" name="teacher" value = "최수경" required></label>
          <label>김예림<input type="radio" name="teacher" value = "김예림" required></label>
        </div>
      </div>
      <div class ="name wrap">
        <label for="name"><div id="name-text">회원 이름</div></label>
        <input id="name" type="text" required autocomplete="off" name="name">
        <label>남<input type="radio" name="gender" value="남" required></label>
        <label>여<input type="radio" name="gender" value="여" required></label>
      </div>
      <div class ="tel wrap">
        <label for="tel"><div id="tel-text">연락처</div></label>
        <input id="tel" type="tel" placeholder="010-1234-5678" required maxlength="13" autocomplete="off" name="phone_number">
      </div>
      <div class ="bthday wrap">
        <label for="bthday"><div id="bthday-text">생년월일</div></label>
        <input id="bthday" type="date" placeholder="YYYYMMDD" required autocomplete="off" name="birth_date">  
      </div>
      <input type="button" value = "삭제">
      <input type="submit" value = "수정">
    </form>
    <!--  -->
  </div>`
      this.styleTag.href = "/static/css/update-info.css"
    })

    //표시된 html에 이벤트 리스너 추가하기
    /*
    // 정보 수정 페이지로 이동(with user_id)
    toUpdateBtn.addEventListener('click', function () {
      console.log('수정페이지!');
      // location.href = `/src/update-info.html?user_id=${currentMemberID}`
    })

    // 페이지 이동 버튼 추가
    const signUpBtn = document.querySelector(".update #sign-up")
    const newPayBtn = document.querySelector(".update #new-pay")
    const atdBtn = document.querySelector(".update #attendance-update")
    const expireBtn = document.querySelector(".update #show-expire")
    signUpBtn.addEventListener('click', function() {
      console.log('신규회원!');
      // location.href = "/src/new-member.html"
    })

    // '회원 통합 결제' 페이지로 이동
    newPayBtn.addEventListener('click', function() {
      console.log('신규결제!');
      // location.href = `/src/new-payment.html?user_id=${currentMemberID}`
    })

    // '실시간 방문 현황' 페이지로 이동
    atdBtn.addEventListener('click', function() {
      console.log('실시간 방문 현황!');
      // location.href = `/src/live-attendance.html`
    })

    // '만기 회원 현황' 페이지로 이동
    expireBtn.addEventListener('click', function() {
      console.log('만기 회원 조회!');
      // window.open('/src/expire-members.html', 'expire-popup' ,'popup, width=1000, height=1000, top=200, left=200')

    })
      */
  }

  async renderPage() {
    await this.initPage()
    this.addListeners()
  }

  
}