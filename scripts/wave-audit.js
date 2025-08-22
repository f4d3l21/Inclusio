// scripts/wave-audit.js
const fetch = require("node-fetch");

const API_KEY = process.env.WAVE_API_KEY;
const TARGET_URL = "https://www.apple.com/fr/";

async function runAudit() {
  if (!API_KEY) {
    console.error("❌ Clé API WAVE manquante.");
    process.exit(1);
  }

  const response = await fetch(`https://wave.webaim.org/api/request?key=${API_KEY}&reporttype=4&url=${TARGET_URL}`);
  const result = await response.json();

  if (!result || !result.status || result.status.success === false) {
    console.error("❌ Résultat de l’audit WAVE invalide :", JSON.stringify(result, null, 2));
    process.exit(1);
  }

  if (!result.status.resultscount || typeof result.status.resultscount.error !== 'number') {
    console.error("❌ Le champ resultscount.error est manquant ou invalide :", JSON.stringify(result.status, null, 2));
    process.exit(1);
  }

  console.log("📊 Résultat de l'audit WAVE :", JSON.stringify(result, null, 2));

  if (result.status.resultscount.error > 0) {
    console.error(`❌ ${result.status.resultscount.error} erreur(s) d'accessibilité détectée(s).`);
    process.exit(1);
  } else {
    console.log("✅ Aucun problème d’accessibilité détecté.");
  }
}

runAudit();