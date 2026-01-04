class Burger {
  constructor(
    public ingredients: string[],
    public size: "small" | "medium" | "large"
  ) {}

  describe() {
    return `A ${this.size} burger with ${this.ingredients.join(", ")}.`;
  }
}

class BurgerFactory {
  static createCheeseburger(size: "small" | "medium" | "large") {
    return new Burger(["beef patty", "cheese", "lettuce", "tomato"], size);
  }

  static createVeggieBurger(size: "small" | "medium" | "large") {
    return new Burger(["veggie patty", "lettuce", "tomato", "onion"], size);
  }

  static createBaconBurger(size: "small" | "medium" | "large") {
    return new Burger(
      ["beef patty", "bacon", "cheese", "lettuce", "tomato"],
      size
    );
  }
}

// Example usage:
const cheeseburger = BurgerFactory.createCheeseburger("medium");
console.log(cheeseburger.describe()); // A medium burger with beef patty, cheese, lettuce, tomato.

const veggieBurger = BurgerFactory.createVeggieBurger("large");
console.log(veggieBurger.describe()); // A large burger with veggie patty, lettuce, tomato, onion.

const baconBurger = BurgerFactory.createBaconBurger("small");
console.log(baconBurger.describe()); // A small burger with beef patty, bacon, cheese, lettuce, tomato.
