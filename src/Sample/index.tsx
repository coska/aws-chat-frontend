import { useRecoilState, useRecoilValueLoadable } from 'recoil';
import { Container, LeftMenu, Main, Menu } from './components';
import { currentMenuIndexState, menus, Result, resultsSelector } from './state';
import SocketComponent from './websocket';
import { useState } from 'react';

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
            </Main>
        </Container>
    )
}

export default Sample;