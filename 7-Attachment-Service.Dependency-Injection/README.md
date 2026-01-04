🥋 Kata — Attachment Service & Dependency Injection (DIP)
Contexte

On développe une application de chat interne pour une entreprise.
Les utilisateurs peuvent discuter dans des threads ou en messages privés.

Fonctionnalité : envoyer des fichiers

Les utilisateurs peuvent aussi envoyer des images / fichiers dans une conversation.

Architecture : Attachment Service

Quand un utilisateur envoie un fichier, celui-ci est uploadé vers un service dédié : Attachment Service.
Ce service est responsable de :

stocker les fichiers,

les récupérer,

les traiter (ex: thumbnails, scan, compression…).

Objectif du kata

On veut construire tout ce flux en respectant DIP et en utilisant Dependency Injection (injection manuelle).

Problématique

Actuellement, l’équipe a codé vite, et le code est devenu :

couplé à une implémentation concrète (ex: upload HTTP direct, stockage local, etc.)

difficile à tester (pas possible de mocker facilement)

difficile à faire évoluer (ajouter un autre storage = modifier le code métier)

## Architecture actuelle

Lorsqu’un utilisateur envoie un fichier :

le fichier est transmis à un Attachment Service

ce service est responsable de :

l’upload

le stockage

la récupération

le traitement (preview, scan, etc.)

Par défaut, les fichiers sont stockés sur Amazon S3 (AWS).

⚠️ Nouvelle contrainte métier

Tous les clients n’acceptent pas AWS S3.

Selon l’entreprise cliente, le stockage peut être :

AWS S3

SFTP interne

WebDAV

un stockage propriétaire

👉 Le stockage dépend maintenant du client.

## 👉 Tu dois refactorer pour que :

le code métier dépende d’abstractions, pas de classes concrètes (DIP)

on puisse brancher différentes implémentations :

LocalStorage

S3Storage

InMemoryStorage (tests)

le module “Chat” n’ait aucune connaissance de la techno de stockage

Critères de réussite

✅ Tu peux remplacer le storage sans modifier le ChatService
✅ Tu peux tester ChatService sans réseau / sans filesystem
✅ Ton code respecte DIP : les “hauts niveaux” dépendent d’abstractions
✅ Ajouter un nouveau storage = ajouter une classe, pas modifier le métier (OCP-friendly)
