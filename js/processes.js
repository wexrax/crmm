let procFilter = 'wait';
let procReplyTo = null;

function renderProcesses() {
  renderProcTabs();
  renderProcList(procFilter);
}

function renderProcTabs() {
  const el = document.getElementById('procTabs');
  if (!el) return;
  const waitCount = APP_DATA.processes.filter(p => p.st === 'На согласовании' || p.st === 'В работе').length;
  const overdueCount = APP_DATA.processes.filter(p => p.st === 'Просрочен').length;
  el.innerHTML = [
    { id: 'wait', label: 'Ожидают моего решения <b>' + waitCount + '</b>' },
    { id: 'overdue', label: 'Просроченные <b>' + overdueCount + '</b>' },
    { id: 'all', label: 'Все' },
    { id: 'done', label: 'Завершённые' },
  ].map(t => '<div class="proc-tab' + (t.id === procFilter ? ' active' : '') + '" onclick="setProcFilter(\'' + t.id + '\')">' + t.label + '</div>').join('');
}

function setProcFilter(f) {
  if (f === procFilter) return;
  procFilter = f;
  renderProcesses();
}

function renderProcList(filter) {
  const el = document.getElementById('procList');
  if (!el) return;
  const rows = APP_DATA.processes.filter(p => {
    if (filter === 'all') return true;
    if (filter === 'done') return p.st === 'Завершён';
    if (filter === 'overdue') return p.st === 'Просрочен';
    if (filter === 'wait') return p.st === 'На согласовании' || p.st === 'В работе' || p.st === 'Просрочен';
    return true;
  });
  const html = rows.map(p =>
    '<div class="proc-row" onclick="openProcessModal(' + p.id + ')">' +
    '<div class="proc-row-icon" style="background:' + p.c + '"><i class="fa-solid ' + p.ic + '"></i></div>' +
    '<div class="proc-row-info"><div class="proc-row-title">' + p.n + '</div>' +
    '<div class="proc-row-meta"><span><i class="fa-solid fa-user" style="color:var(--blue)"></i> ' + p.from + '</span><span><i class="fa-solid fa-coins" style="color:var(--amber)"></i> ' + p.sum + '</span><span><i class="fa-solid fa-route" style="color:var(--accent-purple)"></i> ' + p.step + '</span></div></div>' +
    '<span class="proc-row-status" style="' + p.stc + '">' + p.st + '</span></div>'
  ).join('') || '<div style="color:var(--text-faint);font-size:12.5px;padding:20px">Здесь пусто</div>';
  el.innerHTML = '<div class="tab-content">' + html + '</div>';
}

