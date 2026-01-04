import { Pizza } from "./pizza";

export class NapoliStyleVeggiePizza implements Pizza {
  getName(): string {
    return "Veggie Pizza";
  }

  prepare(): void {
    console.log("Preparing Veggie Pizza");
  }

  bake(): void {
    console.log("Baking Veggie Pizza");
  }

  cut(): void {
    console.log("Cutting Veggie Pizza");
  }

  box(): void {
    console.log("Boxing Veggie Pizza");
  }
}

export class ChicagoStyleVeggiePizza implements Pizza {
  getName(): string {
    return "Chicago Veggie Pizza";
  }

  prepare(): void {
    console.log("Preparing Chicago Veggie Pizza");
  }

  bake(): void {
    console.log("Baking Chicago Veggie Pizza");
  }

  cut(): void {
    console.log("Cutting Chicago Veggie Pizza");
  }

  box(): void {
    console.log("Boxing Chicago Veggie Pizza");
  }
}
