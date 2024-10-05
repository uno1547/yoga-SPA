// 각 Page클래스를 상속받은 calendar, membe, payStat을 Import해야함
import Calendar from "./views/Calendar.js"
import Member from "./views/Member.js"
import Search from "./views/Search.js"
import PayStat from "./views/PayStat.js"
import VisitStat from "./views/VisitStat.js"

const rootDiv = document.querySelector("#root")
const navEl = document.querySelector("nav")
const styleEl = document.querySelector("link#styles")

const routes = [
  { path : "/", view : Calendar, style : "/static/css/index.css" },
  { path : "/member", view : Member, style : "/static/css/member-manage.css" },
  { path : "/search", view : Search, style : "/static/css/search.css" },
  { path : "/pay-stat", view : PayStat, style : "/static/css/stat.css" },
  { path : "/visit-stat", view : VisitStat, style : "/static/css/visit-stat.css" },
]

const router = async path => {
  const route = routes.find(route => route.path === path)
  console.log(route);
  const styleLink = route.style
  console.log('path의 view 에대한 스타일 링크은', styleLink);
  styleEl.href = styleLink

  const view = new route.view()
  /*
  rootDiv.innerHTML = view.initPage()
  */
  view.renderPage()
  
  // console.log(view);
  // view.addListeners()
  // view.renderPage()
}

document.addEventListener("DOMContentLoaded", () => {
  console.log('DOM loaded');
  navEl.addEventListener("click", e => { // nav 클릭으로 page라우팅
    if(!e.target.matches("nav a")) return
    e.preventDefault() // 새로고침을 방지
    const path = e.target.getAttribute("href")
    
    console.log('클릭의 출처 href속성은', path);
    // styleEl.href = ""
    router(path)
  }) // 클릭 이벤트 캐치, 새로고침방지(서버)
  // styleEl.href = "/static/css/common.css"
  router('/')
})
