# Exercice – Strategy Pattern

## SimUDuck

---

## Contexte

SimUDuck est une application de simulation d’un étang contenant différents types de canards.

Une classe `Duck` sert de superclasse à toutes les espèces de canards.

---

## Problème

Une méthode `fly()` a été ajoutée à la classe `Duck`.

Or, **tous les canards ne volent pas** :

- certains sont en plastique,
- d’autres sont des leurres.

La conception actuelle entraîne donc des comportements incohérents.

---

## Objectif

Refactoriser l’application afin de :

- gérer correctement les comportements variables,
- éviter les effets de bord liés à l’héritage,
- rendre le code extensible.

Vous devez utiliser le **Strategy Pattern**.

---

## Travail demandé

1. Identifier les comportements qui varient selon le type de canard
2. Mettre en place une solution basée sur la **composition**
3. Permettre le changement de comportement à l’exécution

---

## Contraintes

- Utiliser le **Strategy Pattern**
- Ne pas dupliquer la logique métier

---

## Résultat attendu

- Un canard réel peut voler
- Un canard en plastique ne vole pas
- Le comportement de vol peut être modifié dynamiquement

---

🦆 Aucun canard en plastique ne doit voler.
