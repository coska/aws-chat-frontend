import styled from "styled-components";

export const Container = styled.div`
    display: flex;
    width: 100%;
`;

export const LeftMenu = styled.div`
    // background-color: yellow;
    flex-grow: 1;
`;

export const Main = styled.div`
    // background-color: red;
    flex-grow: 3;
`;

export const Menu = styled.div<{ isSelected: boolean; }>`
    font-weight: ${({isSelected}) => isSelected ? 'bold' : 'normal'};
`;