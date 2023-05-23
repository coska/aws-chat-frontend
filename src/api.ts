import { ConfigurationParameters, Configuration, SecurityTestControllerApi, UserControllerApi, RoomControllerApi, MessageControllerApi, EmployeeControllerApi } from './coska-client';
import { Auth } from 'aws-amplify';

async function getAccessToken() {
    const session = await Auth.currentSession();
    return session.getIdToken().getJwtToken();
}

function getConfiguration() {

    var remoteUrl = process.env.REACT_APP_CHAT_REMOTE_URL === undefined ? "http://localhost:8080" :
        process.env.REACT_APP_CHAT_REMOTE_URL;
    console.log(remoteUrl);
    const configParameters: ConfigurationParameters = {
        accessToken: getAccessToken,
        basePath: remoteUrl.replace(/\/+$/, ""),
        // basePath: "http://127.0.0.1:8080"
    };

    const config = new Configuration(configParameters);

    return config;
}

export namespace Api {
    export const SecurityTest = new SecurityTestControllerApi(getConfiguration());
    export const User = new UserControllerApi(getConfiguration());
    export const Room = new RoomControllerApi(getConfiguration());
    export const Message = new MessageControllerApi(getConfiguration());
    export const Employee = new EmployeeControllerApi(getConfiguration());
}
