import { NYPizzaIngredientFactory } from "./ingredients/pizza-ingredient.factory";
import { CheesePizza, Pizza } from "./pizze/pizza";

export abstract class PizzaStore {
  orderPizza(type: string): Pizza {
    const pizza = this.createPizza(type);

    pizza.prepare();
    pizza.bake();
    pizza.cut();
    pizza.box();

    return pizza;
  }

  protected abstract createPizza(type: string): Pizza;
}

export class NYPizzaStore extends PizzaStore {
  protected createPizza(type: string): Pizza {
    const ingredientFactory = new NYPizzaIngredientFactory();

    if (type === "cheese") {
      return new CheesePizza(ingredientFactory);
    }

    throw new Error("Unknown pizza type");
  }
}
