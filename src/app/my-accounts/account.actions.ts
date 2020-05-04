//Actions
import {createAction, props} from '@ngrx/store';
import {Account} from "../models/account.model";

export const sunSetItems = createAction('[Accounts] unSet Items');
export const setItems = createAction(
  '[Accounts] Set Items',
  props<{ items: Account[] }>()
);
