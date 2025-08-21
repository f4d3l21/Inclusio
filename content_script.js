function applyPreferences(prefs) {
  document.body.classList.toggle("inclusio-contrast", prefs.contrast);

  if (prefs.textSize && !isNaN(prefs.textSize) && prefs.textSize !== 100) {
    document.querySelectorAll("body, body *").forEach(el => {
      el.style.setProperty("font-size", `${prefs.textSize}%`, "important");
    });
  } else {
    document.querySelectorAll("body, body *").forEach(el => {
      el.style.removeProperty("font-size");
    });
  }

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
  document.body.classList.toggle("inclusio-focus-visible", prefs.keyboardNav);
  if (prefs.keyboardNav) {
    document.body.setAttribute("data-inclusio-nav", "true");
  } else {
    document.body.removeAttribute("data-inclusio-nav");
  }
}

chrome.storage.sync.get(["contrast", "textSize", "dysFont", "simplified", "noAnimation", "keyboardNav"], applyPreferences);

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "applyPreferences") {
    applyPreferences(request.data);
    sendResponse({ success: true });
    return true;
  }
  if (request.action === "applyProfile") {
    const prefs = request.data;
    chrome.storage.sync.set(prefs, () => {
      applyPreferences(prefs);
      sendResponse({ success: true });
    });
    return true;
  }
});

function observeUrlChangeAndReapply() {
  let currentUrl = location.href;
  new MutationObserver(() => {
    if (location.href !== currentUrl) {
      currentUrl = location.href;
      setTimeout(() => {
        chrome.storage.sync.get(["contrast", "textSize", "dysFont", "simplified", "noAnimation", "keyboardNav"], applyPreferences);
      }, 500);
    }
  }).observe(document, { subtree: true, childList: true });
}
observeUrlChangeAndReapply();