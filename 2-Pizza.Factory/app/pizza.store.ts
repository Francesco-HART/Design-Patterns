import { SimplePizzaFactory } from "./pizza-factory/simple-pizza.factory";
import { MargheritaPizza } from "./pizze/margherita.pizza";
import { PepperoniPizza } from "./pizze/pepperoni.pizza";
import { Pizza } from "./pizze/pizza";
import { VeggiePizza } from "./pizze/veggie.pizza";

export class PizzaStore {
  private factory: SimplePizzaFactory = new SimplePizzaFactory();
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
