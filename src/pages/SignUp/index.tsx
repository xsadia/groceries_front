import { useCallback, useRef } from "react";
import { FiUser } from "react-icons/fi";
import { Header } from "../../components/Header";
import { Container, FormContainer } from "./styles";
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import { apiClient } from '../../services/api';
import { Input } from "../../components/Input";
import { getValidationErrors } from '../../utils/getValidationError';
import * as Yup from 'yup';
import { useHistory } from "react-router";
import { Button } from "../../components/Button";

type SignUpFormData = {
    name: string;
    email: string;
    password: string;
};

export function SignUp() {
    const formRef = useRef<FormHandles>(null);
    const history = useHistory();

    const handleSubmit = useCallback(async (data: SignUpFormData) => {
        try {
            formRef.current?.setErrors({});

            const schema = Yup.object().shape({
                name: Yup.string().required('Nome obrigatório'),
                email: Yup.string().required('E-mail obrigatório').email('Digite um e-mail válido'),
                password: Yup.string().min(6, 'Senha de no mínimo 6 digitos')
            });

            await schema.validate(data, {
                abortEarly: false
            });

            await apiClient.post('/users', data);

            history.push('/');

        } catch (err) {
            const errors = getValidationErrors(err);
            formRef.current?.setErrors(errors);
        }
    }, [history]);

    return (
        <>
            <Header headerLinks={[{ url: '/', title: 'Login' }]} />
            <Container>
                <FormContainer>
                    <h1>Cadastrar <FiUser /></h1>
                    <Form ref={formRef} onSubmit={handleSubmit}>
                        <label htmlFor="">E-mail</label>
                        <Input
                            name="email"
                            type="text"
                            placeholder="E-mail"
                        />

                        <label htmlFor="">Nome</label>
                        <Input
                            name="name"
                            type="text"
                            placeholder="Nome"
                        />

                        <label htmlFor="">Senha</label>
                        <Input
                            name="password"
                            type="password"
                            placeholder="Senha"
                        />
                        <Button type="submit">Submit</Button>
                    </Form>
                </FormContainer>
            </Container>
        </>
    );
};