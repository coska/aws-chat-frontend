import React from 'react';
import { RecoilRoot } from 'recoil';
import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import { Amplify } from "aws-amplify";
import awsConfig from './aws-exports';
import Sample from './Sample';

Amplify.configure(awsConfig);

const App = () => {
  return (
    <RecoilRoot>
      <Authenticator>
        {(props) => {
          const { signOut, user } = props;
          return (
            <main>
              <h1>Hello {user?.attributes?.email}</h1>
              <button onClick={signOut}>Sign out</button>
              <Sample />
            </main>
          );
        }}
      </Authenticator>
    </RecoilRoot>
  );
};

export default App;