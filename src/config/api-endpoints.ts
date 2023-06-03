import { OPEN_WEATHER_KEY } from "@env";

export type ApiEndpints = Readonly<{
	getWeather: (city: string) => string;
}>;

const apiEndpoints: ApiEndpints = {
	getWeather: (city) => `weather?q=${city}&appid=${OPEN_WEATHER_KEY}&units=metric`,
};

export default apiEndpoints;
