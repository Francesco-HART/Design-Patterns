import { PizzaIngredientFactory } from "@/ingredients/pizza-ingredient.factory";

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
  constructor(private ingredientFactory: PizzaIngredientFactory) {
    super();
    this.name = "Cheese Pizza";
  }

  prepare(): void {
    console.log(`Preparing ${this.name}`);

    const dough = this.ingredientFactory.createDough();
    const sauce = this.ingredientFactory.createSauce();
    const cheese = this.ingredientFactory.createCheese();
  }
}
