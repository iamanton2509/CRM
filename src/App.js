import {useEffect} from 'react';
import {BrowserRouter as Router} from 'react-router-dom';
import {setUser} from './store/userSlice';
import {useDispatch} from 'react-redux';
import {getUsers} from './store/usersSlice';
import AppRouter from './components/AppRouter';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/main.css';

const App = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getUsers())
    }, [])

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user) {
            dispatch(setUser({
                email: user.email,
                id: user.uid,
                token: user.accessToken
            }));
        }
    }, []);

    return (
        <Router>
            <AppRouter />
        </Router>
    );
}

export default App;