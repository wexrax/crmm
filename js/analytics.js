function renderHomeAnalytics() {
  const { bars } = APP_DATA.analytics;
  const el = document.getElementById('homeAnalytics');
  if (!el) return;

  const barsHtml = bars.map(function(b) {
    return '<div class="bar-item" style="height:0" data-height="' + b.v + '%">' +
      '<span>' + Math.round(b.v * 0.35) + '</span>' +
      '<b>' + b.m + '</b>' +
    '</div>';
  }).join('');

  el.innerHTML =
    '<div class="dashboard">' +
      '<div class="panel">' +
        '<div class="panel-title">Выручка по месяцам</div>' +
        '<div class="panel-sub">Прогноз · 2026</div>' +
        '<div class="bar-chart">' + barsHtml + '</div>' +
      '</div>' +
    '</div>';

  requestAnimationFrame(function() {
    el.querySelectorAll('.bar-item').forEach(function(bar) {
      bar.style.height = bar.dataset.height;
    });
  });
}
