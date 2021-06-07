import styled from "styled-components";
import jiminImg from '../../assets/jimin2.jpg';

export const Container = styled.div`
    max-width: 100vw;
    height: 89vh;
    display: flex;
    justify-content: center;
    align-items: center;

    h1 {
        color: var(--blue);
        font-size: 6rem;
    }

    text-align: center;

    background: url(${jiminImg}) no-repeat center;
`;