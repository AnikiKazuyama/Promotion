import { useFade } from 'app/common/hooks/animations/fade';
import dayjs from 'dayjs';
import { MinTemperature, Title, DayCurrentHeaderProps } from '../DayCard/Header';
import { DayOfTheMonth, DayOfTheWeek, Header } from '../DayCardMini';

interface AnimatedDayHeaderProps extends DayCurrentHeaderProps{
    mode: string
    date: string
}

const AnimatedCardHeader: React.FC<AnimatedDayHeaderProps> = ({
    mode,
    maxTemperature,
    minTemperature,
    date
}) => {
    const fadeTransitions = useFade(mode, {
        duration: 200
    });

    return (
        <>
            {fadeTransitions.map(({ item, key, props }) => (item === 'full'
                ? (
                    <Title style={props} key={key}>
                        <div>
                            Now:
                            {' '}
                            {dayjs().format('HH:mm')}
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
                        <DayOfTheWeek>{dayjs(date).format('dddd')}</DayOfTheWeek>
                        <DayOfTheMonth>{dayjs(date).format('D MMMM')}</DayOfTheMonth>
                    </Header>
                )))}
        </>
    );
};

export default AnimatedCardHeader;
