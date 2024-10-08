import Page from './Page.js'
import Update from './Update.js'
import NewMember from './NewMember.js'
import NewPayment from './NewPayment.js'
import LiveVisit from './LiveVisit.js'

import { getData } from '../utility/get-data.js'
import { getQueries } from '../utility/member/member.js'

export default class extends Page {
  // 음 아직까지는 상속을 하는 의미를 모르겠음(여기선 사실상 각페이지 메소드로 새로쓰느느건데)
  // 오버라이딩의 장점? 이 뭔거지?
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

    const toSignUpBtn = document.querySelector("button#sign-up")
    const newPaymentBtn = document.querySelector("button#new-pay")
    const toAttendanceBtn = document.querySelector("button#attendance-update")
    const showExpireBtn = document.querySelector("button#show-expire")

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
    nextMemberBtn.addEventListener("click", () => {
      this.curIdx = Math.abs((this.curIdx + 1) % this.members.length)
      this.curMember = this.members[this.curIdx]
      this.curMemberId = this.curMember.user_id
      getQueries(this.curMember, this.curMemberId, this.info)
      // viewer(this.curMember, this.info.currentMemberPayments, this.info.currentMemberAttendances)
    })
    updateInfoBtn.addEventListener("click", () => {
      console.log('정보수정 view!!');
      const updatePage = new Update(this.curMemberId)
      updatePage.renderPage()
    })

    toSignUpBtn.addEventListener("click", () => {
      const newMemberPage = new NewMember()
      newMemberPage.renderPage()
    })

    newPaymentBtn.addEventListener("click", () => {
      const newPaymentPage = new NewPayment(this.curMemberId)
      newPaymentPage.renderPage()
    })

    toAttendanceBtn.addEventListener("click", () => {
      const liveVisitPage = new LiveVisit()
      liveVisitPage.renderPage()
    })

    showExpireBtn.addEventListener("click", () => {
      // const newPaymentPage = new NewMember()
      // newPaymentPage.renderPage()
    })
  }

  async renderPage() {
    await this.initPage()
    this.addListeners()
  }

  
}