import { ButtonHTMLAttributes, FC } from "react";
import { Container } from "./style";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {

}

export const Button: FC<ButtonProps> = ({ children, ...rest }) => {
    return (
        <Container>
            <button {...rest} >{children}</button>
        </Container>
    );
};