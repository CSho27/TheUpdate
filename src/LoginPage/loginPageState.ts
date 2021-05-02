export interface LoginPageState {
  username: string;
  errorMessages: string[];
}

export type LoginPageAction =
| { type: 'updateUsername', username: string }
| { type: 'updateErrorMessages', errorMessages: string[] }

export function LoginPageStateReducer(state: LoginPageState, action: LoginPageAction): LoginPageState {
  switch(action.type){
    case 'updateUsername':
      return {
        ...state,
        username: action.username
      }
    case 'updateErrorMessages':
      return {
        ...state,
        errorMessages: action.errorMessages
      }
  }
}

export const INITIAL_LOGIN_PAGE_STATE: LoginPageState = {
  username: '',
  errorMessages: []
}