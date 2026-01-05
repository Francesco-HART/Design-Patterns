# 🧩 Kata — Payment Gateway Adapter

---

## 🎯 Objectif

Refactorer un service de paiement afin de **supprimer le couplage aux prestataires externes** en utilisant le **Adapter Pattern**.

À la fin du kata :

- le code métier **ne dépend plus directement** de Stripe ou PayPal
- l’ajout d’un nouveau prestataire **ne nécessite aucune modification** du service existant
- le code respecte le principe **Open / Closed**

---

## 📦 Contexte

Ton application permet d’effectuer des paiements.

Elle doit s’intégrer avec **plusieurs prestataires de paiement externes**
(payment gateways), par exemple :

- Stripe
- PayPal
- et potentiellement d’autres à venir

Chaque prestataire fournit sa **propre API**, avec :

- des méthodes différentes,
- des signatures incompatibles,
- des formats de données spécifiques.

---

## ❌ Problème actuel

Les APIs des prestataires :

- sont **incompatibles entre elles**
- **ne peuvent pas être modifiées**
- exposent des détails techniques au code métier

Conséquences dans ton application :

- le service de paiement contient des `if / else`
- des conversions techniques apparaissent dans le code métier
- l’ajout d’un nouveau prestataire entraîne des modifications du code existant
- le principe **Open / Closed** n’est pas respecté

---

## 🧠 Problématique de conception

Le code métier :

- dépend directement des prestataires externes
- connaît leurs détails d’implémentation
- n’est pas protégé contre les changements d’API

👉 Le service de paiement est **trop couplé** à des systèmes externes.

---

## 🛠 Travail demandé

1. Identifier les points de couplage entre le code métier et les prestataires
2. Proposer une abstraction commune côté application
3. Adapter chaque prestataire externe à cette abstraction
4. Refactorer le service de paiement pour qu’il ne dépende plus que de l’abstraction

---

## 📐 Contraintes

- Vous devez utiliser le **Adapter Pattern**
- Les APIs externes ne doivent pas être modifiées
- Le service de paiement ne doit dépendre d’aucune classe concrète externe
- L’ajout d’un nouveau prestataire doit se faire **sans modifier le service existant**

---

## ✅ Résultat attendu

- Le service de paiement est indépendant des prestataires
- Chaque prestataire est isolé derrière un adaptateur
- Le code est extensible et maintenable
- Le respect de **Open / Closed** est garanti

---

💡 **Indice (optionnel)**

> Adaptez l’interface du prestataire à celle attendue par votre application,
> pas l’inverse.
