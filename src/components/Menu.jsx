import {useSelector} from 'react-redux';
import {NavLink} from 'react-router-dom';
import {Nav} from 'react-bootstrap';
import close from './../images/close.svg';

const Menu = ({active, setActive}) => {
    const loginType = localStorage.getItem('provider');
    return (
        <div className={active ? 'menu active' : 'menu'} onClick={() => setActive(false)}>  
            <div className="menu__content" onClick={e => e.stopPropagation()}>
                <Nav className="flex-column text-center" >
                    <div onClick={() => setActive(false)} className="close-button">
                        <img src={close} alt="close nav" />
                    </div>
                    <NavLink to="/" onClick={() => setActive(false)} style={{color: '#fff', marginTop: 65}}>
                        Home
                    </NavLink>
                    <NavLink to="/user" onClick={() => setActive(false)} style={{color: '#fff', marginTop: 25}}>
                        User
                    </NavLink>
                    {loginType === 'google.com' && 
                    <NavLink to="/admin" onClick={() => setActive(false)} style={{color: '#fff', marginTop: 25}}>
                        Editing users
                    </NavLink>}        
                    {loginType === 'google.com' && <NavLink to="/trips" onClick={() => setActive(false)} style={{color: '#fff', marginTop: 25}}>
                        Trips
                    </NavLink>}          
                    <NavLink to="/schedule" onClick={() => setActive(false)} style={{color: '#fff', marginTop: 25}}>
                        Schedule
                    </NavLink>          
                </Nav>
            </div>
        </div>
    );
}

export default Menu;