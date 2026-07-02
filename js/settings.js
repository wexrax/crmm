function renderSettings() {
  const container = document.getElementById('settingsList');
  if (!container) return;
  const light = isLightTheme();

  container.innerHTML = APP_DATA.settings.map(s => {
    const bg = light ? s.bg.replace(/[\d.]+\)$/, m => {
      const v = parseFloat(m);
      return Math.min(v + 0.12, 0.35).toFixed(2) + ')';
    }) : s.bg;

    return `
    <div class="settings-card" onclick="showToast('Открываю: ${s.title}', '${s.icon}')">
      <div class="settings-card-icon" style="background:${bg};color:${s.color}">
        <i class="fa-solid ${s.icon}"></i>
      </div>
      <div class="settings-card-content">
        <div class="settings-card-title">${s.title}</div>
        <div class="settings-card-desc">${s.desc}</div>
      </div>
      <div class="settings-card-arrow"><i class="fa-solid fa-chevron-right"></i></div>
    </div>`;
  }).join('');
}
