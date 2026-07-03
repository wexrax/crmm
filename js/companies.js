function renderCompanies(filter) {
  const el = document.getElementById('companiesTable');
  if (!el) return;
  const f = (filter || '').toLowerCase();
  const rows = APP_DATA.companies.filter(c => {
    if (!f) return true;
    return c.n.toLowerCase().includes(f) || c.inn.includes(f);
  });
  el.innerHTML = '<table><thead><tr><th><div class="tbl-chk"></div></th><th>Компания</th><th>Дела</th><th>Путь</th><th>Ответственный</th><th>Дата</th><th>ИНН</th><th>Статус</th></tr></thead><tbody>' +
    rows.map(c => {
      const pathHtml = c.path ? '<td><span style="color:#34d399;font-size:11.5px"><i class="fa-solid fa-circle-check"></i> ' + c.path + '</span></td>' : '<td></td>';
      return '<tr onclick="showToast(\'Открываю: ' + c.n.replace(/'/g, '') + '\', \'fa-building\')">' +
        '<td><div class="tbl-chk"></div></td>' +
        '<td><div class="tbl-cell"><div class="tbl-cell-icon" style="background:' + c.c + '"><i class="fa-solid fa-building"></i></div><div><div class="tbl-cell-name">' + c.n + (c.inn !== '—' ? ' <span style="color:var(--text-faint);font-weight:400">ИНН ' + c.inn + '</span>' : '') + '</div><div class="tbl-cell-sub">Клиент</div></div></div></td>' +
        '<td><span class="tbl-link">' + c.deal + '<b>Связаться с клиентом</b></span></td>' +
        pathHtml +
        '<td><span style="color:var(--blue)"><i class="fa-solid fa-circle-user"></i> ' + c.resp + '</span></td>' +
        '<td>' + c.date + '</td>' +
        '<td>' + c.inn + '</td>' +
        '<td><span class="badge2" style="background:rgba(52,211,153,.18);color:#34d399">Квалифицирован</span></td>' +
        '</tr>';
    }).join('') +
    '</tbody></table>';
}

function filterCompanies(v) {
  renderCompanies(v);
}

function renderContacts(filter) {
  const el = document.getElementById('contactsTable');
  if (!el) return;
  const f = (filter || '').toLowerCase();
  const rows = APP_DATA.contacts.filter(c => {
    if (!f) return true;
    return c.n.toLowerCase().includes(f) || c.phone.includes(f);
  });
  el.innerHTML = '<table><thead><tr><th><div class="tbl-chk"></div></th><th>Контакт</th><th>Дела</th><th>Путь</th><th>Ответственный</th><th>Дата</th><th>Телефон</th><th>Статус</th></tr></thead><tbody>' +
    rows.map(c => {
      const pathHtml = c.path ? '<td><span style="color:#34d399;font-size:11.5px"><i class="fa-solid fa-circle-check"></i> ' + c.path + '</span></td>' : '<td></td>';
      return '<tr onclick="showToast(\'Открываю: ' + c.n.replace(/'/g, '') + '\', \'fa-user\')">' +
        '<td><div class="tbl-chk"></div></td>' +
        '<td><div class="tbl-cell"><div class="tbl-cell-icon" style="background:' + c.c + '"><i class="fa-solid fa-user"></i></div><div><div class="tbl-cell-name">' + c.n + '</div><div class="tbl-cell-sub">Физлицо · Клиент</div></div></div></td>' +
        '<td><span class="tbl-link">' + c.deal + '<b>Связаться с клиентом</b></span></td>' +
        pathHtml +
        '<td><span style="color:var(--blue)"><i class="fa-solid fa-circle-user"></i> ' + c.resp + '</span></td>' +
        '<td>' + c.date + '</td>' +
        '<td>' + c.phone + '</td>' +
        '<td><span class="badge2" style="background:rgba(52,211,153,.18);color:#34d399">Квалифицирован</span></td>' +
        '</tr>';
    }).join('') +
    '</tbody></table>';
}

function filterContacts(v) {
  renderContacts(v);
}
