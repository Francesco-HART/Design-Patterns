🧩 Kata — Payment Gateway Adapter
🎯 Objectif

Refactorer un service de paiement pour supprimer le couplage aux prestataires externes, en utilisant le pattern Adapter.

À la fin du kata :

le code métier ne dépend plus de Stripe / PayPal

l’ajout d’un nouveau prestataire ne nécessite aucune modification du service existant

le code respecte Open / Closed

📦 Contexte

Ton application permet d’effectuer des paiements.
Elle doit s’intégrer avec plusieurs prestataires externes (payment gateways), chacun ayant sa propre API.

Le problème :

ces APIs sont incompatibles entre elles

tu n’as pas le droit de les modifier

ton code métier commence à contenir des if / else et des conversions techniques
