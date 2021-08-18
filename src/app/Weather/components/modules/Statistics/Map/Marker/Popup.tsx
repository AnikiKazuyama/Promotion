import { Popup as LeafletPopup } from 'leaflet';
import { useRef } from 'react';
import { Popup, useMap } from 'react-leaflet';
import styled from 'styled-components';

const StyledMarkerPopup = styled(Popup)`
    & {
        min-width: 239px;
        background-color: transparent;
        z-index: 402;
    }

    & .leaflet-popup-content-wrapper {
        background: #fff;
        border-radius: 12px;
        /* position: relative; */
        color: #222426;
        font-size: 14px;
        -webkit-box-shadow: 0 2px 6px 0 rgb(0 0 0 / 20%);
        box-shadow: 0 2px 6px 0 rgb(0 0 0 / 20%);
    }

    & .leaflet-popup-content {
        padding: 16px 16px 20px;
        margin: 0;
    }

    & .leaflet-popup-tip-container {
        bottom: -3px;
        margin-left: 3px;
        overflow: initial;
    }
    
    & .leaflet-popup-tip {
        padding: initial;
        margin: initial;
        background-color: #fff;
        box-shadow: initial;
    }

    & .leaflet-popup-tip,
    & .leaflet-popup-tip-container {
        width: 6px;
        height: 6px;
    }
`;

const MarkerPopupCloseButton = styled.div`
    position: absolute;
    top: 6px;
    right: 6px;
    width: 24px;
    height: 24px;
    background: url('/static/icons/close.svg') center center;
    cursor: pointer;
`;

const MarkerPopup: React.FC = ({ children }) => {
    const popupRef = useRef<LeafletPopup | null>(null);
    const map = useMap();

    const handleCloseClick = () => {
        if (popupRef.current) map.closePopup(popupRef.current);
    };

    return (
        <StyledMarkerPopup closeButton={false} ref={popupRef}>
            <MarkerPopupCloseButton onClick={handleCloseClick} />
            {children}
        </StyledMarkerPopup>
    );
};

export default MarkerPopup;
