import {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {collection, getDocs, getFirestore} from 'firebase/firestore';
import {Container, Button, Row, Col, Spinner} from 'react-bootstrap';
import {removeUser} from './../store/userSlice';
import {resetType} from './../store/typeSlice';
import roles from "./../helpers/roles";
import 'bootstrap/dist/css/bootstrap.min.css';

const User = () => {
    const dispatch = useDispatch();
    const db = getFirestore();
    const {email} = useSelector(state => state.user);
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const getUsers = async () => {
            const usersRef = collection(db, 'users');
            const snapshot = await getDocs(usersRef);
            const usersList = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setUsers(usersList);
        };
        getUsers();
    }, [db]);

    let emails = [];
    let currentUser;
    let currentRole;

    if (users.length) {
        for (let i = 0; i < users.length; i++){
            if (users[i].hasOwnProperty('userData') && users[i].hasOwnProperty('role')){      
                const userData = JSON.parse(users[i].userData);
                const userObj = Object.assign({}, userData, { role: users[i].role });
                emails.push(userObj); 
            } else {
                emails.push(users[i]);
            }
        }  
        
        for (let i = 0; i < emails.length; i++){
            if (emails[i].email === email){
                currentUser = emails[i];
            }
        }
        
        for (const role in roles){   
            if (role == currentUser.role){
                currentRole = roles[role];
            }
        }
    }

    const logOut = () => {
        dispatch(resetType());
        dispatch(removeUser());
        localStorage.removeItem('provider');
    }
    
    return ( 
        <Container className="d-flex flex-column align-items-center justify-content-center">
            {users.length && currentRole ? 
            <Row className="my-4">
                <Col className="justify-content-md-center">
                    <h2 className="text-center">Hello, {currentUser.name}!</h2>
                    <p className="text-center">Your current account is <strong>{currentUser.email}</strong></p>
                    <p className="text-center">Your current role: <strong>{currentUser.role}</strong></p>
                    <p className="text-center">{currentRole}</p>
                </Col>
            </Row>
            :
            <Container className="d-flex justify-content-center align-items-center">
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner> 
            </Container>
            }
            <Row className="justify-content-md-center">
                <Col className="justify-content-md-center">
                    <Button variant="warning" onClick={logOut}>
                        Log out from {email}
                    </Button>
                </Col>
            </Row>
        </Container>
    );
}

export default User;