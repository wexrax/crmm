function renderComms() {
  const container = document.getElementById('commsGrid');
  if (!container) return;

  container.innerHTML = APP_DATA.comms.map(c => `
    <div class="comm-card" onclick="showToast('Открываю ${c.title}…', '${c.icon}')">
      <div class="comm-card-icon" style="color:${c.color}">
        <i class="fa-solid ${c.icon}"></i>
      </div>
      <div class="comm-card-title">${c.title}</div>
      <div class="comm-card-desc">${c.desc}</div>
    </div>
  `).join('') + renderVideoCommsModule() + renderMailCommsModule();
}

function renderVideoCommsModule() {
  const people = [
    ['ИИ', 'Иванов И.', 'Хост', 'linear-gradient(135deg,#4338ca,#6366f1)'],
    ['ПП', 'Петров П.', 'Ко-хост', 'linear-gradient(135deg,#0e7490,#06b6d4)'],
    ['СС', 'Сидоров С.', 'без звука', 'linear-gradient(135deg,#7c3aed,#a78bfa)'],
    ['КА', 'Клиент А.', 'внешний', 'linear-gradient(135deg,#334155,#475569)'],
  ];

  return `
    <section class="comm-feature comm-video">
      <div class="comm-feature-copy">
        <span class="comm-feature-kicker"><i class="fa-solid fa-video"></i> Видеосвязь</span>
        <h3>Видеовстречи внутри CRM</h3>
        <p>Звонок запускается из сделки, сохраняет запись, чат и ИИ-резюме прямо в историю клиента.</p>
        <div class="comm-feature-actions">
          <button class="btn btn-primary btn-sm" onclick="showToast('Видеовстреча запущена', 'fa-video')"><i class="fa-solid fa-video"></i> Начать встречу</button>
          <button class="btn btn-sm" onclick="showToast('ИИ-резюме встречи сформировано', 'fa-wand-magic-sparkles')"><i class="fa-solid fa-wand-magic-sparkles"></i> ИИ-резюме</button>
        </div>
      </div>
      <div class="video-preview">
        <div class="video-preview-top">
          <b><i class="fa-solid fa-video"></i> NEXUS</b>
          <span>КП для ООО «Ромашка»</span>
          <em><i class="fa-solid fa-briefcase"></i> Сделка #4821</em>
        </div>
        <div class="video-tiles">
          ${people.map((p, i) => `
            <div class="video-tile ${i === 0 ? 'speaking' : ''}" style="background:${p[3]}">
              <div>${p[0]}</div>
              <span>${p[1]} · ${p[2]}</span>
            </div>
          `).join('')}
        </div>
        <div class="video-controls">
          <button><i class="fa-solid fa-microphone"></i></button>
          <button><i class="fa-solid fa-video"></i></button>
          <button><i class="fa-solid fa-desktop"></i></button>
          <button class="rec"><i class="fa-solid fa-record-vinyl"></i></button>
          <button class="leave"><i class="fa-solid fa-phone-slash"></i></button>
        </div>
      </div>
    </section>
  `;
}

function renderMailCommsModule() {
  const mails = [
    ['АС', 'Анастасия Соколова', 'Коммерческое предложение', 'CRM', '#f59e0b'],
    ['ДП', 'Дмитрий Петров', 'Согласование бюджета Q3', 'Важное', '#3b82f6'],
    ['ФА', 'Фёдор Алексеев', 'Самовывоз, счёт 1537', 'Срочно', '#ef4444'],
  ];

  return `
    <section class="comm-feature comm-mail">
      <div class="comm-feature-copy">
        <span class="comm-feature-kicker"><i class="fa-solid fa-envelope"></i> Почтовый модуль</span>
        <h3>Корпоративная почта с CRM-контекстом</h3>
        <p>Письма, общие ящики, внутреннее обсуждение, вложения и быстрые действия по сделке в одном окне.</p>
        <div class="comm-feature-actions">
          <button class="btn btn-primary btn-sm" onclick="showToast('Новое письмо — открыт редактор', 'fa-pen')"><i class="fa-solid fa-pen"></i> Написать</button>
          <button class="btn btn-sm" onclick="showToast('ИИ подготовил черновик ответа', 'fa-wand-magic-sparkles')"><i class="fa-solid fa-wand-magic-sparkles"></i> ИИ-ответ</button>
        </div>
      </div>
      <div class="mail-preview">
        <div class="mail-list-preview">
          <div class="mail-search"><i class="fa-solid fa-magnifying-glass"></i><span>Поиск по всем письмам…</span></div>
          ${mails.map((m, i) => `
            <div class="mail-mini ${i === 0 ? 'active' : ''}">
              <div style="background:${m[4]}">${m[0]}</div>
              <section><b>${m[1]}</b><span>${m[2]}</span></section>
              <em>${m[3]}</em>
            </div>
          `).join('')}
        </div>
        <div class="mail-reader-preview">
          <div class="mail-reader-title">Коммерческое предложение — поставка кабельной продукции</div>
          <p>Направляю КП согласно вашему запросу. В приложении — спецификация с ценами и сроками.</p>
          <div class="mail-ai"><i class="fa-solid fa-wand-magic-sparkles"></i><span>ИИ: предложение действует до 15 июля, возможен рамочный договор.</span></div>
        </div>
      </div>
    </section>
  `;
}
