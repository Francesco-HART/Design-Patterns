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

## 🎯 Objectif du refactoring

Tu dois refactorer pour que :

- le **code métier dépende d’abstractions**, pas de classes concrètes (DIP)
- on puisse brancher différentes implémentations de stockage :
  - `LocalStorage`
  - `S3Storage`
  - `InMemoryStorage` (tests)
- le module **Chat** n’ait **aucune connaissance** de la technologie de stockage
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

## Plan d'action suggéré

Steps:

1. Identifie les responsabilités dans le code actuel.
   Donc faire un interface IStorageService avec les méthodes nécessaires (upload, download, delete).
2. Implémente plusieurs classes concrètes qui implémentent IStorageService (S3StorageService, SFTPStorageService, WebDavStorageService).
3. Modifier uploader et ne passer que le Storage, ce n'est plus à lui de décider comment stocker le fichier.
4. Retirer la creation du storage dans le post et le faire via une factory
5. Créer une interface IScanner avec une méthode scan(filePath: string): Promise<boolean>.
6. Implémente deux classes concrètes qui implémentent IScanner (ThreatProtectScanner, SynergySecurityScanner).
7. Modifier UploadRequest pour accepter un scanner en paramètre.
8. Preview generator, crée un GeneratepreviewInterface pour les documents , vidéos et images. Crée une factory pour créer les bons generateurs en fonction du type de fichier.
9. Mettre a jour upladRequest pour utiliser la factory de preview generator.
