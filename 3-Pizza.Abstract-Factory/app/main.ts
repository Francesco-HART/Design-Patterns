import {
  ChicagoPizzaStoreFactory,
  NapoliPizzaStoreFactory,
} from "./pizza.store";

function main() {
  const myStore = new NapoliPizzaStoreFactory();
  const chicagoStore = new ChicagoPizzaStoreFactory();

  const pizza1 = myStore.orderPizza("margherita");
  console.log(`Ordered a ${pizza1.getName()}\n`);

  const pizza2 = chicagoStore.orderPizza("veggie");
  console.log(`Ordered a ${pizza2.getName()}\n`);
}
main();
