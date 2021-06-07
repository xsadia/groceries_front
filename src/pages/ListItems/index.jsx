import { Form } from "@unform/web";
/* import { FormHandles } from '@unform/core'; */
import { useCallback, useEffect, useRef, useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { FiFrown, FiTrash2 } from "react-icons/fi";
import { useHistory, useRouteMatch } from "react-router";
import { Button } from "../../components/Button";
import { Header } from "../../components/Header";
import { Input } from "../../components/Input";
import { useAuth } from "../../hooks/Auth";
import { apiClient } from "../../services/api";
import { Container, Content } from "./style";

/* type ListParams = {
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
}; */



export function ListItems() {

    const formRef = useRef(null);

    const [list, setList] = useState({});

    const [items, setItems] = useState([]);

    const { params } = useRouteMatch();

    const { user, token } = useAuth();

    const history = useHistory();



    async function handleSubmit(data) {

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

    async function handleClick(id) {
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

            setItems(response.data.itemList)
        } catch {
            history.push('/homepage');
        }
    }, [token, params.id, history]);

    useEffect(() => {
        getList();
    }, [getList]);

    function handleOndragEnd(result) {
        if (!result.destination) {
            return;
        }

        const itemsArr = reorder(
            items,
            result.source.index,
            result.destination.index
        )

        setItems(itemsArr)
    }

    const reorder = (list, startIndex, endIndex) => {
        const result = Array.from(list);
        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);

        return result;
    };

    return (
        <>
            <Header headerLinks={[{ title: 'Home page', url: '/homepage' }]} user={user.name} />
            <Container>
                <Content>
                    <header>
                        <h1>{list.title}</h1>
                    </header>
                    <div>

                        <DragDropContext onDragEnd={handleOndragEnd} >
                            <Droppable droppableId="itens" >
                                {(provided) => (
                                    <section {...provided.droppableProps} ref={provided.innerRef} >
                                        <ul >
                                            {items.length !== 0 ? items.map((item, index) => (
                                                <Draggable key={item.id} draggableId={item.id} index={index} >
                                                    {(provided) => (
                                                        <li {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef} >
                                                            <h3>{item.content}</h3>
                                                            <strong>{item.quantity} {item.quantity > 0 ? item.quantity > 1 ? 'unidades' : 'unidade' : ''}</strong>
                                                            <button onClick={() => handleClick(item.id)} ><FiTrash2 size={20} /></button>
                                                        </li>
                                                    )}
                                                </Draggable>
                                            )) :
                                                <li>
                                                    <h3>Nenhum item registrado</h3>
                                                    <strong><FiFrown size={20} /></strong>
                                                </li>
                                            }

                                        </ul>
                                        {provided.placeholder}
                                    </section>
                                )}
                            </Droppable>
                        </DragDropContext>

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
                                    min="1"
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