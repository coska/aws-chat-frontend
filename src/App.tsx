import { Authenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { RecoilRoot } from "recoil";
import { Amplify } from "aws-amplify";
import Sample from "./Sample";
import ServerSentEvents2 from "./Sample/ServerSentEvents2";
import SockJSWebsocket from "./Sample/SockJSWebsocket";
import awsConfig from "./aws-exports";
import Layout from "./shared/layout";
import Rooms from "./chat/Rooms";
import RequireAuth from "./shared/RequireAuth";
import Login from "./shared/Login";

Amplify.configure(awsConfig);

const App = () => {
    return (
        <RecoilRoot>
            <Authenticator.Provider>
                <BrowserRouter>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <Routes>
                            <Route path="/" element={<Layout />}>
                                <Route index element={<Login />} />
                                <Route
                                    path="/rooms"
                                    element={
                                        <RequireAuth>
                                            <Rooms />
                                        </RequireAuth>
                                    }
                                />
                                <Route
                                    path="/websocket"
                                    element={
                                        <RequireAuth>
                                            <SockJSWebsocket />
                                        </RequireAuth>
                                    }
                                />
                                <Route
                                    path="/sse"
                                    element={
                                        <RequireAuth>
                                            <ServerSentEvents2 />
                                        </RequireAuth>
                                    }
                                />
                                <Route
                                    path="*"
                                    element={
                                        <RequireAuth>
                                            <Sample />
                                        </RequireAuth>
                                    }
                                />
                            </Route>
                        </Routes>
                    </LocalizationProvider>
                </BrowserRouter>
            </Authenticator.Provider>
        </RecoilRoot>
    );
};

export default App;
