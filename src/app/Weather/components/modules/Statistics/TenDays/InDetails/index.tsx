import { ParentSize } from '@visx/responsive';
import { BlurBgPaper } from 'app/Weather/components/elemets/Paper';
import { usePageLoading } from 'app/Weather/context/pageLoading';
import { DailyWeatherForecast } from 'app/Weather/types/weather';
import { observer } from 'mobx-react-lite';
import { useTransition } from 'react-spring';
import styled from 'styled-components';
import DayCard from '../Cards/DayCard';
import Chart from './Chart';

const testDataDayCardDayPeriods = [{
    weatherCode: '01d',
    timePeriod: 'Утро',
    humidity: '55',
    temperature: 13
},
{
    weatherCode: '03d',
    humidity: '77',
    timePeriod: 'День',
    temperature: 18
},
{
    weatherCode: '04d',
    humidity: '77',
    timePeriod: 'Вечер',
    temperature: 16
},
{
    weatherCode: '10n',
    humidity: '77',
    timePeriod: 'Ночь',
    temperature: 10
}];

const FullContainer = styled(BlurBgPaper)`
    display: flex;
    align-items: center;
    margin-top: 40px;
    margin-left: 40px;
    margin-right: 40px;
`;

const LocalDivider = styled.div`
    margin: 0px 20px;
`;

type DetailsDayListProps = {
    weatherList: Array<DailyWeatherForecast>
}

const DetailsDaysList = observer<DetailsDayListProps>(({ weatherList }) => {
    const transiotions = useTransition(null, null, {
        from: {
            transform: 'translateX(-150%)'
        },
        enter: {
            transform: 'translateX(0)'
        },
        leave: {
            transform: 'translateX(-150%)'
        }
    });

    const pageLoadingStore = usePageLoading();
    return pageLoadingStore.isLoading ? 'loading' : (
        <>
            {
                transiotions.map(({ key, props }) => (
                    weatherList.map((dayliWeather, index) => {
                        const weather = dayliWeather.weather[0];
                        return (
                            <>
                                <FullContainer key={`${key}_${index}`} style={props}>
                                    <DayCard
                                        weather={weather.description}
                                        weatherCode={weather.icon}
                                        feelsLike={dayliWeather.feelsLike.day}
                                        currentTemperature={dayliWeather.temp.day}
                                        currentDayPeriods={testDataDayCardDayPeriods}
                                        wind={{
                                            power: dayliWeather.windSpeed,
                                            direction: dayliWeather.windDeg
                                        }}
                                        humidity={dayliWeather.humidity}
                                        preassure={dayliWeather.pressure}
                                        sunset={dayliWeather.sunset}
                                        sunrise={dayliWeather.sunrise}
                                        minTemperature={dayliWeather.temp.min}
                                        maxTemperature={dayliWeather.temp.max}
                                    />
                                    <LocalDivider />
                                    <ParentSize>
                                        {(sizeProps) => (
                                            <Chart {...sizeProps} />
                                        )}
                                    </ParentSize>
                                </FullContainer>
                            </>
                        );
                    })))
            }
        </>
    );
});

export default DetailsDaysList;
