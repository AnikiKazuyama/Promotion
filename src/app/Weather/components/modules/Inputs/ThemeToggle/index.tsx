import Toggle from 'app/Weather/components/elemets/Toggle';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

const StyledToggle = styled(Toggle)`
    margin: 0 20px;
`;

const ThemeToggle = () => {
    const [theme, setTheme] = useState('light');
    const nextTheme = theme === 'light' ? 'dark' : 'light';

    const handleChange = () => {
        setTheme(nextTheme);
    };

    useEffect(() => {
        document.body.dataset.theme = theme;
    }, [theme]);

    return (
        <>
            <span>White</span>
            <StyledToggle onChange={handleChange} />
            <span>Black</span>
        </>
    );
};
export default ThemeToggle;
