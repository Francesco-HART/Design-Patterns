import { Pizza } from "./pizza";

export class ChicagoVeggiePizza extends Pizza {
  constructor() {
    super();
    this.name = "Chicago Veggie Pizza";
  }

  cut(): void {
    console.log("Cutting Chicago Style Veggie Pizza into square slices");
  }
}
