import login from '../apis/login';
import { useForm } from 'react-hook-form';
import '../styles/Login.css';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const Login = () => {

    const { register, handleSubmit } = useForm();
    const navigate = useNavigate();

    const callLogin = async (data) => {
        const response = await login(data);
        if(response.result) {
            localStorage.setItem('authorization_token', response.result.token);
            localStorage.setItem('expiration', response.result.expires_in);
            localStorage.setItem('type', response.result.type);
            navigate('/appointments');
        }

        else {
            alert(response.error.details);
        }
    }

    const callRegister = () => {
        navigate('/register');
    }

    return (
        <div id="loginForm">
            <Form onSubmit={handleSubmit((data) => callLogin(data))}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" {...register("name")}/>
                    <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password"{...register("password")}s/>
                </Form.Group>
                <Button variant="primary" type="submit">
                    Login
                </Button>
                <Button variant="primary" id="registerButton" onClick={callRegister}>
                    Register
                </Button>
            </Form>
        </div>
    )
}

export default Login;