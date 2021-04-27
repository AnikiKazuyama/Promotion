import { useFade } from 'app/common/hooks/animations/fade';
import { useLocation } from 'app/Weather/context/location';
import { observer } from 'mobx-react-lite';
import { MinTemperature, Title, DayCurrentHeaderProps } from '../DayCard/Header';
import { DayOfTheMonth, DayOfTheWeek, Header } from '../DayCardMini';

interface AnimatedDayHeaderProps extends DayCurrentHeaderProps{
    fullMode: boolean
}

const AnimatedCardHeader = observer<AnimatedDayHeaderProps>(({
    fullMode,
    maxTemperature,
    minTemperature,
    time
}) => {
    const fadeTransitions = useFade(fullMode, {
        duration: 200
    });
    const locationStore = useLocation();

    return (
        <>
            {fadeTransitions.map(({ item, key, props }) => (item
                ? (
                    <Title style={props} key={key}>
                        <div>
                            Now:
                            {' '}
                            {locationStore.getTimeInLocation().format('HH:mm')}
                        </div>
                        <div>
                            {maxTemperature}
                            {' '}
                            \
                            {' '}
                            <MinTemperature>{minTemperature}</MinTemperature>
                        </div>
                    </Title>
                ) : (
                    <Header key={key} style={props}>
                        <DayOfTheWeek>{locationStore.getTimeInLocation(time).format('dddd')}</DayOfTheWeek>
                        <DayOfTheMonth>{locationStore.getTimeInLocation(time).format('D MMMM')}</DayOfTheMonth>
                    </Header>
                )))}
        </>
    );
});

export default AnimatedCardHeader;
