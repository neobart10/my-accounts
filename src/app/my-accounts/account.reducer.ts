import { createReducer, on } from '@ngrx/store';
import {Account} from "../models/account.model";
import {setItems, sunSetItems} from "./account.actions";
import {AppState} from "../app.reducer";

export interface State {
  items: Account[];
}

export interface AppStateWithAccount extends AppState{
  account: State;
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
