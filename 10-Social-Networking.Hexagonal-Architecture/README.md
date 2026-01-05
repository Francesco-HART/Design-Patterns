## To start a new project Node.js with TypeScript and esbuild

npm init -y
npm install --save-dev typescript esbuild @types/node ts-node
npm run build

Social Networking Kata
Implement a console-based social networking application (similar to Twitter) satisfying the scenarios below.

Scenarios
Posting: Alice can publish messages to a personal timeline

> Alice -> I love the weather today
> Bob -> Damn! We lost!
> Bob -> Good game though.

Reading: Bob can view Alice’s timeline

> Alice
> I love the weather today (5 minutes ago)
> Bob
> Good game though. (1 minute ago)
> Damn! We lost! (2 minutes ago)

Following: Charlie can subscribe to Alice’s and Bob’s timelines, and view an aggregated list of all subscriptions

> Charlie -> I'm in New York today! Anyone wants to have a coffee?
> Charlie follows Alice
> Charlie wall
> Charlie - I'm in New York today! Anyone wants to have a coffee? (2 seconds ago)
> Alice - I love the weather today (5 minutes ago)

> Charlie follows Bob
> Charlie wall
> Charlie - I'm in New York today! Anyone wants to have a coffee? (15 seconds ago)
> Bob - Good game though. (1 minute ago)
> Bob - Damn! We lost! (2 minutes ago)
> Alice - I love the weather today (5 minutes ago)

General requirements
Application must use the console for input and output;
User submits commands to the application:
posting: <user name> -> <message>
reading: <user name>
following: <user name> follows <another user>
wall: <user name> wall
Don't worry about handling any exceptions or invalid commands. Assume that the user will always type the correct commands. Just focus on the sunny day scenarios.
Use whatever language and frameworks you want. (provide instructions on how to run the application)
NOTE: "posting:", "reading:", "following:" and "wall:" are not part of the command. All commands start with the user name.
IMPORTANT: Implement the requirements focusing on writing the best code you can produce.

CODE SUBMISSION: Add the code to your own Github account and send us the link.

Steps :

1. Exemple Mapping to define usecases
2. PostMessage UseCase and message to long rule englobed
3. Implementation of the first real db in file system with repository pattern
4. Implementation of view timeline usecase
5. Implementation of a express API to cal usecases
6. Implementation of EditMessage UseCase with message rules englobed in a snapshot object pattern
7. creation of a MessageText Value Object pattern
8. Make a builder pattern for Message creation
9. Organize the project with screaming architecture filestructure
10. Implementation of Following feature with FolloweeRepository and FollowUserUseCase
11. Remplacer le file storage par une BDD Prisma (sqlite) avec migration et seeding
12. Implementation of ViewWallUseCase
13. Gerer les erreur via un Object Result<T, E> pattern (exemple in file result.ts)
