let mailActiveId = 0;
let mailFolder = 'inbox';
let mailTag = null;
let mailSearch = '';

const MAIL_FOLDERS = [
  { id: 'inbox', icon: 'fa-inbox', label: 'Входящие', count: 42 },
  { id: 'starred', icon: 'fa-star', label: 'Избранное', count: 0 },
  { id: 'sent', icon: 'fa-paper-plane', label: 'Отправленные', count: 0 },
  { id: 'drafts', icon: 'fa-file-pen', label: 'Черновики', count: 3 },
  { id: 'archive', icon: 'fa-box-archive', label: 'Архив', count: 0 },
  { id: 'trash', icon: 'fa-trash-can', label: 'Корзина', count: 0 },
];

const MAIL_SMART = [
  { id: 'clients', icon: 'fa-user-tie', label: 'От клиентов', count: 18 },
  { id: 'reply', icon: 'fa-circle-exclamation', label: 'Требуют ответа', count: 6 },
  { id: 'attach', icon: 'fa-paperclip', label: 'С вложениями', count: 0 },
];

const MAIL_BOXES = [
  { id: 'sales', label: 'sales@', color: '#3b82f6', count: 7 },
  { id: 'support', label: 'support@', color: '#22c55e', count: 2 },
  { id: 'hr', label: 'hr@', color: '#f5b301', count: 0 },
];

const MAIL_TAGS = [
  { id: 'urgent', label: 'Срочное', color: '#ef4444' },
  { id: 'deals', label: 'Договоры', color: '#8b5cf6' },
  { id: 'supply', label: 'Поставки', color: '#14b8a6' },
];

