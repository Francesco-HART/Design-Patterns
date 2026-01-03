import { PizzaStore } from "./pizza.store";

function main() {
  const pizzaFactory = new PizzaStore();
  const pizza = pizzaFactory.orderPizza("margherita");
  console.log(pizza);

  const pizza2 = pizzaFactory.orderPizza("pepperoni");
  console.log(pizza2);

  const pizza3 = pizzaFactory.orderPizza("veggie");
  console.log(pizza3);
}
main();
