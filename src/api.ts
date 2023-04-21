import { ConfigurationParameters, Configuration, SecurityTestControllerApi, UserControllerApi, RoomControllerApi, MessageControllerApi, EmployeeControllerApi } from './coska-client';
import { Auth } from 'aws-amplify';

async function getAccessToken() {
    const session = await Auth.currentSession();
    return session.getIdToken().getJwtToken();
}

function getConfiguration() {
    const configParameters: ConfigurationParameters = {
        accessToken: getAccessToken,
        basePath: "http://localhost:8080".replace(/\/+$/, ""),
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
