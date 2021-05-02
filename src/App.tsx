import { useReducer } from 'react';
import './Content/App.css';
import './Content/styles.css';
import { AppStateReducer, INITIAL_APP_STATE } from './appState';
import { LoginPage } from './LoginPage/loginPage';
import { DynamoDbClient } from './DynamoDbClient/dynamoClient';
import { HomePage } from './HomePage/homePage';

function App() {
  const [state, update] = useReducer(AppStateReducer, INITIAL_APP_STATE);
  const dynamoClient = new DynamoDbClient();

  switch(state.page){
    case 'Login':
      return <LoginPage 
        dynamoClient={dynamoClient}
        updateAppState={update}/>
    case 'Home':
      if(!state.user)
        throw 'User must be set to navigate to home page';

      return <HomePage 
        user={state.user}
      />
    default:
      return <h1>This page has not been configured</h1>;
  }
}

export default App;
