import { themeTransitioned } from 'app/common/styles/mixins';
import { AnyType } from 'app/common/types';
import { useLocation } from 'app/Weather/context/location';
import { observer } from 'mobx-react-lite';
import { useTranslation } from 'react-i18next';
import { animated } from 'react-spring';
import styled from 'styled-components';

export const Title = styled(animated.div)`
    display: flex;
    justify-content: space-between;
`;

export const MinTemperature = styled.span`
    color: var(--colors-font-secondary);
    ${themeTransitioned()}
`;

export interface DayCurrentHeaderProps {
    today: boolean,
    time: number,
    maxTemperature: number,
    minTemperature: number,
    style?: AnyType
}

const TitleToday = styled.span`
    margin-right: 4px;
`;

const MaxTemperatureSeporator = styled.span`
    margin: 0 4px;
`;

const Header: React.FC<DayCurrentHeaderProps> = observer(({
    today,
    time,
    maxTemperature,
    minTemperature,
    style
}) => {
    const locationStore = useLocation();
    const { t } = useTranslation();
    return (
        <Title style={style}>
            <div>
                {today ? (
                    <TitleToday>
                        {t('time now')}
                        :
                    </TitleToday>
                ) : null}
                {' '}
                {
                    today
                        ? locationStore.getTimeInLocation().format('HH:mm')
                        : locationStore.getTimeInLocation(time).format('DD.MM')
                }
            </div>
            <div>
                {maxTemperature}
                {' '}
                <MaxTemperatureSeporator>\</MaxTemperatureSeporator>
                {' '}
                <MinTemperature>{minTemperature}</MinTemperature>
            </div>
        </Title>
    );
});

export default Header;
