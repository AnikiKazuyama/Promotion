import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import dayjs from 'dayjs';

const useChangeTranslation = () => {
    const { i18n } = useTranslation();
    const { locale } = useRouter();

    useEffect(() => {
        console.log(locale);
        dayjs.locale(locale);
        i18n.changeLanguage(locale);
    }, [i18n, locale]);
};

export default useChangeTranslation;
