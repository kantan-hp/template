// Editor UI language (a BCP-47 code Sveltia understands, e.g. 'en' or 'ja').
// The kantan panel rewrites this to the site's chosen language at
// provisioning (it replaces the __KANTAN_EDITOR_LANG__ marker below).
//
// Sveltia picks its UI language from localStorage['sveltia-cms.prefs'].locale,
// falling back to the browser's language. This seeds that preference to the
// site's language WITHOUT clobbering a deliberate choice:
// - if the owner never set an editor language, seed it once;
// - if the owner picked a language in Settings, keep it;
// - if we seeded an older site language and the owner kept it, follow the
//   site if its language changed.
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
    if (prefs.locale === undefined) {
      prefs.locale = locale;
    } else if (prefs.kantanSeed !== undefined && prefs.kantanSeed !== locale && prefs.locale === prefs.kantanSeed) {
      // We seeded an older site language and the owner didn't change it — the
      // site switched language, so the editor follows.
      prefs.locale = locale;
    }
    prefs.kantanSeed = locale;
    localStorage.setItem(KEY, JSON.stringify(prefs));
  } catch (e) {
    /* storage unavailable — Sveltia falls back to the browser language */
  }
})();