const MAIL_DATA = [
  { id:0, a:'АС', c:'linear-gradient(135deg,#f59e0b,#ef4444)', s:'Анастасия Соколова', subj:'Коммерческое предложение — поставка кабельной продукции', prev:'Направляю КП по поставке кабельной…', t:'2 июл', unread:true, attach:true, crm:true, star:false, tags:['deals'],
    from:'a.sokolova@elis-group.ru', date:'2 июля, 16:19',
    body:'<p>Добрый день, Марина!</p><p>Направляю коммерческое предложение по поставке кабельной продукции согласно вашему запросу от 30 июня. В приложении — детализированная спецификация с ценами и сроками.</p><p>Условия отгрузки: самовывоз со склада или доставка транспортной компанией. Готовы обсудить индивидуальные условия при заключении рамочного договора на квартал.</p><p>Буду рада ответить на любые вопросы. Предложение действительно до 15 июля.</p><p>С уважением,<br>Анастасия Соколова<br>Отдел продаж, ELIS Group</p>',
    files:[{name:'КП_кабель_1537.pdf',size:'1,2 МБ',ext:'PDF',color:'#c0392b'},{name:'Спецификация.xlsx',size:'340 КБ',ext:'XLS',color:'#217346'}],
    comments:[
      {a:'ДП',c:'linear-gradient(135deg,#6366f1,#a855f7)',who:'Дмитрий Петров',time:'15:40',text:'Цены выше рыночных на ~8%. @Марина можешь запросить скидку при объёме?'},
      {a:'ОВ',c:'linear-gradient(135deg,#14b8a6,#0d9488)',who:'Ольга Власова',time:'16:05',text:'Привязала к сделке №1537. Дедлайн по предложению — 15 июля.'}
    ],
    crm:{company:'ELIS Group',companyAv:'EG',companyC:'linear-gradient(135deg,#f59e0b,#ef4444)',deal:'Сделка №1537',stage:'В работе',contact:'Анастасия Соколова',contactRole:'Менеджер продаж'}
  },
  { id:1, a:'АС', c:'linear-gradient(135deg,#f59e0b,#ef4444)', s:'Анастасия Соколова', subj:'Re: заявка на поставку', prev:'Уточнили сроки по позиции 4…', t:'2 июл', unread:true, attach:true, crm:true, urgent:true, star:false, tags:['urgent','supply'],
    from:'a.sokolova@elis-group.ru', date:'2 июл, 14:22',
    body:'<p>Марина, здравствуйте!</p><p>Уточнили сроки по позиции 4 — отгрузка возможна через 5 рабочих дней после оплаты. Остальные позиции — в наличии на складе.</p><p>Срок действия предложения — до 15 июля.</p>',
    files:[{name:'Уточнение_сроков.pdf',size:'85 КБ',ext:'PDF',color:'#c0392b'}],
    comments:[], crm:null
  },
  { id:2, a:'ДП', c:'linear-gradient(135deg,#6366f1,#a855f7)', s:'Дмитрий Петров', subj:'Согласование бюджета Q3', prev:'Прикрепил финальную версию…', t:'2 июл', attach:true, crm:false, star:false, tags:[],
    from:'d.petrov@nexus.io', date:'2 июл, 11:05',
    body:'<p>Коллеги,</p><p>Прикрепил финальную версию бюджета на Q3. Прошу ознакомиться и дать обратную связь до конца недели.</p><p>Основные изменения: увеличены расходы на маркетинг на 15%, сокращены командировочные.</p>',
    files:[{name:'Бюджет_Q3_финал.xlsx',size:'240 КБ',ext:'XLS',color:'#217346'}],
    comments:[], crm:null
  },
  { id:3, a:'ФА', c:'linear-gradient(135deg,#ef4444,#f97316)', s:'Фёдор Алексеев', subj:'Самовывоз, счёт 1537', prev:'Готово к отгрузке со склада…', t:'2 июл', attach:true, crm:true, star:false, tags:['supply'],
    from:'f.alekseev@elis-group.ru', date:'2 июл, 09:30',
    body:'<p>Добрый день!</p><p>Товар по счёту 1537 готов к отгрузке со склада. Самовывоз — ежедневно с 8:00 до 17:00. Доставка — по запросу.</p><p>При себе иметь доверенность и паспорт водителя.</p>',
    files:[{name:'Счёт_1537.pdf',size:'95 КБ',ext:'PDF',color:'#c0392b'}],
    comments:[], crm:{company:'ELIS Group',companyAv:'EG',companyC:'linear-gradient(135deg,#f59e0b,#ef4444)',deal:'Счёт №1537',stage:'Оплата',contact:'Фёдор Алексеев',contactRole:'Логист'}
  },
  { id:4, a:'ОВ', c:'linear-gradient(135deg,#14b8a6,#0d9488)', s:'Ольга Власова', subj:'Запрос спецификации', prev:'Прошу направить актуальный прайс…', t:'2 июл', unread:true, crm:false, star:false, tags:[],
    from:'o.vlasova@nexus.io', date:'2 июл, 08:15',
    body:'<p>Анна, добрый день!</p><p>Прошу направить актуальный прайс на кабельную продукцию для формирования КП клиенту. Нужно до среды.</p>',
    files:[], comments:[], crm:null
  },
  { id:5, a:'СК', c:'linear-gradient(135deg,#22c55e,#16a34a)', s:'Станислав Крылов', subj:'Договор — закрывающие документы', prev:'Отправляю акт и счёт-фактуру…', t:'2 июл', attach:true, star:true, crm:false, tags:['deals'],
    from:'s.krylov@nexus.io', date:'1 июл, 17:40',
    body:'<p>Коллеги,</p><p>Отправляю акт выполненных работ и счёт-фактуру по договору №2024-089. Прошу подписать и вернуть до пятницы.</p>',
    files:[{name:'Акт_089.pdf',size:'120 КБ',ext:'PDF',color:'#c0392b'},{name:'Сч-фактура_089.pdf',size:'85 КБ',ext:'PDF',color:'#c0392b'}],
    comments:[], crm:null
  },
  { id:6, a:'МН', c:'linear-gradient(135deg,#8b5cf6,#a855f7)', s:'Максим Нестеров', subj:'Поступление на склад', prev:'Партия принята, есть недостача…', t:'1 июл', crm:true, star:false, tags:['supply'],
    from:'m.nesterov@nexus.io', date:'1 июл, 14:20',
    body:'<p>Добрый день!</p><p>Партия принята на склад. Обнаружена недостача 3 единиц по позиции «Кабель ВВГнг-LS 3×2.5». Акт о недостаче прилагаю.</p>',
    files:[{name:'Акт_недостачи.pdf',size:'65 КБ',ext:'PDF',color:'#c0392b'}],
    comments:[], crm:{company:'Склад',companyAv:'СК',companyC:'linear-gradient(135deg,#8b5cf6,#a855f7)',deal:'Поступление №445',stage:'Принято',contact:'Максим Нестеров',contactRole:'Кладовщик'}
  },
  { id:7, a:'ФА', c:'linear-gradient(135deg,#ef4444,#f97316)', s:'Фёдор Алексеев', subj:'Fwd: отгрузка счёт 1537', prev:'Данные для доставки во вложении…', t:'1 июл', attach:true, crm:false, star:false, tags:[],
    from:'f.alekseev@elis-group.ru', date:'1 июл, 10:05',
    body:'<p>Пересылаю данные для доставки. Транспортная компания — Деловые Линии, заказ №784512.</p>',
    files:[{name:'ТТН_784512.pdf',size:'110 КБ',ext:'PDF',color:'#c0392b'}],
    comments:[], crm:null
  },
  { id:8, a:'ИЛ', c:'linear-gradient(135deg,#0ea5e9,#3b82f6)', s:'Ирина Лебедева', subj:'Отгрузка 03.07', prev:'Подтвердите транспортную компанию…', t:'1 июл', attach:true, star:true, crm:false, tags:[],
    from:'i.lebedeva@nexus.io', date:'30 июн, 16:30',
    body:'<p>Анна, добрый день!</p><p>Подтвердите, пожалуйста, транспортную компанию для отгрузки 03.07. Нужны точные данные до завтра.</p>',
    files:[], comments:[], crm:null
  },
  { id:9, a:'КП', c:'linear-gradient(135deg,#f97316,#ef4444)', s:'Клиентский портал', subj:'Новая заявка №2081', prev:'Поступила заявка от ООО «Спецэнерго»…', t:'1 июл', unread:true, crm:true, star:false, tags:[],
    from:'portal@nexus.io', date:'1 июл, 09:00',
    body:'<p>Поступила новая заявка с клиентского портала.</p><p><strong>Клиент:</strong> ООО «Спецэнерго»<br><strong>Тема:</strong> Закупка кабельной продукции<br><strong>Сумма:</strong> ≈ 2 400 000 ₽</p><p>Заявка автоматически привязана к воронке продаж.</p>',
    files:[], comments:[], crm:{company:'Спецэнерго',companyAv:'СЭ',companyC:'linear-gradient(135deg,#f97316,#ef4444)',deal:'Заявка №2081',stage:'Новая',contact:'Клиентский портал',contactRole:'CRM'}
  },
  { id:10, a:'НЗ', c:'linear-gradient(135deg,#64748b,#475569)', s:'Наталья Зайцева', subj:'Спецификация к договору', prev:'Финальная редакция на подпись…', t:'30 июн', attach:true, crm:false, star:false, tags:['deals'],
    from:'n.zaitseva@nexus.io', date:'30 июн, 15:10',
    body:'<p>Анна, финальная редакция спецификации к договору на подпись. Все замечания учтены.</p>',
    files:[{name:'Спецификация_финал.docx',size:'180 КБ',ext:'DOC',color:'#2b5797'}],
    comments:[], crm:null
  }
];

