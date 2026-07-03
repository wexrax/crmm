let mktTabId = 'dash';

function renderMarketing() {
  renderMktTabs();
  renderMktContent();
}

function renderMktTabs() {
  const el = document.getElementById('mktTabs');
  if (!el) return;
  const tabs = [
    { id: 'dash', icon: 'fa-gauge-high', label: 'Дашборд' },
    { id: 'camp', icon: 'fa-rocket', label: 'Кампании' },
    { id: 'aud', icon: 'fa-user-group', label: 'Аудитория' },
    { id: 'chan', icon: 'fa-share-nodes', label: 'Каналы' },
  ];
  el.innerHTML = tabs.map(t =>
    '<div class="mkt-tab' + (t.id === mktTabId ? ' active' : '') + '" onclick="setMktTab(\'' + t.id + '\')"><i class="fa-solid ' + t.icon + '"></i> ' + t.label + '</div>'
  ).join('');
}

function setMktTab(id) {
  mktTabId = id;
  renderMarketing();
}

function renderMktContent() {
  const el = document.getElementById('mktContent');
  if (!el) return;
  const m = APP_DATA.marketing;

  if (mktTabId === 'dash') {
    el.innerHTML = '<div class="tab-content">' + renderMktDashboard(m) + '</div>';
  } else if (mktTabId === 'camp') {
    el.innerHTML = '<div class="tab-content">' + renderMktCampaigns(m) + '</div>';
  } else if (mktTabId === 'aud') {
    el.innerHTML = '<div class="tab-content">' + renderMktAudience(m) + '</div>';
  } else if (mktTabId === 'chan') {
    el.innerHTML = '<div class="tab-content">' + renderMktChannels(m) + '</div>';
  }
}

function renderMktDashboard(m) {
  const kpis = [
    { l: 'ROI', v: '412%', t: '+38%', up: true, ic: 'fa-coins', c: '#34d399' },
    { l: 'Лиды', v: '1 847', t: '+22%', up: true, ic: 'fa-user-plus', c: '#818cf8' },
    { l: 'Конверсия', v: '4.8%', t: '+0.9пп', up: true, ic: 'fa-percent', c: '#f472b6' },
    { l: 'CAC', v: '₽ 1 240', t: '−14%', up: true, ic: 'fa-hand-holding-dollar', c: '#fbbf24' },
    { l: 'LTV', v: '₽ 68К', t: '+11%', up: true, ic: 'fa-gem', c: '#c084fc' },
    { l: 'Open Rate', v: '34.2%', t: '−1.2пп', up: false, ic: 'fa-envelope-open', c: '#34d399' },
  ];

  return '<div class="kpi-row">' + kpis.map(k =>
    '<div class="kpi-card"><div class="kpi-label"><i class="fa-solid ' + k.ic + '" style="color:' + k.c + '"></i> ' + k.l + '</div><div class="kpi-value">' + k.v + '</div><div class="kpi-trend" style="color:' + (k.up ? 'var(--green)' : 'var(--red)') + '"><i class="fa-solid fa-arrow-' + (k.up ? 'up' : 'down') + '"></i> ' + k.t + '</div></div>'
  ).join('') + '</div>' +
  '<div class="grid-2" style="gap:18px;margin-bottom:18px"><div class="mkt-panel"><div class="mkt-panel-title"><i class="fa-solid fa-chart-pie" style="color:#f472b6"></i> Лиды по источникам</div><div style="display:flex;gap:16px;flex-wrap:wrap">' +
  [
    { n: 'Реклама', v: '38%', c: '#6366f1' },
    { n: 'Email', v: '27%', c: '#ec4899' },
    { n: 'Соцсети', v: '20%', c: '#f59e0b' },
    { n: 'Сайт', v: '15%', c: '#34d399' },
  ].map(s => '<span style="display:inline-flex;align-items:center;gap:6px;font-size:12.5px;color:var(--text-dim)"><span style="width:11px;height:11px;border-radius:3px;background:' + s.c + ';display:inline-block"></span> ' + s.n + ' <b style="color:var(--text)">' + s.v + '</b></span>').join('') +
  '</div></div>' +
  '<div class="mkt-panel"><div class="mkt-panel-title"><i class="fa-solid fa-filter" style="color:#818cf8"></i> Воронка конверсии</div>' +
  '<div class="funnel-list">' +
  [
    { n: 'Показы', v: 100, c: '#6366f1', cnt: '248 000', conv: '' },
    { n: 'Клики', v: 72, c: '#7c3aed', cnt: '34 700', conv: '14%' },
    { n: 'Лиды', v: 52, c: '#a855f7', cnt: '1 847', conv: '5.3%' },
    { n: 'Сделки', v: 34, c: '#db2777', cnt: '268', conv: '14.5%' },
    { n: 'Продажи', v: 20, c: '#f59e0b', cnt: '89', conv: '33%' },
  ].map(f => '<div class="funnel-row"><span class="funnel-label">' + f.n + '</span><div class="funnel-bar-wrap"><div class="funnel-bar" style="width:' + f.v + '%;background:linear-gradient(90deg,' + f.c + ',' + f.c + 'cc)">' + f.cnt + '</div></div><span class="funnel-conv">' + f.conv + '</span></div>').join('') +
  '</div></div></div>';
}

