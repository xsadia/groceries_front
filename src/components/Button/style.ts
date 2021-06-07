import styled from "styled-components";

export const Container = styled.div`
    button {
        border-radius: .4rem;
        width: 700px;
        height: 3rem;
        background: var(--blue);
        color: #fff;
        border: none;
        font-size: 1rem;
        font-weight: 500;
        margin-top: 1rem;

        transition: filter 0.2s;
        &:hover {
            filter: brightness(0.9);
        }
    }
`;