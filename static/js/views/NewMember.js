import Page from "./Page.js";
import { setSignDate, setUserId } from "../utility/member/new-member.js"
import { inputHandler } from "../utility/member/update.js";

export default class extends Page {
  constructor() {
    super()
  }

  initPage() {
    super.initPage()
    this.styleTag.href = "/static/css/new-member.css"
    this.rootDiv.innerHTML += `
      <div class="inner">
    <h2>정보를 입력해 주세요</h2>
    <form action="">
      <div class ="group wrap">
        <div id="group-text">회원 그룹</div>
        <div id="group-radio">
          <label>개인 레슨<input type="radio" name="group" value = "pt" required></label>
          <label>그룹 레슨<input type="radio" name="group" value = "group" required></label>
          <label>마이솔<input type="radio" name="group" value = "misole" required></label>
          <!-- <label for="type-pt">개인레슨</label>
          <input id="type-pt" type="radio" name="group-type">
          <label for="type-gp">그룹레슨</label>
          <input id="type-gp" type="radio" name="group-type">
          <label for="type-ms">마이솔</label>
          <input id="type-ms" type="radio" name="group-type"> -->
        </div>
      </div>
      <div class ="teacher wrap">
        <div id="teacher-text">담당 강사</div>
        <div id="teacher-radio">
          <label>김영원<input type="radio" name="teacher" value = "김영원" required></label>
          <label>최수경<input type="radio" name="teacher" value = "최수경" required></label>
          <label>김예림<input type="radio" name="teacher" value = "김예림" required></label>
          <!-- <label for="kwo">김영원</label>
          <input id="kwo" type="radio" name="teacher">
          <label for="kyl">김예림</label>
          <input id="kyl" type="radio" name="teacher">
          <label for="csk">최수경</label>
          <input id="csk" type="radio" name="teacher"> -->
        </div>
      </div>
      <!-- <div class ="user-id wrap">
        <label for="user-id"><div id="user-id-text">회원번호</div></label>
        <input id="user-id" type="text" placeholder="4자리숫자입력" required maxlength="4" autocomplete="off">
        <button type="button" id="rep-check">중복확인</button>
      </div> -->
      <div class ="name wrap">
        <label for="name"><div id="name-text">회원 이름</div></label>
        <input id="name" type="text" required autocomplete="off" name="name">
        <label>남<input type="radio" name="gender" value="남" required></label>
        <label>여<input type="radio" name="gender" value="여" required></label>
      </div>
      <div class ="tel wrap">
        <label for="tel"><div id="tel-text">연락처</div></label>
        <input id="tel" type="tel" placeholder="010-1234-5678" required maxlength="13" autocomplete="off" name="phone_number" pattern = "[0-9]{3}-[0-9]{4}-[0-9]{4}">
      </div>
      <div class ="bthday wrap">
        <label for="bthday"><div id="bthday-text">생년월일</div></label>
        <input id="bthday" type="date" placeholder="YYYYMMDD" required autocomplete="off" name="birth_date">  
      </div>
      <!-- <div class ="zipcode wrap">
        <label for="zcode"><div id="zcode-text">우편번호</div></label>
        <input id="zcode" type="text" required>
      </div>
      <div class ="address wrap">
        <label for="ads"><div id="ads-text">주소</div></label>
        <input id="ads" type="text" required>
      </div>
      <div class ="spec-adress wrap">
        <label for="spad"><div id="spad-text">상세주소</div></label>
        <input id="spad" type="text" required>
      </div>     -->
      <input type="submit" value="등록">
    </form>
  </div>`
  }

  addListeners() {
    const formEl = document.querySelector("form")
    formEl.addEventListener("submit", (evt) => {
      evt.preventDefault()
      const formData = new FormData(evt.target)
      const memberObj = Object.fromEntries(formData)
      setSignDate(memberObj)
      console.log(memberObj);
      setUserId(memberObj)
    })

    const telInput = document.querySelector("input#tel")
    telInput.addEventListener("input", inputHandler)    
  }

  renderPage() {
    this.initPage()
    this.addListeners()
  }
}