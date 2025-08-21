document.addEventListener("DOMContentLoaded", () => {

  const profileButtons = document.querySelectorAll(".profile-button");

  profileButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const profile = button.dataset.profile;

      let prefs = {
        contrast: false,
        textSize: 100,
        dysFont: false,
        simplified: false,
        noAnimation: false,
        keyboardNav: false,
      };

      switch (profile) {
        case "visuel":
          prefs = {
            contrast: true,
            textSize: 120,
            dysFont: false,
            simplified: false,
            noAnimation: true,
            keyboardNav: true,
          };
          break;
        case "cognitif":
          prefs = {
            contrast: false,
            textSize: 120,
            dysFont: true,
            simplified: true,
            noAnimation: true,
            keyboardNav: false,
          };
          break;
        case "auditif":
          prefs = {
            contrast: false,
            textSize: 100,
            dysFont: false,
            simplified: true,
            noAnimation: true,
            keyboardNav: false,
          };
          break;
        case "moteur":
          prefs = {
            contrast: false,
            textSize: 120,
            dysFont: false,
            simplified: true,
            noAnimation: true,
            keyboardNav: true,
          };
          break;
        case "daltonien":
          prefs = {
            contrast: true,
            textSize: 100,
            dysFont: false,
            simplified: false,
            noAnimation: true,
            keyboardNav: false,
          };
          break;
        default:
          break;
      }

      chrome.storage.sync.set(prefs, () => {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
          if (tabs.length === 0) {
            console.error("❌ Aucun onglet actif trouvé.");
            return;
          }
          chrome.tabs.sendMessage(tabs[0].id, {
            action: "applyPreferences",
            data: prefs
          }, (response) => {
            window.location.href = "popup.html"; 
          });
        });
      });
    });
  });

  const saveButton = document.getElementById("saveButton");
  if (saveButton) {
    saveButton.addEventListener("click", () => {
      const prefs = {
        contrast: document.getElementById("lowVision")?.checked || false,
        textSize: document.getElementById("textSize")?.value
          ? parseInt(document.getElementById("textSize").value, 10)
          : 100,
        dysFont: document.getElementById("dyslexia")?.checked || false,
        simplified: document.getElementById("cognitive")?.checked || false,
        noAnimation: document.getElementById("epilepsy")?.checked || false,
        keyboardNav: document.getElementById("keyboard")?.checked || false,
      };

      chrome.storage.sync.set(prefs, () => {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
          if (tabs.length === 0) {
            console.error("❌ Aucun onglet actif trouvé.");
            return;
          }
          chrome.tabs.sendMessage(tabs[0].id, {
            action: "applyPreferences",
            data: prefs,
          }, (response) => {
            window.location.href = "popup.html";
          });
        });
      });
    });
  }

  const backButton = document.getElementById("backBtn");
  if (backButton) {
    backButton.addEventListener("click", () => {
      window.location.href = "popup.html";
    });
  }
});