import {atom} from 'recoil';

export const currentFloorState = atom({
    key: 'currentFloor',
    default: 0,
  });

  export const liftDirectionStateAtom = atom({
    key: 'liftDirection',
    default: '',
  });