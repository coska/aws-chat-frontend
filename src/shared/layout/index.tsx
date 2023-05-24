import { Outlet, Link as RouterLink } from "react-router-dom";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useAuthenticator } from "@aws-amplify/ui-react";
import { AppBar, Button, Toolbar, Box, Stack, CssBaseline, Link, Typography } from "@mui/material";

const Layout = () => {
    const { route, user, signOut } = useAuthenticator((context) => [context.route, context.user, context.signOut]);

    const mdTheme = createTheme();

    return (
        <ThemeProvider theme={mdTheme}>
            <Box sx={{ display: "flex" }}>
                <CssBaseline />
                <AppBar position="absolute" color="default" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
                    <Toolbar sx={{ flexWrap: "wrap" }}>
                        <Typography variant="h6" color="inherit" noWrap sx={{ flexGrow: 1 }}>
                            COSKA AWS Study Group
                        </Typography>
                        <nav>
                            <Link component={RouterLink} variant="button" underline="none" color="text.primary" to="/recoil" sx={{ my: 1, mx: 1.5 }}>
                                Recoil
                            </Link>
                            <Link component={RouterLink} variant="button" underline="none" color="text.primary" to="/websocket" sx={{ my: 1, mx: 1.5 }}>
                                Websocket
                            </Link>
                            <Link component={RouterLink} variant="button" underline="none" color="text.primary" to="/sse" sx={{ my: 1, mx: 1.5 }}>
                                Server Sent Events
                            </Link>
                            <Link component={RouterLink} variant="button" underline="none" color="text.primary" to="/rooms" sx={{ my: 1, mx: 1.5 }}>
                                Chat Rooms
                            </Link>
                        </nav>
                        {route === "authenticated" && (
                            <>
                                <Stack direction="row" alignItems="center" gap={1}>
                                    <AccountCircleIcon />
                                    <Link component={RouterLink} variant="button" underline="none" color="text.primary" to="/profile" sx={{ my: 1, mx: 1.5 }}>
                                        <Typography variant="body1">Hello {user?.attributes?.email}</Typography>
                                    </Link>
                                </Stack>
                                <Button href="#" variant="outlined" sx={{ my: 1, mx: 1.5 }} onClick={signOut}>
                                    Sign out
                                </Button>
                            </>
                        )}
                    </Toolbar>
                </AppBar>

                <Outlet />
            </Box>
        </ThemeProvider>
    );
};

export default Layout;
