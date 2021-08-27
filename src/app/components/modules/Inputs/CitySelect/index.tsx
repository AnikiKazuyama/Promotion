import { findCityByQuery } from 'app/services/WeatherService';
import debounce from 'lodash/debounce';
import {
    components,
    OptionProps,
    SelectComponentsConfig,
    StylesConfig
} from 'react-select';
import ARSelect, { Props as ASyncProps } from 'react-select/async';
import { useRouter } from 'next/router';
import getFlagIcon from 'app/services/Flags';
import styled from 'styled-components';
import { CitySuggest } from 'app/services/types/findCityByQuery';
import redirectToCity from 'app/utils/router';
import { useTranslation } from 'react-i18next';

type OptionType = CitySuggest;
type AsynSelectType = ASyncProps<OptionType, false>
type CustomSelectComponentsConfig = SelectComponentsConfig<OptionType, false>
type LoadOptions = AsynSelectType['loadOptions']

const styles: StylesConfig<OptionType, false> = {
    control: (old) => ({
        ...old,
        width: 300
    })
};

const CustomOptionWrapper = styled.div`
    display: flex;
    align-items: center;
`;

const OptionFlag = styled.img`
    margin-right: 8px;
`;

const CustomOption: React.FC<OptionProps<OptionType, false>> = ({
    children, data, ...rest
}) => (
    <components.Option data={data} {...rest}>
        <CustomOptionWrapper>
            <OptionFlag src={getFlagIcon(data.sys.country)} alt={data.sys.country} />
            {children}
        </CustomOptionWrapper>
    </components.Option>
);

const CustomComponents: CustomSelectComponentsConfig = {
    DropdownIndicator: () => null,
    IndicatorSeparator: () => null,
    Option: CustomOption
};

const loadOptions: LoadOptions = (inputValue, callback) => {
    if (inputValue.length > 3) {
        findCityByQuery({ q: inputValue }).then((options) => {
            callback(options.list);
        });
        return;
    }

    callback([]);
};

const debouncedLoadOptions = debounce(loadOptions, 300);

export const CitySelect = () => {
    const router = useRouter();
    const { t } = useTranslation();

    const props: AsynSelectType = {
        instanceId: 'city-select-2',
        placeholder: t('search by city'),
        components: CustomComponents,
        onChange: (option) => {
            if (option === null) return;

            redirectToCity(router, {
                lat: option.coord.lat,
                lon: option.coord.lon,
                name: option.name
            });
        },
        value: null,
        getOptionLabel: (option) => option.name,
        getOptionValue: (option) => option.name,
        loadOptions: debouncedLoadOptions,
        styles
    };

    return <ARSelect {...props} />;
};

export default CitySelect;
