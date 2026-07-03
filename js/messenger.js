let currentChat = 1;

function renderMessenger() {
  const el = document.getElementById('messenger');
  if (!el) return;
  const chats = APP_DATA.messenger.chats;
  const chat = chats.find(c => c.id === currentChat) || chats[0];

  let listHtml = chats.map(c => {
    const isActive = c.id === currentChat;
    const avInner = c.ic ? '<i class="fa-solid ' + c.ic + '"></i>' : c.av;
    return '<div class="msg-item' + (isActive ? ' active' : '') + '" onclick="openChat(' + c.id + ')">' +
      '<div class="msg-av" style="background:' + c.c + '">' + avInner + '</div>' +
      '<div class="msg-info"><div class="msg-row"><span class="msg-name">' + c.name + '</span><span class="msg-time">' + c.time + '</span></div>' +
      '<div class="msg-row"><span class="msg-preview">' + c.prev + '</span>' + (c.unread ? '<span class="msg-unread">' + c.unread + '</span>' : '') + '</div></div></div>';
  }).join('');

  const avInner = chat.ic ? '<i class="fa-solid ' + chat.ic + '"></i>' : chat.av;
  let convHtml = '';
  chat.msgs.forEach(m => {
    if (m.date) { convHtml += '<div class="msg-date">' + m.date + '</div>'; return; }
    if (m.sys) { convHtml += '<div class="msg-sys">' + m.sys + '</div>'; return; }
    const cls = m.out ? 'out' : 'in';
    const who = (!m.out && m.w) ? '<span class="who">' + m.w + '</span>' : '';
    convHtml += '<div class="msg-bub ' + cls + '">' + who + m.t + '<span class="tm">' + (m.tm || '') + (m.out ? ' <i class="fa-solid fa-check-double"></i>' : '') + '</span></div>';
  });

  el.innerHTML =
    '<div class="msg-list">' +
    '<div class="msg-list-top"><div class="msg-list-search"><i class="fa-solid fa-magnifying-glass"></i><input placeholder="Найти чат" oninput="filterMessenger(this.value)"/></div><button class="msg-new-btn" onclick="showToast(\'Создание группы\', \'fa-pen-to-square\')"><i class="fa-solid fa-pen-to-square"></i></button></div>' +
    '<div class="msg-items">' + listHtml + '</div></div>' +
    '<div class="conv">' +
    '<div class="conv-header"><div class="msg-av" style="width:38px;height:38px;font-size:14px;background:' + chat.c + '">' + avInner + '</div>' +
    '<div style="flex:1;min-width:0"><div class="conv-title">' + chat.name + '</div><div class="conv-sub">' + chat.sub + '</div></div>' +
    '<button class="btn btn-primary btn-sm" onclick="showToast(\'Видеозвонок\', \'fa-video\')"><i class="fa-solid fa-video"></i> Видеозвонок</button></div>' +
    '<div class="conv-body" id="convBody">' + convHtml + '</div>' +
    '<div class="conv-input">' +
    '<i class="fa-solid fa-paperclip conv-ic" onclick="showToast(\'Прикрепление файла\', \'fa-paperclip\')"></i>' +
    '<input id="convInput" placeholder="Введите сообщение…" onkeydown="if(event.key===\'Enter\')sendMsg()"/>' +
    '<i class="fa-regular fa-face-smile conv-ic" onclick="insertEmoji()"></i>' +
    '<button class="conv-send" onclick="sendMsg()"><i class="fa-solid fa-paper-plane"></i></button>' +
    '</div></div>';

  setTimeout(() => {
    const body = document.getElementById('convBody');
    if (body) body.scrollTop = body.scrollHeight;
  }, 50);
}

function openChat(id) {
  currentChat = id;
  const chat = APP_DATA.messenger.chats.find(c => c.id === id);
  if (chat) chat.unread = 0;
  renderMessenger();
}

function filterMessenger(v) {
  const el = document.getElementById('messenger');
  if (!el) return;
  const chats = APP_DATA.messenger.chats;
  const f = (v || '').toLowerCase();
  const items = el.querySelectorAll('.msg-item');
  chats.forEach((c, i) => {
    if (items[i]) {
      const match = !f || c.name.toLowerCase().includes(f) || c.prev.toLowerCase().includes(f);
      items[i].style.display = match ? '' : 'none';
    }
  });
}

function sendMsg() {
  const inp = document.getElementById('convInput');
  if (!inp) return;
  const v = inp.value.trim();
  if (!v) return;
  const chat = APP_DATA.messenger.chats.find(c => c.id === currentChat);
  if (!chat) return;
  const now = new Date();
  const tm = ('0' + now.getHours()).slice(-2) + ':' + ('0' + now.getMinutes()).slice(-2);
  chat.msgs.push({ t: v, out: true, tm: tm });
  chat.prev = 'Вы: ' + v;
  inp.value = '';
  renderMessenger();
}

function insertEmoji() {
  const inp = document.getElementById('convInput');
  if (!inp) return;
  const emojis = ['👍', '🎉', '🔥', '😊', '🚀', '✅'];
  inp.value += emojis[Math.floor(Math.random() * emojis.length)];
  inp.focus();
}
