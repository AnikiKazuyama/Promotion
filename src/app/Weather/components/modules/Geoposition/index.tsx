import styled from 'styled-components';
import { verticalAligned } from 'app/common/style-helpers/mixins';
import MyGeopositionBtn from '../Buttons/MyGeoposition';

export const StyledGeoposition = styled.div`
    ${verticalAligned()}
`;
export const GeopositionTitle = styled.div`
    margin-right: auto;
    font-size: 24px;
`;

export const ChooseCityButtonContainer = styled.span``;

export type GeopositionProps = {
    title: string
}

export const Geoposition: React.FC<GeopositionProps> = ({ title }) => (
    <StyledGeoposition>
        <GeopositionTitle>{title}</GeopositionTitle>
        <ChooseCityButtonContainer><MyGeopositionBtn /></ChooseCityButtonContainer>
    </StyledGeoposition>
);
export default Geoposition;
