import { useFade } from 'app/common/hooks/animations/fade';
import IconContainer from 'app/Weather/components/elemets/IconContainer';
import { WeatherTag } from 'app/Weather/components/elemets/WeatherTag';
import WeatherIcons from 'app/Weather/components/elemets/WeatherTag/icons';
import { animated } from 'react-spring';
import {
    CurrentTemperature,
    DaySummaryWeather, SmallSummaryWeather, TemperatureSummaryProps, WeatherWithIcon
} from '../DayCard/TemperatureSummary';
import { Content } from '../DayCardMini';

interface AnimatedDayMainProps extends TemperatureSummaryProps{
    mode: string
    date: string | number
}

const AnimatedCardMain: React.FC<AnimatedDayMainProps> = ({
    weather,
    feelsLike,
    currentTemperature,
    currentDayPeriods,
    weatherCode,
    mode
}) => {
    const transitions = useFade(mode);

    const WeatherIcon = WeatherIcons[weatherCode];
    return (
        <>
            {transitions.map(({ item, key, props }) => (item === 'full'
                ? (
                    <animated.div style={props} key={key}>
                        <SmallSummaryWeather>
                            <WeatherWithIcon>
                                <IconContainer size="xl"><WeatherIcon /></IconContainer>
                                <span>{weather}</span>
                            </WeatherWithIcon>
                            <div>
                                Feels like
                                {' '}
                                {feelsLike}
                                °
                            </div>
                        </SmallSummaryWeather>
                        <DaySummaryWeather>
                            <CurrentTemperature>
                                {currentTemperature}
                                °
                            </CurrentTemperature>

                            {currentDayPeriods.map((day) => (
                                <WeatherTag
                                    key={day.weatherCode}
                                    weatherCode={day.weatherCode}
                                    temperature={day.temperature}
                                    timeInText={day.timePeriod}
                                />
                            ))}
                        </DaySummaryWeather>
                    </animated.div>
                ) : (
                    <Content style={props} key={key}>
                        <IconContainer size="xl"><WeatherIcon /></IconContainer>
                    </Content>
                )

            ))}
        </>
    );
};

export default AnimatedCardMain;
