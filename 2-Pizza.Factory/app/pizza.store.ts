import { MargheritaPizza } from "./pizze/margherita.pizza";
import { PepperoniPizza } from "./pizze/pepperoni.pizza";
import { Pizza } from "./pizze/pizza";
import { VeggiePizza } from "./pizze/veggie.pizza";

export class PizzaStore {
  orderPizza(type: string): string {
    let pizza: Pizza;

    if (type === "margherita") {
      pizza = new MargheritaPizza();
    } else if (type === "pepperoni") {
      pizza = new PepperoniPizza();
    } else if (type === "veggie") {
      pizza = new VeggiePizza();
    } else {
      throw new Error("Unknown pizza type");
    }

    pizza.prepare();
    pizza.bake();
    pizza.cut();
    pizza.box();

    return `Ordered a ${pizza.getName()}`;
  }
}
