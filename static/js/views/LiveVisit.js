import Page from "./Page.js";
// import moduleDB from "../utility/init-firestore.js";
import { showDate, showCurrentTime, showTodayVisits,setLiveChangeHandler } from "../utility/member/live-visit.js";

export default class extends Page {

  initPage() {
    super.initPage()
    this.styleTag.href = "/static/css/live-attendance.css"
    this.rootDiv.innerHTML += `
      <div class="inner">
    <div id = "class-info">
      <div class="text">
        <div id = "date">
          <span></span>
        </div>
        <div id = "clock">
          <span></span>
        </div>
        <div id = "visit-num">
          <span></span>
        </div>
      </div>
    </div>
    <div id = "attend-pallette">
      <!-- <div class="attend">
        <div id="visit-name" class="row">
          <div class="text" id="name">회원이름</div>
          <div class="content" id="name">김윤오</div>
        </div>
        <div id="visit-user-id" class="row">
          <div class="text" id="user-id">회원번호</div>
          <div class="content" id="user-id">2212</div>
        </div>
        <div id="visit-time" class="row">
          <div class="text" id="time">방문시각</div>
          <div class="content" id="time">10 : 53 : 05</div>
        </div>
      </div> -->
      <!-- <div class="attend"></div>
      <div class="attend"></div>
      <div class="attend"></div>
      <div class="attend"></div>
      <div class="attend"></div>
      <div class="attend"></div>
      <div class="attend"></div> -->
    </div>
  </div>`

    showDate()
    showCurrentTime()
    showTodayVisits()
  }

  addListeners() {
    setLiveChangeHandler()
  }

  // renderPage() {
  //   this.initPage()
  //   this.addListeners()
  // }
}