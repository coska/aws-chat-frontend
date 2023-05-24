import * as React from "react";

import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Link from "@mui/material/Link";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

import { Api } from "../api";

function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {"Copyright © "}
            <Link color="inherit" href="https://mui.com/">
                Your Website
            </Link>{" "}
            {new Date().getFullYear()}
            {"."}
        </Typography>
    );
}

const defaultTheme = createTheme();

const Profile = () => {
    const getUserList = async () => {
        const userList = await Api.User.findAll();

        //setUserList(JSON.stringify(userList?.data));
    };

    const getUserInfo = async () => {
        const userList = await Api.User.findById();

        //setUserList(JSON.stringify(userList?.data));
    };

    const updateUser = async () => {
        const userDto = {
            //id: generateGuid(),
            firstName: Math.random().toString(36).substring(2, 15),
            lastName: Math.random().toString(36).substring(2, 15),
        };
        const resp = await Api.User.create(userDto);

        console.log(resp.data);
        //setInsertUser(JSON.stringify(resp.data));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log({
            email: data.get("email"),
            password: data.get("password"),
        });
    };

    return (
        <React.Fragment>
            <ThemeProvider theme={defaultTheme}>
                <Container component="main" maxWidth="xs">
                    <CssBaseline />
                    <Box
                        sx={{
                            marginTop: 9,
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                        }}
                    >
                        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                            <AccountCircleIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            User Profie
                        </Typography>
                        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                            <TextField margin="normal" required fullWidth id="email" name="email" label="Email Address" disabled />
                            <TextField margin="normal" required fullWidth id="firstName" name="firstName" label="First Name" autoFocus />
                            <TextField margin="normal" required fullWidth id="lastName" name="lastName" label="Last Name" />
                            <TextField margin="normal" required fullWidth id="gptKey" name="gptKey" label="GPT Key" autoComplete="gptKey" />
                            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                                Save
                            </Button>
                        </Box>
                    </Box>
                </Container>
            </ThemeProvider>
        </React.Fragment>
    );
};

export default Profile;
