import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import { Amplify } from "aws-amplify";
import awsConfig from './aws-exports';

Amplify.configure(awsConfig);

const App = () => {
  return (
    <Authenticator>
      {(props) => {
        const { signOut, user } = props;
        return (
          <main>
            <h1>Hello {user?.attributes?.email}</h1>
            <button onClick={signOut}>Sign out</button>
          </main>
        );
      }}
    </Authenticator>
  );
};

export default App;