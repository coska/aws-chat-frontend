import { useRecoilState, useRecoilValueLoadable } from 'recoil';
import { Container, LeftMenu, Main, Menu } from './components';
import { currentMenuIndexState, menus, Result, resultsSelector } from './state';

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
            </LeftMenu>
            <Main>
                <ResultList />
            </Main>
        </Container>
    )
}

export default Sample;