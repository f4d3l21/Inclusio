document.addEventListener("DOMContentLoaded", () => {
  const contrast = document.getElementById("contrast");
  const textSizeSlider = document.getElementById("textSizeSlider");
  const textSizeValue = document.getElementById("textSizeValue");
  const dysFont = document.getElementById("dysFont");
  const simplified = document.getElementById("simplified");
  const noAnimation = document.getElementById("noAnimation");
  const keyboardNav = document.getElementById("keyboardNav");

  chrome.storage.sync.get(["contrast", "textSize", "dysFont", "simplified", "noAnimation", "keyboardNav"], (data) => {
    contrast.checked = data.contrast || false;
    textSizeSlider.value = data.textSize || 100;
    textSizeValue.textContent = `${textSizeSlider.value}%`;
    dysFont.checked = data.dysFont || false;
    simplified.checked = data.simplified || false;
    noAnimation.checked = data.noAnimation || false;
    keyboardNav.checked = data.keyboardNav || false;
    if (keyboardNav.checked) {
      document.body.classList.add("inclusio-keyboard-nav");
    }
  });

  textSizeSlider.addEventListener("input", () => {
    textSizeValue.textContent = `${textSizeSlider.value}%`;
    document.getElementById("previewBox").style.fontSize = `${textSizeSlider.value}%`;
  });

  document.getElementById("save").addEventListener("click", () => {
    const prefs = {
      contrast: contrast.checked,
      textSize: parseInt(textSizeSlider.value),
      dysFont: dysFont.checked,
      simplified: simplified.checked,
      noAnimation: noAnimation.checked,
      keyboardNav: keyboardNav.checked,
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
    if (keyboardNav.checked) {
      document.body.classList.add("inclusio-keyboard-nav");
    } else {
      document.body.classList.remove("inclusio-keyboard-nav");
    }
  });

  const profileBtn = document.getElementById("profileBtn");
  if (profileBtn) {
    profileBtn.addEventListener("click", () => {
      window.location.href = "profiles.html";
    });
  }
});