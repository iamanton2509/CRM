import {Container, Row, Col} from 'react-bootstrap';
import {NavLink} from 'react-router-dom';
import instagram from './../images/instagram.svg';
import facebook from './../images/facebook.svg';
import twitter from './../images/twitter.svg';
import youtube from './../images/youtube.svg';

const Footer = () => {
    return (
        <footer className="bg-success text-white mt-5">
            <Container>
                <Row xs={1} md={2} lg={3} className="g-4 justify-content-center text-center">
                    <Col md={4} className="my-3">
                        <h5>Follow us</h5>
                        <a href="https://www.facebook.com/" target="_blank" rel="noreferrer">
                            <img src={facebook} alt="facebook" />
                        </a>
                        <a href="https://twitter.com/" target="_blank" rel="noreferrer">
                            <img src={twitter} alt="twitter" />
                        </a>
                        <a href="https://www.instagram.com/" target="_blank" rel="noreferrer">
                            <img src={instagram} alt="instagram" />
                        </a>
                        <a href="https://www.youtube.com/" target="_blank" rel="noreferrer">
                            <img src={youtube} alt="youtube" />
                        </a>
                    </Col>
                    <Col md={4} className="my-3">
                        <h5>Links</h5>    
                        <p>
                            <NavLink href="/" style={{color: 'white', textDecoration: 'none'}}>Home</NavLink>
                        </p>
                        <p>
                            <NavLink href="/user" style={{color: 'white', textDecoration: 'none'}}>Account</NavLink>
                        </p>
                        <p>
                            <NavLink href="/trips" style={{color: 'white', textDecoration: 'none'}}>Schedule</NavLink>
                        </p>
                    </Col>
                    <Col md={4} className="my-3">
                        <h5>Contact us</h5>
                        <p>123 Main St</p>
                        <p>Anytown, USA 12345</p>
                        <p>Email: info@example.com</p>
                        <p>Phone: (555) 555-5555</p>
                    </Col>
                </Row>
                <Row>
                    <Col className="text-center my-3">
                        <p>&copy; {new Date().getFullYear()} My Website</p>
                    </Col>
                </Row>
            </Container>
        </footer>
    );
}

export default Footer;