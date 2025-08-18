// Appliquer les préférences à la page
function applyPreferences(prefs) {
  document.body.classList.toggle("inclusio-contrast", prefs.contrast);
  document.body.classList.toggle("inclusio-large-text", prefs.largeText);

  if (prefs.dysFont) {
    if (!document.getElementById("inclusio-dys-font")) {
      const link = document.createElement("link");
      link.href = "https://cdn.jsdelivr.net/npm/opendyslexic@0.1.0/OpenDyslexic.css";
      link.rel = "stylesheet";
      link.id = "inclusio-dys-font";
      document.head.appendChild(link);
    }
    document.body.classList.add("inclusio-dys-font");
  } else {
    document.body.classList.remove("inclusio-dys-font");
  }

  if (prefs.simplified) {
    const selectorsToHide = [
      "aside", "header", "footer", ".ads", ".banner", ".popup", "#sidebar", ".cookie", ".nav", ".newsletter"
    ];
    selectorsToHide.forEach(selector => {
      document.querySelectorAll(selector).forEach(el => {
        el.classList.add("inclusio-hide");
      });
    });
  } else {
    document.querySelectorAll(".inclusio-hide").forEach(el => {
      el.classList.remove("inclusio-hide");
    });
  }

  document.body.classList.toggle("inclusio-no-animation", prefs.noAnimation);
}

// Appliquer au chargement initial
chrome.storage.sync.get(["contrast", "largeText", "dysFont", "simplified", "noAnimation"], applyPreferences);

// Réagir aux messages du popup
chrome.runtime.onMessage.addListener((request) => {
  if (request.action === "applyPreferences") {
    applyPreferences(request.data);
  }
});

// Observer les changements d'URL (pour SPAs comme YouTube)
function observeUrlChangeAndReapply() {
  let currentUrl = location.href;
  new MutationObserver(() => {
    if (location.href !== currentUrl) {
      currentUrl = location.href;
      setTimeout(() => {
        chrome.storage.sync.get(["contrast", "largeText", "dysFont", "simplified", "noAnimation"], applyPreferences);
      }, 500);
    }
  }).observe(document, { subtree: true, childList: true });
}
observeUrlChangeAndReapply();