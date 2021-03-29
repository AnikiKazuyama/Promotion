import { AnyType } from 'app/common/types';
import { SpringConfig, useTransition } from 'react-spring';

export const useFade = (condition: AnyType, config?: SpringConfig) => {
    const transitions = useTransition(condition, null, {
        config: {
            duration: 800,
            ...config
        },
        from: { opacity: 0, height: 'auto' },
        enter: { opacity: 1, height: 'auto' },
        leave: { opacity: 0, height: 0 }
    });
    return transitions;
};

export const SomeOtherAnimation = () => null;
