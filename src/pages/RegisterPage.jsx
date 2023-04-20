import {useState, useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {getAuth, createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, FacebookAuthProvider} from 'firebase/auth';
import {getFirestore, setDoc, doc} from 'firebase/firestore';
import {Form, Button} from 'react-bootstrap';
import {setUser} from './../store/userSlice';
import {NavLink} from 'react-router-dom';
import {setType} from './../store/typeSlice';
import './../firebase';
import 'firebase/firestore';

const RegisterPage = () => {
    const dispatch = useDispatch();
    // Form validation
    const [inputs, setInputs] = useState({login: '', name: '', age: '', password: ''});

    const [loginBlur, setLoginBlur] = useState(false);
    const [nameBlur, setNameBlur] = useState(false);
    const [ageBlur, setAgeBlur] = useState(false);
    const [passwordBlur, setPasswordBlur] = useState(false);

    const [loginError, setLoginError] = useState("This field can't be empty");
    const [nameError, setNameError] = useState("This field can't be empty");
    const [ageError, setAgeError] = useState("This field can't be empty");
    const [passwordError, setPasswordError] = useState("This field can't be empty");

    const [formValid, setFormValid] = useState(false);

    const blurHandler = (e) => {
        switch (e.target.name) {
            case 'login':
                setLoginBlur(true);
                break;
            case 'name':
                setNameBlur(true);
                break;
            case 'age':
                setAgeBlur(true);
                break;
            case 'password':
                setPasswordBlur(true);
                break;
        }
    }

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

    const nameHandler = (e) => {
        setInputs({...inputs, name: e.target.value});
        if (Number.isInteger(Number(e.target.value))) {
            setNameError('Your name must be a string');
        } else if (e.target.value.length < 3) {
            setNameError('Your name must be longer than 2 letters');
        } else {
            setNameError('');
        }
    }

    const ageHandler = (e) => {
        setInputs({...inputs, age: e.target.value});
        if (!(Number.isInteger(Number(e.target.value)))) {
            setAgeError('Age must be a number');
        } else if (Number(e.target.value) < 8 || Number(e.target.value) > 100) {
            setAgeError('Invalid age');
        } else {
            setAgeError('');
        }
    }

    const passwordHandler = (e) => {
        setInputs({...inputs, password: e.target.value});
        if (Number.isInteger(Number(e.target.value))) {
            setPasswordError('The password cannot consist only of digits');
        } else if (e.target.value.length < 8) {
            setPasswordError('The password must be at least 8 characters');
        } else {
            setPasswordError('');
        }
    }

    useEffect(() => {
        if (nameError || loginError || ageError || passwordError) {
            setFormValid(false);
        } else {
            setFormValid(true);
        }
    }, [nameError, loginError, ageError, passwordError]);
    
    const handleEmail = async (email, password) => {
        const auth = getAuth();
        try {
            const {user} = await createUserWithEmailAndPassword(auth, email, password);
            const userData = {
                name: inputs.name,
                email: user.email,
                id: user.uid,
                token: user.accessToken
            };
            const userDataJSON = JSON.stringify(userData);
            localStorage.setItem('user', userDataJSON);
            const db = getFirestore();
            const userRef = doc(db, 'users', user.uid);
            setDoc(userRef, {
                userData: userDataJSON,
                role: 'passenger'
            });
            dispatch(setUser(userData));
        } catch (error) {
            alert('Error');
        }
    };

    const handlePhone = async (phone, password) => {
        const auth = getAuth();
        try {
            const {user} = await createUserWithEmailAndPassword(auth, `${phone}@example.com`, password);
            const userData = {
                name: inputs.name,
                email: user.email,
                id: user.uid,
                token: user.accessToken
            };
            const userDataJSON = JSON.stringify(userData);
            localStorage.setItem('user', userDataJSON);
            const db = getFirestore();
            const userRef = doc(db, 'users', user.uid);
            setDoc(userRef, {
                userData: userDataJSON,
                role: 'passenger'
            });
            dispatch(setUser(userData));
        } catch (error) {
            alert('Error');
        }
    }

    const handleRegister = (login, password) => {
        const email = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        if (email.test(String(login).toLowerCase())){
            handleEmail(login, password);
        } else {
            handlePhone(login, password);
        }
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
                role: 'admin',
                provider: provider.providerId
            };
            localStorage.setItem('user', JSON.stringify(userData));
            localStorage.setItem('provider', provider.providerId);
            dispatch(setUser(userData));
            const db = getFirestore();
            const userRef = doc(db, 'users', user.uid);
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
            const userData = {
                name: user.displayName,
                email: user.email,
                id: user.uid,
                token: user.accessToken,
                role: 'passenger',
                provider: provider.providerId
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
            <Form autoComplete='off' style={{borderRadius: 10, padding: 35, boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px'}}>
                <h3 className="text-center" style={{padding: '5px 0 15px', fontWeight: 600}}>Register</h3>
                <Form.Group className="mb-2" controlId="formBasicEmail">
                    {(loginBlur && loginError) && <div style={{color: '#900', textAlign: 'center'}}>{loginError}</div>}
                    <Form.Control
                        value={inputs.login} 
                        onChange={(e) => loginHandler(e)}
                        onBlur={(e) => blurHandler(e)}
                        type="text" 
                        name="login"
                        placeholder="Email or phone" 
                    />
                </Form.Group>
                <Form.Group className="mb-2" controlId="formBasicName">
                    {(nameBlur && nameError) && <div style={{color: '#900', textAlign: 'center'}}>{nameError}</div>}
                    <Form.Control 
                        value={inputs.name}
                        onChange={(e) => nameHandler(e)}
                        onBlur={(e) => blurHandler(e)}
                        type="text" 
                        name="name"
                        placeholder="Name" 
                    />
                </Form.Group>
                <Form.Group className="mb-2" controlId="formBasicAge">
                    {(ageBlur && ageError) && <div style={{color: '#900', textAlign: 'center'}}>{ageError}</div>}
                    <Form.Control 
                        value={inputs.age}
                        onChange={(e) => ageHandler(e)}
                        onBlur={(e) => blurHandler(e)}
                        type="text" 
                        name="age"
                        placeholder="Age" 
                    />
                </Form.Group>
                <Form.Group className="mb-2" controlId="formBasicPassword">
                    {(passwordBlur && passwordError) && <div style={{color: '#900', textAlign: 'center'}}>{passwordError}</div>}
                    <Form.Control
                        value={inputs.password}
                        onChange={(e) => passwordHandler(e)}
                        onBlur={(e) => blurHandler(e)}
                        type="password"
                        name="password" 
                        placeholder="Password" 
                    />
                    <Form.Text className="text-muted">
                        We'll never share your personal data with anyone else
                    </Form.Text>
                </Form.Group>
                <Button disabled={!formValid} variant="primary" onClick={() => handleRegister(inputs.login, inputs.password)} style={{display: 'block', margin: '0 auto', textAlign: 'center'}}>
                    Sign Up
                </Button>
                <button onClick={handleGoogleSignIn} className="google-button">
                    Continue with Google
                </button>
                <button onClick={handleFacebookLogin} className="google-button">
                    Continue with Facebook
                </button>
                <p className="mt-2 text-center">Already have an account?  
                    <NavLink to="/login"> Log In</NavLink>
                </p>
            </Form>
        </div>
    );
}

export default RegisterPage;