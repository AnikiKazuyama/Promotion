import Button from 'app/Weather/components/elemets/Button';
import StyeldButtonGroup from 'app/Weather/components/elemets/ButtonGroup';
import IconContainer from 'app/Weather/components/elemets/IconContainer';
import LeftChevron from 'app/Weather/components/elemets/Icons/LeftChevron';
import RightChevron from 'app/Weather/components/elemets/Icons/RightChevron';
import { usePageLoading } from 'app/Weather/context/pageLoading';
import dayjs from 'dayjs';
import { observer } from 'mobx-react-lite';
import { useState } from 'react';
import styled from 'styled-components';
import AnimatedDayCard from '../Cards/AnimatedCard';

const StyledDaysListContainer = styled.div`
    position: relative;
`;

const StyledDaysListController = styled.div`
    position: absolute;
    top: 100px;
    right: 20px;
    z-index: 1;
`;

const DaylistItem = styled.div<{moveTo?: string}>`
    transition: 0.5s transform;
    transform: translateX(${({ moveTo }) => moveTo || 0});
`;

const StyledDaysList = styled.div`
    display: flex;
    justify-content: space-between;
    box-sizing: content-box;
    overflow: hidden;
    align-items: center;
    padding: 40px 0px;
    padding-bottom: 120px;
    margin-bottom: -120px;

    & > ${DaylistItem}{
        align-self: center;
        margin: 0 24px;
    }
`;

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

const date = dayjs();

const DaysList = observer(() => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const pageLoadingStore = usePageLoading();

    const move = (direction: string, count: number) => {
        if (direction === 'left' && currentIndex === 0) {
            return;
        }

        if (direction === 'right' && currentIndex === 3) {
            return;
        }

        if (direction === 'left') {
            setCurrentIndex(currentIndex - count);
            return;
        }

        setCurrentIndex(currentIndex + count);
    };
    const moveTo = `-${currentIndex * 100}%`;

    return pageLoadingStore.isLoading ? <StyledDaysListContainer>loading</StyledDaysListContainer> : (
        <StyledDaysListContainer>
            <StyledDaysListController>
                <StyeldButtonGroup>
                    <Button onClick={() => move('left', 1)}><IconContainer size="xs"><LeftChevron /></IconContainer></Button>
                    <Button endIcon={<IconContainer size="xs"><RightChevron /></IconContainer>} onClick={() => move('right', 1)}>Туда</Button>
                </StyeldButtonGroup>
            </StyledDaysListController>
            <StyledDaysList>
                <DaylistItem moveTo={moveTo}>
                    <AnimatedDayCard
                        date={date.unix().toString()}
                        weather="Little rain"
                        weatherCode="02d"
                        feelsLike={14}
                        currentTemperature={13}
                        currentDayPeriods={testDataDayCardDayPeriods}
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
                        mode={currentIndex === 0 ? 'full' : 'assss'}
                    />
                </DaylistItem>
                <DaylistItem moveTo={moveTo}>
                    <AnimatedDayCard
                        date={date.add(1, 'day').unix().toString()}
                        weather="Little rain"
                        weatherCode="02d"
                        feelsLike={14}
                        currentTemperature={13}
                        currentDayPeriods={testDataDayCardDayPeriods}
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
                        mode={currentIndex === 1 ? 'full' : 'assss'}
                    />
                </DaylistItem>
                <DaylistItem moveTo={moveTo}>
                    <AnimatedDayCard
                        date={date.add(2, 'day').unix().toString()}
                        weather="Little rain"
                        weatherCode="02d"
                        feelsLike={14}
                        currentTemperature={13}
                        currentDayPeriods={testDataDayCardDayPeriods}
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
                        mode={currentIndex === 2 ? 'full' : 'assss'}
                    />
                </DaylistItem>
                <DaylistItem moveTo={moveTo}>
                    <AnimatedDayCard
                        date={date.add(3, 'day').unix().toString()}
                        weather="Little rain"
                        weatherCode="02d"
                        feelsLike={14}
                        currentTemperature={13}
                        currentDayPeriods={testDataDayCardDayPeriods}
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
                        mode={currentIndex === 3 ? 'full' : 'assss'}
                    />
                </DaylistItem>
            </StyledDaysList>
        </StyledDaysListContainer>
    );
});

export default DaysList;
