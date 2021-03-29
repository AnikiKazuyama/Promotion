import { scaleLinear, scaleTime } from '@visx/scale';
import { AreaClosed, Line } from '@visx/shape';
import { LinearGradient } from '@visx/gradient';
import dayjs from 'dayjs';
import { useMemo } from 'react';
import maxBy from 'lodash/maxBy';
import { TooltipWithBounds, defaultStyles } from '@visx/tooltip';
import { WeatherTag } from 'app/Weather/components/elemets/WeatherTag';
import { ParentSizeProvidedProps } from '@visx/responsive/lib/components/ParentSize';
import useSize from 'app/common/hooks/useSize';
import styled from 'styled-components';
import Wind from 'app/Weather/components/elemets/Wind';

type Sys = {
    pod: string
}

type Wind = {
    speed: number
    deg: number
}

type Clouds = {
    all: number
}

type WeatherItem = {
    id: number
    main: string
    description: string
    icon: string
}

type ForecastMain = {
    temp: number
    feels_like: number
    temp_min: number
    temp_max: number
    pressure: number
    sea_level: number
    grnd_level: number
    humidity: number
    temp_kf: number
}

type Forecast = {
    dt: number
    main : ForecastMain
    weather: Array<WeatherItem>
    clouds: Clouds
    wind: Wind
    visibility: number
    pop: number
    sys: Sys
    dt_txt: string
}

const hourlyForecast = {
    list: [
        {
            dt: 1596632400,
            main: {
                temp: 120.16,
                feels_like: 288.41,
                temp_min: 289.16,
                temp_max: 289.16,
                pressure: 1013,
                sea_level: 1013,
                grnd_level: 1010,
                humidity: 78,
                temp_kf: 0
            },
            weather: [
                {
                    id: 804,
                    main: 'Clouds',
                    description: 'overcast clouds',
                    icon: '04n'
                }
            ],
            clouds: {
                all: 100
            },
            wind: {
                speed: 2.03,
                deg: 252
            },
            visibility: 10000,
            pop: 0.04,
            sys: {
                pod: 'n'
            },
            dt_txt: '2020-08-05 13:00:00'
        },
        {
            dt: 1611032400,
            main: {
                temp: 160.16,
                feels_like: 288.41,
                temp_min: 289.16,
                temp_max: 289.16,
                pressure: 1013,
                sea_level: 1013,
                grnd_level: 1010,
                humidity: 78,
                temp_kf: 0
            },
            weather: [
                {
                    id: 804,
                    main: 'Clouds',
                    description: 'overcast clouds',
                    icon: '04n'
                }
            ],
            clouds: {
                all: 100
            },
            wind: {
                speed: 2.03,
                deg: 252
            },
            visibility: 10000,
            pop: 0.04,
            sys: {
                pod: 'n'
            },
            dt_txt: '2020-08-05 13:00:00'
        },
        {
            dt: 1625432400,
            main: {
                temp: 130.16,
                feels_like: 288.41,
                temp_min: 289.16,
                temp_max: 289.16,
                pressure: 1013,
                sea_level: 1013,
                grnd_level: 1010,
                humidity: 78,
                temp_kf: 0
            },
            weather: [
                {
                    id: 804,
                    main: 'Clouds',
                    description: 'overcast clouds',
                    icon: '04n'
                }
            ],
            clouds: {
                all: 100
            },
            wind: {
                speed: 2.03,
                deg: 252
            },
            visibility: 10000,
            pop: 0.04,
            sys: {
                pod: 'n'
            },
            dt_txt: '2020-08-05 13:00:00'
        },
        {
            dt: 1639832400,
            main: {
                temp: 289.16,
                feels_like: 288.41,
                temp_min: 289.16,
                temp_max: 289.16,
                pressure: 1013,
                sea_level: 1013,
                grnd_level: 1010,
                humidity: 78,
                temp_kf: 0
            },
            weather: [
                {
                    id: 804,
                    main: 'Clouds',
                    description: 'overcast clouds',
                    icon: '04n'
                }
            ],
            clouds: {
                all: 100
            },
            wind: {
                speed: 2.03,
                deg: 252
            },
            visibility: 10000,
            pop: 0.04,
            sys: {
                pod: 'n'
            },
            dt_txt: '2020-08-05 13:00:00'
        }
    ],
    city: {
        id: 2643743,
        name: 'London',
        coord: {
            lat: 51.5085,
            lon: -0.1258
        }
    }
};

const WeatherChartTime = styled.div`
    margin-top: 18px;
`;

