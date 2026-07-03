let currentView = 'feed';

function initApp() {
  const savedTheme = localStorage.getItem('nexus-theme') || 'dark';
  document.documentElement.setAttribute('data-theme', savedTheme);

  renderFeed();
  renderKanban();
  renderTasks();
  renderTeam();
  renderCalendar();
  renderAnalytics();
  renderComms();
  renderSettings();
  renderCompanies();
  renderContacts();
  renderProcesses();
  renderBoards();
  renderMarketing();
  renderHR();
  renderMessenger();
  renderHomeStats();
  setupNavigation();
}

function setupNavigation() {
  document.querySelectorAll('.nav-item[data-view]').forEach(item => {
    item.addEventListener('click', () => navigateTo(item.dataset.view));
  });
  setupTooltips();
}

function setupTooltips() {
  const tip = document.createElement('div');
  tip.className = 'tooltip';
  tip.style.cssText = 'position:fixed;background:rgba(20,22,38,.95);color:#fff;font-size:12px;padding:6px 12px;border-radius:8px;white-space:nowrap;opacity:0;pointer-events:none;transition:opacity .2s ease,transform .2s ease,filter .2s ease;z-index:9999;border:1px solid rgba(255,255,255,.08);filter:blur(4px);transform:translateY(-50%) translateX(-4px)';
  document.body.appendChild(tip);

  document.querySelectorAll('.nav-item[data-view]').forEach(item => {
    const label = item.querySelector('.tooltip');
    if (!label) return;
    const text = label.textContent;
    item.addEventListener('mouseenter', () => {
      const r = item.getBoundingClientRect();
      tip.textContent = text;
      tip.style.left = (r.right + 10) + 'px';
      tip.style.top = (r.top + r.height / 2) + 'px';
      tip.style.transition = 'none';
      tip.style.opacity = '0';
      tip.style.transform = 'translateY(-50%) translateX(-4px)';
      tip.style.filter = 'blur(4px)';
      tip.offsetHeight;
      tip.style.transition = 'opacity .2s ease, transform .2s ease, filter .2s ease';
      tip.style.opacity = '1';
      tip.style.transform = 'translateY(-50%) translateX(0)';
      tip.style.filter = 'blur(0)';
    });
    item.addEventListener('mouseleave', () => {
      tip.style.opacity = '0';
      tip.style.transform = 'translateY(-50%) translateX(-4px)';
      tip.style.filter = 'blur(4px)';
    });
  });
}

function navigateTo(view) {
  currentView = view;

  document.querySelectorAll('.view').forEach(v => {
    v.classList.remove('active');
    v.style.animation = 'none';
  });
  const el = document.getElementById('view-' + view);
  if (el) {
    void el.offsetHeight;
    el.style.animation = '';
    el.classList.add('active');
  }

  document.querySelectorAll('.nav-item[data-view]').forEach(n => {
    n.classList.toggle('active', n.dataset.view === view);
  });

  const titles = {
    feed: ['Доброе утро, Анна', 'Сегодня у вас 3 встречи, 7 задач и уведомления.'],
    deals: ['Сделки', 'Перетаскивайте карточки между стадиями'],
    companies: ['Компании', '248 карточек · Все заведённые компании'],
    contacts: ['Контакты', '312 контактов · Физические лица'],
    tasks: ['Задачи', 'Мои задачи и задачи команды'],
    proc: ['Процессы', 'Согласование договоров и документов'],
    mkt: ['Маркетинг', 'Кампании, сегменты и аналитика ROI'],
    boards: ['Проекты', 'Agile-доски, Гантт, ресурсы'],
    hr: ['HR', 'Найм, адаптация и развитие персонала'],
    team: ['Команда', 'Статусы и загрузка сотрудников'],
    chats: ['Чаты', 'Мессенджер команды'],
    comms: ['Коммуникации', 'Все каналы в одном месте'],
    calendar: ['Календарь', 'Встречи и дедлайны'],
    analytics: ['Аналитика', 'Дашборды и отчёты'],
    settings: ['Настройки', 'Безопасность и интеграции'],
  };

  const [title, sub] = titles[view] || ['', ''];
  const titleEl = document.getElementById('pageTitle');
  const subEl = document.getElementById('pageSubtitle');
  if (titleEl) titleEl.textContent = title;
  if (subEl) subEl.textContent = sub;

  if (view === 'chats') renderMessenger();
  if (view === 'companies') renderCompanies();
  if (view === 'contacts') renderContacts();

  document.querySelector('.content').scrollTop = 0;
}

function toggleTheme() {
  const current = document.documentElement.getAttribute('data-theme');
  const next = current === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', next);
  localStorage.setItem('nexus-theme', next);
}

function showToast(message, icon = 'fa-check') {
  const el = document.getElementById('toast');
  const ic = document.getElementById('toastIcon');
  const msg = document.getElementById('toastMessage');

  ic.className = 'fa-solid fa-' + icon;
  msg.textContent = message;
  el.classList.add('show');

  clearTimeout(el._timer);
  el._timer = setTimeout(() => el.classList.remove('show'), 2800);
}

function renderHomeStats() {
  const el = document.getElementById('homeStats');
  if (!el) return;
  const stats = [
    { icon: 'fa-briefcase', color: '#818cf8', value: '₽ 24,8М', label: 'Сделки в работе', trend: '+18% за месяц', trendUp: true },
    { icon: 'fa-bullseye', color: '#34d399', value: '85%', label: 'Выполнение плана', trend: '+5% к цели', trendUp: true },
    { icon: 'fa-list-check', color: '#fbbf24', value: '7', label: 'Активных задач', trend: '2 срочные', trendUp: false },
    { icon: 'fa-heart-pulse', color: '#f472b6', value: '96%', label: 'Здоровье базы', trend: 'Отлично', trendUp: true },
  ];
  el.innerHTML = stats.map(s => {
    const bg = s.color + '18';
    return '<div class="stat-card" onclick="showToast(\'' + s.label + '\', \'' + s.icon + '\')">' +
      '<div class="stat-icon" style="background:' + bg + ';color:' + s.color + '"><i class="fa-solid ' + s.icon + '"></i></div>' +
      '<div class="stat-value">' + s.value + '</div>' +
      '<div class="stat-label">' + s.label + '</div>' +
      '<div class="stat-trend" style="color:' + (s.trendUp ? 'var(--green)' : 'var(--amber)') + '"><i class="fa-solid fa-arrow-' + (s.trendUp ? 'up' : 'clock') + '"></i> ' + s.trend + '</div>' +
      '</div>';
  }).join('');
}

document.addEventListener('DOMContentLoaded', initApp);
