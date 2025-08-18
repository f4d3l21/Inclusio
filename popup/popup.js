document.addEventListener("DOMContentLoaded", () => {
  const contrast = document.getElementById("contrast");
  const largeText = document.getElementById("largeText");
  const dysFont = document.getElementById("dysFont");
  const simplified = document.getElementById("simplified");
  const noAnimation = document.getElementById("noAnimation");

  // Charger les préférences existantes
  chrome.storage.sync.get(["contrast", "largeText", "dysFont", "simplified", "noAnimation"], (data) => {
    contrast.checked = data.contrast || false;
    largeText.checked = data.largeText || false;
    dysFont.checked = data.dysFont || false;
    simplified.checked = data.simplified || false;
    noAnimation.checked = data.noAnimation || false;
  });

  document.getElementById("save").addEventListener("click", () => {
    const prefs = {
      contrast: contrast.checked,
      largeText: largeText.checked,
      dysFont: dysFont.checked,
      simplified: simplified.checked,
      noAnimation: noAnimation.checked,
    };

    chrome.storage.sync.set(prefs, () => {
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.tabs.sendMessage(tabs[0].id, {
          action: "applyPreferences",
          data: prefs
        }, (response) => {
          if (chrome.runtime.lastError) {
            console.warn("Content script non détecté :", chrome.runtime.lastError.message);
          }
        });
      });
    });
  });
});