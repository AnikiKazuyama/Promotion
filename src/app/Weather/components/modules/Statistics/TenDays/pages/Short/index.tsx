import Button from 'app/Weather/components/elemets/Button';
import StyeldButtonGroup from 'app/Weather/components/elemets/ButtonGroup';
import IconContainer from 'app/Weather/components/elemets/IconContainer';
import LeftChevron from 'app/Weather/components/elemets/Icons/LeftChevron';
import RightChevron from 'app/Weather/components/elemets/Icons/RightChevron';
import { WeatherIconsId } from 'app/Weather/services/types/common';
import { useState, useRef } from 'react';
import styled from 'styled-components';
import { HourForecastItem, ShortDayStatistic, Wind } from '../../../types';
import AnimatedDayCard from '../../modules/Cards/AnimatedCard';
import StaticSwitcher from '../../modules/StatickSwitcher';

const StyledDaysListContainer = styled.div`
    position: relative;
    margin-top: 40px;
`;

const StyledDaysListController = styled.div`
    position: absolute;
    top: 0px;
    right: 20px;
    z-index: 1;
`;

const DaylistItem = styled.div<{moveTo?: string}>`
    transition: 1s;
    transform: translateX(${({ moveTo }) => moveTo || 0});
`;

const StyledDaysList = styled.div`
    display: flex;
    justify-content: space-between;
    box-sizing: content-box;
    overflow: hidden;
    align-items: center;
    padding-bottom: 120px;
    margin-bottom: -120px;

    & > ${DaylistItem}{
        align-self: center;
        margin: 0 24px;
    }
`;

export type DataCardProps = {
    dt: number
    currentDayPeriods: Array<ShortDayStatistic>
    currentTemperature: number
    feelsLike: number
    humidity: number
    maxTemperature: number
    minTemperature: number
    preassure: number
    sunrise: number
    sunset: number
    weather: string
    weatherCode: WeatherIconsId
    wind: Wind
}

export interface DetailsDayProps extends DataCardProps {
    hourlyDayPeriods: Array<HourForecastItem>
}

export type DetailsDayListProps = {
    weatherList: Array<DetailsDayProps>
}

const DaysList: React.FC<DetailsDayListProps> = ({ weatherList }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const currentElement = useRef<HTMLDivElement | null>(null);
    const move = (direction: string, count: number) => {
        if (direction === 'left' && currentIndex === 0) {
            return;
        }

        if (direction === 'right' && currentIndex === weatherList.length - 1) {
            return;
        }

        if (direction === 'left') {
            setCurrentIndex(currentIndex - count);
            return;
        }

        setCurrentIndex(currentIndex + count);
    };

    const moveTo = currentElement.current !== null ? `-${currentIndex * currentElement.current.offsetWidth}px` : '0px';

    return (
        <>
            <StaticSwitcher />
            <StyledDaysListContainer>
                <StyledDaysListController>
                    <StyeldButtonGroup>
                        <Button onClick={() => move('left', 1)}><IconContainer size="xs"><LeftChevron /></IconContainer></Button>
                        <Button endIcon={<IconContainer size="xs"><RightChevron /></IconContainer>} onClick={() => move('right', 1)}>Туда</Button>
                    </StyeldButtonGroup>
                </StyledDaysListController>
                <StyledDaysList>
                    {weatherList.map((weatherItem, index) => (
                        <DaylistItem
                            moveTo={moveTo}
                            key={index}
                            ref={(element) => {
                                if (currentIndex === index) currentElement.current = element;
                            }}
                        >
                            <AnimatedDayCard
                                weatherStat={weatherItem}
                                fullMode={currentIndex === index}
                                today={index === 0}
                            />
                        </DaylistItem>
                    ))}
                </StyledDaysList>
            </StyledDaysListContainer>
        </>
    );
};

export default DaysList;
