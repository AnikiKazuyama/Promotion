const MarkerIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 34 41">
        <filter id="a" width="40" height="47" x="-3" y="-2" colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse">
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
            <feOffset dy="2" />
            <feGaussianBlur stdDeviation="2" />
            <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0" />
            <feBlend in2="BackgroundImageFix" mode="normal" result="effect1_dropShadow" />
            <feBlend in="SourceGraphic" in2="effect1_dropShadow" mode="normal" result="shape" />
        </filter>
        <clipPath id="b"><path d="M0 0h34v41H0z" /></clipPath>
        <g clipPath="url(#b)">
            <g filter="url(#a)"><path fill="#fff" d="M1 16a16 16 0 1127.3 11.3l-2.5 2.2-.1.1L23 32c-.9.8-1.6 1.6-2.2 2.4-.5.7-.8 1.4-.8 1.9a3 3 0 01-3 2.8 3 3 0 01-3-2.8c0-.5-.3-1.2-.8-2L11 32l-2.7-2.3-2.6-2.3A16 16 0 011 16z" /></g>
            <path fill="#fff" d="M1 16a16 16 0 1127.3 11.3l-2.5 2.2-.1.1L23 32c-.9.8-1.6 1.6-2.2 2.4-.5.7-.8 1.4-.8 1.9a3 3 0 01-3 2.8 3 3 0 01-3-2.8c0-.5-.3-1.2-.8-2L11 32l-2.7-2.3-2.6-2.3A16 16 0 011 16z" />
            <path fill="#f43" d="M17 2A14 14 0 007 26c2.6 2.5 8.6 6.1 9 10 0 .6.4 1 1 1s1-.4 1-1c.4-3.9 6.4-7.5 9-10A14 14 0 0017 2z" />
            <path fill="#fff" d="M17 20.9a4.9 4.9 0 100-9.8 4.9 4.9 0 000 9.8z" />
        </g>
    </svg>
);

export default MarkerIcon;
