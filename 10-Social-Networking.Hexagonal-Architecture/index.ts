import { Command } from "commander";

const program = new Command();

program
  .name("social-networking-hexagonal-architecture")
  .description("A social networking application using hexagonal architecture")
  .version("1.0.0")
  .addCommand(new Command("test").description("Run the tests"))
  .action(() => {
    console.log("No command specified. Use --help to see available commands.");
  });

program.parse(process.argv);

console.log("Hello world");
