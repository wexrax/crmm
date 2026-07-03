let bdView = 'kanban';

function switchBdView(mode) {
  bdView = mode;
  document.getElementById('bdKanban').style.display = mode === 'kanban' ? '' : 'none';
  document.getElementById('bdGantt').style.display = mode === 'gantt' ? '' : 'none';
  document.getElementById('bdKanbanTab').classList.toggle('active-tab', mode === 'kanban');
  document.getElementById('bdGanttTab').classList.toggle('active-tab', mode === 'gantt');
  if (mode === 'kanban') { renderBoards(); document.getElementById('bdKanban').classList.add('tab-content'); }
  if (mode === 'gantt') { renderGantt(); document.getElementById('bdGantt').classList.add('tab-content'); }
}

function renderBoards() {
  const el = document.getElementById('bdKanban');
  if (!el) return;
  const lanes = APP_DATA.boards.lanes;
  let html = '<div class="bd-cols">' +
    '<div class="bd-colh"><i class="fa-solid fa-inbox" style="color:#818cf8"></i> Очередь <span class="cnt">2</span></div>' +
    '<div class="bd-colh"><i class="fa-solid fa-code" style="color:#fbbf24"></i> В работе <span class="wip">WIP 5</span><span class="cnt">5</span></div>' +
    '<div class="bd-colh"><i class="fa-solid fa-vial" style="color:#f472b6"></i> Тестирование <span class="cnt">1</span></div>' +
    '<div class="bd-colh"><i class="fa-solid fa-circle-check" style="color:#34d399"></i> Готово <span class="cnt">1</span></div>' +
    '</div>';

  lanes.forEach((lane, li) => {
    let cells = '';
    lane.cols.forEach(col => {
      let cards = '';
      col.forEach(c => {
        let tags = (c.tags || []).map(t => '<span class="tk-tag" style="background:' + t[1] + ';color:' + t[2] + '">' + t[0] + '</span>').join('');
        let avs = '';
        if (c.avs) avs = c.avs.map(a => '<span class="tk-av" style="background:' + a[1] + ';margin-left:-6px">' + a[0] + '</span>').join('');
        else if (c.av) avs = '<span class="tk-av" style="background:' + c.avc + '">' + c.av + '</span>';
        let due = c.due ? '<span class="tk-due" style="background:' + c.due[1] + '"><i class="fa-solid fa-hourglass-half"></i> ' + c.due[0] + '</span>' : '';
        let block = c.block ? '<i class="fa-solid fa-lock tk-block"></i>' : '';
        cards += '<div class="tk-card" onclick="showToast(\'' + c.t.replace(/'/g, '') + '\', \'fa-clipboard-check\')">' +
          '<div class="tk-bar" style="background:' + (c.bar || '#6366f1') + '"></div>' + block +
          '<div class="tk-title">' + c.t + '</div>' + (tags ? '<div class="tk-tags">' + tags + '</div>' : '') +
          '<div class="tk-foot">' + avs + due + '</div></div>';
      });
      cells += '<div class="bd-cell">' + cards + '</div>';
    });
    html += '<div class="lane' + (lane.open ? '' : ' collapsed') + '" id="lane' + li + '">' +
      '<div class="lane-header" onclick="document.getElementById(\'lane' + li + '\').classList.toggle(\'collapsed\')"><i class="fa-solid fa-chevron-down ch"></i> ' + lane.name + ' <span class="cnt">' + lane.cnt + '</span></div>' +
      '<div class="lane-body">' + cells + '</div></div>';
  });
  el.innerHTML = html;
}

const ganttNow = 38.9;
const ganttData = [
  { lvl: 0, n: 'Пилот MVP · полный цикл', ds: '01.01.2026', de: '30.06.2026', s: 0, e: 60, type: 'epic', prog: 38 },
  { lvl: 1, n: 'Проектирование', ds: '01.01.2026', de: '15.02.2026', s: 0, e: 18, type: 'done', prog: 100 },
  { lvl: 1, n: 'Разработка бэкенда', ds: '10.02.2026', de: '30.04.2026', s: 14, e: 44, type: 'task', prog: 65 },
  { lvl: 1, n: 'Разработка фронтенда', ds: '01.03.2026', de: '15.05.2026', s: 25, e: 52, type: 'task', prog: 40 },
  { lvl: 1, n: 'Тестирование и QA', ds: '01.04.2026', de: '20.05.2026', s: 39, e: 55, type: 'task', prog: 15 },
  { lvl: 1, n: 'Деплой и запуск', ds: '15.05.2026', de: '30.06.2026', s: 52, e: 67, type: 'grp', prog: 0 },
  { lvl: 0, n: 'Интеграция с 1С', ds: '01.03.2026', de: '30.09.2026', s: 25, e: 83, type: 'epic', prog: 10 },
  { lvl: 1, n: 'Анализ процессов', ds: '01.03.2026', de: '01.04.2026', s: 25, e: 39, type: 'done', prog: 100 },
  { lvl: 1, n: 'Настройка BPMSoft', ds: '15.03.2026', de: '15.06.2026', s: 28, e: 61, type: 'task', prog: 30 },
];

function renderGantt() {
  const el = document.getElementById('bdGantt');
  if (!el) return;
  const months = ['Дек', 'Янв', 'Фев', 'Март', 'Апр', 'Май'];

  let rows = ganttData.map(r => {
    const w = Math.max(r.e - r.s, 2);
    const lvClass = 'lv' + r.lvl;
    const barClass = r.type;
    const fill = r.prog > 0 && r.type !== 'epic' ? '<div class="gantt-fill" style="width:' + r.prog + '%"></div>' : '';
    return '<div class="gantt-row">' +
      '<div class="gantt-cell gantt-name ' + lvClass + '">' + r.n + '</div>' +
      '<div class="gantt-cell gantt-date">' + r.ds + '</div>' +
      '<div class="gantt-cell gantt-date">' + r.de + '</div>' +
      '<div class="gantt-cell gantt-time"><div class="gantt-lane">' +
      '<div style="position:absolute;top:0;bottom:0;left:' + ganttNow + '%;width:2px;background:#f87171;z-index:3"></div>' +
      fill +
      '<div class="gantt-bar ' + barClass + '" style="left:' + r.s + '%;width:' + w + '%" onclick="showToast(\'' + r.n.replace(/'/g, '') + ' · ' + r.prog + '%\', \'fa-diagram-project\')">' +
      '<span class="gantt-text">' + r.n + '</span></div>' +
      '</div></div></div>';
  }).join('');

  el.innerHTML = '<div class="gantt-wrap"><div class="gantt-scroll"><div class="gantt">' +
    '<div class="gantt-row gantt-head"><div class="gantt-cell">Задача</div><div class="gantt-cell gantt-date">Начало</div><div class="gantt-cell gantt-date">Конец</div><div class="gantt-cell gantt-time" style="flex-direction:column;align-items:stretch;padding:0"><div style="padding:4px 12px 2px;font-size:11px;color:var(--text-dim);font-weight:700">2026</div><div class="gantt-months">' + months.map(m => '<div class="gantt-month' + (m === 'Март' ? ' now' : '') + '">' + m + '</div>').join('') + '</div></div></div>' +
    rows +
    '</div></div></div>' +
    '<div class="res-wrap"><div class="res-header"><i class="fa-solid fa-users-gear" style="color:#818cf8"></i> Загрузка ресурсов, %</div><div class="res-scroll"><div>' +
    [
      { n: 'Дмитрий Орлов', role: 'Менеджер', av: 'ДО', c: 'linear-gradient(135deg,#6366f1,#a855f7)', load: [40, 60, 80, 120, 90, 50] },
      { n: 'Анна Ковалёва', role: 'Руководитель', av: 'АК', c: 'linear-gradient(135deg,#f59e0b,#ef4444)', load: [50, 70, 75, 85, 80, 60] },
      { n: 'Елена Соколова', role: 'Менеджер', av: 'ЕС', c: 'linear-gradient(135deg,#10b981,#059669)', load: [30, 55, 65, 90, 75, 45] },
    ].map(r => {
      const cells = r.load.map(v => {
        const col = v > 100 ? '#f87171' : v > 75 ? '#fbbf24' : v > 0 ? '#34d399' : 'var(--surface-3)';
        return '<div class="res-cell"><div class="res-load" style="background:' + col + ';color:' + (v > 0 ? '#fff' : 'transparent') + '">' + (v > 0 ? v + '%' : '') + '</div></div>';
      }).join('');
      return '<div class="res-row"><div class="res-name"><div class="res-av" style="background:' + r.c + '">' + r.av + '</div><div><div style="color:var(--text);font-weight:600">' + r.n + '</div><div style="font-size:10.5px;color:var(--text-secondary)">' + r.role + '</div></div></div><div class="res-cells">' + cells + '</div></div>';
    }).join('') +
    '</div></div></div>';
}
