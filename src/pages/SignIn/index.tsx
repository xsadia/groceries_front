import { Form } from "@unform/web";
import { FiLogIn } from "react-icons/fi";
import { Header } from "../../components/Header";
import { Input } from "../../components/Input";
import { Container, FormContainer } from "./styles";
import { FormHandles } from "@unform/core";
import { useRef, useCallback } from "react";
import { getValidationErrors } from "../../utils/getValidationError";
import { useAuth } from '../../hooks/Auth';
import * as Yup from 'yup';
import { Button } from "../../components/Button";

type SignInFormData = {
    email: string;
    password: string;
};

export function SignIn() {

    const formRef = useRef<FormHandles>(null);

    const { signIn } = useAuth();

    //const history = useHistory();

    const handleSubmit = useCallback(async (data: SignInFormData) => {
        try {
            formRef.current?.setErrors({});

            const schema = Yup.object().shape({
                email: Yup.string().required('E-mail obrigatório').email('Digite um e-mail válido'),
                password: Yup.string().required('Senha obrigatória')
            });

            await schema.validate(data, {
                abortEarly: false
            });

            await signIn({
                email: data.email,
                password: data.password
            });

        } catch (err) {
            const errors = getValidationErrors(err);
            formRef.current?.setErrors(errors);
        }
    }, [signIn]);

    return (
        <>
            <Header headerLinks={[{ url: '/signup', title: 'Cadastrar' }]} />
            <Container>
                <FormContainer>
                    <h1>Login <FiLogIn /> </h1>
                    <Form ref={formRef} onSubmit={handleSubmit} >
                        <label htmlFor="">E-mail</label>
                        <Input name="email" type="text" placeholder="E-mail" />
                        <label htmlFor="">Senha</label>
                        <Input name="password" type="password" placeholder="Senha" />
                        <Button type="submit" >Submit</Button>
                    </Form>
                </FormContainer>
            </Container>
        </>
    );
};