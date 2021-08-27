import ClearDay from './clear-day';
import ClearNight from './clear-night';
import Cloudy from './cloudy';
import Mist from './mist';
import PartlyCloudyDay from './partly-cloudy-day';
import PartlyCloudyDaySnow from './partly-cloudy-day-snow';
import PartlyCloudyRain from './partly-cloudy-day-rain';
import PartlyCloudyNigh from './partly-cloudy-night';
import PartlyCloudyNightRain from './partly-cloudy-night-rain';
import Rain from './rain';
import Thunderstorm from './thunderstorms';

export { ClearDay } from './clear-day';
export { ClearNight } from './clear-night';
export { Cloudy } from './cloudy';
export { Compass } from './compass';
export { Drizzle } from './drizzle';
export { Droplet } from './droplet';
export { Hail } from './hail';
export { Mist } from './mist';
export { Overcast } from './overcast';
export { PartlyCloudyDay } from './partly-cloudy-day';
export { PartlyCloudyDaySnow } from './partly-cloudy-day-snow';
export { PartlyCloudyDrizzle } from './partly-cloudy-day-drizzle';
export { PartlyCloudyHail } from './partly-cloudy-day-hail';
export { PartlyCloudyNigh } from './partly-cloudy-night';
export { PartlyCloudyNightDrizzle } from './partly-cloudy-night-drizzle';
export { PartlyCloudyNightHail } from './partly-cloudy-night-hail';
export { PartlyCloudyNightRain } from './partly-cloudy-night-rain';
export { PartlyCloudyNightSnow } from './partly-cloudy-night-snow';
export { Rain } from './rain';
export { Snow } from './snow';
export { Sunrise } from './sunrise';
export { Sunset } from './sunset';
export { Thermometr } from './thermometer';
export { Thunderstorm } from './thunderstorms';
export { ThunderstormDay } from './thunderstorms-day';
export { ThunderstormNight } from './thunderstorms-night';
export { Tornado } from './tornado';
export { Wind } from './wind';

const WeatherIcons = {
    '01d': ClearDay,
    '01n': ClearNight,
    '02d': PartlyCloudyDay,
    '02n': PartlyCloudyNigh,
    '03d': Cloudy,
    '03n': Cloudy,
    '04d': Cloudy,
    '04n': Cloudy,
    '09d': Rain,
    '09n': Rain,
    '10d': PartlyCloudyRain,
    '10n': PartlyCloudyNightRain,
    '11d': Thunderstorm,
    '11n': Thunderstorm,
    '13d': PartlyCloudyDaySnow,
    '13n': PartlyCloudyDaySnow,
    '50d': Mist,
    '50n': Mist
};

export default WeatherIcons;
