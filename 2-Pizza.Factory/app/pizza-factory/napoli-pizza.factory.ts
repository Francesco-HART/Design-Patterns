import { MargheritaPizza } from "@/pizze/margherita.pizza";
import { Pizza } from "@/pizze/pizza";
import { PizzaFactory } from "./factory";
import { FrittaPizza } from "@/pizze/fritta.pizza";

export class NapoliPizzaFactory implements PizzaFactory {
  creatingPizza(type: string) {
    let pizza: Pizza;
    if (type === "margherita") {
      pizza = new MargheritaPizza();
    } else if (type === "fritta") {
      pizza = new FrittaPizza();
    } else {
      throw new Error("Unknown pizza type");
    }

    return pizza;
  }
}
