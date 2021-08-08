import React from 'react';
import { AnyType } from 'app/common/types';
import { SpringConfig, useTransition } from 'react-spring';

export const useFade = (condition: AnyType, config?: SpringConfig) => {
    const transitions = useTransition(condition, {
        config: {
            duration: 800,
            ...config
        },
        from: { opacity: 0, height: 'auto', transform: 'scale(0) translateX(100%)' },
        enter: { opacity: 1, height: 'auto', transform: 'scale(1) translateX(0px)' },
        leave: { opacity: 0, height: 0, transform: 'scale(0) translateX(-100%)' }
    });

    return (
        TrulyComponent: React.ReactElement,
        FalsyComponent?: React.ReactElement
    ) => transitions((styles, item) => {
        if (FalsyComponent) {
            return (item ? (
                React.cloneElement(TrulyComponent, { style: styles })
            ) : (
                React.cloneElement(FalsyComponent, { style: styles })
            ));
        }

        return item && React.cloneElement(TrulyComponent, { style: styles });
    });
};

export const SomeOtherAnimation = () => null;
