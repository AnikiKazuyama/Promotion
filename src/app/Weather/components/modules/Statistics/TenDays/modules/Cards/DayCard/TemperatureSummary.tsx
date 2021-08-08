import { animated } from 'react-spring';
import { verticalAligned } from 'app/common/styles/mixins';
import { AnyType } from 'app/common/types';
import IconContainer from 'app/Weather/components/elemets/IconContainer';
import { StyledWeatherTag, WeatherTag } from 'app/Weather/components/elemets/WeatherTag';
import WeatherIcons from 'app/Weather/components/elemets/WeatherTag/icons';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { WeatherIconsId } from 'app/Weather/services/types/common';
import { ShortDayStatistic } from '../../../../types';

export const SmallSummaryWeather = styled.div`
    ${verticalAligned()}
    justify-content: space-between;
`;

export const WeatherWithIcon = styled.div`
    ${verticalAligned()}
`;

export const CurrentTemperature = styled.span`
    margin: 0 auto;
    font-size: 82px;
    font-weight: 100;
    text-align: center;
`;

export const DaySummaryWeather = styled.div`
    ${verticalAligned()}
    justify-content: flex-start;

    & > ${StyledWeatherTag} {
        margin: 0 12px;
    }
`;

export const WeatherDescription = styled.span`
    &::first-letter {
        text-transform: uppercase;
    }
`;

export interface TemperatureSummaryProps {
    weather: string
    feelsLike: number
    currentTemperature: number
    currentDayPeriods: Array<ShortDayStatistic>,
    weatherCode: WeatherIconsId,
    style?: AnyType
}

const TemperatureSummary: React.FC<TemperatureSummaryProps> = ({
    weather,
    feelsLike,
    currentTemperature,
    currentDayPeriods,
    weatherCode,
    style
}) => {
    const WeatherIcon = WeatherIcons[weatherCode];
    const { t } = useTranslation();

    return (
        <animated.div style={style}>
            <SmallSummaryWeather>
                <WeatherWithIcon>
                    <IconContainer size="xl"><WeatherIcon /></IconContainer>
                    <WeatherDescription>{weather}</WeatherDescription>
                </WeatherWithIcon>
                <div>
                    {t('feels like')}
                    {' '}
                    {feelsLike}
                    °
                </div>
            </SmallSummaryWeather>
            <DaySummaryWeather>
                <CurrentTemperature>
                    {currentTemperature.toFixed()}
                    °
                </CurrentTemperature>

                {currentDayPeriods && currentDayPeriods.map((day) => (
                    <WeatherTag
                        key={Math.random()}
                        weatherCode={day.weatherCode}
                        temperature={day.temperature}
                        timeInText={day.timePeriod}
                    />
                ))}
            </DaySummaryWeather>
        </animated.div>
    );
};

export default TemperatureSummary;
