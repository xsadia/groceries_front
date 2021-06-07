import { Form } from "@unform/web";
import { Button } from "../../components/Button";
import { Header } from "../../components/Header";
import { Container } from "./style";
import { Input } from "../../components/Input";
import { useAuth } from "../../hooks/Auth";
import { FormContainer } from "./style";
import { FiClipboard } from "react-icons/fi";
import { apiClient } from "../../services/api";
import { useHistory } from "react-router";

type CreateListFormData = {
    title: string;
};

export function CreateListPage() {
    const { user, token } = useAuth();
    const history = useHistory();

    async function handleSubmit(data: CreateListFormData) {

        if (data.title === "" || data.title === " ") {
            return;
        }

        await apiClient.post('/lists', data, {
            headers: {
                'Authorization': `bearer ${token}`
            }
        });

        history.push('/homepage');
    }

    return (
        <>
            <Header headerLinks={[{ title: "Home Page", url: "/homepage" }]} user={user.name} />

            <Container>
                <FormContainer>
                    <h1>Crie sua lista <FiClipboard /></h1>
                    <Form onSubmit={handleSubmit}>
                        <Input
                            name="title"
                            type="text"
                            placeholder="Titulo"
                        />

                        <Button>Submit</Button>
                    </Form>
                </FormContainer>
            </Container>
        </>
    );
}