import { AnyType } from 'app/common/types';

const hasOwnPropery = <O extends Record<string, AnyType>, P extends PropertyKey>
(obj: O, prop: P): obj is O & Record<P, AnyType> => (
    Object.prototype.hasOwnProperty.call(obj, prop)
);

export default hasOwnPropery;
