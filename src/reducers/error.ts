import { Reducer } from "types/Reducer";
// import { Error } from '../types/Error';

type NameIsShort = {
  type: typeof Reducer.NAMEISSHORT,
  errorName: boolean,
  errorTextName: string
};

export const notifyShortName = (value: string): NameIsShort => ({
  type: Reducer.NAMEISSHORT,
  errorName: true,
  errorTextName: value,
});

type ResetNameError = {
  type: typeof Reducer.NAMERESET,
  errorName: boolean,
  errorTextName: string
};

export const resetName = (): ResetNameError => ({
  type: Reducer.NAMERESET,
  errorName: false,
  errorTextName: '',
});

export const actions = {
  notifyShortName,
  resetName,
};

type Action = NameIsShort | ResetNameError;

export type State = { [key: string]: boolean | string };

const initial: State = {
  errorName: false,
  errorTextName: '',
  errorEmail: false,
  errorTextEmail: '',
  errorPhone: false,
  errorTextPhone: '',
  errorFile: false,
  errorTextFile: ''
}

const errorReducer = (errorsStored = initial, action: Action): State => {
  const { type, errorName, errorTextName } = action;

  switch (type) {
    case Reducer.NAMEISSHORT:
      return {
        ...errorsStored,
        errorName,
        errorTextName,
      }

    case Reducer.NAMERESET:
      return {
        ...errorsStored,
        errorName,
        errorTextName,
      }

    default:
      return errorsStored;
  }
};

export default errorReducer;
