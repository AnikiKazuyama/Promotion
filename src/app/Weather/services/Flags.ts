enum FlagIconSizes {
    S = 'w20',
    XL = 'w40'
}

const FLAG_ICON_URL = 'https://flagcdn.com/:size/:country_code.png';
const getFlagIcon = (countyCode: string, size: FlagIconSizes = FlagIconSizes.XL) => (
    FLAG_ICON_URL.replace(':country_code', countyCode.toLowerCase()).replace(':size', size)
);

export default getFlagIcon;
