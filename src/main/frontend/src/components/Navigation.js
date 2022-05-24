import {Navbar, Nav} from 'reactstrap';
import {Link} from 'react-router-dom';

const Navigation = () => {
    return (
        <Navbar bg="dark" variant="dark">
            <Nav>
                <Link to={"register"} className="nav-link">Регистрация</Link>
                <Link to={"login"} className="nav-link">Логин</Link>
            </Nav>
        </Navbar>
    )
}

export default Navigation;