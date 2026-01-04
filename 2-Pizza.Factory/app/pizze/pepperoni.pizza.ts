import { Pizza } from "./pizza";

export class NapoliStylePepperoniPizza implements Pizza {
  getName(): string {
    return "Pepperoni Pizza";
  }

  prepare(): void {
    console.log("Preparing Pepperoni Pizza");
  }

  bake(): void {
    console.log("Baking Pepperoni Pizza");
  }
  cut(): void {
    console.log("Cutting Pepperoni Pizza");
  }

  box(): void {
    console.log("Boxing Pepperoni Pizza");
  }
}

export class ChicagoStylePepperoniPizza implements Pizza {
  getName(): string {
    return "Pepperoni Pizza";
  }

  prepare(): void {
    console.log("Preparing Pepperoni Pizza");
  }

  bake(): void {
    console.log("Baking Pepperoni Pizza");
  }
  cut(): void {
    console.log("Cutting Pepperoni Pizza");
  }

  box(): void {
    console.log("Boxing Pepperoni Pizza");
  }
}
