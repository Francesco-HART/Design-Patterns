import { Observer, DisplayElement, Subject } from "./interfaces";

export class CurrentConditionsDisplay implements Observer, DisplayElement {
  private temperature = 0;
  private humidity = 0;

  constructor(private weatherData: Subject) {
    weatherData.registerObserver(this);
  }

  update(temperature: number, humidity: number, pressure: number): void {
    this.temperature = temperature;
    this.humidity = humidity;
    this.display();
  }

  display(): void {
    console.log(
      `Current conditions: ${this.temperature}°C and ${this.humidity}% humidity`
    );
  }
}

export class StatisticsDisplay implements Observer, DisplayElement {
  constructor(private weatherData: Subject) {
    weatherData.registerObserver(this);
  }

  update(temperature: number, humidity: number, pressure: number): void {
    this.display();
  }

  display(): void {
    console.log("Statistics display");
  }
}

export class ForecastDisplay implements Observer, DisplayElement {
  constructor(private weatherData: Subject) {
    weatherData.registerObserver(this);
  }

  update(temperature: number, humidity: number, pressure: number): void {
    this.display();
  }

  display(): void {
    console.log("Forecast display");
  }
}
