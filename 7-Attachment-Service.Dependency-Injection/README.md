# 🥋 Kata — Attachment Service & Dependency Injection (DIP)

## Contexte

Nous développons une **application de chat interne** pour une entreprise.

Les utilisateurs peuvent :

- discuter dans des **threads**
- échanger en **messages privés**
- envoyer des **fichiers et images** dans les conversations

---

## Fonctionnalité : Envoi de fichiers

Les utilisateurs peuvent envoyer des **images ou fichiers** dans une conversation.

Lorsqu’un fichier est envoyé, il est traité par un service dédié appelé :

> **Attachment Service**

---

## Architecture : Attachment Service

Le **Attachment Service** est responsable de :

- stocker les fichiers
- les récupérer
- les traiter  
  _(ex : génération de preview, scan antivirus, compression, etc.)_

Le module **Chat** délègue entièrement cette responsabilité.

---

## Objectif du kata

Construire ce flux **en respectant le principe de Dependency Inversion (DIP)**  
et en utilisant **l’injection de dépendances (manuelle)**.

Ce kata est volontairement orienté :

- architecture
- testabilité
- évolutivité

---

## Problématique initiale

Le code a été écrit rapidement et présente plusieurs problèmes :

- ❌ fort couplage à des implémentations concrètes  
  _(ex : upload HTTP direct, stockage local, AWS en dur…)_

- ❌ difficile à tester  
  _(impossible de mocker facilement le stockage ou les scanners)_

- ❌ difficile à faire évoluer  
  _(ajouter un nouveau storage implique de modifier le code métier)_

---

## Nouveau besoin métier : Scan antivirus

Lorsqu’un utilisateur envoie un fichier :

> **le fichier doit obligatoirement être scanné avant d’être stocké**

### Scanner actuel

Aujourd’hui, nous utilisons un scanner antivirus appelé :

- **ThreatProtect**

### Nouveau fournisseur

Un nouveau scanner est disponible :

- **Synergy Security Scanner**

👉 Il est **meilleur techniquement** que ThreatProtect.

### Contrainte contractuelle

Malheureusement :

- le contrat avec Synergy n’est **pas encore finalisé**
- Synergy est **autorisé uniquement en environnement de développement**
- **INTERDIT en production**

| Environnement | Scanner autorisé |
| ------------- | ---------------- |
| Development   | Synergy Security |
| Production    | ThreatProtect    |

---

## Architecture actuelle (simplifiée)

Lorsqu’un utilisateur envoie un fichier :

1. le fichier est transmis au **Attachment Service**
2. ce service gère :
   - l’upload
   - le stockage
   - la récupération
   - les traitements (preview, scan, etc.)

Par défaut, les fichiers sont stockés sur **Amazon S3 (AWS)**.

---

## ⚠️ Nouvelle contrainte métier : stockage

Tous les clients **n’acceptent pas AWS S3**.

Selon l’entreprise cliente, le stockage peut être :

- AWS S3
- SFTP interne
- WebDAV
- un stockage propriétaire

👉 **Le choix du stockage dépend désormais du client.**

---

## 🔍 Problématique — Preview Generation

### Contexte métier

Lorsqu’un utilisateur envoie un fichier, une **preview** doit être générée afin de :

- afficher une miniature dans le chat
- éviter de charger le fichier complet côté client
- offrir une expérience utilisateur homogène

Cependant, **la manière de générer une preview dépend du type de fichier**.

---

## 📂 Types de fichiers à gérer

Dans ce kata, **trois grandes familles de fichiers doivent être prises en charge**.

### 🖼️ Images

Exemples :

- `image/png`
- `image/jpeg`
- `image/gif`

La preview consiste à :

- redimensionner l’image (_scaling_)
- respecter le ratio
- produire une image de taille maximale définie

---

### 🎥 Vidéos

Exemples :

- `video/mp4`
- `video/avi`
- `video/h264`

La preview consiste à :

- extraire une frame de la vidéo
- générer une image représentative

---

### 📄 Documents

Exemples :

- `application/pdf`
- `application/vnd.openxmlformats-officedocument.wordprocessingml.document`
- `text/plain`

La preview consiste à :

- rendre une page ou un aperçu du document
- générer une image ou un fichier de preview

---

## 🎯 Objectif du refactoring

Tu dois refactorer pour que :

- le **code métier dépende d’abstractions**, pas de classes concrètes (DIP)
- on puisse brancher différentes implémentations de stockage :
  - `LocalStorage`
  - `S3Storage`
  - `InMemoryStorage` (tests)
- le module **Chat** n’ait **aucune connaissance** :
  - de la technologie de stockage
  - du fournisseur antivirus
  - du type de preview générée
- le scanner antivirus soit **interchangeable**
- l’environnement (dev / prod) **n’influence pas le code métier**

---

## Critères de réussite

✅ Tu peux remplacer le storage **sans modifier `ChatService`**  
✅ Tu peux tester `ChatService` **sans réseau ni filesystem**  
✅ Les couches haut niveau dépendent **d’interfaces / abstractions**  
✅ Ajouter un nouveau storage = **ajouter une classe**, pas modifier le métier  
✅ Le choix du scanner est fait **à l’extérieur du service**

---

## Ce que ce kata doit t’apprendre

- Le stockage est un **détail d’infrastructure**
- Le scanner antivirus est un **détail**
- La génération de preview est un **détail**
- Le métier dépend de **contrats**, pas d’implémentations
- **Dependency Injection** permet de gérer :
  - plusieurs fournisseurs
  - plusieurs environnements
  - les tests
  - l’évolutivité

---

💡 **Indice clé**

> _Si tu dois écrire un `if (env === "production")` dans ton service métier,  
> c’est probablement que l’abstraction est au mauvais endroit._
