# Inclusio

"CI / CD mise en place"

# Inclusio

Inclusio est une extension de navigateur développée dans le cadre du Projet de Fin d'Études (PFE) pour le titre RNCP39583 "Expert en Développement Logiciel" à Ynov.

## 🎯 Objectif

Fournir une solution d’accessibilité universelle capable d’adapter dynamiquement l’affichage des pages web selon différents types de handicaps (visuel, moteur, cognitif…).

## ⚙️ Fonctionnalités principales

- Activation/désactivation à la volée via popup
- Profils prédéfinis (ex. : malvoyant, DYS, etc.)
- Agrandissement de texte
- Augmentation du contraste
- Suppression des distractions visuelles
- Sauvegarde des préférences utilisateur
- Intégration CI/CD avec audit accessibilité (Wave API)
- Packaging automatique (.zip) via GitHub Actions

## 🧪 Tests & Accessibilité

- Audit automatique via l’API Wave
- Test manuel avec Chrome DevTools, extension WAVE, et Axe DevTools

## 📦 Installation manuelle

1. Télécharger l’archive ZIP dans le dossier `chrome_package/`
2. Aller dans `chrome://extensions/`
3. Activer le **mode développeur**
4. Cliquer sur **Importer l’extension non empaquetée**
5. Sélectionner le dossier de l’extension décompressée

## 🚀 CI/CD (GitHub Actions)

- Vérification ESLint
- Audit via l’API Wave sur apple.com
- Génération automatique du fichier ZIP de l’extension

## 📂 Arborescence

```
inclusio/
├── .github/
│   └── workflows/
│       └── ci.yml
├── assets/
│   └── logo.png
├── node_modules/
├── popup/
│   ├── popup.css
│   ├── popup.html
│   ├── popup.js
│   ├── profiles.css
│   ├── profiles.html
│   └── profiles.js
├── scripts/
│   └── wave-audit.js
├── styles/
│   └── style.css
├── .gitignore
├── content_script.js
├── eslint.config.js
├── manifest.json
├── package-lock.json
├── package.json
└── README.md
```

## 👨‍💻 Auteur

Projet réalisé par **f4d3l21**

