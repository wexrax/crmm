function renderCommsQuick() {
  const el = document.getElementById('commsQuickGrid');
  if (!el) return;
  const items = [
    { icon: 'fa-video', color: '#818cf8', label: 'Видеовстречи', desc: 'WebRTC · запись' },
    { icon: 'fa-comment-dots', color: '#34d399', label: 'Корп. чат', desc: 'Контекстные чаты' },
    { icon: 'fa-envelope', color: '#f472b6', label: 'Почта', desc: 'CRM-контекст' },
    { icon: 'fa-phone-volume', color: '#fbbf24', label: 'Телефония', desc: 'SIP · запись' },
    { icon: 'fa-headset', color: '#a855f7', label: 'Поддержка', desc: 'Тикеты · SLA' },
  ];
  el.innerHTML = items.map(c =>
    '<div class="comms-quick-item" onclick="handleCommsAction(\'' + c.label + '\')">' +
      '<div class="comms-quick-icon" style="background:' + c.color + '22;color:' + c.color + '"><i class="fa-solid ' + c.icon + '"></i></div>' +
      '<div class="comms-quick-label">' + c.label + '</div>' +
      '<div class="comms-quick-desc">' + c.desc + '</div>' +
    '</div>'
  ).join('');
}

function handleCommsAction(label) {
  closeComms();
  if (label === 'Видеовстречи') showToast('Видеовстреча запущена', 'fa-video');
  else if (label === 'Корп. чат') navigateTo('chats');
  else if (label === 'Почта') navigateTo('mail');
  else if (label === 'Телефония') showToast('Телефония SIP', 'fa-phone-volume');
  else if (label === 'Поддержка') showToast('Тикеты и поддержка', 'fa-headset');
}

function setupCommsDropdown() {
  document.addEventListener('click', function(e) {
    var wrap = document.getElementById('commsWrap');
    if (wrap && !wrap.contains(e.target)) closeComms();
  });
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') closeComms();
  });
}

function toggleComms() {
  var dd = document.getElementById('commsDropdown');
  var isOpen = dd.classList.contains('open');
  if (isOpen) closeComms();
  else { dd.classList.add('open'); renderCommsQuick(); }
}

function closeComms() {
  var dd = document.getElementById('commsDropdown');
  if (dd) dd.classList.remove('open');
}
