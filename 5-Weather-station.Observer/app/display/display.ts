export class CurrentConditionsDisplay {
  private temperature: number = 0;
  private humidity: number = 0;

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

export class StatisticsDisplay {
  update(temperature: number, humidity: number, pressure: number): void {
    this.display();
  }

  display(): void {
    console.log("Statistics display");
  }
}

export class ForecastDisplay {
  update(temperature: number, humidity: number, pressure: number): void {
    this.display();
  }

  display(): void {
    console.log("Forecast display");
  }
}
