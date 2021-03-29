import styled from 'styled-components';
import Button from 'app/Weather/components/elemets/Button';
import { verticalAligned } from 'app/common/styles/mixins';
import MyGeopositionBtn from '../Buttons/MyGeoposition';

export const StyledGeoposition = styled.div`
    ${verticalAligned()}
`;
export const GeopositionTitle = styled.div`
    margin-right: auto;
    font-size: 24px;
`;

export const ChooseCityButtonContainer = styled.span``;

export const GeopositionControl = styled.div`
    ${ChooseCityButtonContainer}:first-child {
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
                <ChooseCityButtonContainer><MyGeopositionBtn /></ChooseCityButtonContainer>
                <ChooseCityButtonContainer><Button>Выбрать город</Button></ChooseCityButtonContainer>
            </GeopositionControl>
        </StyledGeoposition>
    </>
);
export default Geoposition;
