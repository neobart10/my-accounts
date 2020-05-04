import { createReducer, on } from '@ngrx/store';
import {Account} from "../models/account.model";
import {setItems, sunSetItems} from "./account.actions";

export interface State {
  items: Account[];
}

export const initialState: State = {
  items: [],
}

const _accountReducer = createReducer(initialState,
  on( setItems, (state, { items }) => ({...state, items: [...items] })),
  on( sunSetItems, state=> ({...state, items: []})),
);

export function accountReducer(state,  action) {
  return _accountReducer(state, action);
}
