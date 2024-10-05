import Page from './Page.js'
import { getData } from '../utility/get-data.js'
import { getReducedPayments, getReducedEvents } from '../utility/calendar/calendar.js'


export default class extends Page {
  constructor() {
    super()
  }

  async initPage() {
    super.initPage()
    /*
    console.log('캘린더 페이지의 root',this.rootDiv);
    this.rootDiv.innerHTML = "여긴 달력페이지"
    console.log('오버라이딩한 Calendar 페이지의 initpage');
    */
    this.rootDiv.innerHTML += `<div class = "calendar"></div>`
    const payments = await getData("payments")
    const reducedPayments = getReducedPayments(payments)
    const reducedEvents = getReducedEvents(reducedPayments)
    
    const calendarEl = document.querySelector('.calendar')
    const calendar = new FullCalendar.Calendar(calendarEl, {
      initialView : 'dayGridMonth',
      locale : 'ko',
      buttonText : {
        today : '오늘'
      },
      headerToolbar : {
        start : '',
        center : 'title'
      },
      events : reducedEvents,
      eventColor : 'transparent',
      eventColor : 'rgb(256, 256, 256)',
      eventTextColor : 'rgb(0, 0, 0)'
    })
    calendar.render()
  }
}