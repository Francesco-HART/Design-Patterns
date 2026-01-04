import {
  ChicagoStyleMargheritaPizza,
  NapoliStyleMargheritaPizza,
} from "./pizze/margherita.pizza";
import {
  ChicagoStylePepperoniPizza,
  NapoliStylePepperoniPizza,
} from "./pizze/pepperoni.pizza";
import { Pizza } from "./pizze/pizza";
import {
  ChicagoStyleVeggiePizza,
  NapoliStyleVeggiePizza,
} from "./pizze/veggie.pizza";

export class PizzaStore {
  createPizza(style: string, type: string): Pizza | null {
    let pizza: Pizza | null = null;

    if (style === "NAPOLI") {
      if (type === "margherita") {
        pizza = new NapoliStyleMargheritaPizza();
      } else if (type === "pepperoni") {
        pizza = new NapoliStylePepperoniPizza();
      } else if (type === "veggie") {
        pizza = new NapoliStyleVeggiePizza();
      }
    } else if (style === "Chicago") {
      if (type === "margherita") {
        pizza = new ChicagoStyleMargheritaPizza();
      } else if (type === "pepperoni") {
        pizza = new ChicagoStylePepperoniPizza();
      } else if (type === "veggie") {
        pizza = new ChicagoStyleVeggiePizza();
      }
    } else {
      console.error("Error: invalid type of pizza");
      return null;
    }

    if (!pizza) {
      console.error("Error: invalid pizza configuration");
      return null;
    }

    pizza.prepare();
    pizza.bake();
    pizza.cut();
    pizza.box();

    return pizza;
  }

  orderPizza(style: string, type: string): Pizza | null {
    const pizza = this.createPizza(style, type);
    return pizza;
  }
}
