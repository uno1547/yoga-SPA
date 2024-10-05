import Page from "./Page.js";
import { inputHandler, getMemInfo, submitHandler, deleteMember } from "../utility/member/update.js";

export default class extends Page {
  constructor(userId) {
    super()
    this.userId = userId
  }

  initPage() {
    // console.log(this.userId);
    getMemInfo(this.userId)
    super.initPage()
    this.styleTag.href = "/static/css/update-info.css"
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
        <input id="tel" type="tel" placeholder="010-1234-5678" required maxlength="13" autocomplete="off" name="phone_number" pattern = "[0-9]{3}-[0-9]{4}-[0-9]{4}">
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
  }

  addListeners() {
    const telInput = document.querySelector("input#tel")
    telInput.addEventListener("input", inputHandler)

    const formEl = document.querySelector("form")
    // formEl.addEventListener("submit", submitHandler) this.userId 를 전달해야함
    formEl.addEventListener("submit", (evt) => {
      submitHandler(this.userId, evt) // 오호
    })
    const deleteBtn = document.querySelector('form input[type = "button"]')
    deleteBtn.addEventListener("click", () => {
      deleteMember(this.userId)
    })
  }

  renderPage() {
    this.initPage()
    this.addListeners()
  }
}