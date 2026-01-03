import { PizzaFactory } from "./pizza-factory/factory";
import { Pizza } from "./pizze/pizza";

export class PizzaStore {
  constructor(private factory: PizzaFactory) {}
  orderPizza(type: string): string {
    let pizza: Pizza;

    pizza = this.factory.creatingPizza(type);

    pizza.prepare();
    pizza.bake();
    pizza.cut();
    pizza.box();

    return `Ordered a ${pizza.getName()}`;
  }
}
