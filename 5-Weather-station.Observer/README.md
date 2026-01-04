Vous développez une application de surveillance météo.

L’objet WeatherData sait récupérer les mesures météo actuelles (température, humidité, pression) depuis une station météo physique.

L’application doit afficher ces données de différentes manières :

conditions actuelles

statistiques météo

prévisions

De nouveaux écrans pourront être ajoutés plus tard, et vous souhaitez que le système soit facilement extensible, sans modifier le code existant.

WeatherData ne doit pas connaître les implémentations concrètes des écrans

Les écrans doivent être mis à jour automatiquement

On doit pouvoir :

ajouter un nouvel écran

retirer un écran
👉 sans modifier WeatherData

Le code doit respecter :

Open / Closed

DIP (Dependency Inversion Principle)
