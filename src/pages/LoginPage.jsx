import {useState, useEffect} from 'react';
import {getAuth, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, FacebookAuthProvider} from 'firebase/auth';
import {getFirestore, setDoc, doc} from 'firebase/firestore';
import {useDispatch} from 'react-redux';
import {NavLink} from 'react-router-dom';
import {Form, Button} from 'react-bootstrap';
import {setUser} from './../store/userSlice';
import {setType} from './../store/typeSlice';

const LoginPage = () => {
    const [inputs, setInputs] = useState({login: '', password: ''});
    const dispatch = useDispatch();

    const [loginBlur, setLoginBlur] = useState(false);
    const [passwordBlur, setPasswordBlur] = useState(false);
    const [loginError, setLoginError] = useState("This field can't be empty");
    const [passwordError, setPasswordError] = useState("This field can't be empty");
    const [formValid, setFormValid] = useState(false);

    const loginHandler = (e) => {
        setInputs({...inputs, login: e.target.value});
        const phone = /([0-9]+(-[0-9]+)+)/;
        const email = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        if (!(!phone.test(String(e.target.value).toLowerCase()) || !email.test(String(e.target.value).toLowerCase()))) {
            setLoginError('Invalid data');
        } else {
            setLoginError('');
        }
    }

    const passwordHandler = (e) => {
        setInputs({...inputs, password: e.target.value});
        if (e.target.value.length < 8) {
            setPasswordError('The password is too short');
        } else if (e.target.value.length > 25) {
            setPasswordError('The password is too long');
        } else {
            setPasswordError('');
        }
    }

    const blurHandler = (e) => {
        switch (e.target.name){
            case 'login':
                setLoginBlur(true);
                break;
            case 'password':
                setPasswordBlur(true);
                break;
        }
    }

    useEffect(() => {
        if (loginError || passwordError) {
            setFormValid(false);
        } else {
            setFormValid(true);
        }
    }, [loginError, passwordError]);

    const handleLogin = (email, password) => {
        const auth = getAuth();
        setFormValid(false);
        signInWithEmailAndPassword(auth, email, password)
            .then(({user}) => {
                dispatch(setUser({
                    email: user.email,
                    id: user.uid,
                    token: user.accessToken,
                }));
                localStorage.setItem('user', JSON.stringify(user));
            })
            .catch(() => alert('Wrong email or/and password'));
    }

    const handleGoogleSignIn = async (event) => {
        event.preventDefault();
        try {
            const auth = getAuth();
            const provider = new GoogleAuthProvider();
            const result = await signInWithPopup(auth, provider);
            dispatch(setType(provider.providerId));
            const user = result.user;
            const userData = {
                name: user.displayName,
                email: user.email,
                id: user.uid,
                token: user.accessToken,
                role: 'admin'
            };
            localStorage.setItem('user', JSON.stringify(userData));
            localStorage.setItem('provider', provider.providerId);
            dispatch(setUser(userData));
            const db = getFirestore();
            const userRef = doc(db, "users", user.uid);
            await setDoc(userRef, userData);
        } catch (error) {
            console.log(error);
        }
    };

    const handleFacebookLogin = async (event) => {
        event.preventDefault();
        const auth = getAuth();
        const provider = new FacebookAuthProvider();
        try {
            const result = await signInWithPopup(auth, provider);
            dispatch(setType(provider.providerId));
            const user = result.user;
            console.log(user);
            const userData = {
                name: user.displayName,
                email: user.email,
                id: user.uid,
                token: user.accessToken,
                role: 'passenger'
            };
            localStorage.setItem('user', JSON.stringify(userData));
            localStorage.setItem('provider', provider.providerId);
            dispatch(setUser(userData));
            const db = getFirestore();
            const userRef = doc(db, 'users', user.uid);
            await setDoc(userRef, userData);
        } catch(error) {
            console.log(error);
        }
    };

    return (
        <div className="d-flex justify-content-center align-items-center mt-5">
            <Form autoComplete='off' style={{borderRadius: 10, padding: '35px 35px 20px 35px', boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px'}}>
                <h3 className="text-center" style={{padding: '5px 0 15px', fontWeight: 600}}>Log In</h3>
                <Form.Group className="mb-2" controlId="formBasicEmail">
                    {(loginError && loginBlur) && <div style={{textAlign: 'center', color: '#900'}}>{loginError}</div>}
                    <Form.Control
                        value={inputs.login} 
                        onChange={e => loginHandler(e)}
                        onBlur={e => blurHandler(e)}
                        type="text" 
                        name="login"
                        placeholder="Email or phone" 
                    />
                </Form.Group>
                <Form.Group className="mb-2" controlId="formBasicPassword">
                    {(passwordError && passwordBlur) && <div style={{textAlign: 'center', color: '#900'}}>{passwordError}</div>}
                    <Form.Control 
                        value={inputs.password} 
                        onChange={e => passwordHandler(e)}
                        onBlur={e => blurHandler(e)}
                        type="password" 
                        name="password"
                        placeholder="Password" 
                    />
                </Form.Group>
                <Button variant="primary" disabled={!formValid} onClick={() => handleLogin(inputs.login, inputs.password)} style={{display: 'block', margin: '0 auto', textAlign: 'center'}}>
                    Log In
                </Button>
                <button onClick={handleGoogleSignIn} className="google-button">
                    Continue with Google
                </button>
                <button onClick={handleFacebookLogin} className="google-button">
                    Continue with Facebook
                </button>
                <p className="mt-4 text-center">
                    Doesn't have an account? <NavLink to="/register">Sign Up</NavLink>
                </p>
            </Form>
        </div>
    );
}

export default LoginPage;   