function getFilteredMails() {
  return MAIL_DATA.filter(function(m) {
    if (mailSearch) {
      var q = mailSearch.toLowerCase();
      if (!(m.s.toLowerCase().includes(q) || m.subj.toLowerCase().includes(q) || m.prev.toLowerCase().includes(q))) return false;
    }
    if (mailTag) {
      if (!m.tags || !m.tags.includes(mailTag)) return false;
    }
    if (mailFolder === 'starred') return m.star;
    if (mailFolder === 'drafts') return false;
    if (mailFolder === 'sent') return false;
    if (mailFolder === 'archive') return false;
    if (mailFolder === 'trash') return false;
    if (mailFolder === 'clients') return m.crm;
    if (mailFolder === 'reply') return m.unread;
    if (mailFolder === 'attach') return m.attach;
    return true;
  });
}

function renderMail() {
  var el = document.getElementById('mailLayout');
  if (!el) return;
  var active = MAIL_DATA[mailActiveId] || MAIL_DATA[0];
  var filtered = getFilteredMails();

  var folderHtml = MAIL_FOLDERS.map(function(f) {
    return '<div class="ml-nav-item' + (f.id === mailFolder && !mailTag ? ' active' : '') + '" data-id="' + f.id + '" onclick="setMailFolder(\'' + f.id + '\')"><i class="fa-solid ' + f.icon + '"></i> ' + f.label + (f.count ? ' <span class="ml-nav-count">' + f.count + '</span>' : '') + '</div>';
  }).join('');
  var smartHtml = MAIL_SMART.map(function(f) {
    return '<div class="ml-nav-item' + (f.id === mailFolder ? ' active' : '') + '" data-id="' + f.id + '" onclick="setMailFolder(\'' + f.id + '\')"><i class="fa-solid ' + f.icon + '"></i> ' + f.label + (f.count ? ' <span class="ml-nav-count">' + f.count + '</span>' : '') + '</div>';
  }).join('');
  var boxesHtml = MAIL_BOXES.map(function(b) {
    return '<div class="ml-nav-item" onclick="showToast(\'Ящик ' + b.label + '\')"><span class="ml-dot" style="background:' + b.color + '"></span> ' + b.label + (b.count ? ' <span class="ml-nav-count">' + b.count + '</span>' : '') + '</div>';
  }).join('');
  var tagsHtml = MAIL_TAGS.map(function(t) {
    return '<div class="ml-tag-item' + (mailTag === t.id ? ' active' : '') + '" data-id="' + t.id + '" onclick="toggleMailTag(\'' + t.id + '\')"><span class="ml-dot" style="background:' + t.color + '"></span> ' + t.label + '</div>';
  }).join('');

  var listTitle = 'Входящие';
  if (mailFolder === 'starred') listTitle = 'Избранное';
  else if (mailFolder === 'drafts') listTitle = 'Черновики';
  else if (mailFolder === 'sent') listTitle = 'Отправленные';
  else if (mailFolder === 'archive') listTitle = 'Архив';
  else if (mailFolder === 'trash') listTitle = 'Корзина';
  else if (mailFolder === 'clients') listTitle = 'От клиентов';
  else if (mailFolder === 'reply') listTitle = 'Требуют ответа';
  else if (mailFolder === 'attach') listTitle = 'С вложениями';
  if (mailTag) {
    var tagObj = MAIL_TAGS.find(function(t) { return t.id === mailTag; });
    listTitle = tagObj ? tagObj.label : mailTag;
  }

  el.innerHTML =
    '<div class="ml-sidebar" id="mlSidebar">' +
      '<div class="ml-brand"><div class="ml-brand-logo"><i class="fa-solid fa-bolt"></i></div><div class="ml-brand-text">NE<span>XUS</span></div></div>' +
      '<button class="ml-compose" onclick="showToast(\'Редактор письма открыт\')"><i class="fa-solid fa-pen"></i> Написать</button>' +
      '<div class="ml-nav">' +
        '<div class="ml-nav-section">' + folderHtml + '</div>' +
        '<div class="ml-nav-section"><div class="ml-nav-title">Умные папки</div>' + smartHtml + '</div>' +
        '<div class="ml-nav-section"><div class="ml-nav-title">Общие ящики</div>' + boxesHtml + '</div>' +
        '<div class="ml-nav-section"><div class="ml-nav-title">Теги <i class="fa-solid fa-plus" style="cursor:pointer" onclick="showToast(\'Добавление тега\')"></i></div>' + tagsHtml + '</div>' +
      '</div>' +
      '<div class="ml-sidebar-footer"><div class="ml-sf-av" style="background:linear-gradient(135deg,#f59e0b,#ef4444)">АИ</div><div><div class="ml-sf-who">Анна Иванова</div><div class="ml-sf-mail">a.ivanova@nexus.io</div></div></div>' +
    '</div>' +
    '<div class="ml-list-col">' +
      '<div class="ml-list-top">' +
        '<div class="ml-search"><i class="fa-solid fa-magnifying-glass"></i><input placeholder="Поиск по письмам…" id="mailSearchInput" value="' + mailSearch + '"></div>' +
        '<div class="ml-toolbar">' +
          '<button class="ml-tb" onclick="showToast(\'Переслать\')"><i class="fa-solid fa-share"></i> Переслать</button>' +
          '<button class="ml-tb" onclick="archiveMail()"><i class="fa-solid fa-box-archive"></i> Архив</button>' +
          '<button class="ml-tb" onclick="markReadAll()"><i class="fa-solid fa-envelope-open"></i> Прочитано</button>' +
          '<button class="ml-tb" onclick="showToast(\'Метка\')"><i class="fa-solid fa-tag"></i> Метка</button>' +
          '<button class="ml-tb" onclick="showToast(\'Ещё\')"><i class="fa-solid fa-ellipsis"></i></button>' +
        '</div>' +
      '</div>' +
      '<div class="ml-list-head" id="mlListHead"></div>' +
      '<div class="ml-items" id="mlItems"></div>' +
    '</div>' +
    '<div class="ml-reader" id="mlReader"></div>';

  updateMailListHead();
  renderMailList();
  renderMailReader();
  bindMailSearch();
}