function openProcessModal(id) {
  const p = APP_DATA.processes.find(x => x.id === id) || APP_DATA.processes[0];
  const modal = document.getElementById('processModal');
  const body = document.getElementById('procModalBody');

  procReplyTo = null;

  document.getElementById('procModalName').textContent = p.n;
  document.getElementById('procModalMeta').textContent = 'Статус: ' + p.st + ' · ' + p.step;
  const av = document.getElementById('procModalIcon');
  av.style.background = p.c;
  av.innerHTML = '<i class="fa-solid ' + p.ic + '"></i>';

  const steps = p.route || [];
  const doneCount = steps.filter(s => s.done).length;
  const routeHtml = steps.map(s => {
    const nodeClass = s.done ? 'pm-step-done' : (s.current ? 'pm-step-cur' : 'pm-step-wait');
    const nodeIcon = s.done ? '<i class="fa-solid fa-check"></i>' : (s.current ? '<i class="fa-solid fa-pen"></i>' : '<i class="fa-solid fa-circle" style="font-size:8px"></i>');
    return '<div class="pm-step">' +
      '<div class="pm-step-line' + (s.done ? ' done' : '') + (s.current ? ' cur' : '') + '"></div>' +
      '<div class="pm-step-node ' + nodeClass + (s.overdue ? ' overdue' : '') + '">' + nodeIcon + '</div>' +
      '<div class="pm-step-content">' +
        '<div class="pm-step-title">' + s.step + '</div>' +
        '<div class="pm-step-person">' +
          '<div class="pm-step-av" style="background:' + s.bg + '">' + s.ic + '</div>' +
          '<div><div class="pm-step-name">' + s.who + '</div><div class="pm-step-role">' + s.role + '</div></div>' +
        '</div>' +
      '</div>' +
      (s.done ? '<div class="pm-step-check"><i class="fa-solid fa-circle-check" style="color:var(--green)"></i></div>' : '') +
    '</div>';
  }).join('');

  const filesHtml = (p.files || []).map(f =>
    '<div class="pm-file"><i class="fa-solid ' + f.icon + '" style="color:var(--accent)"></i> <span>' + f.name + '</span></div>'
  ).join('');

  const discussionHtml = (p.discussion || []).map(function(msg, idx) {
    if (msg.system) {
      return '<div class="pm-discuss-system">' + msg.text + '</div>';
    }
    let replyRefHtml = '';
    if (msg.replyTo != null && msg.replyTo >= 0 && msg.replyTo < p.discussion.length) {
      const refMsg = p.discussion[msg.replyTo];
      const refWho = refMsg.who || '';
      const refText = refMsg.text || '';
      replyRefHtml = '<div class="reply-ref" onclick="scrollToProcMsg(' + p.id + ',' + msg.replyTo + ')">' +
        '<div class="reply-ref-who">' + escapeHtml(refWho) + '</div>' +
        '<div class="reply-ref-text">' + escapeHtml(refText) + '</div></div>';
    }
    return '<div class="pm-discuss-msg" data-proc-msg="' + idx + '">' +
      '<div class="pm-discuss-av" style="background:' + msg.avc + '">' + msg.av + '</div>' +
      '<div class="pm-discuss-body">' +
        '<div class="pm-discuss-head"><span class="pm-discuss-who">' + msg.who + '</span><span class="pm-discuss-time">' + msg.time + '</span></div>' +
        replyRefHtml +
        '<div class="pm-discuss-text">' + msg.text + '</div>' +
      '</div>' +
      '<div class="msg-reply-btn" onclick="startProcReply(' + p.id + ',' + idx + ')" title="Ответить"><i class="fa-solid fa-reply"></i></div>' +
    '</div>';
  }).join('');

  const replyBarHtml = procReplyTo != null ? renderProcReplyBar(p) : '';

  body.innerHTML =
    '<div class="pm-layout">' +
      '<div class="pm-main">' +
        '<div class="pm-actions">' +
          '<button class="btn btn-primary btn-sm" onclick="showToast(\'Утверждено\', \'fa-check\')"><i class="fa-solid fa-check"></i> Утвердить</button>' +
          '<button class="btn btn-sm" onclick="showToast(\'Отклонено\', \'fa-xmark\')"><i class="fa-solid fa-xmark"></i> Отклонить</button>' +
          '<button class="btn btn-sm" onclick="showToast(\'На доработку\', \'fa-rotate-left\')"><i class="fa-solid fa-rotate-left"></i> На доработку</button>' +
          '<button class="btn btn-sm" onclick="showToast(\'Подписание КЭП…\', \'fa-signature\')"><i class="fa-solid fa-signature"></i> Подписать</button>' +
        '</div>' +
        '<div class="pm-info-grid">' +
          '<div class="pm-info-card"><div class="pm-info-label">Тема</div><div class="pm-info-value">' + (p.topic || p.n) + '</div></div>' +
          '<div class="pm-info-card"><div class="pm-info-label">Сумма</div><div class="pm-info-value">' + p.sum + '</div></div>' +
          '<div class="pm-info-card"><div class="pm-info-label">Инициатор</div><div class="pm-info-value">' + p.from + '</div></div>' +
          '<div class="pm-info-card"><div class="pm-info-label">Дата создания</div><div class="pm-info-value">' + (p.date || '—') + '</div></div>' +
        '</div>' +
        (p.threshold ? '<div class="pm-threshold"><i class="fa-solid fa-shield-halved"></i> ' + p.threshold + '</div>' : '') +
        (filesHtml ? '<div class="pm-files"><div class="pm-section-title"><i class="fa-solid fa-paperclip"></i> Вложения</div>' + filesHtml + '</div>' : '') +
        '<div class="pm-discuss">' +
          '<div class="pm-section-title"><i class="fa-solid fa-comments"></i> Лента обсуждения</div>' +
          '<div class="pm-discuss-list">' + discussionHtml + '</div>' +
          replyBarHtml +
          '<div class="pm-discuss-input">' +
            '<input type="text" placeholder="Написать комментарий…" id="procDiscussInput" onkeydown="if(event.key===\'Enter\')addProcessComment(' + p.id + ')">' +
            '<button class="btn btn-primary btn-sm" onclick="addProcessComment(' + p.id + ')"><i class="fa-solid fa-paper-plane"></i></button>' +
          '</div>' +
        '</div>' +
      '</div>' +
      '<div class="pm-route">' +
        '<div class="pm-route-header"><span>Маршрут</span><span class="pm-route-count">' + doneCount + '/' + steps.length + '</span></div>' +
        '<div class="pm-route-steps">' + routeHtml + '</div>' +
      '</div>' +
    '</div>';

  const pm = modal.querySelector('.pm');
  pm.classList.remove('pm-exit');
  void pm.offsetWidth;
  pm.classList.add('pm-in');
  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function renderProcReplyBar(p) {
  if (procReplyTo == null) return '';
  const refMsg = p.discussion[procReplyTo];
  if (!refMsg) return '';
  return '<div class="msg-reply-bar" style="border-radius:10px;margin-bottom:8px">' +
    '<div class="reply-accent"></div>' +
    '<div class="reply-info">' +
      '<div class="reply-who">Ответ ' + escapeHtml(refMsg.who || 'на сообщение') + '</div>' +
      '<div class="reply-text">' + escapeHtml(refMsg.text || '') + '</div>' +
    '</div>' +
    '<button class="reply-cancel" onclick="cancelProcReply()"><i class="fa-solid fa-xmark"></i></button>' +
  '</div>';
}

function startProcReply(procId, msgIdx) {
  openProcessModal(procId);
  procReplyTo = msgIdx;
  var p = APP_DATA.processes.find(function(x) { return x.id === procId; });
  if (p) {
    var body = document.getElementById('procModalBody');
    var barHtml = renderProcReplyBar(p);
    var inputWrap = body.querySelector('.pm-discuss-input');
    var oldBar = body.querySelector('.msg-reply-bar');
    if (oldBar) oldBar.remove();
    if (inputWrap && barHtml) {
      inputWrap.insertAdjacentHTML('beforebegin', barHtml);
    }
  }
  setTimeout(function() {
    var inp = document.getElementById('procDiscussInput');
    if (inp) inp.focus();
  }, 50);
}

function cancelProcReply() {
  procReplyTo = null;
  var modal = document.getElementById('processModal');
  if (modal.classList.contains('open')) {
    var p = APP_DATA.processes.find(function(x) {
      return document.getElementById('procModalName').textContent === x.n;
    });
    if (p) openProcessModal(p.id);
  }
}

function scrollToProcMsg(procId, msgIdx) {
  var el = document.querySelector('[data-proc-msg="' + msgIdx + '"]');
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    el.style.transition = 'background .3s';
    el.style.background = 'rgba(139,92,246,.1)';
    setTimeout(function() { el.style.background = ''; }, 1200);
  }
}

function closeProcessModal() {
  const modal = document.getElementById('processModal');
  const pm = modal.querySelector('.pm');
  pm.classList.remove('pm-in');
  pm.classList.add('pm-exit');
  procReplyTo = null;
  setTimeout(function() {
    modal.classList.remove('open');
    pm.classList.remove('pm-exit');
    document.body.style.overflow = '';
  }, 150);
}

document.addEventListener('click', function(e) {
  if (e.target.id === 'processModal') closeProcessModal();
});

document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape' && document.getElementById('processModal').classList.contains('open')) {
    closeProcessModal();
  }
});

function addProcessComment(id) {
  const input = document.getElementById('procDiscussInput');
  if (!input || !input.value.trim()) return;
  const p = APP_DATA.processes.find(x => x.id === id);
  if (!p) return;
  if (!p.discussion) p.discussion = [];
  const msg = {
    who: 'Анна Иванова', av: 'АИ', avc: 'linear-gradient(135deg,#6366f1,#a855f7)',
    time: 'Сейчас', text: input.value.trim()
  };
  if (procReplyTo != null) {
    msg.replyTo = procReplyTo;
  }
  p.discussion.push(msg);
  input.value = '';
  procReplyTo = null;
  openProcessModal(id);
}
