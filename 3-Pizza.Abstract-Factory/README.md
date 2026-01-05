# Exercice – Abstract Factory Pattern

## Objectville Pizza Store

---

## Contexte

Dans la conception actuelle de **Objectville Pizza Store**, la création des pizzas
a déjà été améliorée grâce au **Factory Method Pattern**.

Cette refactorisation a permis de :

- supprimer les dépendances directes aux classes concrètes dans `orderPizza()`,
- déléguer la création des pizzas aux sous-classes régionales,
- mieux respecter les principes de conception orientée objet.

---

## Problème : dépendances aux classes concrètes

Même après l’introduction du Factory Method, le système reste **fortement dépendant**
des classes concrètes de pizzas.

Lorsque vous instanciez directement un objet, vous dépendez de sa **classe concrète**.

Dans la version initiale du `PizzaStore` :

- les pizzas étaient créées directement dans `orderPizza()`,
- chaque nouveau type de pizza nécessitait une modification du code existant,
- l’abstraction `Pizza` n’apportait que peu de bénéfices.

---

## Amélioration avec Factory Method

Grâce au Factory Method :

- la création des pizzas est déplacée hors de `orderPizza()`,
- les sous-classes décident quel type de pizza instancier,
- le code devient plus flexible et plus extensible.

La conception globale du Pizza Store est désormais solide et respecte mieux les
principes **Open / Closed** et **Single Responsibility**.

---

## Nouveau problème : les ingrédients

Le succès d’Objectville Pizza repose sur un point clé :

> **des ingrédients frais et de qualité**

Cependant, vous découvrez que certaines franchises :

- respectent le processus de fabrication,
- mais utilisent des ingrédients de moindre qualité pour réduire les coûts.

À long terme, cela met en danger la **marque Objectville**.

---

## Objectif métier

Vous décidez donc de :

- centraliser la production des ingrédients,
- garantir leur qualité,
- et les fournir directement aux franchises.

---

## Problème des variations régionales

Les franchises sont situées dans différentes régions :

- New York
- Chicago
- bientôt California, puis d’autres villes

Or, les ingrédients varient selon la région :

- le fromage n’est pas le même,
- la sauce n’est pas la même,
- la pâte n’est pas la même.

👉 **Un ingrédient “sauce tomate” à New York n’est pas le même qu’à Chicago.**

---

## Familles d’objets

Chaque région utilise une **famille cohérente d’ingrédients** :

- pâte
- sauce
- fromage
- garnitures

Ces ingrédients doivent :

- être compatibles entre eux,
- être utilisés ensemble,
- varier en bloc selon la région.

---

## Problème de conception actuel

Prenons l’exemple de `CheesePizza` :

- elle dépend directement de classes concrètes d’ingrédients,
- elle est implicitement liée à une région (ex : New York),
- créer une `ChicagoStyleCheesePizza` implique de dupliquer du code,
- l’ajout d’une nouvelle région nécessite de modifier les classes existantes.

Conséquences :

- violation du principe **Open / Closed**,
- duplication de code,
- le `PizzaStore` ne contrôle pas réellement le style des pizzas,
- les dépendances aux classes concrètes persistent.

---

## Objectif de l’exercice

Mettre en place une conception permettant :

- de gérer **des familles d’ingrédients**,
- de garantir la cohérence régionale des pizzas,
- d’éliminer les dépendances aux classes concrètes,
- de permettre l’ajout de nouvelles régions sans modifier le code existant.

Vous devez utiliser le **Abstract Factory Pattern**.

---

## Contraintes

- Le code métier ne doit pas dépendre de classes concrètes d’ingrédients
- Les ingrédients doivent être fournis par une abstraction
- Chaque région doit fournir une famille complète d’ingrédients
- Le design doit respecter les principes **SOLID**

---

🍕 **Indice**

> Pensez en termes de _familles d’objets liés entre eux_.
