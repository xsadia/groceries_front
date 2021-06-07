import styled from "styled-components";

export const Container = styled.div`
    max-width: 1120px;
    margin: 0 auto;
`;

export const FormContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;

    h1 {
        margin: 4rem 0;
        display: flex;
        align-items: center;

        
        svg {
              margin-left: 1rem;
              color: var(--blue);
        }
    }

    form {
        display: flex;
        flex-direction: column;
        align-items: center;

        label {
            font-weight: 500;
            font-size: 1.5rem;
            margin-bottom: 1rem;
        }
    }
`;