function renderMktCampaigns(m) {
  return '<div class="camp-list">' + m.campaigns.map(c => {
    const isTg = c.ic === 'fa-telegram';
    const iconHtml = isTg ? '<i class="fa-brands fa-telegram"></i>' : '<i class="fa-solid ' + c.ic + '"></i>';
    return '<div class="camp-row" onclick="showToast(\'Открываю: ' + c.n.replace(/'/g, '') + '\', \'' + c.ic + '\')">' +
      '<div class="camp-icon" style="background:' + c.c + '">' + iconHtml + '</div>' +
      '<div class="camp-info"><div class="camp-title">' + c.n + '</div><div class="camp-meta"><span><i class="fa-solid fa-share-nodes" style="color:#818cf8"></i> ' + c.ch + '</span><span><i class="fa-solid fa-wallet" style="color:var(--amber)"></i> ' + c.budget + '</span></div></div>' +
      '<div class="camp-metrics"><div class="camp-metric"><div class="mv" style="color:#34d399">' + c.roi + '</div><div class="ml">ROI</div></div><div class="camp-metric"><div class="mv">' + c.leads + '</div><div class="ml">Лиды</div></div><div class="camp-metric"><div class="mv">' + c.conv + '</div><div class="ml">Конв.</div></div></div>' +
      '<span class="camp-status" style="' + c.stc + '">' + c.st + '</span></div>';
  }).join('') + '</div>';
}

function renderMktAudience(m) {
  return '<div class="seg-grid">' + m.segments.map(s => {
    const tags = s.tags.map(t => '<span class="seg-tag" style="background:' + t[1] + ';color:' + t[2] + '">' + t[0] + '</span>').join('');
    return '<div class="seg-card" onclick="showToast(\'Сегмент: ' + s.n + '\', \'' + s.ic + '\')">' +
      '<div class="seg-top"><div class="seg-icon" style="background:' + s.c + '"><i class="fa-solid ' + s.ic + '"></i></div><div><div class="seg-name">' + s.n + '</div><div class="seg-cnt">' + s.cnt + '</div></div></div>' +
      '<div class="seg-tags">' + tags + '</div></div>';
  }).join('') + '</div>';
}

function renderMktChannels(m) {
  return '<div class="mkt-panel" style="margin-bottom:18px"><div class="mkt-panel-title"><i class="fa-solid fa-signal" style="color:var(--accent-purple)"></i> Эффективность каналов · конверсия и ROI</div>' +
    '<div class="hbar-list">' + m.channels.map(ch => {
      return '<div class="hbar-row"><div class="hbar-icon" style="background:' + ch.c + '">' + (ch.ic.includes('brands') ? '<i class="fa-brands ' + ch.ic.replace('fa-brands ', '') + '"></i>' : '<i class="fa-solid ' + ch.ic + '"></i>') + '</div><div class="hbar-info"><div class="hbar-top"><span class="n">' + ch.n + '</span><span class="v">ROI ' + ch.roi + ' · ' + ch.leads + ' лидов</span></div><div class="hbar-track"><div class="hbar-fill" style="width:' + ch.pct + '%;background:' + ch.c + '"></div></div></div></div>';
    }).join('') + '</div></div>';
}
