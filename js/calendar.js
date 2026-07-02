const MONTHS = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];
const DOWS = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];

let calendarDate = new Date(2026, 9, 1);

function isLightTheme() {
  return document.documentElement.getAttribute('data-theme') === 'light';
}

const CAL_COLORS = {
  '#6366f1': { bg: 'rgba(99,102,241,.15)', text: '#6366f1' },
  '#818cf8': { bg: 'rgba(129,140,248,.15)', text: '#4f46e5' },
  '#a855f7': { bg: 'rgba(168,85,247,.15)', text: '#7c3aed' },
  '#34d399': { bg: 'rgba(52,211,153,.15)', text: '#059669' },
  '#fbbf24': { bg: 'rgba(251,191,36,.15)', text: '#d97706' },
  '#f87171': { bg: 'rgba(248,113,113,.15)', text: '#dc2626' },
  '#ec4899': { bg: 'rgba(236,72,153,.15)', text: '#be185d' },
  '#f59e0b': { bg: 'rgba(245,158,11,.15)', text: '#b45309' },
  '#00cec9': { bg: 'rgba(0,206,201,.15)', text: '#0d9488' },
};

function getCalColor(hex) {
  return CAL_COLORS[hex] || { bg: hex + '22', text: hex };
}

function renderCalendar() {
  const titleEl = document.getElementById('calendarTitle');
  const gridEl = document.getElementById('calendarGrid');
  if (!titleEl || !gridEl) return;

  titleEl.textContent = MONTHS[calendarDate.getMonth()] + ' ' + calendarDate.getFullYear();

  const year = calendarDate.getFullYear();
  const month = calendarDate.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const firstDayOffset = firstDay === 0 ? 6 : firstDay - 1;
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const daysInPrevMonth = new Date(year, month, 0).getDate();
  const today = new Date();
  const light = isLightTheme();

  let html = DOWS.map(d => `<div class="calendar-dow">${d}</div>`).join('');

  for (let i = firstDayOffset; i > 0; i--) {
    html += `<div class="calendar-day other-month"><div class="calendar-day-number">${daysInPrevMonth - i + 1}</div></div>`;
  }

  for (let d = 1; d <= daysInMonth; d++) {
    const isToday = d === today.getDate() && month === today.getMonth() && year === today.getFullYear();
    const events = APP_DATA.calendarEvents[d] || [];

    html += `
      <div class="calendar-day ${isToday ? 'today' : ''}">
        <div class="calendar-day-number">${d}</div>
        ${events.map(e => {
          const c = getCalColor(e.c);
          const bg = light ? c.bg : e.c + '22';
          const tc = light ? c.text : e.c;
          return `<div class="calendar-event" style="background:${bg};color:${tc}">${e.t}</div>`;
        }).join('')}
      </div>`;
  }

  const totalCells = firstDayOffset + daysInMonth;
  const remaining = (7 - (totalCells % 7)) % 7;
  for (let i = 1; i <= remaining; i++) {
    html += `<div class="calendar-day other-month"><div class="calendar-day-number">${i}</div></div>`;
  }

  gridEl.innerHTML = html;
}

function shiftMonth(delta) {
  calendarDate.setMonth(calendarDate.getMonth() + delta);
  renderCalendar();
}
