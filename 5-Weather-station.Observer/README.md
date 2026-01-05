# 🧩 Kata — Weather Station (Observer Pattern)

---

## 📦 Contexte

Vous développez une application de **surveillance météo**.

L’objet `WeatherData` est responsable de :

- récupérer les mesures météo depuis une station physique :
  - température
  - humidité
  - pression

Ces données doivent être affichées sous différentes formes :

- conditions actuelles
- statistiques météo
- prévisions

---

## ❌ Problème

L’application doit évoluer dans le temps :

- de **nouveaux écrans** pourront être ajoutés
- certains écrans pourront être retirés

Contraintes importantes :

- `WeatherData` **ne doit pas connaître** les implémentations concrètes des écrans
- les écrans doivent être **mis à jour automatiquement** lorsque les données changent
- toute modification doit être possible **sans modifier le code existant**

---

## 🎯 Objectifs

Concevoir une solution permettant de :

- notifier automatiquement les écrans lors d’un changement de données
- ajouter un nouvel écran sans modifier `WeatherData`
- retirer un écran sans modifier `WeatherData`
- respecter les principes de conception orientée objet

---

## 🛠 Travail demandé

1. Identifier les responsabilités de `WeatherData`
2. Proposer un mécanisme de notification des écrans
3. Concevoir une abstraction permettant de découpler :
   - la source de données
   - les écrans d’affichage
4. Implémenter cette conception en code

---

## 📐 Contraintes de conception

- `WeatherData` ne dépend d’aucune implémentation concrète d’écran
- Les écrans peuvent être ajoutés ou supprimés dynamiquement
- Le code doit respecter :
  - **Open / Closed**
  - **Dependency Inversion Principle (DIP)**

---

## ✅ Résultat attendu

- Les écrans sont automatiquement mis à jour
- Le système est extensible et maintenable
- Aucun couplage fort entre la source de données et les affichages

---

🌦️ **Indice (optionnel)**

> Un objet observe les changements d’un autre objet sans y être fortement couplé.
