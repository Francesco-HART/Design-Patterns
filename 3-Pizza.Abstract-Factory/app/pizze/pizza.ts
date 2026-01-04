import {
  ThinCrustDough,
  MarinaraSauce,
  ReggianoCheese,
} from "@/ingredients/ingredients";

export abstract class Pizza {
  protected name!: string;

  abstract prepare(): void;

  bake(): void {
    console.log("Bake for 25 minutes at 350");
  }

  cut(): void {
    console.log("Cutting the pizza into diagonal slices");
  }

  box(): void {
    console.log("Place pizza in official PizzaStore box");
  }
}

export class CheesePizza extends Pizza {
  prepare(): void {
    console.log(`Preparing ${this.name}`);

    const dough = new ThinCrustDough(); // ❌ dépendance concrète
    const sauce = new MarinaraSauce();
    const cheese = new ReggianoCheese();
  }
}
