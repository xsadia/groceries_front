import styled, { css } from "styled-components";

type ContainerProps = {
    isErrored: boolean;
    isFilled: boolean;
};

export const Container = styled.div<ContainerProps>`

    input {

             
            width: 700px;
            border-radius: .4rem;
            height: 3rem;
            padding: 1rem;
            font-size: 1rem;
            font-weight: 500;
            border: 2px solid lightgray;
            outline: none;
            margin-bottom: 1rem;

            ${(props) => props.isFilled && css`
                color: var(--blue);
                border-color: var(--blue);
            `}

            ${(props) => props.isErrored && css`
                border-color: var(--red);
                color: var(--red);
            `}

            transition: border-color 0.2s;

            &:hover {
                border-color: var(--blue);
            }

            &:focus {
                border-color: var(--blue);
                color: var(--blue);
            }
        }

        span {
            display: block;
            text-align: center;
            color: var(--red);
            margin-bottom: .4rem;
        }
`;