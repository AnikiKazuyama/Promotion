import { BlurBgPaper } from 'app/components/ui/Paper';
import { observer } from 'mobx-react-lite';
import { useTransition, animated } from 'react-spring';
import styled from 'styled-components';
import { device, size } from 'styles/MediaSizes';
import { WeatherListProps } from '../../types';
import DayCard from '../../components/Cards/DayCard';
import StaticSwitcher from '../../components/StatickSwitcher';
import Chart from './Chart';

const FullContainer = styled(animated(BlurBgPaper))`
    display: flex;
    align-items: center;
    flex-direction: column;
    margin-top: 40px;
    margin-left: 40px;
    margin-right: 40px;

    &:last-child {
        margin-bottom: 40px
    }

    @media ${device.laptop} {
        flex-direction: row;
        /* max-width: ${size.laptop}; */
    }
`;
const ChartContainer = styled.div`
    min-height: 420px;
    width: 100%;
    height: 100%;
`;
const LocalDivider = styled.div`
    margin: 0px 20px;
`;

const DetailsDaysList = observer<WeatherListProps>(({ weatherList }) => {
    const transiotions = useTransition(null, {
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

    return (
        <>
            <StaticSwitcher />
            {transiotions((styles) => (
                weatherList.map((dayliWeather, index) => (
                    <FullContainer key={`${dayliWeather.dt}`} style={styles}>
                        <DayCard today={index === 0} weatherStat={dayliWeather} />
                        <LocalDivider />
                        <ChartContainer>
                            <Chart hourlyDayPeriods={dayliWeather.hourlyDayPeriods} />
                        </ChartContainer>
                    </FullContainer>
                ))))}
        </>
    );
});

export default DetailsDaysList;
