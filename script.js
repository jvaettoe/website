// Small interactions for the static site: the email link on the home page,
// the Writing / Reading / Watching tabs on Marginalia, and the language
// switch on the poem and essay pages.

// Home: build the mailto link at runtime, so the plain address never appears
// in the HTML for spam robots to harvest.
document.querySelectorAll('[data-mail-user]').forEach((a) => {
  a.href = 'mailto:' + a.dataset.mailUser + '@' + a.dataset.mailDomain;
});

// Marginalia: switch tabs. Selected tab is dark and underlined, others grey.
const tabs = document.querySelectorAll('[role="tab"][data-tab]');
if (tabs.length) {
  const onStyle = tabs[0].getAttribute('style');
  const offStyle = tabs[1].getAttribute('style');
  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      tabs.forEach((t) => {
        const selected = t === tab;
        t.setAttribute('aria-selected', selected ? 'true' : 'false');
        t.setAttribute('style', selected ? onStyle : offStyle);
      });
      document.querySelectorAll('[data-panel]').forEach((p) => {
        p.hidden = p.dataset.panel !== tab.dataset.tab;
      });
    });
  });
}

// Lotus pond page: switch between the Chinese original and the English translation.
const langButtons = document.querySelectorAll('[data-lang-switch]');
langButtons.forEach((btn) => {
  btn.addEventListener('click', () => {
    langButtons.forEach((b) => {
      const on = b === btn;
      b.setAttribute('aria-pressed', on ? 'true' : 'false');
      b.style.color = on ? '#141413' : '#5E5D59';
      b.style.textDecoration = on ? 'underline' : 'none';
    });
    document.querySelectorAll('[data-lang-panel]').forEach((p) => {
      p.hidden = p.dataset.langPanel !== btn.dataset.langSwitch;
    });
    // Show the title in the selected language.
    const title = document.querySelector('h1[data-title-en]');
    if (title) {
      const english = btn.dataset.langSwitch === 'en';
      title.textContent = english ? title.dataset.titleEn : title.dataset.titleOrig;
      title.lang = english ? 'en' : title.dataset.langOrig;
      if (!title.dataset.styleOrig) title.dataset.styleOrig = title.getAttribute('style');
      title.setAttribute('style', title.dataset.styleOrig);
      if (english) {
        title.style.fontFamily = 'Newsreader, Georgia, serif';
        title.style.fontWeight = '400';
        title.style.letterSpacing = 'normal';
      }
    }
  });
});
