import styled from "styled-components";

export const Container = styled.div`
    max-width: 1120px;
    margin: 0 auto;
`;

export const Content = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    a {
        text-decoration: none;
    }

    section {
        display: flex;
        justify-content: space-between;
        align-items: center;

        width: 700px;
        background: var(--shape);
        margin-bottom: 1rem;
        padding: 1rem 1rem;
        border: 2px solid var(--shape);
        border-radius: .4rem;
        transition: border-color 0.2s;

        button {
                background: var(--shape);
                border: none;
                transition: color 0.2s;
                color: var(--blue);

                &:hover {
                    color:  #c90425;
                }
            }

        &:first-child {
            margin-top: 1rem;
        }

        

        &:hover {
            color: var(--blue);
            border-color: var(--blue);
        }

        div {
            width: 630px;
            color: var(--blue);
            strong {
                text-align: center;
            }
        }
    }

    div.no-items-box {
        h1 {
            margin-top: 4rem;
            text-align: center;
        }

        h2 {
            display: flex;
            align-items: center;
            
            svg {
                margin-left: .4rem;
            }
        }
    }
`;