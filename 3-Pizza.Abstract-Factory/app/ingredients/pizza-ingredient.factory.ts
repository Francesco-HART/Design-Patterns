import {
  Dough,
  Sauce,
  Cheese,
  MarinaraSauce,
  ReggianoCheese,
  ThinCrustDough,
} from "./ingredients";

export interface PizzaIngredientFactory {
  createDough(): Dough;
  createSauce(): Sauce;
  createCheese(): Cheese;
}

export class NYPizzaIngredientFactory implements PizzaIngredientFactory {
  createDough() {
    return new ThinCrustDough();
  }

  createSauce() {
    return new MarinaraSauce();
  }

  createCheese() {
    return new ReggianoCheese();
  }
}