function updateMailListHead() {
  var head = document.getElementById('mlListHead');
  if (!head) return;
  var filtered = getFilteredMails();
  var listTitle = 'Входящие';
  if (mailFolder === 'starred') listTitle = 'Избранное';
  else if (mailFolder === 'drafts') listTitle = 'Черновики';
  else if (mailFolder === 'sent') listTitle = 'Отправленные';
  else if (mailFolder === 'archive') listTitle = 'Архив';
  else if (mailFolder === 'trash') listTitle = 'Корзина';
  else if (mailFolder === 'clients') listTitle = 'От клиентов';
  else if (mailFolder === 'reply') listTitle = 'Требуют ответа';
  else if (mailFolder === 'attach') listTitle = 'С вложениями';
  if (mailTag) {
    var tagObj = MAIL_TAGS.find(function(t) { return t.id === mailTag; });
    listTitle = tagObj ? tagObj.label : mailTag;
  }
  head.innerHTML = '<span>' + listTitle + (mailSearch ? ' · Поиск: ' + mailSearch : '') + '</span><span>' + filtered.length + ' писем</span>';
}

function renderMailList() {
  var items = document.getElementById('mlItems');
  if (!items) return;
  var filtered = getFilteredMails();

  var listHtml = filtered.map(function(m, i) {
    return '<div class="ml-mail-item' + (m.id === mailActiveId ? ' active' : '') + (m.unread ? ' unread' : '') + '" onclick="openMail(' + m.id + ')" style="animation:mailItemIn .4s ease ' + (i * 0.04) + 's both">' +
      '<div class="ml-m-av" style="background:' + m.c + '">' + m.a + '</div>' +
      '<div class="ml-m-body">' +
        '<div class="ml-m-row1"><span class="ml-m-sender">' + (m.unread ? '<i class="fa-solid fa-circle ml-unread-dot"></i>' : '') + m.s + '</span><span class="ml-m-time">' + m.t + '</span></div>' +
        '<div class="ml-m-subject">' + m.subj + '</div>' +
        '<div class="ml-m-preview">' + m.prev + '</div>' +
        '<div class="ml-m-meta">' +
          (m.crm ? '<span class="ml-m-badge ml-m-crm"><i class="fa-solid fa-link"></i> CRM</span>' : '') +
          (m.urgent ? '<span class="ml-m-badge ml-m-urgent"><i class="fa-solid fa-bolt"></i> Срочно</span>' : '') +
          (m.attach ? '<i class="fa-solid fa-paperclip ml-m-icon"></i>' : '') +
          '<i class="fa-solid fa-star ml-m-star' + (m.star ? ' on' : '') + '" onclick="event.stopPropagation();toggleMailStar(' + m.id + ')"></i>' +
        '</div>' +
      '</div></div>';
  }).join('') || '<div style="color:var(--text-faint);font-size:12.5px;padding:30px;text-align:center">Нет писем</div>';

  items.innerHTML = listHtml;
}

