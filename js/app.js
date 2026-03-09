(function () {
  'use strict';

  const state = {
    currentStep: 1,
    selectedTemplateId: null,
    content: {}
  };

  const stepPanels = document.querySelectorAll('.step-panel');
  const stepBtns = document.querySelectorAll('.step-btn');
  const templateListEl = document.getElementById('templateList');
  const editorFormEl = document.getElementById('editorForm');
  const previewFrame = document.getElementById('previewFrame');

  function showStep(step) {
    state.currentStep = step;
    stepPanels.forEach((panel, i) => {
      const num = i + 1;
      const isActive = num === step;
      panel.classList.toggle('active', isActive);
      panel.setAttribute('aria-hidden', !isActive);
    });
    stepBtns.forEach((btn, i) => {
      btn.classList.toggle('active', i + 1 === step);
      btn.setAttribute('aria-selected', i + 1 === step);
    });
    if (step === 3) {
      syncFormToState();
      updatePreview();
    }
  }

  function renderTemplateList() {
    templateListEl.innerHTML = TEMPLATES.map(t => `
      <button type="button" class="template-card" data-template-id="${t.id}" aria-describedby="desc-${t.id}">
        <span class="template-name">${escapeHtml(t.name)}</span>
        <span id="desc-${t.id}" class="template-desc">${escapeHtml(t.description)}</span>
      </button>
    `).join('');
    templateListEl.querySelectorAll('.template-card').forEach(btn => {
      btn.addEventListener('click', () => selectTemplate(btn.dataset.templateId));
    });
  }

  function selectTemplate(id) {
    state.selectedTemplateId = id;
    state.content = {};
    const t = TEMPLATES.find(x => x.id === id);
    if (!t) return;
    t.fields.forEach(f => { state.content[f.key] = ''; });
    buildEditorForm(t);
    showStep(2);
  }

  function buildEditorForm(template) {
    editorFormEl.innerHTML = template.fields.map(f => {
      const id = 'field-' + f.key;
      const value = state.content[f.key] ?? '';
      if (f.type === 'textarea') {
        return `
          <label class="field-label" for="${id}">${escapeHtml(f.label)}</label>
          <textarea id="${id}" class="field-input field-textarea" data-key="${f.key}" placeholder="${escapeHtml(f.placeholder || '')}" rows="4">${escapeHtml(value)}</textarea>
        `;
      }
      return `
        <label class="field-label" for="${id}">${escapeHtml(f.label)}</label>
        <input type="text" id="${id}" class="field-input" data-key="${f.key}" placeholder="${escapeHtml(f.placeholder || '')}" value="${escapeHtml(value)}">
      `;
    }).join('');

    editorFormEl.querySelectorAll('.field-input').forEach(el => {
      el.addEventListener('input', () => {
        state.content[el.dataset.key] = el.value;
        if (state.currentStep === 3) updatePreview();
      });
    });
  }

  function getPreviewHtml() {
    const t = TEMPLATES.find(x => x.id === state.selectedTemplateId);
    if (!t) return '<p>テンプレートを選んで内容を入力してください。</p>';
    const d = state.content;
    const nl = (s) => (s || '').replace(/\n/g, '<br>');
    const linkify = (s) => (s || '').split('\n').filter(Boolean).map(u => u.trim()).map(u => `<a href="${escapeHtml(u)}" target="_blank" rel="noopener">${escapeHtml(u)}</a>`).join('<br>');

    if (t.id === 'simple') {
      return `<!DOCTYPE html>
<html lang="ja">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${escapeHtml(d.siteTitle || 'サイト')}</title>
<style>body{font-family:sans-serif;max-width:720px;margin:0 auto;padding:2rem;line-height:1.7;color:#333}.site-title{font-size:1.5rem;margin-bottom:0.5rem}.catchphrase{color:#666;margin-bottom:2rem}.section{margin-bottom:2rem}.section h2{font-size:1.1rem;border-bottom:1px solid #ddd;padding-bottom:0.3rem}a{color:#1967d2}</style>
</head>
<body>
  <h1 class="site-title">${escapeHtml(d.siteTitle || '')}</h1>
  <p class="catchphrase">${escapeHtml(d.catchphrase || '')}</p>
  <div class="section"><div>${nl(d.mainText)}</div></div>
  ${d.contactLabel ? `<div class="section"><h2>${escapeHtml(d.contactLabel)}</h2><div>${nl(d.contactText)}</div></div>` : ''}
</body>
</html>`;
    }

    if (t.id === 'business') {
      return `<!DOCTYPE html>
<html lang="ja">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${escapeHtml(d.siteTitle || 'サイト')}</title>
<style>body{font-family:sans-serif;max-width:720px;margin:0 auto;padding:2rem;line-height:1.7;color:#333}.site-title{font-size:1.5rem;margin-bottom:0.5rem}.catchphrase{color:#666;margin-bottom:2rem}.section{margin-bottom:2rem}.section h2{font-size:1.1rem;border-bottom:1px solid #ddd;padding-bottom:0.3rem}a{color:#1967d2}</style>
</head>
<body>
  <h1 class="site-title">${escapeHtml(d.siteTitle || '')}</h1>
  <p class="catchphrase">${escapeHtml(d.catchphrase || '')}</p>
  ${d.aboutTitle ? `<div class="section"><h2>${escapeHtml(d.aboutTitle)}</h2><div>${nl(d.aboutText)}</div></div>` : ''}
  ${d.hoursTitle ? `<div class="section"><h2>${escapeHtml(d.hoursTitle)}</h2><div>${nl(d.hoursText)}</div></div>` : ''}
  ${d.accessTitle ? `<div class="section"><h2>${escapeHtml(d.accessTitle)}</h2><div>${nl(d.accessText)}</div></div>` : ''}
  ${d.contactLabel ? `<div class="section"><h2>${escapeHtml(d.contactLabel)}</h2><div>${nl(d.contactText)}</div></div>` : ''}
</body>
</html>`;
    }

    if (t.id === 'profile') {
      return `<!DOCTYPE html>
<html lang="ja">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${escapeHtml(d.siteTitle || 'プロフィール')}</title>
<style>body{font-family:sans-serif;max-width:720px;margin:0 auto;padding:2rem;line-height:1.7;color:#333}.site-title{font-size:1.5rem;margin-bottom:0.5rem}.catchphrase{color:#666;margin-bottom:2rem}.section{margin-bottom:2rem}.section h2{font-size:1.1rem;border-bottom:1px solid #ddd;padding-bottom:0.3rem}a{color:#1967d2}</style>
</head>
<body>
  <h1 class="site-title">${escapeHtml(d.siteTitle || '')}</h1>
  <p class="catchphrase">${escapeHtml(d.catchphrase || '')}</p>
  ${d.profileTitle ? `<div class="section"><h2>${escapeHtml(d.profileTitle)}</h2><div>${nl(d.profileText)}</div></div>` : ''}
  ${d.linkTitle ? `<div class="section"><h2>${escapeHtml(d.linkTitle)}</h2><div>${linkify(d.linkText)}</div></div>` : ''}
  ${d.contactLabel ? `<div class="section"><h2>${escapeHtml(d.contactLabel)}</h2><div>${nl(d.contactText)}</div></div>` : ''}
</body>
</html>`;
    }

    return '<p>プレビューを表示できません。</p>';
  }

  function syncFormToState() {
    editorFormEl.querySelectorAll('.field-input').forEach(el => {
      state.content[el.dataset.key] = el.value;
    });
  }

  function updatePreview() {
    const html = getPreviewHtml();
    const doc = previewFrame.contentDocument;
    if (!doc) return;
    doc.open();
    doc.write(html);
    doc.close();
  }

  function escapeHtml(str) {
    if (str == null) return '';
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  function saveProject() {
    const data = {
      version: 1,
      templateId: state.selectedTemplateId,
      content: state.content,
      savedAt: new Date().toISOString()
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'site-project.json';
    a.click();
    URL.revokeObjectURL(a.href);
  }

  function loadProject(file) {
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const data = JSON.parse(reader.result);
        if (data.templateId && TEMPLATES.some(t => t.id === data.templateId)) {
          state.selectedTemplateId = data.templateId;
          state.content = data.content || {};
          const t = TEMPLATES.find(x => x.id === data.templateId);
          buildEditorForm(t);
          showStep(2);
        } else {
          alert('このファイルは対応していない形式です。');
        }
      } catch (e) {
        alert('ファイルの読み込みに失敗しました。');
      }
    };
    reader.readAsText(file);
  }

  function downloadHtml() {
    syncFormToState();
    const html = getPreviewHtml();
    const blob = new Blob([html], { type: 'text/html;charset=utf-8' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'index.html';
    a.click();
    URL.revokeObjectURL(a.href);
  }

  // Step buttons
  stepBtns.forEach((btn, i) => {
    btn.addEventListener('click', () => {
      const step = i + 1;
      if (step === 2 && !state.selectedTemplateId) return;
      showStep(step);
    });
  });

  document.getElementById('btnSaveProject').addEventListener('click', saveProject);
  document.getElementById('btnDownloadHtml').addEventListener('click', downloadHtml);
  document.getElementById('inputLoadProject').addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) loadProject(file);
    e.target.value = '';
  });

  renderTemplateList();
  showStep(1);
})();
