import { useRecoilState, useRecoilValueLoadable } from 'recoil';
import { Container, LeftMenu, Main, Menu } from './components';
import { currentMenuIndexState, menus, Result, resultsSelector } from './state';
import SocketComponent from './websocket';
import { useEffect, useState } from 'react';
import { Api } from '../api';
import { UserDto } from '../coska-client';
import { Auth } from 'aws-amplify';


const ResultList = () => {
    const loadable = useRecoilValueLoadable(resultsSelector);

    switch (loadable.state) {
        case 'hasError':
            return (<div>Error</div>);
        case 'loading':
            return (<div>loading...</div>);
        case 'hasValue':
            return (
                <ul>
                    {
                        loadable.contents.map((result: Result) => (
                            <li key={result.name ?? result.title}>
                                {result.name ?? result.title}
                            </li>
                        ))
                    }
                </ul>
            );
    }
}

function generateGuid() {
    let guid = '';
    const hexChars = '0123456789abcdef';

    for (let i = 0; i < 36; i++) {
        if (i === 8 || i === 13 || i === 18 || i === 23) {
            guid += '-';
        } else if (i === 14) {
            guid += '4';
        } else {
            const randomHex = Math.floor(Math.random() * 16);
            guid += hexChars[randomHex];
        }
    }

    return guid;
}


function MyComponent() {
    const [email, setEmail] = useState('');
    const [userList, setUserList] = useState('');
    const [token, setToken] = useState('');
    const [insertedUser, setInsertUser] = useState("");
    useEffect(() => {
        // console.log(`${email}`);
    }, [email]);

    const getToken = async () => {
        const session = await Auth.currentSession();

        setToken(session.getIdToken().getJwtToken());
    }

    const getMyEmail = async () => {
        const resp = await Api.SecurityTest?.getSecurityTest();
        setEmail(resp?.data);

        console.log(generateGuid());
    };

    const getUserList = async () => {
        const userList = await Api.User.findAll();

        setUserList(JSON.stringify(userList?.data));
    }

    const insertUser = async () => {
        const userDto: UserDto = {
            id: generateGuid(),
            firstName: Math.random().toString(36).substring(2, 15),
            lastName: Math.random().toString(36).substring(2, 15)
        }
        const resp = await Api.User.create(userDto);

        console.log(resp.data);
        setInsertUser(JSON.stringify(resp.data));

    }

    return (
        <div>
            <p>ENV_TEST_VARIABLE: {process.env.REACT_APP_CHAT_REMOTE_URL}</p>

            <p>email: {email}</p>
            <button onClick={getMyEmail}>getMyEmail</button>
            <p>token: {token}</p>
            <button onClick={getToken}>getToken</button>
            <p>userList: {userList}</p>
            <button onClick={getUserList}>getUserList</button>
            <p>insert user: {insertedUser}</p>
            <button onClick={insertUser}>insertUser</button>
        </div>
    );

}

const Sample = () => {
    const [currentMenuIndex, setCurrentMenuIndex] = useRecoilState(currentMenuIndexState);
    const [showSocketComponent, setShowSocketComponent] = useState(false);

    return (
        <Container>
            <LeftMenu>
                <ul>
                    {
                        menus.map((menu, index) => (
                            <li key={menu.name}>
                                <Menu
                                    isSelected={index === currentMenuIndex}
                                    onClick={() => setCurrentMenuIndex(index)}>{menu.name}</Menu>
                            </li>
                        ))
                    }
                </ul>
                <label>
                    <input type="checkbox" checked={showSocketComponent} onChange={() => setShowSocketComponent(!showSocketComponent)} />
                    <span>show socket component</span>
                </label>
                {
                    showSocketComponent && <SocketComponent />
                }
            </LeftMenu>
            <Main>
                <ResultList />
                <MyComponent />
            </Main>
        </Container>
    )
}

export default Sample;