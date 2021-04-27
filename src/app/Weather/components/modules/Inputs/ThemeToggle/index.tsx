import Toggle from 'app/Weather/components/elemets/Toggle';
import { useEffect } from 'react';
import { useLocalStorage } from 'react-use';
import styled from 'styled-components';

const StyledToggle = styled(Toggle)`
    margin: 0 20px;
`;

const ThemeToggle = () => {
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
            <span>White</span>
            <StyledToggle checked={savedTheme === 'dark'} onChange={handleChange} />
            <span>Black</span>
        </>
    );
};
export default ThemeToggle;
