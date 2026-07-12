APP_DATA.tasks = [
  { id:1, title:'Отправить КП компании «Ромашка»', meta:'Сделка · Ромашка ООО · до 16:00', icon:'fa-fire', c:'#ff6b6b', bg:'#ffe5e5', done:true,
    deal:'Ромашка ООО', due:'Сегодня, 16:00', owner:'Анна Ковалёва', priority:'Высокий', desc:'Сформировать коммерческое предложение по итогам встречи и отправить контактному лицу на согласование.' },
  { id:2, title:'Согласовать договор с юристом', meta:'Сделка · ГринЛайт · на согласовании', icon:'fa-file-pen', c:'#e8a33d', bg:'#fdeecb', done:true,
    deal:'ГринЛайт', due:'Завтра, 12:00', owner:'Максим Титов', priority:'Средний', desc:'Передать проект договора юридическому отделу, зафиксировать правки и подготовить финальную версию.' },
  { id:3, title:'Позвонить клиенту «ТехноСфера»', meta:'Уточнить бюджет проекта · сегодня', icon:'fa-phone', c:'#7c8cf9', bg:'#e6eaff', done:true,
    deal:'ТехноСфера', due:'Сегодня', owner:'Анна Ковалёва', priority:'Высокий', desc:'Позвонить лицу, принимающему решение, уточнить бюджет и сроки старта проекта.' },
  { id:4, title:'Подготовить презентацию для «Финмакс»', meta:'Сделка · Финмакс · завтра', icon:'fa-file-lines', c:'#27c079', bg:'#d8f5e6', done:true,
    deal:'Финмакс', due:'Завтра', owner:'Пётр Васильев', priority:'Средний', desc:'Собрать слайды с кейсами и расчётом ROI под запрос клиента, добавить блок с тарифами.' },
  { id:5, title:'Выставить счёт «МедиаПлюс»', meta:'Сделка закрыта · выполнено', icon:'fa-circle-check', c:'#27c079', bg:'#d8f5e6', done:true,
    deal:'МедиаПлюс', due:'Выполнено', owner:'Елена Соколова', priority:'Низкий', desc:'Сформировать и отправить счёт на оплату по закрытой сделке.' },
  { id:6, title:'Провести демо продукта «Вектор Групп»', meta:'Встреча · четверг 14:00', icon:'fa-video', c:'#7c8cf9', bg:'#e6eaff', done:false,
    deal:'Вектор Групп', due:'Четверг, 14:00', owner:'Анна Ковалёва', priority:'Высокий', desc:'Онлайн-демонстрация ключевых модулей платформы для команды заказчика. Подготовить демо-стенд и сценарий показа.' },
  { id:7, title:'Написать письмо-напоминание «Ай-Ти Лаб»', meta:'Сделка · Ай-Ти Лаб · до пятницы', icon:'fa-envelope', c:'#e8a33d', bg:'#fdeecb', done:false,
    deal:'Ай-Ти Лаб', due:'Пятница', owner:'Пётр Васильев', priority:'Средний', desc:'Отправить письмо-напоминание о необходимости продлить лицензию и предложить обновление тарифа.' },
];

function priColor(p) {
  return p === 'Высокий' ? '#ff6b6b' : p === 'Средний' ? '#e8a33d' : '#7c869a';
}

function renderTasks() {
  var container = document.getElementById('taskList');
  if (!container) return;

  container.innerHTML = APP_DATA.tasks.map(function(t) {
    return '<div class="task' + (t.done ? ' completed' : '') + '" data-id="' + t.id + '">' +
      '<div class="task-checkbox' + (t.done ? ' done' : '') + '" data-check="' + t.id + '">' +
        '<i class="fa-solid fa-check" style="opacity:' + (t.done ? '1' : '0') + '"></i>' +
      '</div>' +
      '<div class="task-icon" style="background:' + t.bg + ';color:' + t.c + '"><i class="fa-solid ' + t.icon + '"></i></div>' +
      '<div class="task-body">' +
        '<div class="task-title">' + t.title + '</div>' +
        '<div class="task-meta">' + t.meta + '</div>' +
      '</div>' +
      '<div class="task-badge ' + (t.done ? 'done' : 'work') + '">' + (t.done ? 'Выполнено' : 'В работе') + '</div>' +
    '</div>';
  }).join('');
}

function toggleTask(id) {
  var task = APP_DATA.tasks.find(function(t) { return t.id === id; });
  if (!task) return;
  if (!task.done) {
    showConfirm(task.title, function() {
      task.done = true;
      renderTasks();
    });
  } else {
    task.done = false;
    renderTasks();
  }
}

function showConfirm(title, onConfirm) {
  var overlay = document.getElementById('taskConfirmOverlay');
  var modal = document.getElementById('taskConfirmModal');
  modal.innerHTML =
    '<div class="tc-head">' +
      '<div class="tc-icon"><i class="fa-solid fa-circle-question"></i></div>' +
      '<h2>Подтвердить выполнение задачи?</h2>' +
      '<div class="tc-sub">' + title + '</div>' +
    '</div>' +
    '<div class="tc-foot">' +
      '<button class="tm-btn tm-btn-primary" id="tcConfirm"><i class="fa-solid fa-check"></i> Выполнить</button>' +
      '<button class="tm-btn tm-btn-ghost" id="tcCancel"><i class="fa-solid fa-xmark"></i> Отмена</button>' +
    '</div>';
  overlay.classList.add('open');
  document.getElementById('tcConfirm').onclick = function() {
    overlay.classList.remove('open');
    onConfirm();
  };
  document.getElementById('tcCancel').onclick = function() {
    overlay.classList.remove('open');
  };
}

