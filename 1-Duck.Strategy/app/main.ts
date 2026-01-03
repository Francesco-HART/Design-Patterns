import { Mallard } from "./Mallard.duck";

function main() {
  console.log("Duck Example");

  // Create a Mallard duck
  const mallard = new Mallard();
  mallard.display();
  mallard.swim();
}
main();
