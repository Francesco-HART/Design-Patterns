import { Pizza } from "./pizza";

export class ChicagoPepperoniPizza extends Pizza {
  constructor() {
    super();
    this.name = "Chicago Pepperoni Pizza";
  }

  cut(): void {
    console.log("Cutting Chicago Style Pepperoni Pizza into square slices");
  }
}
