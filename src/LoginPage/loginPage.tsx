import { useReducer } from "react";
import { INITIAL_LOGIN_PAGE_STATE, LoginPageStateReducer } from './loginPageState';
import { TextField } from '../Components/textField';
import { Button } from '../Components/button';
import { DynamoDbClient } from '../DynamoDbClient/dynamoClient';
import { AppStateAction } from "../appState";
import { ErrorList } from '../Components/errorList';
import { User, DEF_USER } from './../Entities/user';
import { RadioButton } from './../Components/radioButton';

export interface LoginPageProps  {
  dynamoClient: DynamoDbClient;
  updateAppState: React.Dispatch<AppStateAction>
}

export function LoginPage(props: LoginPageProps) {
  const [state, update] = useReducer(LoginPageStateReducer, INITIAL_LOGIN_PAGE_STATE)

  const onSubmitClicked = () => {
    if(state.loginType === 'Login'){
      props.dynamoClient.getItem<User,string>(DEF_USER, state.username)
        .then(user => {
          if(user)
            props.updateAppState({ type: 'login', user: user });
          else
            update({ type: 'updateErrorMessages', errorMessages: [`user with name "${state.username}" not found`]});
        })
    } else if(state.loginType === 'CreateUser'){
      var newUser: User = {
        username: state.username
      };

      props.dynamoClient.insertItem<User,string>(DEF_USER, newUser)
        .then(response => {
          if(response.success)
            props.updateAppState({ type: 'login', user: newUser });
          else
            update({ type: 'updateErrorMessages', errorMessages: [response.errorMessage]})
        })
    }
  }

  return <>
    <h1 className='App' style={{marginBottom: '12rem'}}>The Update</h1>
    <div style={{margin: '10em'}}>
      <ErrorList errorMessages={state.errorMessages}/>
      <div className='App field margin-bottom' style={{marginLeft: '30%', marginRight: '30%'}}>
        <label>Log In</label>
        <RadioButton 
          value='Login'
          checked={state.loginType === 'Login'}
          onSelected={_ => update({ type: 'updateLoginType', loginType: 'Login'})} />
        <label>Create New User</label>
        <RadioButton 
          value='Login'
          checked={state.loginType === 'CreateUser'}
          onSelected={_ => update({ type: 'updateLoginType', loginType: 'CreateUser'})} />
      </div>
      <div className='App field' style={{marginLeft: '40%', marginRight: '40%'}}>
        <label style={{display: 'block'}}>Username</label>
        <TextField
          className='margin-bottom'
          value={state.username}
          onValueChange={value => update({ type: 'updateUsername', username: value })}
        />
        <Button 
          text='Submit'
          onClick={onSubmitClicked}
        />
      </div>
    </div>
  </>
}