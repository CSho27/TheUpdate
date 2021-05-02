import { useReducer } from "react";
import { INITIAL_LOGIN_PAGE_STATE, LoginPageStateReducer } from './loginPageState';
import { TextField } from '../Components/textField';
import { Button } from '../Components/button';
import { DynamoDbClient } from '../DynamoDbClient/dynamoClient';
import { AppStateAction } from "../appState";
import { ErrorList } from '../Components/errorList';
import { User, DEF_USER } from './../Entities/user';

export interface LoginPageProps  {
  dynamoClient: DynamoDbClient;
  updateAppState: React.Dispatch<AppStateAction>
}

export function LoginPage(props: LoginPageProps) {
  const [state, update] = useReducer(LoginPageStateReducer, INITIAL_LOGIN_PAGE_STATE)

  const onSubmitClicked = () => {
    props.dynamoClient.getItem<User,string>(DEF_USER, state.username)
      .then(user => {
        if(user)
          props.updateAppState({ type: 'logIn', user: user });
        else
        update({ type: 'updateErrorMessages', errorMessages: [`user with name "${state.username}" not found`]});
      })
  }

  return <>
    <h1 className='App' style={{marginBottom: '12rem'}}>The Update</h1>
    <div style={{margin: '10em'}}>
      <ErrorList errorMessages={state.errorMessages}/>
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