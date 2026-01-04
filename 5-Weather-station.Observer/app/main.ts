import {
  CurrentConditionsDisplay,
  ForecastDisplay,
  StatisticsDisplay,
} from "./display/display";
import { WeatherData } from "./weather-data";

const weatherData = new WeatherData();

const currentDisplay = new CurrentConditionsDisplay(weatherData);
const statisticsDisplay = new StatisticsDisplay(weatherData);
const forecastDisplay = new ForecastDisplay(weatherData);

weatherData.setMeasurements(26, 65, 1013);
weatherData.setMeasurements(28, 70, 1012);
weatherData.setMeasurements(22, 90, 1009);
