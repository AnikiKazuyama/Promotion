import CloudyLoader from 'app/Weather/components/elemets/Loaders/Cloudy';
import { BlurBgPaper } from 'app/Weather/components/elemets/Paper';
import { usePageLoading } from 'app/Weather/context/pageLoading';
import { observer } from 'mobx-react-lite';
import { useTransition } from 'react-spring';
import styled from 'styled-components';
import { device, size } from 'styles/MediaSizes';
import { WeatherCardProps } from '../../../types';
import DayCard from '../../modules/Cards/DayCard';
import Chart from './Chart';

const FullContainer = styled(BlurBgPaper)`
    display: flex;
    align-items: center;
    flex-direction: column;
    margin-top: 40px;
    margin-left: 40px;
    margin-right: 40px;

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

export type DetailsDayListProps = {
    weatherList: Array<WeatherCardProps>
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

    return pageLoadingStore.isLoading ? <CloudyLoader /> : (
        <>
            {
                transiotions.map(({ key, props }) => (
                    weatherList.map((dayliWeather, index) => (
                        <FullContainer key={`${key}_${dayliWeather.dt}`} style={props}>
                            <DayCard today={index === 0} {...dayliWeather} />
                            <LocalDivider />
                            <ChartContainer>
                                <Chart hourlyDayPeriods={dayliWeather.hourlyDayPeriods} />
                            </ChartContainer>
                        </FullContainer>
                    ))))
            }
        </>
    );
});

export default DetailsDaysList;
