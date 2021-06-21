import i18n from 'i18next';
import Backend from 'i18next-http-backend';
import { initReactI18next } from 'react-i18next';
import useChangeTranslation from './hook';

i18n
    .use(Backend)
    .use(initReactI18next)
    .init({
        fallbackLng: 'en-US',

        interpolation: {
            escapeValue: false
        },
        react: {
            useSuspense: false
        }
    });

export default i18n;
export { useChangeTranslation };
