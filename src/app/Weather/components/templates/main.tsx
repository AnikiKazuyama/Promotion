import styled from 'styled-components';
import BaseLayout from '../layouts/Base';
import Geoposition from '../modules/Geoposition';
import DayCurrent from '../modules/Statistics/DayCurrent';

const StyledDaysList = styled.div`
    display: flex;
    justify-content: space-between;
`;

const WeatherMain = () => (
    <BaseLayout>
        <Geoposition title="Лондон" />
        <StyledDaysList>
            <DayCurrent
                weather="Little rain"
                weatherCode="02d"
                feelsLike={14}
                currentTemperature={13}
                currentDayPeriods={[{
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
                }]}
                wind={{
                    direction: 'З',
                    power: '6,7'
                }}
                humidity="83"
                preassure={748}
                sunset="2015-05-21T19:22:59+00:00"
                sunrise="2015-05-21T05:05:35+00:00"
                minTemperature={-12}
                maxTemperature={6}
            />
        </StyledDaysList>
    </BaseLayout>
);

export default WeatherMain;
