import { Container, Content } from "./style";

import logoImg from '../../assets/logo.svg';
import { Link } from "react-router-dom";
import { FiPower } from "react-icons/fi";
import { useAuth } from "../../hooks/Auth";

type headerLink = {
    url: string;
    title: string;
};

type HeaderProps = {
    headerLinks?: headerLink[];
    user?: string;
};

export function Header({ headerLinks, user }: HeaderProps) {

    const { signOut } = useAuth();

    return (
        <Container>
            <Content>
                <div className="logo-box">
                    <img src={logoImg} alt="imagem de uma Sacola de plastico" />
                    <Link to="/homepage">Listinha do fefos</Link>
                </div>

                <div className="links-box">
                    {headerLinks?.map(link => <h3 key={link.title}><Link to={link.url} >{link.title}</Link></h3>)}
                    {user && <div className="name-box" >
                        <h3>
                            <span>{user}</span>
                            <button onClick={signOut} >
                                <FiPower size={18} />
                            </button>
                        </h3>
                    </div>}
                </div>
            </Content>
        </Container>
    );
}