const WeatherToolTipContent = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const getHour = (d: Forecast) => (
    dayjs(d.dt).toDate()
);

const getTemperature = (d: Forecast) => (
    d.main.temp
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

interface ChartProps extends ParentSizeProvidedProps {
    margin?: {
        top: number
        right: number
        bottom: number
        left: number
    }
}

const Chart: React.FC<ChartProps> = ({
    width,
    height,
    margin = {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0
    }
}) => {
    const [toolTipRef, tooltipSize] = useSize<HTMLDivElement>();
    const [tooltipWindRef, tooltipWindSize] = useSize<HTMLDivElement>();

    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    const getHourScale = useMemo(() => (
        scaleTime({
            range: [margin.left + 50, innerWidth + margin.left - 50],
            domain: [
                hourlyForecast.list[0].dt,
                hourlyForecast.list[hourlyForecast.list.length - 1].dt
            ]
        })
    ), [innerWidth, margin.left]);

    const temperatureScaleStart = innerHeight - tooltipSize.offsetHeight;
    const temperatureScaleEnd = margin.top + tooltipWindSize.offsetHeight;

    const getTemperatureScale = useMemo(() => {
        const maxTemperatureForecast = maxBy<Forecast>(hourlyForecast.list, getTemperature);
        const maxTemperature = maxTemperatureForecast ? maxTemperatureForecast.main.temp : 0;

        return scaleLinear({
            range: [temperatureScaleStart, temperatureScaleEnd],
            domain: [0, maxTemperature + innerHeight / 3],
            nice: false
        });
    }, [innerHeight, temperatureScaleEnd, temperatureScaleStart]);

    return (
        <div style={{ position: 'relative' }}>
            <svg width={width} height={height}>
                <LinearGradient
                    id="area-gradient"
                    from={areaFill}
                    to={areaFill}
                    toOpacity="0.3"
                    rotate="0"
                />
                <AreaClosed
                    data={hourlyForecast.list}
                    x={(d) => getHourScale(getHour(d)) ?? 0}
                    y={(d) => getTemperatureScale(getTemperature(d)) ?? 0}
                    yScale={getTemperatureScale}
                    strokeWidth={1}
                    stroke={strokes}
                    fill="url(#area-gradient)"
                />
                {
                    hourlyForecast.list.map((forecast) => (
                        <>
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
                                key={Math.random()}
                                cx={getHourScale(getHour(forecast))}
                                cy={getTemperatureScale(getTemperature(forecast))}
                                r={4}
                                fill="white"
                                stroke="white"
                                strokeWidth={2}
                                pointerEvents="none"
                            />
                            <circle
                                key={Math.random()}
                                cx={getHourScale(getHour(forecast))}
                                cy={getTemperatureScale(getTemperature(forecast))}
                                r={4}
                                fill={strokes}
                                stroke="white"
                                strokeWidth={2}
                                pointerEvents="none"
                            />
                        </>
                    ))
                }
            </svg>
            <div>
                {hourlyForecast.list.map((forecast) => (
                    <TooltipWithBounds
                        key={Math.random()}
                        top={getTemperatureScale(getTemperature(forecast)) - tooltipSize.offsetHeight - 30}
                        left={getHourScale(getHour(forecast)) - 10 - tooltipSize.offsetWidth / 2}
                        style={tooltipStyles}
                    >
                        <WeatherToolTipContent ref={toolTipRef}>
                            <WeatherTag
                                humidity={forecast.main.humidity.toString()}
                                weatherCode={forecast.weather[0].icon}
                                temperature={forecast.main.temp}
                            />
                            <WeatherChartTime>{dayjs(forecast.dt_txt).format('HH:mm')}</WeatherChartTime>
                        </WeatherToolTipContent>
                    </TooltipWithBounds>
                ))}
                {hourlyForecast.list.map((forecast) => (
                    <TooltipWithBounds
                        key={Math.random()}
                        top={temperatureScaleStart}
                        left={getHourScale(getHour(forecast)) - 10 - tooltipWindSize.offsetWidth / 2}
                        style={tooltipStyles}
                    >
                        <WeatherToolTipContent ref={tooltipWindRef}>
                            <Wind deg={forecast.wind.deg} power={forecast.wind.speed} />
                            <WeatherChartTime>{forecast.main.humidity}</WeatherChartTime>
                        </WeatherToolTipContent>
                    </TooltipWithBounds>
                ))}
            </div>
        </div>
    );
};

export default Chart;
