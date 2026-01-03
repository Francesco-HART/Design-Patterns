import { NapoliPizzaFactory } from "./pizza-factory/napoli-pizza.factory";
import { SimplePizzaFactory } from "./pizza-factory/simple-pizza.factory";
import { PizzaStore } from "./pizza.store";

function main() {
  const pizzaFactory = new NapoliPizzaFactory();
  const pizzaStore = new PizzaStore(pizzaFactory);
  const pizza = pizzaStore.orderPizza("margherita");
  console.log(pizza);

  const pizza2 = pizzaStore.orderPizza("pepperoni");
  console.log(pizza2);

  const pizza3 = pizzaStore.orderPizza("veggie");
  console.log(pizza3);
}
main();
