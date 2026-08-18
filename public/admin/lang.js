// Editor UI language (a BCP-47 code Sveltia understands, e.g. 'en' or 'ja').
// The kantan panel rewrites this to the site's chosen language at
// provisioning (it replaces the __KANTAN_EDITOR_LANG__ marker below).
//
// Sveltia picks its UI language from localStorage['sveltia-cms.prefs'].locale,
// falling back to the browser's language. Seeding the preference ONCE (tracked
// by the kantanLocaleApplied marker) makes the editor follow the site's
// language on first load even if a prior session left a stale locale behind;
// the owner can still change it later in Settings, which we then respect.
window.kantanSeedLocale = '__KANTAN_EDITOR_LANG__';
(function () {
  try {
    var locale = window.kantanSeedLocale;
    if (!locale || locale === '__KANTAN_EDITOR_LANG__') return;
    var KEY = 'sveltia-cms.prefs';
    var prefs = {};
    try {
      prefs = JSON.parse(localStorage.getItem(KEY) || '{}');
    } catch (e) {
      prefs = {};
    }
    if (!prefs.kantanLocaleApplied) {
      prefs.locale = locale;
      prefs.kantanLocaleApplied = true;
      localStorage.setItem(KEY, JSON.stringify(prefs));
    }
  } catch (e) {
    /* storage unavailable — Sveltia falls back to the browser language */
  }
})();
