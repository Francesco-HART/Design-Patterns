import { PizzaStore } from "./pizza.store";

function main() {
  const pizzaFactory = new PizzaStore();
  const pizza = pizzaFactory.orderPizza("margherita", "NAPOLI");
  console.log(pizza);

  const pizza2 = pizzaFactory.orderPizza("pepperoni", "NAPOLI");
  console.log(pizza2);

  const pizza3 = pizzaFactory.orderPizza("veggie", "Chicago");
  console.log(pizza3);
}
main();
