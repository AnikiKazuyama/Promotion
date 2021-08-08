import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const useChangeTranslation = () => {
    const { i18n } = useTranslation();
    const { locale } = useRouter();

    useEffect(() => {
        i18n.changeLanguage(locale);
    }, [i18n, locale]);
};

export default useChangeTranslation;
