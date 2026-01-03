import { MargheritaPizza } from "@/pizze/margherita.pizza";
import { PepperoniPizza } from "@/pizze/pepperoni.pizza";
import { Pizza } from "@/pizze/pizza";
import { VeggiePizza } from "@/pizze/veggie.pizza";
import { PizzaFactory } from "./factory";

export class SimplePizzaFactory implements PizzaFactory {
  constructor() {}

  creatingPizza(type: string) {
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

    return pizza;
  }
}
