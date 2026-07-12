function renderSettings() {
  var container = document.getElementById('settingsList');
  if (!container) return;
  var light = isLightTheme();
  var themeLabel = light ? 'Тёмная' : 'Светлая';
  var themeIcon = light ? 'fa-moon' : 'fa-sun';

  var html = '<div class="settings-card" onclick="toggleTheme(); renderSettings()">' +
    '<div class="settings-card-icon" style="background:rgba(99,102,241,.18);color:#818cf8">' +
      '<i class="fa-solid ' + themeIcon + '"></i>' +
    '</div>' +
    '<div class="settings-card-content">' +
      '<div class="settings-card-title">Тема оформления</div>' +
      '<div class="settings-card-desc">Текущая: ' + (light ? 'Светлая' : 'Тёмная') + ' · Нажмите чтобы переключить на ' + themeLabel.toLowerCase() + '</div>' +
    '</div>' +
    '<div class="settings-card-arrow"><i class="fa-solid fa-repeat"></i></div>' +
  '</div>';

  html += APP_DATA.settings.map(function(s) {
    var bg = light ? s.bg.replace(/[\d.]+\)$/, function(m) {
      var v = parseFloat(m);
      return Math.min(v + 0.12, 0.35).toFixed(2) + ')';
    }) : s.bg;

    return '<div class="settings-card" onclick="showToast(\'Открываю: ' + s.title + '\', \'' + s.icon + '\')">' +
      '<div class="settings-card-icon" style="background:' + bg + ';color:' + s.color + '">' +
        '<i class="fa-solid ' + s.icon + '"></i>' +
      '</div>' +
      '<div class="settings-card-content">' +
        '<div class="settings-card-title">' + s.title + '</div>' +
        '<div class="settings-card-desc">' + s.desc + '</div>' +
      '</div>' +
      '<div class="settings-card-arrow"><i class="fa-solid fa-chevron-right"></i></div>' +
    '</div>';
  }).join('');

  container.innerHTML = html;
}
