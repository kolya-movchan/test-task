import { Reducer } from "types/Reducer";

type Add = { type: typeof Reducer.NEWUSERID, payload: number };
type Remove = { type: typeof Reducer.REMOVEDUSERID };

type Action = Add;

export const add = (id: number): Add => ({
    type: Reducer.NEWUSERID,
    payload: id,
  });

export const remove = (): Remove => ({
  type: Reducer.REMOVEDUSERID,
});

export const actions = { add, remove };

const newUserIdReducer = (userStored = 0, action: Action): number => {
  switch (action.type) {
    case Reducer.NEWUSERID:
      return action.payload;
  
    case Reducer.REMOVEDUSERID:
      return 0;

    default: return userStored;
  }
};

export default newUserIdReducer;

