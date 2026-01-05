# 🎂 Birthday Greetings Kata — TypeScript

---

## 🎯 Objectif pédagogique

Ce kata est un exercice de **refactoring** visant à pratiquer et comprendre les concepts suivants :

- **Inversion de dépendances (DIP)**
- **Injection de dépendances**
- **Séparation de la logique métier et de l’infrastructure**
- **Architecture hexagonale (Ports & Adapters)**

Le code initial est volontairement imparfait afin de mettre en évidence les problèmes
de couplage et de responsabilités.

---

## 📦 Contexte

L’application a pour objectif d’envoyer des messages d’anniversaire aux employés
le jour de leur anniversaire.

Le code fourni :

- fonctionne,
- passe les tests,
- mais mélange logique métier et détails techniques.

Votre rôle est de **refactorer** ce code sans en modifier le comportement observable.

---

## 🛠️ Comment démarrer

### Installation des dépendances

```bash
yarn

yarn test

```

## 🧩 Travail demandé

Refactorer le code existant afin de :

- isoler la **logique métier**
- extraire les **dépendances techniques** (email, stockage, date, etc.)
- appliquer le **Dependency Inversion Principle**
- structurer le projet selon une **architecture hexagonale**

---

## 📐 Contraintes

- Le comportement fonctionnel ne doit **pas changer**
- Les tests existants doivent **continuer à passer**
- Le code métier ne doit dépendre d’**aucune implémentation technique**
- Les dépendances doivent être **injectées via des abstractions**

---

## Kata enoncé

https://codingdojo.org/kata/birthday-greetings/
