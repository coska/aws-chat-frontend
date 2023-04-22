import { useEffect } from "react";
import { Authenticator, useAuthenticator, View } from '@aws-amplify/ui-react';
import { useNavigate, useLocation } from 'react-router';
import { Container } from "@mui/material";

const Login = () => {
    const { route } = useAuthenticator((context) => [context.route]);
    const location = useLocation();
    const navigate = useNavigate();
    const from = location.state?.from?.pathname || '/rooms';

    useEffect(() => {
        if (route === 'authenticated') {
            navigate(from, { replace: true });
        }
    }, [route, navigate, from]);
    
    return (
        <Container sx={{ marginTop: "100px" }}>
            <View className="auth-wrapper">
                <Authenticator />
            </View>                
        </Container>
    );
}

export default Login;