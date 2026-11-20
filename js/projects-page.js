document.addEventListener('DOMContentLoaded', () => {
  const list = document.getElementById('projects-list');
  const dialog = document.getElementById('project-modal');
  const els = {
    icon: document.getElementById('modal-icon'),
    title: document.getElementById('modal-title'),
    desc: document.getElementById('modal-desc'),
    features: document.getElementById('modal-features'),
    featuresWrap: document.getElementById('modal-features-wrap'),
    stack: document.getElementById('modal-stack'),
    links: document.getElementById('modal-links')
  };
  let lastTrigger = null;

  renderList();
  document.getElementById('projects-count').textContent =
    `${PROJECTS.length} ${PROJECTS.length === 1 ? 'projeto' : 'projetos'}`;

  function renderList() {
    PROJECTS.forEach(project => {
      const li = document.createElement('li');
      const card = document.createElement('button');
      card.type = 'button';
      card.className = 'card project-card project-card-btn';
      card.dataset.id = project.id;
      card.setAttribute('aria-haspopup', 'dialog');

      card.innerHTML = `
        <div class="project-thumb" aria-hidden="true">
          <span class="material-symbols-outlined"></span>
        </div>
        <div class="project-body">
          <h3></h3>
          <p></p>
          <div class="chip-group"></div>
          <span class="text-link">
            <span class="material-symbols-outlined">open_in_full</span> Ver detalhes
          </span>
        </div>`;

      card.querySelector('.project-thumb .material-symbols-outlined').textContent = project.icon;
      card.querySelector('h3').textContent = project.name;
      card.querySelector('p').textContent = project.summary;
      fillChips(card.querySelector('.chip-group'), project.stack);

      card.addEventListener('click', () => openModal(project, card));
      li.appendChild(card);
      list.appendChild(li);
    });
  }

  function fillChips(container, items) {
    container.replaceChildren(...items.map(text => {
      const chip = document.createElement('span');
      chip.className = 'chip chip-small';
      chip.textContent = text;
      return chip;
    }));
  }

  function linkButton(href, icon, label, filled) {
    const a = document.createElement('a');
    a.href = href;
    a.target = '_blank';
    a.rel = 'noopener';
    a.className = `btn ${filled ? 'btn-filled' : 'btn-outlined'}`;
    a.innerHTML = '<span class="material-symbols-outlined"></span>';
    a.querySelector('span').textContent = icon;
    a.append(label);
    return a;
  }

  function openModal(project, trigger) {
    lastTrigger = trigger;
    els.icon.textContent = project.icon;
    els.title.textContent = project.name;
    els.desc.textContent = project.description;

    els.features.replaceChildren(...(project.features || []).map(text => {
      const li = document.createElement('li');
      li.textContent = text;
      return li;
    }));
    els.featuresWrap.hidden = !(project.features && project.features.length);

    fillChips(els.stack, project.stack);

    const links = [linkButton(project.repo, 'code_blocks', 'Código no GitHub', true)];
    if (project.demo) links.push(linkButton(project.demo, 'open_in_new', 'Demo', false));
    if (project.docs) links.push(linkButton(project.docs, 'description', 'Documentação', false));
    els.links.replaceChildren(...links);

    if (!dialog.open) dialog.showModal();
    document.body.classList.add('modal-open');
    history.replaceState(null, '', `#${project.id}`);
  }

  function onClosed() {
    document.body.classList.remove('modal-open');
    history.replaceState(null, '', location.pathname);
    if (lastTrigger) lastTrigger.focus();
  }

  dialog.addEventListener('close', onClosed);
  document.getElementById('modal-close').addEventListener('click', () => dialog.close());

  // Clique no backdrop fecha a modal
  dialog.addEventListener('click', (e) => {
    if (e.target === dialog) dialog.close();
  });

  // Link direto: projetos.html#<id> abre a modal do projeto
  const initial = PROJECTS.find(p => `#${p.id}` === location.hash);
  if (initial) openModal(initial, list.querySelector(`[data-id="${initial.id}"]`));
});
