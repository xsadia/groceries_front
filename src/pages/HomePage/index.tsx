import { Header } from "../../components/Header";
import { Container, Content } from "./styles";
import { FiFrown, FiTrash2 } from 'react-icons/fi';
import { useAuth } from "../../hooks/Auth";
import { useCallback, useEffect, useState } from "react";
import { apiClient } from "../../services/api";
import { Link } from "react-router-dom";

type ListState = {
    _id: string;
    title: string;
    createdAt: Date;
    owner: {
        id: string;
        name: string;
    };
};

export function HomePage() {
    const { user, token } = useAuth();

    const [lists, setLists] = useState<ListState[]>([]);

    const changeDateFormat = (date: Date) => {
        const replacedDate = date.toString().split('T')[0];
        const [yy, mm, dd] = replacedDate.split(/-/);

        return `${dd}/${mm}/${yy}`;
    };

    async function handleClick(id: string) {
        await apiClient.delete(`/lists/${id}`, {
            headers: {
                'Authorization': `bearer ${token}`
            }
        });

        const newList = lists.filter(item => item._id !== id);

        setLists(newList);
    }

    const getLists = useCallback(async () => {
        const response = await apiClient.get('/lists', {
            headers: {
                'Authorization': `bearer ${token}`
            }
        });

        setLists(response.data);

        return;
    }, [token]);

    useEffect(() => {
        getLists();
    }, [getLists]);

    return (
        <>
            <Header headerLinks={[{ url: '/createlist', title: 'Crie uma lista' }]} user={user.name} />
            <Container>
                <Content>
                    {lists.length !== 0 ? lists.map(list => (
                        <section key={list._id} >
                            <Link to={`/list/${list._id}`}>
                                <div>
                                    <h3>{list.title}</h3>

                                    <strong>{changeDateFormat(list.createdAt)}</strong>

                                </div>
                            </Link>
                            <button onClick={() => handleClick(list._id)} ><FiTrash2 size={24} /></button>
                        </section>
                    )) :
                        <div className="no-items-box">
                            <h1>Cri cri...</h1>
                            <h2>Parece que você não possui listas. <FiFrown size={24} /></h2>
                        </div>}
                </Content>
            </Container>
        </>
    );
}