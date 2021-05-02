import { User } from './Entities/user';

export type Page = 'Login' | 'Home';

export interface AppState {
  page: Page;
  user: User | null;
}

export type AppStateAction =
| { type: 'logIn', user: User }
| { type: 'changePage', page: Page } 

export function AppStateReducer(state: AppState, action: AppStateAction): AppState {
  switch(action.type){
    case 'changePage':
      return {
        ...state,
        page: action.page
      }
    case 'logIn':
      return {
        ...state,
        user: action.user,
        page: 'Home'
      }
  }
}

export const INITIAL_APP_STATE: AppState = {
  page: 'Login',
  user: null
}