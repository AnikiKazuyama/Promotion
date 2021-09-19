import hasOwnPropery from 'app/utils/object';
import BlankPage from 'pages/weather';
import TemperatureTooltip from './Temperature';
import WindTooltip from './Wind';

export const TooltipContents = {
    Temperature: TemperatureTooltip,
    Wind: WindTooltip,
    Precipation: BlankPage
};

type TooltipByLayerProps = {
    currentlayer: string
}

const TooltipByLayer = ({ currentlayer }: TooltipByLayerProps) => {
    const Tooltip = (
        hasOwnPropery(TooltipContents, currentlayer)
            ? TooltipContents[currentlayer]
            : BlankPage
    );

    return <Tooltip />;
};

export default TooltipByLayer;
