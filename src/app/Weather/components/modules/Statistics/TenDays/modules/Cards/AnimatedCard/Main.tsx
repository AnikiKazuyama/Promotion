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
    fullMode: boolean
    date: string | number
}

const AnimatedCardMain: React.FC<AnimatedDayMainProps> = ({
    weather,
    feelsLike,
    currentTemperature,
    currentDayPeriods,
    weatherCode,
    fullMode
}) => {
    const transitions = useFade(fullMode);

    const WeatherIcon = WeatherIcons[weatherCode];
    return (
        <>
            {transitions.map(({ item, key, props }) => (item
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
                                {Math.round(currentTemperature)}
                                °
                            </CurrentTemperature>

                            {currentDayPeriods.map((day) => (
                                <WeatherTag
                                    key={day.timePeriod}
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
                        <span>{currentTemperature}</span>
                    </Content>
                )

            ))}
        </>
    );
};

export default AnimatedCardMain;
