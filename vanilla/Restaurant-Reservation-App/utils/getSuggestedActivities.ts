// utils/getSuggestedActivities.ts

import { activitiesData, temperatureRanges } from "./activitiesData";

interface WeatherData {
    main: {
      temp: number;
    };
    weather: {
      main: string;
    }[];
    wind: {
      speed: number;
    };
  }
  
  export const getSuggestedActivities = (weatherData: WeatherData) => {
    const { main, weather, wind } = weatherData;
    const temperature = main.temp;
    const condition = weather[0].main.toLowerCase();
    const windSpeed = wind.speed;
  
    let activities: string[] = [];
  
    let tempCategory: 'hot' | 'mild' | 'cold' = 'mild';
  if (temperatureRanges.hot(temperature)) {
    tempCategory = 'hot';
  } else if (temperatureRanges.cold(temperature)) {
    tempCategory = 'cold';
  }

  // Suggest activities based on weather condition
  if (activitiesData[condition]) {
    if (activitiesData[condition][tempCategory]) {
      activities = activitiesData[condition][tempCategory];
    } else if (activitiesData[condition].default) {
      activities = activitiesData[condition].default;
    }
  }

  // Windy conditions
  if (windSpeed > 15) {
    activities.push('Windsurfing', 'Kite Surfing', 'Fly a Kite');
  }
  
    return activities;
  };
  