import styled from "styled-components";

export const Container = styled.div`
    max-width: 1120px;
    margin: 0 auto;
    display: flex;
    justify-content: center;
`;

export const Content = styled.div`
    max-width: 700px;
    display: flex;
    flex-direction: column;

    section {
        ul {
            
            li {
                display: flex;
                justify-content: space-between;
                align-items: center;
                height: 40px;
                background: #fff;
                padding: 0 1rem;

                border-style: solid;
                border-color: #25b883;
                border-radius: 0;
                border-width: 2px 2px 0 2px;

                h3 {
                    width: 250px;
                    display: flex;
                    justify-content: space-between;
                }

                svg {
                    padding-top: 2px;
                }
                

                button {
                    border: 0;
                    background: none;
                    transition: color .2s;
                    &:hover {
                        color: #c90425;
                    }
                }

                &:last-child {
                    border-width: 2px 2px 2px 2px;
                    border-radius: 0 0 .4rem .4rem;
                }

                & + div {
                    border-radius: 0;

                }
            }

            
        }
    }

    form {
        div {
            display: flex;

            input {
                width: 344px;
                margin-right: 1rem;
            }
        }
        margin-top: 1.5rem;
    }

    header {
        border-style: solid;
        border-color: #25b883;
        border-width: 2px 2px 0 2px;
        border-radius:.4rem .4rem 0 0 ;
        width: 700px;
        background: var(--green);
        color: #fff;
        margin-top: 4rem;
        text-align: center;
    }
`;