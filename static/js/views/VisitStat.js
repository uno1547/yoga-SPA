import Page from './Page.js'
export default class extends Page {
  constructor() {
    super()
  }

  initPage() {
    super.initPage()
    console.log('방문통계 페이지의 root',this.rootDiv);
    this.rootDiv.innerHTML = "여긴 방문통계페이지"
    console.log('오버라이딩한 visit페이지의 initpage');
  }

  addListeners() {

  }
}