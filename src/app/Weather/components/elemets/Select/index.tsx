import { useState } from 'react';
import RSelect, { StylesConfig, Theme } from 'react-select';

const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' }
];

const styles: StylesConfig<any, false> = {
    control: (old) => ({
        ...old,
        width: 300
    })
};

const customTheme = (theme: Theme): Theme => ({
    ...theme,
    colors: {
        ...theme.colors,
        primary25: 'hotpink',
        primary: 'black'
    }
});

const components = { DropdownIndicator: () => null, IndicatorSeparator: () => null };

export const Select = () => {
    const [selectedOption, setOption] = useState<any>(null);
    const handleChange = (recievedOption: any) => {
        setOption({ recievedOption });
    };

    return (
        <RSelect
            placeholder="Search by city"
            value={selectedOption}
            onChange={handleChange}
            options={options}
            components={components}
            instanceId="CitySearch"
            theme={customTheme}
            styles={styles}
        />
    );
};
export default Select;
