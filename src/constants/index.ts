export const getWeatherIcon = (icon?: string) => {
	switch (icon) {
		case "01d":
		case "01n":
			return require("../../assets/icons/clear-sky.png");

		case "02d":
		case "02n":
			return require("../../assets/icons/few-clouds.png");

		case "03d":
		case "03n":
			return require("../../assets/icons/scattered-clouds.png");

		case "04d":
		case "04n":
			return require("../../assets/icons/broken-clouds.png");

		case "09d":
		case "09n":
			return require("../../assets/icons/shower-rain.png");

		case "10d":
		case "10n":
			return require("../../assets/icons/rain.png");

		case "11d":
		case "11n":
			return require("../../assets/icons/thunderstorm.png");

		case "13d":
		case "13n":
			return require("../../assets/icons/snow.png");

		case "50d":
		case "50n":
			return require("../../assets/icons/mist.png");

		default:
			return null;
	}
};
