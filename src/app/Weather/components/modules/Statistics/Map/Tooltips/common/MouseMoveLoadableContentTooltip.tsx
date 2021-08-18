import Pulse from 'app/Weather/components/elemets/Loaders/Pulse';
import { useTranslation } from 'react-i18next';

type MouseMoveLoadableContentTooltipProps = {
    isLoading: boolean
    isError: boolean
}

const MouseMoveLoadableContentTooltip: React.FC<MouseMoveLoadableContentTooltipProps> = ({
    isLoading,
    isError,
    children
}) => {
    const { t } = useTranslation();

    if (isLoading) {
        return <Pulse />;
    }

    if (isError) {
        return t('map tooltip fetch error');
    }

    return <>{children}</>;
};

export default MouseMoveLoadableContentTooltip;