function openTaskDetail(id) {
  var t = APP_DATA.tasks.find(function(x) { return x.id === id; });
  if (!t) return;
  var modal = document.getElementById('taskDetailModal');

  modal.innerHTML =
    '<div class="tm-head">' +
      '<div class="tm-icon" style="background:' + t.bg + ';color:' + t.c + '"><i class="fa-solid ' + t.icon + '"></i></div>' +
      '<div class="tm-head-info">' +
        '<h2>' + t.title + '</h2>' +
        '<div class="tm-meta">' + t.meta + '</div>' +
      '</div>' +
      '<button class="tm-close" onclick="closeTaskDetail()"><i class="fa-solid fa-xmark"></i></button>' +
    '</div>' +
    '<div class="tm-body">' +
      '<div class="tm-field">' +
        '<label>Статус</label>' +
        '<span class="tm-status" style="background:' + (t.done ? 'var(--green-soft)' : 'var(--violet-soft)') + ';color:' + (t.done ? '#1c9a63' : '#5566e3') + '">' +
          '<i class="fa-solid ' + (t.done ? 'fa-circle-check' : 'fa-circle-half-stroke') + '"></i> ' +
          (t.done ? 'Выполнено' : 'В работе') +
        '</span>' +
      '</div>' +
      '<div class="tm-grid">' +
        '<div class="tm-field">' +
          '<label>Сделка</label>' +
          '<div class="tm-val"><i class="fa-solid fa-briefcase"></i> ' + t.deal + '</div>' +
        '</div>' +
        '<div class="tm-field">' +
          '<label>Срок</label>' +
          '<div class="tm-val"><i class="fa-solid fa-clock"></i> ' + t.due + '</div>' +
        '</div>' +
        '<div class="tm-field">' +
          '<label>Ответственный</label>' +
          '<div class="tm-val"><i class="fa-solid fa-user"></i> ' + t.owner + '</div>' +
        '</div>' +
        '<div class="tm-field">' +
          '<label>Приоритет</label>' +
          '<div class="tm-val"><i class="fa-solid fa-flag" style="color:' + priColor(t.priority) + '"></i> ' + t.priority + '</div>' +
        '</div>' +
      '</div>' +
      '<div class="tm-field" style="margin-bottom:0">' +
        '<label>Описание</label>' +
        '<div class="tm-desc">' + t.desc + '</div>' +
      '</div>' +
    '</div>' +
    '<div class="tm-foot">' +
      '<button class="tm-btn tm-btn-primary" onclick="toggleTaskFromModal(' + t.id + ')">' +
        '<i class="fa-solid ' + (t.done ? 'fa-rotate-left' : 'fa-check') + '"></i> ' +
        (t.done ? 'Вернуть в работу' : 'Завершить задачу') +
      '</button>' +
      '<button class="tm-btn tm-btn-ghost" onclick="closeTaskDetail()"><i class="fa-solid fa-xmark"></i> Закрыть</button>' +
    '</div>';

  var modal = document.getElementById('taskDetailModal');
  modal.classList.remove('tm-exit');
  void modal.offsetWidth;
  modal.classList.add('tm-in');
  document.getElementById('taskDetailOverlay').classList.add('open');
}

function toggleTaskFromModal(id) {
  var task = APP_DATA.tasks.find(function(t) { return t.id === id; });
  if (!task) return;
  if (!task.done) {
    showConfirm(task.title, function() {
      task.done = true;
      renderTasks();
      openTaskDetail(id);
    });
  } else {
    task.done = false;
    renderTasks();
    openTaskDetail(id);
  }
}

function closeTaskDetail() {
  var overlay = document.getElementById('taskDetailOverlay');
  var modal = document.getElementById('taskDetailModal');
  modal.classList.remove('tm-in');
  modal.classList.add('tm-exit');
  overlay.style.opacity = '0';
  setTimeout(function() {
    overlay.classList.remove('open');
    overlay.style.opacity = '';
    modal.classList.remove('tm-exit');
  }, 220);
}

document.getElementById('taskDetailOverlay').addEventListener('click', function(e) {
  if (e.target === this) closeTaskDetail();
});

document.getElementById('taskConfirmOverlay').addEventListener('click', function(e) {
  if (e.target === this) this.classList.remove('open');
});

document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') {
    var confirmOverlay = document.getElementById('taskConfirmOverlay');
    if (confirmOverlay.classList.contains('open')) {
      confirmOverlay.classList.remove('open');
    } else {
      closeTaskDetail();
    }
  }
});

document.getElementById('taskList').addEventListener('click', function(e) {
  var chk = e.target.closest('[data-check]');
  if (chk) {
    e.stopPropagation();
    toggleTask(+chk.dataset.check);
    return;
  }
  var card = e.target.closest('[data-id]');
  if (card) openTaskDetail(+card.dataset.id);
});
