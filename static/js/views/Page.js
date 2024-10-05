export default class {
  constructor() {
    this.rootDiv = document.querySelector("div#root")
    this.styleTag = document.querySelector("link#styles")
  }

  initPage() { //데이터 불러오기 같은거 하는 부분인가? 여기서 DOM을 만들고
    this.rootDiv.innerHTML = ""
    // console.log('부모의 initpage');
    // console.log(this.rootDiv);
  }

  addListeners() { //리스너를 추가하는 방식인가

  }

  renderPage() {
    this.initPage()
    console.log('hey');
    this.addListeners()  
  }
}

// Page 클래스를 상속받아 각 '회원관리', '검색', '통계' 의 컴포넌트(페이지?)를 구성??