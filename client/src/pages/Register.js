import register_api from '../apis/register';
import { useForm } from 'react-hook-form';
import '../styles/Register.css';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const Register = () => {

    const { register, handleSubmit } = useForm();
    const navigate = useNavigate();

    const callRegister = async (data) => {

        const response = await register_api(data);
        if(response.error) {
            alert(response.error.details)
        }

        else {
            navigate('/login');
        }
    }

    const callBack = () => {

        navigate('/login');
    }

    return (
        <div id="registerForm">
            <Form onSubmit={handleSubmit((data) => callRegister(data))}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" {...register("email")}/>
                    <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="text" placeholder="Enter Password"{...register("password")}/>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" placeholder="Enter Name" {...register("name")}/>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Type</Form.Label>
                    <Form.Select {...register("type")}>
                        <option value={"doctor"}>Doctor</option>
                        <option value={"scheduler"}>Scheduler</option>
                    </Form.Select>
                </Form.Group>
                <Button variant="primary" type="submit">
                    Register
                </Button>
                <Button variant="primary" id="backButtonRegister" onClick={callBack}>
                    Back
                </Button>
            </Form>
        </div>
    )
}

export default Register;