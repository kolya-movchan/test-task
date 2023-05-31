import { ErrorObject } from "types/Error";
import { Reducer } from "types/Reducer";

// type of action creator
type NameIsWrong = {
  type: typeof Reducer.NAMEISWRONG,
  errorName: boolean,
  errorTextName: string
};

// action creator
export const notifyWrongName = (status: boolean, value = ''): NameIsWrong => ({
  type: Reducer.NAMEISWRONG,
  errorName: status,
  errorTextName: value,
});

type EmailIsWrong = {
  type: typeof Reducer.EMAILISWRONG,
  errorEmail: boolean,
  errorTextEmail: string
};

export const notifyWrongEmail = (status: boolean, value = ''): EmailIsWrong => ({
  type: Reducer.EMAILISWRONG,
  errorEmail: status,
  errorTextEmail: value,
});

type PhoneIsWrong = {
  type: typeof Reducer.PHONEISWRONG,
  errorPhone: boolean,
  errorTextPhone: string
};

export const notifyWrongPhone = (status: boolean, value = ''): PhoneIsWrong => ({
  type: Reducer.PHONEISWRONG,
  errorPhone: status,
  errorTextPhone: value,
});

type FileIsWrong = {
  type: typeof Reducer.FILEISWRONG,
  errorFile: boolean,
  errorTextFile: string
};

export const notifyWrongFile = (status: boolean, value = ''): FileIsWrong => ({
  type: Reducer.FILEISWRONG,
  errorFile: status,
  errorTextFile: value,
});

// object of action creators
export const actions = {
  notifyWrongName,
  notifyWrongEmail,
  notifyWrongPhone,
  notifyWrongFile,
};

// all possible Action types
type Action = NameIsWrong
  | EmailIsWrong
  | PhoneIsWrong
  | FileIsWrong;

// type of our Redux state
export type State = ErrorObject;

// our initial errors Redux state
const initial: State = {
  errorName: false,
  errorTextName: '',
  errorEmail: false,
  errorTextEmail: '',
  errorPhone: false,
  errorTextPhone: '',
  errorFile: false,
  errorTextFile: '',
}

// error reducer which updates state depending on the passed type of action creator
const errorReducer = (errorsStored = initial, action: Action): State => {
  switch (action.type) {
    case Reducer.NAMEISWRONG: {
      const { errorName, errorTextName } = action;

      return {
        ...errorsStored,
        errorName,
        errorTextName,
      }
    }

      case Reducer.EMAILISWRONG: {
        const { errorEmail, errorTextEmail } = action;

        return {
          ...errorsStored,
          errorEmail,
          errorTextEmail,
        }
      }

      case Reducer.PHONEISWRONG: {
        const { errorPhone, errorTextPhone } = action;

        return {
          ...errorsStored,
          errorPhone,
          errorTextPhone,
        }
      }

      case Reducer.FILEISWRONG: {
        const { errorFile, errorTextFile } = action;

        return {
          ...errorsStored,
          errorFile,
          errorTextFile,
        }
      }

    default:
      return errorsStored;
  }
};

export default errorReducer;
