// Editor UI language (a BCP-47 code Sveltia understands, e.g. 'en' or 'ja').
// The kantan panel rewrites this to the site's chosen language at
// provisioning (it replaces the __KANTAN_EDITOR_LANG__ marker below).
//
// Sveltia picks its UI language from localStorage['sveltia-cms.prefs'].locale,
// falling back to the browser's language. This seeds that preference to the
// site's language WITHOUT clobbering a deliberate choice:
// - if the owner never set an editor language, seed it once;
// - if the owner keeps our seed and the site's language changes, follow it;
// - once the owner picks a language that diverges from our seed (a deliberate
//   Settings choice), stop auto-following the site language forever.
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
      // First run: the owner has no editor-language preference yet.
      prefs.locale = locale;
    } else if (prefs.kantanSeed !== undefined && prefs.locale === prefs.kantanSeed) {
      // The owner still has what we seeded — follow the site's language if it
      // changed (e.g. the owner switched the site's language in Settings).
      prefs.locale = locale;
    } else if (prefs.kantanSeed !== undefined && prefs.locale !== prefs.kantanSeed && !prefs.kantanSeedModified) {
      // The owner picked a language that diverges from our seed — a deliberate
      // Settings choice. Never auto-follow the site language again.
      prefs.kantanSeedModified = true;
    }
    prefs.kantanSeed = locale;
    localStorage.setItem(KEY, JSON.stringify(prefs));
  } catch (e) {
    /* storage unavailable — Sveltia falls back to the browser language */
  }
})();
