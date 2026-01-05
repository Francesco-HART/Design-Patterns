# Exercice – Factory Pattern

## Pizza Store (Part 1 & Part 2)

---

## Part 1 – Pizza Store naïf

Vous êtes propriétaire d’un **Pizza Store** à Objectville.

Pour préparer une pizza, votre application :

- crée une pizza,
- la prépare,
- la cuit,
- la coupe,
- et l’emballe.

Au départ, votre code fonctionne avec **un seul type de pizza**.

---

### Problème 1 : plusieurs types de pizzas

Rapidement, vous devez proposer plusieurs pizzas :

- Cheese Pizza
- Pepperoni Pizza

Vous ajoutez donc une logique conditionnelle pour déterminer **quel type de pizza créer** avant de lancer sa préparation.

---

### Problème 2 : évolution du menu

Vos concurrents ajoutent de nouvelles pizzas tendance :

- Clam Pizza
- Veggie Pizza

Pour rester compétitif :

- vous ajoutez ces nouvelles pizzas,
- vous retirez la Greek Pizza, qui ne se vend plus.

Conséquences :

- le code de création de pizzas doit être modifié,
- les conditions deviennent de plus en plus nombreuses,
- le code est fragile et difficile à maintenir.

---

## Objectif de la Part 1

Refactoriser la création des pizzas afin de :

- isoler la logique de création des objets,
- faciliter l’ajout ou la suppression de pizzas,
- limiter les modifications dans le reste de l’application.

---

## Part 2 – Franchise de Pizza Store

Votre Pizza Store rencontre un immense succès.

Vous décidez de **franchiser** votre concept :

- New York
- Chicago
- California

Chaque franchise doit utiliser votre **code central**, afin de garantir :

- la qualité,
- la cohérence,
- le processus de fabrication.

---

### Problème 3 : variations régionales

Chaque région propose des pizzas différentes :

- styles de pâte,
- types de fromages,
- recettes spécifiques.

Exemples :

- New York style
- Chicago style
- California style

La **structure du processus de fabrication reste la même**, mais  
les **pizzas concrètes diffèrent selon la région**.

---

## Objectif de la Part 2

Mettre en place une conception permettant :

- de conserver un processus commun de commande de pizza,
- de déléguer la création des pizzas aux franchises,
- d’ajouter facilement de nouveaux styles régionaux.

---

## Contraintes

- Le code de commande ne doit pas dépendre des classes concrètes de pizzas
- L’ajout d’un nouveau type ou style de pizza doit être localisé
- La solution doit respecter les principes **SOLID**
- La création des objets doit être clairement séparée de leur utilisation

---

🍕 **Indice**

> Centralisez ce qui est commun, déléguez ce qui varie.
