import Button from 'app/components/ui/Button';
import StyeldButtonGroup from 'app/components/ui/ButtonGroup';
import IconContainer from 'app/components/ui/IconContainer';
import LeftChevron from 'app/components/ui/Icons/LeftChevron';
import RightChevron from 'app/components/ui/Icons/RightChevron';
import { useState, useRef } from 'react';
import styled from 'styled-components';
import { WeatherListProps } from '../../types';
import AnimatedDayCard from '../../components/Cards/AnimatedCard';
import StaticSwitcher from '../../components/StatickSwitcher';

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

const DaysList: React.FC<WeatherListProps> = ({ weatherList }) => {
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
