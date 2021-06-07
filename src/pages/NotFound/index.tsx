import { Header } from "../../components/Header";
import { Container } from "./style";

export function NotFound() {
    return (
        <>
            <Header headerLinks={[{ title: 'Home page', url: '/homepage' }]} />
            <Container>
                <h1>404: Página não encontrada.</h1>
            </Container>
        </>
    );
}