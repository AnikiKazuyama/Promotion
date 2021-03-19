import styled from 'styled-components';
import ChooseCityButton from 'app/Weather/components/elemets/Button';
import MyGeopositionBtn from '../Buttons/MyGeoposition';
import Hr from '../../elemets/Divider';

export const StyledGeoposition = styled.div`
    display: flex;
    margin: 16px 0;
`;
export const GeopositionTitle = styled.div`
    margin-right: auto;
    font-size: 24px;
`;
export const GeopositionControl = styled.div`
    ${ChooseCityButton}:first-child {
        margin-right: 20px;
    }
`;

export type GeopositionProps = {
    title: string
}

export const Geoposition: React.FC<GeopositionProps> = ({ title }) => (
    <>
        <StyledGeoposition>
            <GeopositionTitle>{title}</GeopositionTitle>
            <GeopositionControl>
                <MyGeopositionBtn />
                <ChooseCityButton>Выбрать город</ChooseCityButton>
            </GeopositionControl>
        </StyledGeoposition>
        <Hr />
    </>
);
export default Geoposition;
