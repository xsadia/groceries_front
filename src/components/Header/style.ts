import styled from "styled-components";

export const Container = styled.header`
    background: var(--blue);
`;

export const Content = styled.div`
    display: flex;
    justify-content: space-between;
    max-width: 1120px;
    margin: 0 auto;
    
    padding: 2rem 1rem 2rem;

    div.logo-box {
        display: flex;
        
        img {
            width: 2rem;
            margin-right: .5rem;
        }

        a {
            color: #fff;
            font-size: 2rem;
            text-decoration: none;
            font-weight: 600;

            span.name-header {
                color: var(--green);
            }
        }
    }

    div.links-box {
        display: flex;
        justify-content: center;
        align-items: center;
        
        a {
            color: #fff;
            text-decoration: none;

            margin-right: 1rem;

            transition: filter 0.2s;

            &:hover {
                filter: brightness(0.9);
            }
        }
    }

    div.name-box {
        display: flex;
        justify-content: center;
        align-items: center;

        h3 {
            display: flex;
            align-items: center;
        }

        span {
            color: var(--green);
        }

        button {
            margin: .2rem 0 0 .4rem;
            background: none;
            border: none;
            color: var(--green);

            transition: filter 0.2s;

            &:hover {
                filter: brightness(0.9);
            }
        }
    }
`;
