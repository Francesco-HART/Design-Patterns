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

2- Open/closed principle (OCP)
Definition: Software entities (classes, modules, functions, etc.) should be open for extension but closed for modification.
Implementation: Design your classes and modules in a way that allows new functionality to be added without modifying existing code. This can be achieved through techniques like inheritance, interfaces, and composition.

Advantages:- Enhanced flexibility: New features can be added without altering existing code, reducing the risk of introducing bugs.

- Easier maintenance: Existing code remains stable, making it easier to maintain and understand.
- Promotes code reuse: Encourages the use of interfaces and abstract classes, leading to more reusable code.

inconveniences:- Initial complexity: Designing for OCP may introduce additional complexity upfront, as it requires careful planning and abstraction.

- Potential performance overhead: Using abstractions like interfaces and inheritance may introduce performance overhead in some cases.
- Learning curve: Developers may need to learn new design patterns and principles to effectively implement OCP

3- Liskov substitution principle (LSP)
Definition: Subtypes must be substitutable for their base types without altering the correctness of the program.
Implementation: Ensure that derived classes can be used in place of their base classes without causing unexpected behavior. This involves adhering to the contracts defined by the base class and not violating any invariants.

Advantages:- Improved code reliability: Ensures that derived classes behave consistently with their base classes, reducing the risk of runtime errors.

- Enhanced polymorphism: Allows for more flexible and interchangeable code, as derived classes can be used seamlessly in place of base classes.
- Easier maintenance: Changes to base classes can be made with confidence that derived classes will still function correctly.

inconveniences:- Design constraints: Adhering to LSP may impose constraints on the design of derived classes, limiting their flexibility.

- Increased complexity: Ensuring that derived classes conform to the base class contracts may introduce additional complexity.
- Potential for over-engineering: Overemphasis on LSP can lead to overly complex class hierarchies and abstractions.

4- Interface segregation principle (ISP)
Definition: Clients should not be forced to depend on interfaces they do not use. Instead of one general-purpose interface, create multiple specific interfaces.
Implementation: Design your interfaces to be small and focused, ensuring that clients only need to implement the methods they actually use.

Advantages:- Reduced coupling: Clients are only dependent on the methods they use, leading to lower coupling between components.

- Improved maintainability: Smaller, focused interfaces are easier to understand and maintain.
- Enhanced flexibility: Clients can implement only the interfaces they need, allowing for more tailored solutions.

inconveniences:- Increased number of interfaces: Adhering to ISP may lead to a larger number of interfaces, which can complicate the codebase.

- Potential for fragmentation: Too many small interfaces can lead to fragmentation, making it harder to manage and understand the overall design.
- Coordination overhead: More interfaces may require additional coordination and communication between components.

5- Dependency inversion principle (DIP)
Definition: High-level modules should not depend on low-level modules. Both should depend on abstractions. Abstractions should not depend on details. Details should depend on abstractions.
Implementation: Use interfaces or abstract classes to define the contracts between high-level and low-level modules. High-level modules should depend on these abstractions rather than concrete implementations.

Advantages:- Improved modularity: Decouples high-level and low-level modules, making it easier to change or replace implementations without affecting the overall system.

- Enhanced testability: Allows for easier mocking and stubbing of dependencies during testing.
- Greater flexibility: Enables the use of different implementations for low-level modules without changing high-level modules

inconveniences:- Increased complexity: Implementing DIP may introduce additional layers of abstraction, which can complicate the design.

- Learning curve: Developers may need to learn new design patterns and principles to effectively implement DIP.
- Potential performance overhead: The use of abstractions may introduce performance overhead in some cases.
