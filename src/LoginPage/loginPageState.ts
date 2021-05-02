export type LoginType = 'Login' | 'CreateUser';

export interface LoginPageState {
  loginType: LoginType;
  username: string;
  errorMessages: string[];
}

export type LoginPageAction =
| { type: 'updateLoginType', loginType: LoginType }
| { type: 'updateUsername', username: string }
| { type: 'updateErrorMessages', errorMessages: string[] }

export function LoginPageStateReducer(state: LoginPageState, action: LoginPageAction): LoginPageState {
  switch(action.type){
    case 'updateLoginType':
      return {
        ...state,
        loginType: action.loginType
      }
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
  loginType: 'Login',
  username: '',
  errorMessages: []
}