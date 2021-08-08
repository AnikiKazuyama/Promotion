import Toggle from 'app/Weather/components/elemets/Toggle';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocalStorage } from 'react-use';
import styled from 'styled-components';

const StyledToggle = styled(Toggle)`
    margin: 0 20px;
`;

const ThemeToggle = () => {
    const { t } = useTranslation();
    const [savedTheme, setSavedTheme] = useLocalStorage('theme', 'light');
    const nextTheme = savedTheme === 'light' ? 'dark' : 'light';

    const handleChange = () => {
        setSavedTheme(nextTheme);
    };

    useEffect(() => {
        document.body.dataset.theme = savedTheme;
    }, [savedTheme]);

    return (
        <>
            <span>{t('white')}</span>
            <StyledToggle checked={savedTheme === 'dark'} onChange={handleChange} />
            <span>{t('black')}</span>
        </>
    );
};
export default ThemeToggle;
