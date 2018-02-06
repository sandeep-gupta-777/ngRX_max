import * as AuthActions from "./auth.actions";


export interface AppState{
  auth:State;
}
/*this is just the partial state: how would my state look in this part of the application*/
export interface State{
  token:string,
  authenticated:boolean
}
const InitialState:State = {
  token:null,
  authenticated:false
};

export function authReducer(state=InitialState, action: AuthActions.AuthActions){
  switch (action.type){
    case (AuthActions.SIGNIN):
    case (AuthActions.SIGNUP):
      return {
        ...state,
        authenticated:true
      };
    case (AuthActions.LOGOUT):
      return{
        ...state,
        token:null,
        authenticated:false
      }
     case (AuthActions.SET_TOKEN):
      return{
        ...state,
        token:action.payload
      }
  }
  return state;
}
