export const basicInfo = ({ weather }) => weather.basic;
export const dailyForecast = ({ weather }) => weather.daily_forecast;
export const isWeatherLoaded = ({ weather }) => weather.isWeatherLoaded;

export const cityInfo = ({ city }) => city.cityInfo;
export const isCityLoaded = ({ city }) => city.isCityLoaded;