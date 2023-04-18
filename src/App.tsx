import { Authenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { RecoilRoot } from "recoil";

import Container from "@mui/material/Container";

import { Amplify } from "aws-amplify";
import Sample from "./Sample";
import ServerSentEvents from "./Sample/ServerSentEvents";
import SockJSWebsocket from "./Sample/SockJSWebsocket";
import awsConfig from "./aws-exports";
import Header from "./shared/layout/Header";
import Rooms from "./chat/Rooms";
import Box from "@mui/material/Box";

Amplify.configure(awsConfig);

const App = () => {
    return (
        <RecoilRoot>
            <BrowserRouter>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <Authenticator>
                        {(props) => {
                            const { signOut, user } = props;
                            return (
                                <Box sx={{ display: "flex" }}>
                                    <Header user={user} signOut={signOut} />

                                    <Routes>
                                        <Route path="/rooms" element={<Rooms />} />
                                        <Route path="/websocket" element={<SockJSWebsocket />} />
                                        <Route path="/websocket" element={<SockJSWebsocket />} />
                                        <Route path="/sse" element={<ServerSentEvents />} />
                                        <Route path="*" element={<Sample />} />
                                    </Routes>
                                </Box>
                            );
                        }}
                    </Authenticator>
                </LocalizationProvider>
            </BrowserRouter>
        </RecoilRoot>
    );
};

export default App;
