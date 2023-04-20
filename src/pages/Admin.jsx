import {useState, useEffect} from 'react';
import {getFirestore, updateDoc, doc, collection, getDocs, getDoc} from 'firebase/firestore';
import {useDispatch} from 'react-redux';
import {Table, Container, Form, Spinner} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const Admin = () => {
    const dispatch = useDispatch();
    const db = getFirestore();

    const [users, setUsers] = useState([]);
    const [roles, setRoles] = useState({});

    useEffect(() => {
        const getUsers = async () => {
            const usersRef = collection(db, 'users');
            const snapshot = await getDocs(usersRef);
            const usersList = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            console.log(usersList);
            setUsers(usersList);
        };
        getUsers();
    }, []);

    useEffect(() => {
        const getRoles = async () => {
            const rolesRef = doc(db, 'metadata', 'roles');
            const docSnapshot = await getDoc(rolesRef);
            if (docSnapshot.exists()) {
                setRoles(docSnapshot.data());
            }
        };
        getRoles();
    }, []);

    const handleRoleChange = async (userId, role) => {
        console.log(userId, role);
        try {
            const userRef = doc(db, "users", userId);
            await updateDoc(userRef, { role: role });
            const updatedUsers = users.map((user) => {
                if (user.id === userId) {
                    return {
                        ...user,
                        role: role
                    };
                } else {
                    return user;
                }
            });
            setUsers(updatedUsers);
        } catch (error) {
            console.error('The role cannot be changed because of ', error.message);
        }
    };
    
    const shownUsers = users.filter(user => user.userData || user.provider);
    const updatedUsers = shownUsers.map(user => ({
        ...user,
        userData: user.userData ? JSON.parse(user.userData) : ''
    }));

    return (
        <Container>
            <h1 className="text-center mt-4">Admin page. Editing users</h1>
            <Container className="d-flex justify-content-center align-items-center" style={{ width: 500, height: 400, border: '1px solid black'  }}>
                <div>
                    <h3 className="text-center">Edit Users Page</h3>
                    {shownUsers.length === 0 ? 
                    <Container className="d-flex justify-content-center align-items-center">
                        <Spinner animation="border" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </Spinner> 
                    </Container>
                    : 
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Email</th>
                                <th>Role</th>
                            </tr>
                        </thead>
                        <tbody>
                        {updatedUsers.map(user => (
                            <tr key={user.id}>
                                {user.userData.email && <td>{user.userData.email}</td>}
                                {user.email && <td>{user.email}</td>}
                                <td>
                                    <Form.Select value={user.role} onChange={(e) => handleRoleChange(user.id, e.target.value)}>
                                        <option value="" disabled>Select a role</option>
                                        <option value="passenger">Passenger</option>
                                        <option value="driver">Driver</option>
                                        <option value="dispatcher">Dispatcher</option>
                                    </Form.Select>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </Table>
                    }
                </div>
            </Container>
        </Container>
    );
}

export default Admin;