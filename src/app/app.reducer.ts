import { ActionReducerMap } from '@ngrx/store';
import * as ui from "./shared/ui.reducer";
import * as auth from "./auth/auth.reducer";
import * as account from "./my-accounts/account.reducer"

export interface AppState {
  ui: ui.State,
  user: auth.State,
  //account: account.State,
}

export const appReducers: ActionReducerMap<AppState> = {
  ui: ui.uiReducer,
  user: auth.authReducer,
  //account: account.accountReducer,
}
