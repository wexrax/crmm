let currentChat = 1;
let replyToMsg = null;

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
  chat.msgs.forEach(function(m, idx) {
    if (m.date) { convHtml += '<div class="msg-date">' + m.date + '</div>'; return; }
    if (m.sys) { convHtml += '<div class="msg-sys">' + m.sys + '</div>'; return; }
    const cls = m.out ? 'out' : 'in';
    const who = (!m.out && m.w) ? '<span class="who">' + m.w + '</span>' : '';

    let replyRefHtml = '';
    if (m.replyTo != null && m.replyTo >= 0 && m.replyTo < chat.msgs.length) {
      const refMsg = chat.msgs[m.replyTo];
      const refWho = refMsg.w || (refMsg.out ? 'Вы' : '');
      const refText = refMsg.t || '';
      replyRefHtml = '<div class="reply-ref" onclick="scrollToMsg(' + m.replyTo + ')">' +
        '<div class="reply-ref-who">' + bdEscape(refWho || 'Сообщение') + '</div>' +
        '<div class="reply-ref-text">' + bdEscape(refText) + '</div></div>';
    }

    convHtml += '<div class="msg-bub-wrap ' + cls + '" data-msg-idx="' + idx + '">' +
      '<div class="msg-bub ' + cls + '">' +
        replyRefHtml + who + m.t +
        '<span class="tm">' + (m.tm || '') + (m.out ? ' <i class="fa-solid fa-check-double"></i>' : '') + '</span>' +
      '</div>' +
      '<div class="msg-reply-btn" onclick="startReply(' + idx + ')" title="Ответить"><i class="fa-solid fa-reply"></i></div>' +
    '</div>';
  });

  const replyBarHtml = replyToMsg != null ? renderReplyBar(chat) : '';

  el.innerHTML =
    '<div class="msg-list">' +
    '<div class="msg-list-top"><div class="msg-list-search"><i class="fa-solid fa-magnifying-glass"></i><input placeholder="Найти чат" oninput="filterMessenger(this.value)"/></div><button class="msg-new-btn" onclick="showToast(\'Создание группы\', \'fa-pen-to-square\')"><i class="fa-solid fa-pen-to-square"></i></button></div>' +
    '<div class="msg-items">' + listHtml + '</div></div>' +
    '<div class="conv">' +
    '<div class="conv-header"><div class="msg-av" style="width:38px;height:38px;font-size:14px;background:' + chat.c + '">' + avInner + '</div>' +
    '<div style="flex:1;min-width:0"><div class="conv-title">' + chat.name + '</div><div class="conv-sub">' + chat.sub + '</div></div>' +
    '<button class="btn btn-primary btn-sm" onclick="showToast(\'Видеозвонок\', \'fa-video\')"><i class="fa-solid fa-video"></i> Видеозвонок</button></div>' +
    '<div class="conv-body" id="convBody">' + convHtml + '</div>' +
    replyBarHtml +
    '<div class="conv-input">' +
    '<i class="fa-solid fa-paperclip conv-ic" onclick="showToast(\'Прикрепление файла\', \'fa-paperclip\')"></i>' +
    '<input id="convInput" placeholder="Введите сообщение…" onkeydown="if(event.key===\'Enter\')sendMsg()"/>' +
    '<i class="fa-regular fa-face-smile conv-ic" onclick="insertEmoji()"></i>' +
    '<button class="conv-send" onclick="sendMsg()"><i class="fa-solid fa-paper-plane"></i></button>' +
    '</div></div>';

  setTimeout(function() {
    const body = document.getElementById('convBody');
    if (body) body.scrollTop = body.scrollHeight;
  }, 50);
}

function renderReplyBar(chat) {
  if (replyToMsg == null) return '';
  const refMsg = chat.msgs[replyToMsg];
  if (!refMsg) return '';
  const refWho = refMsg.w || (refMsg.out ? 'Вы' : '');
  const refText = refMsg.t || '';
  return '<div class="msg-reply-bar">' +
    '<div class="reply-accent"></div>' +
    '<div class="reply-info">' +
      '<div class="reply-who">Ответ ' + bdEscape(refWho || 'на сообщение') + '</div>' +
      '<div class="reply-text">' + bdEscape(refText) + '</div>' +
    '</div>' +
    '<button class="reply-cancel" onclick="cancelReply()"><i class="fa-solid fa-xmark"></i></button>' +
  '</div>';
}

function startReply(idx) {
  const chat = APP_DATA.messenger.chats.find(function(c) { return c.id === currentChat; });
  if (!chat || !chat.msgs[idx]) return;
  replyToMsg = idx;
  renderMessenger();
  setTimeout(function() {
    var inp = document.getElementById('convInput');
    if (inp) inp.focus();
  }, 50);
}

function cancelReply() {
  replyToMsg = null;
  renderMessenger();
}

function scrollToMsg(idx) {
  var el = document.querySelector('[data-msg-idx="' + idx + '"]');
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    el.style.transition = 'background .3s';
    el.style.background = 'rgba(139,92,246,.12)';
    setTimeout(function() { el.style.background = ''; }, 1200);
  }
}

function openChat(id) {
  currentChat = id;
  replyToMsg = null;
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
  const msg = { t: v, out: true, tm: tm };
  if (replyToMsg != null) {
    msg.replyTo = replyToMsg;
  }
  chat.msgs.push(msg);
  chat.prev = 'Вы: ' + v;
  inp.value = '';
  replyToMsg = null;
  renderMessenger();
}

function insertEmoji() {
  const inp = document.getElementById('convInput');
  if (!inp) return;
  const emojis = ['👍', '🎉', '🔥', '😊', '🚀', '✅'];
  inp.value += emojis[Math.floor(Math.random() * emojis.length)];
  inp.focus();
}
