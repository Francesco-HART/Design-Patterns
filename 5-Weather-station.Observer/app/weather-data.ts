import {
  CurrentConditionsDisplay,
  StatisticsDisplay,
  ForecastDisplay,
} from "./display/display";

export class WeatherData {
  private temperature: number = 0;
  private humidity: number = 0;
  private pressure: number = 0;

  private currentDisplay: CurrentConditionsDisplay;
  private statisticsDisplay: StatisticsDisplay;
  private forecastDisplay: ForecastDisplay;

  constructor(
    currentDisplay: CurrentConditionsDisplay,
    statisticsDisplay: StatisticsDisplay,
    forecastDisplay: ForecastDisplay
  ) {
    this.currentDisplay = currentDisplay;
    this.statisticsDisplay = statisticsDisplay;
    this.forecastDisplay = forecastDisplay;
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
    this.currentDisplay.update(this.temperature, this.humidity, this.pressure);

    this.statisticsDisplay.update(
      this.temperature,
      this.humidity,
      this.pressure
    );

    this.forecastDisplay.update(this.temperature, this.humidity, this.pressure);
  }
}
