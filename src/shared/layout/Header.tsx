import React from "react";

import { Link as RouterLink } from "react-router-dom";

import PeopleIcon from "@mui/icons-material/People";
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import GlobalStyles from "@mui/material/GlobalStyles";
import Link from "@mui/material/Link";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { IconButton, Menu } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Stack from "@mui/material/Stack";

function Header(props: any) {
    const { signOut, user } = props;
    return (
        <React.Fragment>
            <CssBaseline />
            <AppBar position="fixed" color="default" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
                <Toolbar sx={{ flexWrap: "wrap" }}>
                    <Typography variant="h6" color="inherit" noWrap sx={{ flexGrow: 1 }}>
                        COSKA AWS Study Group
                    </Typography>
                    <nav>
                        <Link component={RouterLink} variant="button" underline="none" color="text.primary" to="/" sx={{ my: 1, mx: 1.5 }}>
                            Recoil
                        </Link>
                        <Link component={RouterLink} variant="button" underline="none" color="text.primary" to="/websocket" sx={{ my: 1, mx: 1.5 }}>
                            Websocket
                        </Link>
                        <Link component={RouterLink} variant="button" underline="none" color="text.primary" to="/rooms" sx={{ my: 1, mx: 1.5 }}>
                            Chat Rooms
                        </Link>
                        <Link component={RouterLink} variant="button" underline="none" color="text.primary" to="/profile" sx={{ my: 1, mx: 1.5 }}>
                            Profile
                        </Link>
                    </nav>
                    <Stack direction="row" alignItems="center" gap={1}>
                        <AccountCircleIcon />
                        <Typography variant="body1">Hello {user?.attributes?.email}</Typography>
                    </Stack>
                    <Button href="#" variant="outlined" sx={{ my: 1, mx: 1.5 }} onClick={signOut}>
                        Sign out
                    </Button>
                </Toolbar>
            </AppBar>
        </React.Fragment>
    );
}

export default Header;
