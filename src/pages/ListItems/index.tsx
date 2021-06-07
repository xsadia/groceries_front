import { Form } from "@unform/web";
import { FormHandles } from '@unform/core';
import { useCallback, useEffect, useRef, useState } from "react";
import { FiFrown, FiTrash2 } from "react-icons/fi";
import { useHistory, useRouteMatch } from "react-router";
import { Button } from "../../components/Button";
import { Header } from "../../components/Header";
import { Input } from "../../components/Input";
import { useAuth } from "../../hooks/Auth";
import { apiClient } from "../../services/api";
import { Container, Content } from "./style";

type ListParams = {
    id: string;
};

type Item = {
    id: string;
    content: string;
    quantity: number;
};

type ListState = {
    title: string;
    itemList: Item[];
};

type FormData = {
    content: string;
    quantity: number;
};

export function ListItems() {

    const formRef = useRef<FormHandles>(null);

    const [list, setList] = useState<ListState>({} as ListState);

    const [items, setItems] = useState<Item[]>([]);

    const { params } = useRouteMatch<ListParams>();

    const { user, token } = useAuth();

    const history = useHistory();

    async function handleSubmit(data: FormData) {

        if (data.content === "" || data.content === " ") {
            return;
        }

        const response = await apiClient.post(`/lists/${params.id}/item`, data, {
            headers: {
                'Authorization': `bearer ${token}`
            }
        });

        setItems([...items, response.data]);

        formRef.current?.reset();
    }

    async function handleClick(id: string) {
        await apiClient.delete(`/lists/${params.id}/item/${id}`, {
            headers: {
                'Authorization': `bearer ${token}`
            }
        });

        const remainingItems = items.filter(item => item.id !== id);

        setItems(remainingItems);
    }

    const getList = useCallback(async () => {
        try {
            const response = await apiClient.get(`/lists/${params.id}`, {
                headers: {
                    'Authorization': `bearer ${token}`
                }
            });

            setList(response.data);
            setItems(response.data.itemList);
        } catch {
            history.push('/homepage');
        }
    }, [token, params.id, history]);

    useEffect(() => {
        getList();

    }, [getList]);
    return (
        <>
            <Header headerLinks={[{ title: 'Home page', url: '/homepage' }]} user={user.name} />
            <Container>
                <Content>
                    <header>
                        <h1>{list.title}</h1>
                    </header>
                    <div>
                        <section>
                            {items.length !== 0 ? items.map(item => (
                                <div key={item.id} >
                                    <h3>{item.content}</h3>
                                    <strong>{item.quantity} {item.quantity > 0 ? item.quantity > 1 ? 'unidades' : 'unidade' : ''}</strong>
                                    <button onClick={() => handleClick(item.id)} ><FiTrash2 size={20} /></button>
                                </div>
                            )) :
                                <div>
                                    <h3>Nenhum item registrado</h3>
                                    <strong><FiFrown size={20} /></strong>
                                </div>
                            }
                        </section>
                        <Form ref={formRef} onSubmit={handleSubmit}>
                            <div>
                                <Input
                                    name="content"
                                    type="text"
                                    placeholder="item"
                                />
                                <Input
                                    name="quantity"
                                    type="number"
                                    placeholder="quantidade"
                                />
                            </div>
                            <Button>Submit</Button>
                        </Form>
                    </div>

                </Content>
            </Container>
        </>
    );
}