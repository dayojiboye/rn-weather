import { OPEN_WEATHER_KEY } from "@env";

export type ApiEndpints = Readonly<{
	getWeather: (lat: number, lon: number) => string;
	getCityWeather: (city: string) => string;
}>;

const apiEndpoints: ApiEndpints = {
	getWeather: (lat, lon) => `weather?lat=${lat}&lon=${lon}&appid=${OPEN_WEATHER_KEY}`,
	getCityWeather: (city) => `weather?q=${city}&appid=${OPEN_WEATHER_KEY}&units=metric`,
};

export default apiEndpoints;
