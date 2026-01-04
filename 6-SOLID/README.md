1- Single responsibility principle (SRP)

Definition: A class should have only one reason to change, meaning it should only have one job or responsibility.

Implementation: Ensure that each class in your codebase has a single responsibility. If a class is handling multiple tasks, consider breaking it down into smaller, more focused classes.

Advantages:- Easier to understand and maintain: With a single responsibility, classes are simpler and more focused, making them easier to understand and maintain.

- Improved testability: Classes with a single responsibility are easier to test, as they have fewer dependencies and interactions.
- Reduced risk of changes: Changes to one responsibility are less likely to impact other parts of the codebase.

inconveniences:- Increased number of classes: Adhering to SRP may lead to a larger number of classes, which can make the codebase more complex.

- Potential for over-engineering: Overzealous application of SRP can lead to unnecessary abstraction
  and complexity.
- Coordination overhead: More classes may require additional coordination and communication between them.
