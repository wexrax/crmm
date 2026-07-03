const APP_DATA = {
  stages: [
    { id: 'new', name: 'Новые', color: '#818cf8' },
    { id: 'qual', name: 'Квалификация', color: '#00cec9' },
    { id: 'nego', name: 'Переговоры', color: '#f59e0b' },
    { id: 'contract', name: 'Договор', color: '#a855f7' },
    { id: 'won', name: 'Выиграно', color: '#34d399' },
  ],

  deals: [
    { id: 1, company: 'Ромашка ООО', amount: 5400000, stage: 'nego', owner: 'Анна Ковалёва', prob: 72, contact: 'Игорь Смирнов', phone: '+7 916 234-11-22', city: 'Москва', industry: 'Ритейл' },
    { id: 2, company: 'ТехноСфера', amount: 2100000, stage: 'qual', owner: 'Дмитрий Орлов', prob: 45, contact: 'Мария Петрова', phone: '+7 903 555-01-09', city: 'Санкт-Петербург', industry: 'IT' },
    { id: 3, company: 'ГринЛайт', amount: 8900000, stage: 'contract', owner: 'Анна Ковалёва', prob: 88, contact: 'Олег Кузнецов', phone: '+7 921 777-33-44', city: 'Москва', industry: 'Энергетика' },
    { id: 4, company: 'Вектор Групп', amount: 1200000, stage: 'new', owner: 'Елена Соколова', prob: 20, contact: 'Павел Новиков', phone: '+7 985 100-20-30', city: 'Казань', industry: 'Логистика' },
    { id: 5, company: 'АкваСтрой', amount: 6700000, stage: 'nego', owner: 'Дмитрий Орлов', prob: 58, contact: 'Наталья Волкова', phone: '+7 926 848-77-11', city: 'Москва', industry: 'Строительство' },
    { id: 6, company: 'МедиаПлюс', amount: 3300000, stage: 'won', owner: 'Елена Соколова', prob: 100, contact: 'Сергей Лебедев', phone: '+7 917 222-88-99', city: 'Екатеринбург', industry: 'Медиа' },
    { id: 7, company: 'Финмакс', amount: 14500000, stage: 'new', owner: 'Анна Ковалёва', prob: 30, contact: 'Виктор Соловьёв', phone: '+7 999 004-55-66', city: 'Москва', industry: 'Финансы' },
    { id: 8, company: 'БиоФарм', amount: 4200000, stage: 'qual', owner: 'Елена Соколова', prob: 50, contact: 'Ирина Морозова', phone: '+7 963 321-45-67', city: 'Новосибирск', industry: 'Фарма' },
  ],

  tasks: [
    { id: 1, name: 'Отправить КП компании «Ромашка»', sub: 'Сделка · Ромашка ООО · до 16:00', priority: 'high', icon: 'fa-fire', iconBg: 'rgba(239,68,68,.18)', iconColor: '#f87171', status: 'work', done: false },
    { id: 2, name: 'Согласовать договор с юристом', sub: 'Сделка · ГринЛайт · на согласовании', priority: 'medium', icon: 'fa-file-signature', iconBg: 'rgba(245,158,11,.18)', iconColor: '#fbbf24', status: 'review', done: false },
    { id: 3, name: 'Позвонить клиенту «ТехноСфера»', sub: 'Уточнить бюджет проекта · сегодня', priority: 'medium', icon: 'fa-phone', iconBg: 'rgba(99,102,241,.18)', iconColor: '#818cf8', status: 'work', done: false },
    { id: 4, name: 'Подготовить презентацию для «Финмакс»', sub: 'Сделка · Финмакс · завтра', priority: 'low', icon: 'fa-file-lines', iconBg: 'rgba(52,211,153,.18)', iconColor: '#34d399', status: 'work', done: false },
    { id: 5, name: 'Выставить счёт «МедиаПлюс»', sub: 'Сделка закрыта · выполнено', priority: 'low', icon: 'fa-circle-check', iconBg: 'rgba(52,211,153,.18)', iconColor: '#34d399', status: 'done', done: true },
    { id: 6, name: 'Провести демо продукта «Вектор Групп»', sub: 'Встреча · четверг 14:00', priority: 'medium', icon: 'fa-video', iconBg: 'rgba(99,102,241,.18)', iconColor: '#818cf8', status: 'work', done: false },
    { id: 7, name: 'Обновить контактные данные «АкваСтрой»', sub: 'Мастер чистоты данных · выполнено', priority: 'low', icon: 'fa-circle-check', iconBg: 'rgba(52,211,153,.18)', iconColor: '#34d399', status: 'done', done: true },
  ],

  team: [
    { name: 'Анна Ковалёва', role: 'Руководитель отдела', status: 'online', deals: 3, calls: 47, tasks: 8 },
    { name: 'Дмитрий Орлов', role: 'Менеджер продаж', status: 'online', deals: 2, calls: 38, tasks: 5 },
    { name: 'Елена Соколова', role: 'Менеджер продаж', status: 'meeting', deals: 3, calls: 41, tasks: 6 },
    { name: 'Пётр Васильев', role: 'CEO', status: 'online', deals: 0, calls: 12, tasks: 3 },
    { name: 'Ольга Зайцева', role: 'Маркетинг', status: 'offline', deals: 0, calls: 9, tasks: 4 },
    { name: 'Максим Титов', role: 'Юрист', status: 'away', deals: 0, calls: 5, tasks: 7 },
  ],

  feedItems: [
    {
      group: 'Сегодня',
      type: 'deal',
      icon: 'fa-handshake',
      iconBg: 'rgba(52,211,153,.18)',
      iconColor: '#34d399',
      tag: '72%',
      tagBg: 'rgba(52,211,153,.35)',
      tagColor: '#34d399',
      title: 'Ромашка ООО — Сделка · Переговоры · 5 400 000 ₽',
      desc: 'Следующее действие: обсудить условия оплаты. Клиент проявил высокий интерес после демонстрации продукта.',
      actions: [
        { label: 'Позвонить', primary: true, action: 'call:Ромашка ООО' },
        { label: 'Написать', primary: false, action: 'toast:Открыт чат со сделкой' },
      ],
    },
    {
      group: 'Сегодня',
      type: 'task',
      icon: 'fa-list-check',
      iconBg: 'rgba(99,102,241,.18)',
      iconColor: '#818cf8',
      tag: 'Срочно',
      tagBg: 'rgba(248,113,113,.35)',
      tagColor: '#f87171',
      title: 'Отправить КП компании «Ромашка»',
      desc: 'Задача · срок до 16:00. Подготовлен черновик коммерческого предложения на основе истории переписки.',
      actions: [
        { label: 'Выполнить', primary: true, action: 'toast:Задача выполнена' },
        { label: 'Делегировать', primary: false, action: 'toast:Задача делегирована' },
      ],
    },
    {
      group: 'Сегодня',
      type: 'notif',
      icon: 'fa-envelope-open',
      iconBg: 'rgba(251,191,36,.18)',
      iconColor: '#fbbf24',
      tag: 'Прочитано',
      tagBg: 'rgba(251,191,36,.35)',
      tagColor: '#fbbf24',
      title: 'Клиент прочитал ваше письмо',
      desc: 'Уведомление · ГринЛайт · 08:47. Олег Кузнецов открыл письмо с договором и провёл на нём 4 минуты. Хороший знак для закрытия сделки.',
      actions: [
        { label: 'Открыть сделку', primary: true, action: 'deal:3' },
      ],
    },
    {
      group: 'Сегодня',
      type: 'task',
      icon: 'fa-phone',
      iconBg: 'rgba(99,102,241,.18)',
      iconColor: '#818cf8',
      tag: 'В работе',
      tagBg: 'rgba(99,102,241,.35)',
      tagColor: '#818cf8',
      title: 'Позвонить клиенту «ТехноСфера»',
      desc: 'Задача · уточнить бюджет проекта · сегодня до 17:00',
      actions: [
        { label: 'Позвонить', primary: true, action: 'call:ТехноСфера' },
        { label: 'Перенести', primary: false, action: 'toast:Задача перенесена на завтра' },
      ],
    },
    {
      group: 'Вчера',
      type: 'deal',
      icon: 'fa-handshake',
      iconBg: 'rgba(168,85,247,.18)',
      iconColor: '#c084fc',
      tag: '88%',
      tagBg: 'rgba(52,211,153,.35)',
      tagColor: '#34d399',
      title: 'ГринЛайт — Сделка · Договор · 8 900 000 ₽',
      desc: 'Договор отправлен на согласование. Клиент связался для уточнения технических деталей.',
      actions: [
        { label: 'Открыть сделку', primary: true, action: 'deal:3' },
      ],
    },
    {
      group: 'Вчера',
      type: 'notif',
      icon: 'fa-triangle-exclamation',
      iconBg: 'rgba(248,113,113,.18)',
      iconColor: '#f87171',
      tag: 'Внимание',
      tagBg: 'rgba(248,113,113,.35)',
      tagColor: '#f87171',
      title: 'Риск оттока: 2 клиента',
      desc: 'Предиктивный скоринг · У клиентов «Вектор Групп» и «Финмакс» снизилась активность. Рекомендую персональное касание в течение 48 часов.',
      actions: [
        { label: 'Показать план', primary: true, action: 'toast:Сформирован план удержания' },
      ],
    },
    {
      group: 'Вчера',
      type: 'event',
      icon: 'fa-video',
      iconBg: 'rgba(99,102,241,.18)',
      iconColor: '#818cf8',
      tag: 'Запись',
      tagBg: 'rgba(99,102,241,.35)',
      tagColor: '#818cf8',
      title: 'Встреча: демо для «АкваСтрой»',
      desc: 'Стенограмма готова. Выделены ключевые договорённости и созданы 2 задачи автоматически.',
      actions: [
        { label: 'Смотреть запись', primary: false, action: 'toast:Открыта запись встречи' },
      ],
    },
    {
      group: 'Вчера',
      type: 'msg',
      icon: 'fa-comment-dots',
      iconBg: 'rgba(99,102,241,.18)',
      iconColor: '#818cf8',
      tag: 'Чат',
      tagBg: 'rgba(99,102,241,.35)',
      tagColor: '#818cf8',
      title: 'Дмитрий Орлов — Чат · Запуск нового продукта',
      desc: '«Коллеги, выложил новые макеты в рабочее пространство. Нужна проверка до пятницы.»',
      actions: [
        { label: 'Ответить', primary: true, action: 'toast:Ответ отправлен' },
        { label: 'В задачу', primary: false, action: 'toast:Создана задача из сообщения' },
      ],
    },
    {
      group: 'Вчера',
      type: 'deal',
      icon: 'fa-handshake',
      iconBg: 'rgba(52,211,153,.18)',
      iconColor: '#34d399',
      tag: '100%',
      tagBg: 'rgba(52,211,153,.35)',
      tagColor: '#34d399',
      title: 'МедиаПлюс — Сделка закрыта · 3 300 000 ₽',
      desc: 'Счёт выставлен и оплачен. Клиент доволен. Попросил оставить отзыв.',
      actions: [
        { label: 'Открыть сделку', primary: true, action: 'deal:6' },
        { label: 'Попросить отзыв', primary: false, action: 'toast:Запрос на отзыв отправлен' },
      ],
    },
    {
      group: 'На прошлой неделе',
      type: 'notif',
      icon: 'fa-star',
      iconBg: 'rgba(251,191,36,.18)',
      iconColor: '#fbbf24',
      tag: 'Достижение',
      tagBg: 'rgba(251,191,36,.35)',
      tagColor: '#fbbf24',
      title: 'Вы перевысили план по звонкам на 20%',
      desc: 'Виртуальная медаль «Золотой звонок» присвоена. Бонус за квартал увеличен.',
      actions: [],
    },
  ],

  calendarEvents: {
    5: [{ t: 'Демо · Вектор', c: '#6366f1' }],
    10: [{ t: 'Звонок · Ромашка', c: '#34d399' }, { t: 'Встреча CEO', c: '#fbbf24' }],
    14: [{ t: 'Демо · АкваСтрой', c: '#818cf8' }],
    18: [{ t: 'Подписание', c: '#a855f7' }],
    22: [{ t: 'Ретро', c: '#fbbf24' }],
    27: [{ t: 'Дедлайн КП', c: '#f87171' }],
  },

  analytics: {
    stats: [
      { icon: 'fa-sack-dollar', color: '#34d399', value: '46.3М', label: 'Сумма сделок', trend: '+12.4% за месяц', trendUp: true },
      { icon: 'fa-handshake', color: '#818cf8', value: '8', label: 'Активных сделок', trend: '+2 новых', trendUp: true },
      { icon: 'fa-bullseye', color: '#fbbf24', value: '85%', label: 'Выполнение плана', trend: 'До цели 15%', trendUp: false },
      { icon: 'fa-percent', color: '#818cf8', value: '28%', label: 'Конверсия', trend: '+3.1% за месяц', trendUp: true },
    ],
    bars: [
      { m: 'Май', v: 60 },
      { m: 'Июн', v: 75 },
      { m: 'Июл', v: 55 },
      { m: 'Авг', v: 85 },
      { m: 'Сен', v: 70 },
      { m: 'Окт', v: 92 },
    ],
    funnel: [
      { n: 'Лиды', v: 100, c: '#818cf8', cnt: 120 },
      { n: 'Квалификация', v: 72, c: '#00cec9', cnt: 86 },
      { n: 'Переговоры', v: 48, c: '#f59e0b', cnt: 58 },
      { n: 'Договор', v: 30, c: '#a855f7', cnt: 36 },
      { n: 'Закрыто', v: 22, c: '#34d399', cnt: 26 },
    ],
  },

  comms: [
    { icon: 'fa-video', color: '#818cf8', title: 'Видеозвонок', desc: 'WebRTC HD · до 100 участников' },
    { icon: 'fa-comment-dots', color: '#34d399', title: 'Корп. чат', desc: 'Контекстные чаты по сделкам' },
    { icon: 'fa-envelope', color: '#f472b6', title: 'Email', desc: 'Шаблоны · трекинг открытий' },
    { icon: 'fa-phone-volume', color: '#fbbf24', title: 'Телефония', desc: 'SIP · запись · расшифровка' },
    { icon: 'fa-headset', color: '#a855f7', title: 'Поддержка', desc: 'Тикеты · база знаний · SLA' },
  ],

  settings: [
    { icon: 'fa-shield-halved', color: '#34d399', bg: 'rgba(52,211,153,.18)', title: 'Двухфакторная аутентификация', desc: 'TOTP + Push · Активна для всех пользователей' },
    { icon: 'fa-users-gear', color: '#818cf8', bg: 'rgba(99,102,241,.18)', title: 'Роли и права (RBAC)', desc: '6 ролей · Field-level security · Маскировка данных' },
    { icon: 'fa-plug-circle-bolt', color: '#fbbf24', bg: 'rgba(245,158,11,.18)', title: 'Интеграции · Marketplace', desc: '1С, Jira, Google Workspace, ЮKassa подключены' },
    { icon: 'fa-lock', color: '#f87171', bg: 'rgba(248,113,113,.18)', title: 'Шифрование данных', desc: 'AES-256 · Шифрование в покое и при передаче' },
    { icon: 'fa-clock-rotate-left', color: '#a855f7', bg: 'rgba(168,85,247,.18)', title: 'Аудит и логирование', desc: 'Полный аудит действий · Хранение 3 года' },
  ],

  companies: [
    { n: 'ЭЛВЕНТ ПЛЮС, ООО', inn: '7716894440', c: 'linear-gradient(135deg,#6366f1,#a855f7)', deal: '14.09.2026 14:00', date: '01.12.2025', resp: 'Анна Ковалёва', path: '' },
    { n: 'ООО "СТАНДАРТЭНЕРГО"', inn: '—', c: 'linear-gradient(135deg,#3b82f6,#6366f1)', deal: '27.08.2026 16:00', date: '15.05.2024', resp: 'Пётр Васильев', path: '' },
    { n: 'ЭНЕРГОМАСТЕР, ООО', inn: '5014009147', c: 'linear-gradient(135deg,#f59e0b,#ef4444)', deal: '04.08.2026 16:00', date: '01.12.2025', resp: 'Дмитрий Орлов', path: '' },
    { n: 'ООО "СТРОЙКОНТРАКТ"', inn: '2460056905', c: 'linear-gradient(135deg,#10b981,#059669)', deal: '04.08.2026 14:00', date: '18.09.2025', resp: 'Общие компании', path: 'Прочий трафик › Приложение' },
    { n: 'ИНТЕРЛАЙН ИНЖИНИРИНГ, ООО', inn: '7805412169', c: 'linear-gradient(135deg,#8b5cf6,#a855f7)', deal: '03.08.2026 16:00', date: '01.12.2025', resp: 'Ольга Зайцева', path: '' },
    { n: 'НЕФТЬ-ГАЗ, ООО', inn: '6450605920', c: 'linear-gradient(135deg,#ec4899,#f59e0b)', deal: '30.07.2026 16:00', date: '01.12.2025', resp: 'Анна Ковалёва', path: '' },
    { n: 'ТГС, ООО', inn: '7825665993', c: 'linear-gradient(135deg,#0ea5e9,#3b82f6)', deal: '29.07.2026 16:00', date: '01.12.2025', resp: 'Пётр Васильев', path: '' },
    { n: 'ПМТ 96, ООО', inn: '6658021546', c: 'linear-gradient(135deg,#a855f7,#ec4899)', deal: '25.07.2026 11:00', date: '22.11.2025', resp: 'Дмитрий Орлов', path: 'Реклама › Сайт' },
    { n: 'ООО "ТРИА СТРОЙ"', inn: '7710901234', c: 'linear-gradient(135deg,#6366f1,#3b82f6)', deal: '20.07.2026 10:00', date: '10.11.2025', resp: 'Общие компании', path: '' },
  ],

  contacts: [
    { n: 'Алексей Кузнецов', phone: '+7 916 234-56-78', c: 'linear-gradient(135deg,#6366f1,#a855f7)', deal: '14.09.2026 14:00', date: '23.06.2026', resp: 'Анна Ковалёва', path: '' },
    { n: 'Марина Волкова', phone: '+7 903 118-24-90', c: 'linear-gradient(135deg,#ec4899,#a855f7)', deal: '27.08.2026 16:00', date: '23.06.2026', resp: 'Пётр Васильев', path: '' },
    { n: 'Дмитрий Соколов', phone: '+7 925 447-19-03', c: 'linear-gradient(135deg,#3b82f6,#6366f1)', deal: '04.08.2026 16:00', date: '17.06.2026', resp: 'Дмитрий Орлов', path: '' },
    { n: 'Екатерина Морозова', phone: '+7 909 673-45-12', c: 'linear-gradient(135deg,#10b981,#059669)', deal: '04.08.2026 14:00', date: '10.06.2026', resp: 'Общие контакты', path: 'Прочий трафик › Звонок' },
    { n: 'Сергей Лебедев', phone: '+7 917 802-56-34', c: 'linear-gradient(135deg,#f59e0b,#ef4444)', deal: '03.08.2026 16:00', date: '09.06.2026', resp: 'Ольга Зайцева', path: '' },
    { n: 'Ольга Новикова', phone: '+7 926 331-90-67', c: 'linear-gradient(135deg,#8b5cf6,#a855f7)', deal: '30.07.2026 16:00', date: '08.06.2026', resp: 'Анна Ковалёва', path: '' },
    { n: 'Иван Петров', phone: '+7 905 214-77-45', c: 'linear-gradient(135deg,#0ea5e9,#3b82f6)', deal: '29.07.2026 16:00', date: '08.06.2026', resp: 'Пётр Васильев', path: 'Прочий трафик › Звонок' },
    { n: 'Наталья Зайцева', phone: '+7 916 558-03-21', c: 'linear-gradient(135deg,#a855f7,#ec4899)', deal: '28.05.2026 11:00', date: '28.05.2026', resp: 'Дмитрий Орлов', path: '' },
    { n: 'Павел Орлов', phone: '+7 903 640-12-88', c: 'linear-gradient(135deg,#6366f1,#3b82f6)', deal: '14.05.2026 10:00', date: '14.05.2026', resp: 'Общие контакты', path: '' },
  ],

  processes: [
    { id: 0, n: 'Договор поставки с ТехноСфера', ic: 'fa-file-contract', c: 'linear-gradient(135deg,#6366f1,#a855f7)', sum: '₽ 2,1М', step: 'Шаг 2/4 · ваша подпись', from: 'Анна Ковалёва', st: 'На согласовании', stc: 'background:rgba(245,158,11,.35);color:#fbbf24' },
    { id: 1, n: 'Договор с ГринЛайт', ic: 'fa-file-contract', c: 'linear-gradient(135deg,#10b981,#059669)', sum: '₽ 8,9М', step: 'Завершён · подписан КЭП', from: 'Анна Ковалёва', st: 'Завершён', stc: 'background:rgba(52,211,153,.35);color:#34d399' },
    { id: 2, n: 'Согласование счёта №1023 (Ромашка)', ic: 'fa-file-invoice', c: 'linear-gradient(135deg,#a855f7,#ec4899)', sum: '₽ 5,4М', step: 'Шаг 2/3 · у юриста', from: 'Вы', st: 'В работе', stc: 'background:rgba(99,102,241,.35);color:#818cf8' },
    { id: 3, n: 'Договор с Финмакс', ic: 'fa-file-signature', c: 'linear-gradient(135deg,#f59e0b,#ef4444)', sum: '₽ 14,5М', step: 'Просрочен 1 дн', from: 'Дмитрий Орлов', st: 'Просрочен', stc: 'background:rgba(239,68,68,.35);color:#f87171' },
  ],

  processSteps: [
    { step: 'Создание', done: true, who: 'Анна Ковалёва', role: 'Инициатор', ic: 'АК', bg: 'linear-gradient(135deg,#f59e0b,#ef4444)' },
    { step: 'Согласование (юрист)', done: true, who: 'Максим Титов', role: 'Юрист', ic: 'МТ', bg: 'linear-gradient(135deg,#6366f1,#a855f7)' },
    { step: 'Согласование (руководитель)', done: true, who: 'Пётр Васильев', role: 'CEO', ic: 'ПВ', bg: 'linear-gradient(135deg,#8b5cf6,#ec4899)' },
    { step: 'Подпись', done: false, current: true, who: 'Пётр Васильев', role: 'Ген. директор', ic: 'ПВ', bg: 'linear-gradient(135deg,#ec4899,#f59e0b)' },
    { step: 'Уведомление', done: false, who: 'Автоматически', role: 'CRM + 1С', ic: '1С', bg: 'linear-gradient(135deg,#6b7280,#4b5563)' },
  ],

  boards: {
    lanes: [
      {
        name: 'Пилот MVP', cnt: 8, open: true,
        cols: [
          [{ t: 'Полное ТЗ по продукту', bar: '#6366f1', tags: [['Эпик', 'rgba(99,102,241,.35)', '#a5b4fc']], prio: 'Средний' }],
          [{ t: 'Разработка кабинета аналитики', bar: '#f59e0b', av: 'АК', avc: 'linear-gradient(135deg,#f59e0b,#ef4444)', prio: 'Высокий' },
           { t: 'Допилить UI иконок', bar: '#34d399', av: 'АК', avc: 'linear-gradient(135deg,#f59e0b,#ef4444)', prio: 'Низкий' }],
          [{ t: 'Разработка профиля автора', bar: '#f472b6', av: 'АК', avc: 'linear-gradient(135deg,#f59e0b,#ef4444)', due: ['7д', 'rgba(239,68,68,.85)'], prio: 'Высокий' }],
          [{ t: 'Собрать MVP приложение', bar: '#34d399', avs: [['МТ', 'linear-gradient(135deg,#6366f1,#a855f7)'], ['АК', 'linear-gradient(135deg,#f59e0b,#ef4444)']], prio: 'Высокий' }]
        ]
      },
      {
        name: 'Спринт 12 · Backend', cnt: 5, open: false,
        cols: [
          [{ t: 'Настроить очереди SLA для Service Desk', bar: '#818cf8', av: 'ДО', avc: 'linear-gradient(135deg,#6366f1,#a855f7)', prio: 'Средний' }],
          [{ t: 'API интеграции с 1С и Telegram', bar: '#fbbf24', av: 'ДО', avc: 'linear-gradient(135deg,#6366f1,#a855f7)', block: true, tags: [['Заблокировано', 'rgba(239,68,68,.35)', '#f87171']], prio: 'Высокий' },
           { t: 'Автоматизация: триггер «Готово → уведомление»', bar: '#a855f7', av: 'ОЗ', avc: 'linear-gradient(135deg,#8b5cf6,#ec4899)', prio: 'Средний' }],
          [],
          [{ t: 'Настройка ролей RBAC и SSO', bar: '#34d399', av: 'МТ', avc: 'linear-gradient(135deg,#6366f1,#a855f7)', prio: 'Низкий' }]
        ]
      }
    ]
  },

  marketing: {
    campaigns: [
      { n: 'Чёрная пятница 2026', ic: 'fa-tags', c: 'linear-gradient(135deg,#6366f1,#a855f7)', ch: 'Все каналы', budget: '₽ 850К', roi: '412%', leads: '642', conv: '6.1%', st: 'Активна', stc: 'background:rgba(52,211,153,.35);color:#34d399' },
      { n: 'Welcome-цепочка новичков', ic: 'fa-hand-sparkles', c: 'linear-gradient(135deg,#34d399,#10b981)', ch: 'Email · SMS', budget: '₽ 90К', roi: '640%', leads: '318', conv: '8.4%', st: 'Активна', stc: 'background:rgba(52,211,153,.35);color:#34d399' },
      { n: 'Ретаргетинг брошенных корзин', ic: 'fa-cart-arrow-down', c: 'linear-gradient(135deg,#f59e0b,#ef4444)', ch: 'Директ · VK', budget: '₽ 420К', roi: '305%', leads: '489', conv: '5.2%', st: 'Активна', stc: 'background:rgba(52,211,153,.35);color:#34d399' },
      { n: 'Дайджест новинок · Telegram', ic: 'fa-telegram', c: 'linear-gradient(135deg,#2aabee,#1e88e5)', ch: 'Telegram', budget: '₽ 60К', roi: '210%', leads: '221', conv: '3.9%', st: 'Активна', stc: 'background:rgba(52,211,153,.35);color:#34d399' },
      { n: 'Реактивация «Спящие VIP»', ic: 'fa-heart-pulse', c: 'linear-gradient(135deg,#ec4899,#f472b6)', ch: 'WhatsApp + Email', budget: '₽ 180К', roi: '—', leads: '—', conv: '—', st: 'Черновик', stc: 'background:rgba(99,102,241,.35);color:#818cf8' },
      { n: 'День рождения клиента', ic: 'fa-cake-candles', c: 'linear-gradient(135deg,#a855f7,#ec4899)', ch: 'Email · WhatsApp', budget: '₽ 45К', roi: '—', leads: '—', conv: '—', st: 'Черновик', stc: 'background:rgba(99,102,241,.35);color:#818cf8' },
    ],
    segments: [
      { n: 'Спящие VIP', c: 'linear-gradient(135deg,#ec4899,#f472b6)', ic: 'fa-crown', cnt: '312 контактов', tags: [['LTV ₽120К+', 'rgba(236,72,153,.35)', '#f9a8d4'], ['нет покупок 45д', 'rgba(245,158,11,.35)', '#fbbf24']] },
      { n: 'Активные покупатели', c: 'linear-gradient(135deg,#34d399,#10b981)', ic: 'fa-bolt', cnt: '2 480 контактов', tags: [['покупка <30д', 'rgba(52,211,153,.35)', '#34d399'], ['open rate 60%+', 'rgba(99,102,241,.35)', '#a5b4fc']] },
      { n: 'Новые лиды (7 дней)', c: 'linear-gradient(135deg,#6366f1,#a855f7)', ic: 'fa-seedling', cnt: '847 контактов', tags: [['без сделки', 'rgba(99,102,241,.35)', '#a5b4fc'], ['welcome-цепочка', 'rgba(139,92,246,.35)', '#c4b5fd']] },
      { n: 'Lookalike лучших', c: 'linear-gradient(135deg,#a855f7,#c084fc)', ic: 'fa-users-viewfinder', cnt: '1 120 контактов', tags: [['Самостоятельный', 'rgba(99,102,241,.35)', '#a5b4fc'], ['похожесть 92%', 'rgba(52,211,153,.35)', '#34d399']] },
      { n: 'Брошенные корзины', c: 'linear-gradient(135deg,#f59e0b,#ef4444)', ic: 'fa-cart-arrow-down', cnt: '534 контакта', tags: [['корзина <24ч', 'rgba(245,158,11,.35)', '#fbbf24'], ['ретаргетинг', 'rgba(99,102,241,.35)', '#a5b4fc']] },
      { n: 'Отток (риск)', c: 'linear-gradient(135deg,#6b7280,#4b5563)', ic: 'fa-user-slash', cnt: '268 контактов', tags: [['churn 70%+', 'rgba(239,68,68,.35)', '#f87171'], ['удержание', 'rgba(52,211,153,.35)', '#34d399']] },
    ],
    channels: [
      { n: 'Email-рассылки', ic: 'fa-envelope', c: 'linear-gradient(135deg,#ec4899,#f472b6)', roi: '520%', leads: 498, pct: 96 },
      { n: 'Реклама (Директ + VK)', ic: 'fa-rectangle-ad', c: 'linear-gradient(135deg,#6366f1,#a855f7)', roi: '340%', leads: 702, pct: 88 },
      { n: 'WhatsApp', ic: 'fa-brands fa-whatsapp', c: 'linear-gradient(135deg,#25d366,#128c7e)', roi: '280%', leads: 274, pct: 64 },
      { n: 'Telegram', ic: 'fa-brands fa-telegram', c: 'linear-gradient(135deg,#2aabee,#1e88e5)', roi: '210%', leads: 221, pct: 52 },
      { n: 'SMS', ic: 'fa-comment-sms', c: 'linear-gradient(135deg,#f59e0b,#ef4444)', roi: '160%', leads: 152, pct: 40 },
    ],
  },

  hr: {
    candidates: [
      { n: 'Мария Соколова', r: 'Middle Python', av: 'МС', avc: 'linear-gradient(135deg,#ec4899,#a855f7)', score: 74, sc: 'rgba(245,158,11,.35);color:#fbbf24', src: 'hh.ru', tags: [['Python', 'rgba(99,102,241,.35)', '#a5b4fc']] },
      { n: 'Дмитрий Волков', r: 'Junior Backend', av: 'ДВ', avc: 'linear-gradient(135deg,#6366f1,#3b82f6)', score: 61, sc: 'rgba(99,102,241,.35);color:#818cf8', src: 'Карьерный сайт', tags: [['Django', 'rgba(52,211,153,.35)', '#34d399']] },
      { n: 'Ольга Новикова', r: 'Senior Python', av: 'ОН', avc: 'linear-gradient(135deg,#8b5cf6,#a855f7)', score: 88, sc: 'rgba(52,211,153,.35);color:#34d399', src: 'LinkedIn', tags: [['Python', 'rgba(99,102,241,.35)', '#a5b4fc'], ['ML', 'rgba(236,72,153,.35)', '#f9a8d4']] },
      { n: 'Екатерина Морозова', r: 'Senior Python', av: 'ЕМ', avc: 'linear-gradient(135deg,#10b981,#059669)', score: 91, sc: 'rgba(52,211,153,.35);color:#34d399', src: 'Referral', tags: [['Python', 'rgba(99,102,241,.35)', '#a5b4fc'], ['K8s', 'rgba(52,211,153,.35)', '#34d399']] },
      { n: 'Алексей Иванов', r: 'Senior Python', av: 'АИ', avc: 'linear-gradient(135deg,#6366f1,#a855f7)', score: 96, sc: 'rgba(52,211,153,.35);color:#34d399', src: 'hh.ru', tags: [['Python', 'rgba(99,102,241,.35)', '#a5b4fc'], ['Топ-кандидат', 'rgba(52,211,153,.35)', '#34d399']] },
      { n: 'Сергей Кузнецов', r: 'Senior Python', av: 'СК', avc: 'linear-gradient(135deg,#a855f7,#ec4899)', score: 93, sc: 'rgba(52,211,153,.35);color:#34d399', src: 'LinkedIn', tags: [['ждёт ответа', 'rgba(245,158,11,.35)', '#fbbf24']] },
    ],
    hireCols: [
      { name: 'Новые отклики', ic: 'fa-inbox', c: '#818cf8', idx: [0, 1] },
      { name: 'Скрининг', ic: 'fa-magnifying-glass', c: '#a855f7', idx: [2] },
      { name: 'Интервью HR', ic: 'fa-comments', c: '#f472b6', idx: [3] },
      { name: 'Интервью с рук.', ic: 'fa-user-tie', c: '#fbbf24', idx: [4] },
      { name: 'Оффер', ic: 'fa-file-signature', c: '#34d399', idx: [5] },
    ],
    vacancies: [
      { n: 'Senior Python Developer', ic: 'fa-code', c: 'linear-gradient(135deg,#6366f1,#a855f7)', dep: 'Разработка', loc: 'Москва · гибрид', cand: 32, due: 'до 30.07', prog: 75, st: 'Горит', stc: 'background:rgba(239,68,68,.35);color:#f87171' },
      { n: 'Менеджер по продажам', ic: 'fa-handshake', c: 'linear-gradient(135deg,#f59e0b,#ef4444)', dep: 'Продажи', loc: 'Удалённо', cand: 48, due: 'до 12.08', prog: 45, st: 'Открыта', stc: 'background:rgba(52,211,153,.35);color:#34d399' },
      { n: 'UX/UI Дизайнер', ic: 'fa-pen-ruler', c: 'linear-gradient(135deg,#ec4899,#f472b6)', dep: 'Продукт', loc: 'СПб · офис', cand: 27, due: 'до 20.08', prog: 60, st: 'Открыта', stc: 'background:rgba(52,211,153,.35);color:#34d399' },
      { n: 'Специалист поддержки', ic: 'fa-headset', c: 'linear-gradient(135deg,#10b981,#059669)', dep: 'Поддержка', loc: 'Удалённо', cand: 64, due: 'до 05.08', prog: 30, st: 'Массовый набор', stc: 'background:rgba(99,102,241,.35);color:#818cf8' },
    ],
    onboarding: [
      { n: 'Дмитрий Волков', role: 'Junior Backend', av: 'ДВ', c: 'linear-gradient(135deg,#6366f1,#3b82f6)', mentor: 'Дмитрий Орлов', day: 'День 5 / 90', stc: 'background:rgba(245,158,11,.35);color:#fbbf24',
        steps: [{ l: 'Оффер', d: 1 }, { l: 'Документы', d: 1 }, { l: 'Доступы', cur: 1 }, { l: 'Welcome', cur: 0 }, { l: 'Обучение', cur: 0 }, { l: 'Аттестация', cur: 0 }] },
    ],
    ipr: [
      { n: 'Дмитрий Орлов', role: 'Менеджер', goal: 'Руководитель', av: 'ДО', c: 'linear-gradient(135deg,#6366f1,#a855f7)', skills: [['Продажи', 85, '#34d399'], ['Менторинг', 60, '#f59e0b'], ['Стратегия', 40, '#f87171']] },
      { n: 'Ольга Зайцева', role: 'Маркетинг', goal: 'Head of Marketing', av: 'ОЗ', c: 'linear-gradient(135deg,#8b5cf6,#ec4899)', skills: [['Performance', 78, '#34d399'], ['Стратегия', 52, '#f59e0b'], ['Управление', 35, '#f87171']] },
    ],
  },

  messenger: {
    chats: [
      { id: 0, name: 'Мария Карнаух', av: 'МК', c: 'linear-gradient(135deg,#6b7280,#4b5563)', time: 'Вт', prev: 'Я с вами в команде!', unread: 0, sub: 'В сети',
        msgs: [
          { t: 'Привет! Рада присоединиться к команде!', w: 'Мария Карнаух', out: false, tm: '10:20' },
          { t: 'Добро пожаловать, Мария! Если будут вопросы — пиши.', out: true, tm: '10:22' },
          { t: 'Спасибо! Я с вами в команде!', w: 'Мария Карнаух', out: false, tm: '10:38' },
        ] },
      { id: 1, name: 'Общий чат', av: '', ic: 'fa-comments', c: 'linear-gradient(135deg,#6366f1,#a855f7)', time: 'Вт', prev: 'Приглашение отправлено.', unread: 0, sub: '27 участников',
        msgs: [
          { date: 'Среда, 20 мая' },
          { sys: 'Пользователь пригласил нового участника.', tm: '17:50' },
          { date: 'Сегодня' },
          { t: 'Коллеги, обновлён график задач.', out: true, tm: '09:30' },
          { t: 'Принято, спасибо!', w: 'Дмитрий Орлов', out: false, tm: '09:45' },
        ] },
      { id: 2, name: 'Компания: Ромашка ООО', av: '', ic: 'fa-building', c: 'linear-gradient(135deg,#34d399,#10b981)', time: '23 июн', prev: 'Обсудить условия оплаты', unread: 1, sub: '5 участников',
        msgs: [
          { t: 'Отправили КП на согласование.', out: true, tm: '14:00' },
          { t: 'Спасибо! Обсудим на следующей неделе.', w: 'Игорь Смирнов', out: false, tm: '15:30' },
        ] },
      { id: 3, name: 'Компания: ГринЛайт', av: '', ic: 'fa-building', c: 'linear-gradient(135deg,#a855f7,#ec4899)', time: '22 июн', prev: 'Договор подписан', unread: 0, sub: '4 участника',
        msgs: [
          { t: 'Договор подписан. Начинаем внедрение.', out: true, tm: '11:00' },
          { t: 'Отлично! Назначьте дедлайн.', w: 'Олег Кузнецов', out: false, tm: '11:20' },
        ] },
      { id: 4, name: 'Игорь Новиков', av: 'ИН', c: 'linear-gradient(135deg,#8b5cf6,#ec4899)', time: '14 июн', prev: 'Не беспокоить', unread: 0, sub: 'Не в сети',
        msgs: [
          { t: 'Нужна помощь с отчётом по рекламе.', w: 'Игорь Новиков', out: false, tm: '16:00' },
        ] },
    ],
  },
};
