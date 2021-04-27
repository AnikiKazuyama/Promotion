type FlagIconStyle = 'flat' | 'shiny'
enum FlagIconSizes {
    XS = '16',
    S = '24',
    L = '32',
    XL = '48',
    XXL = '64'
}

const FLAG_ICON_URL = 'https://www.countryflags.io/:country_code/:style/:size.png';
const getFlagIcon = (countyCode: string, style: FlagIconStyle = 'flat', size: FlagIconSizes = FlagIconSizes.S) => (
    FLAG_ICON_URL.replace(':country_code', countyCode).replace(':style', style).replace(':size', size)
);

export default getFlagIcon;
