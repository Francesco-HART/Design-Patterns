export interface Observer {
  update(temperature: number, humidity: number, pressure: number): void;
}

export interface DisplayElement {
  display(): void;
}

export interface Subject {
  registerObserver(observer: Observer): void;
  removeObserver(observer: Observer): void;
  notifyObservers(): void;
}
