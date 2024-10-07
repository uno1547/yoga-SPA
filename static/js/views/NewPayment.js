import Page from "./Page.js";
import { tableClickHandler, tableMouseLeaveHandler, formHandler, formSubmitHandler, makePaymentData } from "../utility/member/new-payment.js";
export default class extends Page {
  constructor(userId) {
    super()
    this.userId = userId
  }

  initPage() {
    super.initPage()
    this.styleTag.href = "/static/css/new-payment.css"
    this.rootDiv.innerHTML += `
      <div class="inner">
    <form action="">
      <div class="head-text-wrap"><span class="head-text">수강 정보를 선택해 주세요</span></div>
      <div class="class wrap">
        <div class="text">수강 항목</div>
        <table id="drop-down">
          <tr>
            <td><input type="radio" name="class" required value = "pt"></td>
            <td>개인 레슨</td>
            <td>총 10회</td>
            <td>3개월</td>
            <td>600,000원</td>
            <td>600,000원</td>
          </tr>
          <tr>
            <td><input type="radio" name="class" required value = "group_try"></td>
            <td>그룹 레슨</td>
            <td>총 30회</td>
            <td>3개월</td>
            <td>0원</td>
            <td>0원</td>
          </tr>
          <tr>
            <td><input type="radio" name="class" required value = "group_coupon"></td>
            <td>그룹레슨 쿠폰</td>
            <td>총 10회</td>
            <td>3개월</td>
            <td>230,000원</td>
            <td>250,000원</td>
          </tr>
          <tr>
            <td><input type="radio" name="class" required value = "group_two_one"></td>
            <td>요가 주2회</td>
            <td>주 2회</td>
            <td>1개월</td>
            <td>129,000</td>
            <td>143,000</td>
          </tr>
          <tr>
            <td><input type="radio" name="class" required value = "group_two_three1"></td>
            <td>요가 주2회</td>
            <td>주 2회</td>
            <td>3개월</td>
            <td>330,000</td>
            <td>367,000</td>
          </tr>
          <tr>
            <td><input type="radio" name="class" required value = "group_two_three2"></td>
            <td>요가 주2회</td>
            <td>주 2회</td>
            <td>3개월</td>
            <td>347,000</td>
            <td>386,000</td>
          </tr>
          <tr>
            <td><input type="radio" name="class" required value = "group_three_one"></td>
            <td>요가 주3회</td>
            <td>주 3회</td>
            <td>1개월</td>
            <td>149,000</td>
            <td>165,000</td>
          </tr>
          <tr>
            <td><input type="radio" name="class" required value = "group_three_three1"></td>
            <td>요가 주3회</td>
            <td>주 3회</td>
            <td>3개월</td>
            <td>360,000</td>
            <td>400,000</td>
          </tr>
          <tr>
            <td><input type="radio" name="class" required value = "group_three_three2"></td>
            <td>요가 주3회</td>
            <td>주 3회</td>
            <td>3개월</td>
            <td>378,000</td>
            <td>420,000</td>
          </tr>
          <tr>
            <td><input type="radio" name="class" required value = "group_three_six1"></td>
            <td>요가 주3회</td>
            <td>주 3회</td>
            <td>6개월</td>
            <td>677,000</td>
            <td>752,000</td>
          </tr>
          <tr>
            <td><input type="radio" name="class" required value = "group_three_six1"></td>
            <td>요가 주3회</td>
            <td>주 3회</td>
            <td>6개월</td>
            <td>713,000</td>
            <td>792,000</td>
          </tr>
          <tr>
            <td><input type="radio" name="class" required value = "group_three_twelve1"></td>
            <td>요가 주3회</td>
            <td>주 3회</td>
            <td>12개월</td>
            <td>1,190,000</td>
            <td>1,320,000</td>
          </tr>
          <tr>
            <td><input type="radio" name="class" required value = "group_three_twelve1"></td>
            <td>요가 주3회</td>
            <td>주 3회</td>
            <td>12개월</td>
            <td>1,250,000</td>
            <td>1,390,000</td>
          </tr>
          <tr>
            <td><input type="radio" name="class" required value = "group_four_twelve"></td>
            <td>요가 주4회</td>
            <td>주 4회</td>
            <td>12개월</td>
            <td>1,150,000</td>
            <td>0</td>
          </tr>
          <tr>
            <td><input type="radio" name="class" required value = "group_five_one"></td>
            <td>요가 주5회</td>
            <td>주 5회</td>
            <td>1개월</td>
            <td>168,000</td>
            <td>187,000</td>
          </tr>
          <tr>
            <td><input type="radio" name="class" required value = "group_five_three1"></td>
            <td>요가 주5회</td>
            <td>주 5회</td>
            <td>3개월</td>
            <td>408,000</td>
            <td>453,000</td>
          </tr>
          <tr>
            <td><input type="radio" name="class" required value = "group_five_three2"></td>
            <td>요가 주5회</td>
            <td>주 5회</td>
            <td>3개월</td>
            <td>429,000</td>
            <td>477,000</td>
          </tr>
          <tr>
            <td><input type="radio" name="class" required value = "group_five_six1"></td>
            <td>요가 주5회</td>
            <td>주 5회</td>
            <td>6개월</td>
            <td>768,000</td>
            <td>853,000</td>
          </tr>
          <tr>
            <td><input type="radio" name="class" required value = "group_five_six2"></td>
            <td>요가 주5회</td>
            <td>주 5회</td>
            <td>6개월</td>
            <td>810,000</td>
            <td>898,000</td>
          </tr>
          <tr>
            <td><input type="radio" name="class" required value = "group_five_twelve1"></td>
            <td>요가 주5회</td>
            <td>주 5회</td>
            <td>12개월</td>
            <td>1,340,000</td>
            <td>1,490,000</td>
          </tr>
          <tr>
            <td><input type="radio" name="class" required value = "group_five_twelve2"></td>
            <td>요가 주5회</td>
            <td>주 5회</td>
            <td>12개월</td>
            <td>1,410,000</td>
            <td>1,570,000</td>
          </tr>
        </table>
      </div>
      <hr>
      <div class="head-text-wrap"><span class="head-text">결제정보를 선택해주세요.</span></div>
      <div class="payment-method wrap">
        <div class="text">결제수단</div>
        <div class="radio-input">
          <label><input type="radio" name="method" value="cash" required>현금</label>
          <label><input type="radio" name="method" value="card" required>카드</label>
        </div>
      </div>
      <div class="payment-teacher wrap">
        <div class="text">결제(등록) 강사</div>
        <div class="radio-input">
          <label><input type="radio" name="teacher" value="김영원" required>김영원</label>
          <label><input type="radio" name="teacher" value="최수경" required>최수경</label>
          <label><input type="radio" name="teacher" value="김예림" required>김예림</label>
        </div>
      </div>
      <div id = "info">

      </div>
      <!-- <div id="payment-info">
        <hr>

        <div class="head-text-wrap">
          <span class="head-text">결제정보</span>
        </div>
        <div id="payment-content">
          <div class="wrap">
            <div class="text">수강항목</div>
            <div class="val"><span id="text-class-info">그룹레슨 주3회 3개월반</span></div>
          </div>
          <div class="wrap">
            <div class="text">수강기한</div>
            <div class="val"><span id="text-class-term">2024.03.28 ~ 2024.06.28</span></div>
          </div>
          <div class="wrap">
            <div class="text">결제날짜</div>
            <div class="val"><span id="text-pay-date">2024.03.28</span></div>
          </div>
          <div class="wrap">
            <div class="text">결제강사</div>
            <div class="val"><span id="text-pay-teacher">김영원</span></div>
          </div>
          <div class="wrap">
            <div class="text">결제금액</div>
            <div class="val"><span id="text-pay-fee">300,000 원 [카드]</span></div>
          </div>
        </div>
        <button type="submit">결제등록</button>
      </div> -->
    </form>
  </div>`
  }

  addListeners() {
    // table 및 하위요소에서 click 발생 > 해당줄의 radio활성화
    const table = document.querySelector("table#drop-down")
    table.addEventListener("click", tableClickHandler)
    // 드롭다운밖으로 마우스 이동시 top 아니면 선택요소로 스크롤
    table.addEventListener("mouseleave", tableMouseLeaveHandler)

    const form = document.querySelector('form')
    //form의 input이벤트 발생시, 3개의 radio다선택했다면 결제정보를띄움(!null ? 추가 : 텍스트만바꿈)
    console.log(form);
    form.addEventListener("change", formHandler)

    // form.addEventListener("submit", formSubmitHandler)
    form.addEventListener("submit", (evt) => {
      console.log(this.userId);
      evt.preventDefault()
      makePaymentData(this.userId)
      // formSubmitHandler(evt, this.userId)
      console.log('만들기완료'); // 위의 makePaymentData보다 먼저 실행됨;;
    })
  }

  // renderPage() {
  //   this.initPage()
  //   this.addListeners()
  // }

}

/*
// import getHello from ""
class Person {
  constructor(userId) {
    this.user_id = userId
  }

  hello() {
    const hello = getHello()
  }
}

// module file
getHello() {

}
*/
