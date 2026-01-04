import { NapoliFrittaPizza } from "./pizze/fritta.pizza";
import { NapoliMargheritaPizza } from "./pizze/margherita.pizza";
import { ChicagoPepperoniPizza } from "./pizze/pepperoni.pizza";
import { Pizza } from "./pizze/pizza";
import { ChicagoVeggiePizza } from "./pizze/veggie.pizza";

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

export class NapoliPizzaStoreFactory extends PizzaStore {
  protected createPizza(type: string): Pizza {
    let pizza: Pizza;
    if (type === "margherita") {
      pizza = new NapoliMargheritaPizza();
    } else if (type === "fritta") {
      pizza = new NapoliFrittaPizza();
    } else {
      throw new Error("Unknown pizza type");
    }
    return pizza;
  }
}

export class ChicagoPizzaStoreFactory extends PizzaStore {
  protected createPizza(type: string): Pizza {
    let pizza: Pizza;

    if (type === "pepperoni") {
      pizza = new ChicagoPepperoniPizza();
    } else if (type === "veggie") {
      pizza = new ChicagoVeggiePizza();
    } else {
      throw new Error("Unknown pizza type");
    }
    return pizza;
  }
}
