import { Popup as LeafletPopup } from 'leaflet';
import {
    forwardRef,
    MutableRefObject,
    PropsWithChildren
} from 'react';
import { Popup, useMap } from 'react-leaflet';
import { useEnsuredForwardedRef } from 'react-use';
import styled from 'styled-components';

const StyledMarkerPopup = styled(Popup)`
    & {
        min-width: 239px;
        background-color: transparent;
        z-index: 1002;
    }

    & .leaflet-popup-content-wrapper {
        background: #fff;
        border-radius: 12px;
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

export type MarkerPopupProps = PropsWithChildren<{
    onOpen?: () => void
    onClose?: () => void
}>

const MarkerPopup = forwardRef<LeafletPopup | null, MarkerPopupProps>(({
    children,
    onOpen,
    onClose
}, ref) => {
    const popupRef = useEnsuredForwardedRef(ref as MutableRefObject<LeafletPopup | null>);
    const map = useMap();

    const handleCloseClick = () => {
        if (popupRef.current) map.closePopup(popupRef.current);
    };

    return (
        <StyledMarkerPopup ref={popupRef} closeButton={false} onClose={onClose} onOpen={onOpen}>
            <MarkerPopupCloseButton onClick={handleCloseClick} />
            {children}
        </StyledMarkerPopup>
    );
});

export default MarkerPopup;
