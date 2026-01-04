import { Subject, Observer } from "./display/interfaces";

export class WeatherData implements Subject {
  private observers: Observer[] = [];

  private temperature = 0;
  private humidity = 0;
  private pressure = 0;

  registerObserver(observer: Observer): void {
    this.observers.push(observer);
  }

  removeObserver(observer: Observer): void {
    this.observers = this.observers.filter((o) => o !== observer);
  }

  notifyObservers(): void {
    for (const observer of this.observers) {
      observer.update(this.temperature, this.humidity, this.pressure);
    }
  }

  setMeasurements(
    temperature: number,
    humidity: number,
    pressure: number
  ): void {
    this.temperature = temperature;
    this.humidity = humidity;
    this.pressure = pressure;

    this.measurementsChanged();
  }

  private measurementsChanged(): void {
    this.notifyObservers();
  }
}
