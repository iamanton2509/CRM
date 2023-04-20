import {NavLink} from 'react-router-dom';
import {Container, Navbar} from 'react-bootstrap';
import hamburger from './../images/open.svg';
import user from './../images/user.svg';

const Navigation = ({active, setActive}) => {
    return (
        <Navbar bg="success" className="d-flex justify-content-between">
            <Container>
                <Navbar.Brand style={{cursor: 'pointer'}} onClick={() => setActive(!active)}>
                    <img src={hamburger} alt="Open menu" />
                </Navbar.Brand>
                <Navbar>
                    <NavLink to="/user">
                        <img src={user} alt="User page" />
                    </NavLink>
                </Navbar>
            </Container>
        </Navbar>
    );
}

export default Navigation;