function renderMailReader() {
  var reader = document.getElementById('mlReader');
  if (!reader) return;
  var active = MAIL_DATA[mailActiveId] || MAIL_DATA[0];

  var filesHtml = (active.files || []).map(function(f) {
    return '<div class="ml-r-attach" onclick="showToast(\'Загрузка: ' + f.name + '\')"><div class="ml-r-file-ico" style="background:' + f.color + '">' + f.ext + '</div><div class="ml-r-fname">' + f.name + '</div><div class="ml-r-fsize">' + f.size + '</div></div>';
  }).join('');

  var commentsHtml = (active.comments || []).map(function(c) {
    return '<div class="ml-r-comment"><div class="ml-r-c-av" style="background:' + c.c + '">' + c.a + '</div><div class="ml-r-c-body"><div class="ml-r-c-name">' + c.who + ' <span>' + c.time + '</span></div><div class="ml-r-c-text">' + c.text + '</div></div></div>';
  }).join('');

  var crmHtml = '';
  if (active.crm) {
    crmHtml = '<div class="ml-r-ctx-card">' +
      '<div class="ml-r-ctx-title"><i class="fa-solid fa-building" style="color:var(--accent)"></i> CRM-контекст</div>' +
      '<div class="ml-r-ctx-row" style="cursor:pointer" onclick="showToast(\'' + active.crm.company + '\')"><div class="ml-r-c-av" style="background:' + active.crm.companyC + '">' + active.crm.companyAv + '</div><div><div class="ml-r-ctx-name">' + active.crm.company + '</div><div class="ml-r-ctx-sub">' + active.crm.deal + '</div></div></div>' +
      '<div class="ml-r-ctx-row" style="cursor:pointer" onclick="showToast(\'' + active.crm.contact + '\')"><div class="ml-r-c-av" style="background:linear-gradient(135deg,#6366f1,#a855f7)">' + active.crm.contact.split(' ').map(function(w){return w[0]}).slice(0,2).join('') + '</div><div><div class="ml-r-ctx-name">' + active.crm.contact + '</div><div class="ml-r-ctx-sub">' + active.crm.contactRole + '</div></div></div>' +
      '<div class="ml-r-deal-tag" onclick="showToast(\'' + active.crm.deal + '\')"><span><i class="fa-solid fa-handshake"></i> ' + active.crm.deal + '</span><span class="ml-r-stage">' + active.crm.stage + '</span></div>' +
    '</div>';
  }

  reader.innerHTML =
    '<div class="ml-reader-head" style="animation:mailFadeIn .4s ease">' +
      '<div class="ml-r-subject">' + active.subj + '</div>' +
      '<div class="ml-r-from">' +
        '<div class="ml-r-av" style="background:' + active.c + '">' + active.a + '</div>' +
        '<div><div class="ml-r-name">' + active.s + '</div><div class="ml-r-addr"><i class="fa-solid fa-lock" style="color:var(--green)"></i> ' + active.from + '</div></div>' +
        '<div class="ml-r-date">' + active.date + '<br><span style="font-size:11px;color:var(--text-faint)">кому: мне</span></div>' +
      '</div>' +
      '<div class="ml-r-actions">' +
        '<button class="ml-r-act primary" onclick="showToast(\'Ответ подготовлен\')"><i class="fa-solid fa-reply"></i> Ответить</button>' +
        '<button class="ml-r-act" onclick="showToast(\'Ответ всем\')"><i class="fa-solid fa-reply-all"></i> Всем</button>' +
        '<button class="ml-r-act" onclick="showToast(\'Пересылка\')"><i class="fa-solid fa-share"></i> Переслать</button>' +
        '<button class="ml-r-act" onclick="showToast(\'Создана задача из письма\')"><i class="fa-solid fa-list-check"></i> В задачу</button>' +
        '<button class="ml-r-act" onclick="archiveMail()"><i class="fa-solid fa-box-archive"></i></button>' +
        '<button class="ml-r-act" onclick="trashMail()"><i class="fa-solid fa-trash-can"></i></button>' +
      '</div>' +
    '</div>' +
    '<div class="ml-reader-body" style="animation:mailSlideUp .4s ease .1s both">' +
      '<div class="ml-r-main">' +
        '<div class="ml-r-text">' + active.body + '</div>' +
        (filesHtml ? '<div class="ml-r-attachments">' + filesHtml + '</div>' : '') +
        '<div class="ml-r-discussion">' +
          '<div class="ml-r-disc-title"><i class="fa-solid fa-comments" style="color:var(--accent)"></i> Внутреннее обсуждение <span class="ml-r-lock"><i class="fa-solid fa-eye-slash"></i> невидимо клиенту</span></div>' +
          (commentsHtml || '<p style="color:var(--text-faint);font-size:12.5px">Нет комментариев</p>') +
          '<div class="ml-r-disc-input"><input placeholder="Комментарий… @ для упоминания" id="mailDiscInput"><i class="fa-solid fa-paper-plane" id="mailDiscSend"></i></div>' +
        '</div>' +
      '</div>' +
      '<div class="ml-r-context">' +
        crmHtml +
        '<div class="ml-r-ctx-card">' +
          '<div class="ml-r-ctx-title"><i class="fa-solid fa-bolt" style="color:var(--accent)"></i> Быстрые действия</div>' +
          '<button class="ml-r-ctx-btn" onclick="showToast(\'Задача создана\')"><i class="fa-solid fa-list-check"></i> Создать задачу</button>' +
          '<button class="ml-r-ctx-btn" onclick="showToast(\'Сделка создана\')"><i class="fa-solid fa-handshake"></i> Создать сделку</button>' +
          '<button class="ml-r-ctx-btn" onclick="showToast(\'Контакт добавлен\')"><i class="fa-solid fa-user-plus"></i> Добавить контакт</button>' +
          '<button class="ml-r-ctx-btn" onclick="showToast(\'Встреча назначена\')"><i class="fa-regular fa-calendar-plus"></i> Назначить встречу</button>' +
        '</div>' +
      '</div>' +
    '</div>' +
    '<div class="ml-r-reply-bar" style="animation:mailFadeIn .35s ease .15s both">' +
      '<input id="mailReplyInput" placeholder="Быстрый ответ ' + active.s.split(' ')[0] + '…">' +
      '<button class="ml-r-reply-send" onclick="sendMailReply()"><i class="fa-solid fa-paper-plane"></i></button>' +
    '</div>';

  reader.querySelector('.ml-reader-body').scrollTop = 0;

  var discInput = document.getElementById('mailDiscInput');
  var discSend = document.getElementById('mailDiscSend');
  if (discSend && discInput) {
    discSend.addEventListener('click', function() { addMailComment(); });
    discInput.addEventListener('keydown', function(e) { if (e.key === 'Enter') addMailComment(); });
  }
  var replyInput = document.getElementById('mailReplyInput');
  if (replyInput) {
    replyInput.addEventListener('keydown', function(e) { if (e.key === 'Enter') sendMailReply(); });
  }

  reader.querySelectorAll('.ml-mail-item, .ml-r-act, .ml-r-ctx-btn, .ml-r-attach, .ml-r-deal-tag').forEach(function(item) {
    item.style.animation = 'mailFadeIn .35s ease';
  });
}

