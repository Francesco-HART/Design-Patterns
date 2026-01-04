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
    if (type === "cheese") {
      return new CheesePizza(); // ❌ pas de style injecté
    }
    throw new Error("Unknown pizza type");
  }
}
