// utils/data.ts

export const activitiesData = {
    clear: {
      hot: ['Swimming', 'Hiking', 'Cycling', 'Outdoor Sightseeing', 'Picnic in the park'],
      mild: ['Hiking', 'Biking', 'Outdoor Sightseeing', 'Picnic', 'Outdoor Photography'],
      cold: ['Museum Visit', 'Indoor Sightseeing', 'Art Gallery', 'Shopping'],
    },
    rain: {
      default: ['Visit a Museum', 'Watch a Movie', 'Indoor Shopping', 'Go to a Spa', 'Cafe Hopping'],
    },
    snow: {
      default: ['Skiing', 'Snowboarding', 'Snowshoeing', 'Winter Hiking'],
    },
    clouds: {
      default: ['Indoor Activities', 'Visit an Art Gallery', 'Shopping', 'Cafe Hopping', 'Sightseeing'],
    },
    thunderstorm: {
      default: ['Stay Indoors', 'Watch Movies', 'Read a Book', 'Cook at Home'],
    },
    windy: {
      default: ['Windsurfing', 'Kite Surfing', 'Fly a Kite'],
    },
    foggy: {
      default: ['Visit a Historical Site', 'Indoor Sightseeing', 'Go to a Spa'],
    }
  };
  
  export const temperatureRanges = {
    hot: (temp: number) => temp > 25,
    mild: (temp: number) => temp <= 25 && temp > 15,
    cold: (temp: number) => temp <= 15,
  };
  