function bindMailSearch() {
  var searchInput = document.getElementById('mailSearchInput');
  if (searchInput) {
    searchInput.addEventListener('input', function() {
      mailSearch = searchInput.value;
      renderMailList();
      bindMailSearch();
      var si = document.getElementById('mailSearchInput');
      if (si) { si.focus(); si.setSelectionRange(si.value.length, si.value.length); }
    });
  }
}

function openMail(id) {
  mailActiveId = id;
  var m = MAIL_DATA[id];
  if (m) m.unread = false;
  updateMailListActive();
  renderMailReader();
}

function updateMailListActive() {
  var items = document.querySelectorAll('#mlItems .ml-mail-item');
  items.forEach(function(item) {
    var onclick = item.getAttribute('onclick');
    var match = onclick ? onclick.match(/openMail\((\d+)\)/) : null;
    if (match) {
      var itemId = parseInt(match[1]);
      var isActive = itemId === mailActiveId;
      item.classList.toggle('active', isActive);
      var m = MAIL_DATA[itemId];
      if (m && !m.unread) {
        var dot = item.querySelector('.ml-unread-dot');
        if (dot) dot.remove();
        item.classList.remove('unread');
      }
    }
  });
}

function setMailFolder(id) {
  mailFolder = id;
  mailTag = null;
  mailActiveId = 0;
  var filtered = getFilteredMails();
  if (filtered.length) mailActiveId = filtered[0].id;
  updateMailSidebar();
  updateMailListHead();
  renderMailList();
  renderMailReader();
}

