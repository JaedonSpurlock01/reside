import cityJSON from "./cities.json";

// Define the structure of a city object
export interface City {
  city: string;
  city_ascii: string;
  state_id: string;
  state_name: string;
  county_fips: number | string;
  county_name: string;
  lat: number;
  lng: number;
  population: number;
  density: number;
  source: string;
  military: string;
  incorporated: string;
  timezone: string;
  ranking: number;
  zips: string;
  id: number;
}

const cities: City[] = cityJSON as City[];

let searchTimeout: NodeJS.Timeout | null = null;

export function searchCity(
  cityQuery: string,
  callback: (results: City[]) => void
) {
  if (searchTimeout) {
    clearTimeout(searchTimeout);
  }

  searchTimeout = setTimeout(() => {
    let foundResults: City[] = [];
    for (let city of cities) {
      if (city.city.toLowerCase().includes(cityQuery.toLowerCase())) {
        foundResults.push(city);
      }
    }
    if (foundResults.length > 15)
      callback([]); // Found results are way too long for UI
    else callback(foundResults);
  }, 300); // Debounce behavior (So that searching doesn't get spammed)
}
