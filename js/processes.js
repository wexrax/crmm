let procFilter = 'wait';

function renderProcesses() {
  renderProcTabs();
  renderProcList(procFilter);
}

function renderProcTabs() {
  const el = document.getElementById('procTabs');
  if (!el) return;
  const waitCount = APP_DATA.processes.filter(p => p.st === 'На согласовании' || p.st === 'В работе').length;
  el.innerHTML = [
    { id: 'wait', label: 'Ожидают моего решения <b>' + waitCount + '</b>' },
    { id: 'all', label: 'Все' },
    { id: 'done', label: 'Завершённые' },
  ].map(t => '<div class="proc-tab' + (t.id === procFilter ? ' active' : '') + '" onclick="setProcFilter(\'' + t.id + '\')">' + t.label + '</div>').join('');
}

function setProcFilter(f) {
  procFilter = f;
  renderProcesses();
}

function renderProcList(filter) {
  const el = document.getElementById('procList');
  if (!el) return;
  const rows = APP_DATA.processes.filter(p => {
    if (filter === 'all') return true;
    if (filter === 'done') return p.st === 'Завершён';
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
  document.getElementById('procModalName').textContent = p.n;
  document.getElementById('procModalMeta').textContent = 'Статус: ' + p.st + ' · ' + p.step;
  const av = document.getElementById('procModalIcon');
  av.style.background = p.c;
  av.innerHTML = '<i class="fa-solid ' + p.ic + '"></i>';

  const steps = APP_DATA.processSteps;
  let stepsHtml = steps.map(s => {
    const nodeClass = s.done ? 'proc-step-done' : (s.current ? 'proc-step-cur' : 'proc-step-wait');
    const nodeIcon = s.done ? '<i class="fa-solid fa-check"></i>' : (s.current ? '<i class="fa-solid fa-pen"></i>' : '<i class="fa-solid fa-bell"></i>');
    return '<div class="proc-step">' +
      '<div class="proc-step-node ' + nodeClass + '">' + nodeIcon + '</div>' +
      '<div class="proc-step-lbl">' + s.step + (s.current ? ' — сейчас' : '') + '</div>' +
      '<div class="proc-step-person"><div class="proc-step-av" style="background:' + s.bg + '">' + s.ic + '</div>' +
      '<span class="proc-step-name">' + s.who + '<small>' + s.role + '</small></span>' +
      (s.done ? '<i class="fa-solid fa-circle-check" style="color:#34d399;font-size:12px"></i>' : '') + '</div></div>';
  }).join('');

  document.getElementById('procModalBody').innerHTML =
    '<div style="display:flex;gap:8px;margin-bottom:16px;flex-wrap:wrap">' +
    '<button class="btn btn-primary btn-sm" onclick="showToast(\'Утверждено\', \'fa-check\')"><i class="fa-solid fa-check"></i> Утвердить</button>' +
    '<button class="btn btn-sm" onclick="showToast(\'Отклонено\', \'fa-xmark\')"><i class="fa-solid fa-xmark"></i> Отклонить</button>' +
    '<button class="btn btn-sm" onclick="showToast(\'На доработку\', \'fa-rotate-left\')"><i class="fa-solid fa-rotate-left"></i> На доработку</button>' +
    '<button class="btn btn-sm" onclick="showToast(\'Электронная подпись КЭП…\', \'fa-signature\')"><i class="fa-solid fa-signature"></i> Подписать</button>' +
    '</div>' +
    '<div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:20px">' +
    '<div style="background:var(--surface-2);border:1px solid var(--border);border-radius:12px;padding:12px 14px"><span style="font-size:11px;color:var(--text-faint)">Сумма</span><div style="font-size:14px;font-weight:600;color:var(--text);margin-top:5px">' + p.sum + '</div></div>' +
    '<div style="background:var(--surface-2);border:1px solid var(--border);border-radius:12px;padding:12px 14px"><span style="font-size:11px;color:var(--text-faint)">Инициатор</span><div style="font-size:14px;font-weight:600;color:var(--text);margin-top:5px">' + p.from + '</div></div>' +
    '</div>' +
    '<div style="font-size:12.5px;font-weight:700;color:var(--text-faint);text-transform:uppercase;letter-spacing:.5px;margin-bottom:12px"><i class="fa-solid fa-route" style="color:var(--accent-purple)"></i> Маршрут</div>' +
    '<div class="proc-route">' + stepsHtml + '</div>';

  document.getElementById('processModal').classList.add('open');
}

function closeProcessModal() {
  document.getElementById('processModal').classList.remove('open');
}
