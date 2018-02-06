

//this is global App state
import * as fromShoppingList from "../shopping-list/store/shopping-list.reducers";
import * as fromAuth from "../auth/store/auth.reducers";
import {ActionReducerMap} from "@ngrx/store";
import {shoppingListReducer} from "../shopping-list/store/shopping-list.reducers";

export interface AppState{
  shoppingList:fromShoppingList.State,
  auth: fromAuth.State
}

export const reducers:ActionReducerMap<AppState> = {
  shoppingList:fromShoppingList.shoppingListReducer,
  auth:fromAuth.authReducer
};
