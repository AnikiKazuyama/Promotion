import { scaleLinear, scaleTime } from '@visx/scale';
import { AreaClosed, Line } from '@visx/shape';
import { LinearGradient } from '@visx/gradient';
import dayjs from 'dayjs';
import { useMemo } from 'react';
import maxBy from 'lodash/maxBy';
import { TooltipWithBounds, defaultStyles } from '@visx/tooltip';
import { WeatherTag } from 'app/components/ui/WeatherTag';
import ParentSize, { ParentSizeProvidedProps } from '@visx/responsive/lib/components/ParentSize';
import useSize from 'app/common/hooks/useSize';
import styled from 'styled-components';
import Wind from 'app/components/ui/Wind';
import { useLocation } from 'app/context/location';
import { minBy } from 'lodash';
import { observer } from 'mobx-react-lite';
import { HourForecastItem } from '../../types';

interface ChartProps extends ParentSizeProvidedProps {
    hourlyDayPeriods: Array<HourForecastItem>
    margin?: {
        top: number
        right: number
        bottom: number
        left: number
    }
}

const WeatherChartTime = styled.div`
    margin-top: 18px;
`;

const WeatherToolTipContent = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const getHour = (d: HourForecastItem) => (
    dayjs(d.dt).toDate()
);

const getTemperature = (d: HourForecastItem) => (
    d.temp
);

const tooltipStyles = {
    ...defaultStyles,
    background: 'transparent',
    border: 'none',
    color: 'var(--colors-font-main)',
    boxShadow: 'initial',
    padding: 0
};

const strokes = 'var(--colors-chart-lines-primary)';
const areaFill = 'var(--colors-chart-fill-primary)';

const Chart: React.FC<ChartProps> = observer(({
    width,
    height,
    margin = {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0
    },
    hourlyDayPeriods
}) => {
    const [toolTipRef, tooltipSize] = useSize<HTMLDivElement>();
    const [tooltipWindRef, tooltipWindSize] = useSize<HTMLDivElement>();

    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    const getHourScale = useMemo(() => (
        scaleTime({
            range: [margin.left + 50, innerWidth + margin.left - 50],
            domain: [
                hourlyDayPeriods[0].dt,
                hourlyDayPeriods[hourlyDayPeriods.length - 1].dt
            ]
        })
    ), [hourlyDayPeriods, innerWidth, margin.left]);

    const temperatureScaleStart = innerHeight - tooltipSize.offsetHeight;
    const temperatureScaleEnd = margin.top + tooltipWindSize.offsetHeight;

    const getTemperatureScale = useMemo(() => {
        const maxTemperatureForecast = maxBy<HourForecastItem>(hourlyDayPeriods, getTemperature);
        const maxTemperature = maxTemperatureForecast ? maxTemperatureForecast.temp : 0;
        const minTemperatureForecast = minBy<HourForecastItem>(hourlyDayPeriods, getTemperature);
        const minTemperature = minTemperatureForecast ? minTemperatureForecast.temp : 0;
        return scaleLinear({
            range: [temperatureScaleStart, temperatureScaleEnd],
            domain: [minTemperature - 20, maxTemperature + 20],
            nice: false
        });
    }, [hourlyDayPeriods, temperatureScaleEnd, temperatureScaleStart]);

    const useLocationStore = useLocation();

    return (
        <div style={{ position: 'relative', minWidth: 540 }}>
            <svg width="100%" height={height}>
                <LinearGradient
                    id="area-gradient"
                    from={areaFill}
                    to={areaFill}
                    toOpacity="0.3"
                    rotate="0"
                />
                <AreaClosed
                    data={hourlyDayPeriods}
                    x={(d) => getHourScale(getHour(d)) ?? 0}
                    y={(d) => getTemperatureScale(getTemperature(d)) ?? 0}
                    yScale={getTemperatureScale}
                    strokeWidth={1}
                    stroke={strokes}
                    fill="url(#area-gradient)"
                />
                {
                    hourlyDayPeriods.map((forecast) => (
                        <g key={forecast.dt}>
                            <Line
                                from={{
                                    x: (getHourScale(getHour(forecast))),
                                    y: getTemperatureScale(getTemperature(forecast))
                                }}
                                to={{
                                    x: (getHourScale(getHour(forecast))),
                                    y: temperatureScaleStart
                                }}
                                stroke={strokes}
                                strokeWidth={1}
                                pointerEvents="none"
                            />
                            <circle
                                key={Math.random() + forecast.dt}
                                cx={getHourScale(getHour(forecast))}
                                cy={getTemperatureScale(getTemperature(forecast))}
                                r={4}
                                fill="white"
                                stroke="white"
                                strokeWidth={2}
                                pointerEvents="none"
                            />
                            <circle
                                key={Math.random() + forecast.dt}
                                cx={getHourScale(getHour(forecast))}
                                cy={getTemperatureScale(getTemperature(forecast))}
                                r={4}
                                fill={strokes}
                                stroke="white"
                                strokeWidth={2}
                                pointerEvents="none"
                            />
                        </g>
                    ))
                }
            </svg>
            <div>
                {hourlyDayPeriods.map((forecast) => (
                    <TooltipWithBounds
                        key={Math.random() + forecast.dt}
                        top={
                            getTemperatureScale(getTemperature(forecast))
                            - tooltipSize.offsetHeight - 30
                        }
                        left={getHourScale(getHour(forecast)) - 10 - tooltipSize.offsetWidth / 2}
                        style={tooltipStyles}
                    >
                        <WeatherToolTipContent ref={toolTipRef}>
                            <WeatherTag
                                humidity={forecast.humidity.toString()}
                                weatherCode={forecast.weather[0].icon}
                                temperature={forecast.temp}
                            />
                            <WeatherChartTime>{useLocationStore.getTimeInLocation(forecast.dt).format('HH:mm')}</WeatherChartTime>
                        </WeatherToolTipContent>
                    </TooltipWithBounds>
                ))}
                {hourlyDayPeriods.map((forecast) => (
                    <TooltipWithBounds
                        key={Math.random() + forecast.dt}
                        top={temperatureScaleStart}
                        left={
                            getHourScale(getHour(forecast))
                            - 10 - tooltipWindSize.offsetWidth / 2
                        }
                        style={tooltipStyles}
                    >
                        <WeatherToolTipContent ref={tooltipWindRef}>
                            <Wind
                                vertical
                                deg={forecast.wind.direction}
                                power={forecast.wind.power}
                            />
                            <WeatherChartTime>{forecast.pressure}</WeatherChartTime>
                        </WeatherToolTipContent>
                    </TooltipWithBounds>
                ))}
            </div>
        </div>
    );
});

type ChartContainerProps = {
    hourlyDayPeriods: Array<HourForecastItem>
}

const ChartContainer: React.FC<ChartContainerProps> = ({ hourlyDayPeriods }) => (
    <ParentSize>
        {({
            width,
            height,
            top,
            left
        }) => (
            <Chart
                key={Math.random()}
                hourlyDayPeriods={hourlyDayPeriods}
                width={width}
                height={height}
                top={top}
                left={left}
            />
        )}
    </ParentSize>
);

export default ChartContainer;