function toggleMailTag(id) {
  if (mailTag === id) { mailTag = null; mailFolder = 'inbox'; }
  else { mailTag = id; mailFolder = 'inbox'; }
  mailActiveId = 0;
  var filtered = getFilteredMails();
  if (filtered.length) mailActiveId = filtered[0].id;
  updateMailSidebar();
  updateMailListHead();
  renderMailList();
  renderMailReader();
}

function updateMailSidebar() {
  var navItems = document.querySelectorAll('#mlSidebar .ml-nav-item');
  navItems.forEach(function(item) {
    var id = item.getAttribute('data-id');
    if (mailTag) {
      item.classList.remove('active');
    } else {
      item.classList.toggle('active', id === mailFolder);
    }
  });
  var tagItems = document.querySelectorAll('#mlSidebar .ml-tag-item');
  tagItems.forEach(function(item) {
    var id = item.getAttribute('data-id');
    item.classList.toggle('active', id === mailTag);
  });
}

function toggleMailStar(id) {
  var m = MAIL_DATA[id];
  if (m) m.star = !m.star;
  renderMailList();
}

function addMailComment() {
  var inp = document.getElementById('mailDiscInput');
  if (!inp || !inp.value.trim()) return;
  var m = MAIL_DATA[mailActiveId];
  if (!m) return;
  if (!m.comments) m.comments = [];
  m.comments.push({
    a: 'АИ', c: 'linear-gradient(135deg,#f59e0b,#ef4444)',
    who: 'Анна Иванова', time: 'сейчас',
    text: inp.value.trim().replace(/@(\S+)/g, '<span class="mention">@$1</span>')
  });
  inp.value = '';
  renderMailReader();
}

function sendMailReply() {
  var inp = document.getElementById('mailReplyInput');
  if (!inp || !inp.value.trim()) return;
  showToast('Ответ отправлен ' + MAIL_DATA[mailActiveId].s.split(' ')[0]);
  inp.value = '';
}

function archiveMail() { showToast('Письмо в архиве'); }
function trashMail() { showToast('Перемещено в корзину'); }
function markReadAll() {
  MAIL_DATA.forEach(function(m) { m.unread = false; });
  renderMailList();
  showToast('Все помечены как прочитанные');
}
