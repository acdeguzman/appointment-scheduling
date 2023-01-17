import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import getAppointments from "../apis/getAppointments";
import getActiveDoctors from "../apis/getActiveDoctors";
import addAppointment from "../apis/addAppointment";
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Appointment from "./Appointment";
import Form from 'react-bootstrap/Form';
import { useForm } from 'react-hook-form';
import '../styles/Appointments.css';

const Appointments = () => {

    const navigate = useNavigate();
    const { register, handleSubmit } = useForm();

    const [data, setData] = useState([]);
    const [activeDoctors, setActiveDoctors] = useState([]);
    const [addedAppointment, setAddedAppointment] = useState(0)

    const fetchData = async () => {
        const res = await getAppointments(localStorage.authorization_token)
        setData(res.result);
    }

    const fetchActiveDoctors = async () => {
        const res = await getActiveDoctors(localStorage.authorization_token);
        setActiveDoctors(res.result);
    }

    const getFilteredAppointments = async (data) => {
        const res = await getAppointments(
            localStorage.authorization_token,
            data
        )
        
        setData(res.result);
    }

    const callAddAppointment = async (appointment) => {
        const start = appointment.start.split('T');
        const end = appointment.end.split('T');

        if(appointment.date !== start[0] || appointment.date !== end[0]) {
            alert('Invalid Start time and end time')
        }

        const req = {
            start: start[1],
            end: end[1],
            patients: appointment.patients,
            comment: appointment.comment,
            date: appointment.date,
            doctor_email: appointment.doctor_email === '' ? null : appointment.doctor_email
        }

        const res = await addAppointment(req, localStorage.authorization_token);
        
        if(res.error) {
            alert(res.error.details)
        }

        setAddedAppointment((addAppointment) => addAppointment + 1);
    }

    useEffect(() => {
        fetchActiveDoctors();
    }, [])

    useEffect(() => {

        fetchData();
        return function () {
            console.log('Bye');
        }
    }, [addedAppointment]);

    const logout = () => {
        localStorage.removeItem('authorization_token');
        localStorage.removeItem('expiration');
        localStorage.removeItem('type');
        navigate('/login');
    }

    return (
        <div>
            <h1 id="appointment-header">Appointments</h1>
            <Button id="logoutButton" onClick={logout}>Logout</Button>
            {   
                data.length === 0 ? <h1>Loading</h1> : 
                <div>
                    <div id="filters">
                        <Form onSubmit={handleSubmit((data) => getFilteredAppointments(data))}>
                            <Form.Group className="mb-3" controlId="formFromFilter">
                                <Form.Label>From Date</Form.Label>
                                <Form.Control type="date" placeholder="Start time"{...register("from_date")} required/>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formToFilter">
                                <Form.Label>To Date</Form.Label>
                                <Form.Control type="date" placeholder="Start time"{...register("to_date")} required/>
                            </Form.Group>
                            <Button variant="primary" type="submit">
                                Filter
                            </Button>
                        </Form>
                    </div>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                            <th>Patients</th>
                            <th>Date</th>
                            <th>Start Time</th>
                            <th>End Time</th>
                            <th>Comment</th>
                            <th>Doctor Email</th>
                            <th>Accepted</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                data.map((appointment) => {
                                    return (
                                        <Appointment data={appointment}/>
                                    )
                                })
                            }
                        </tbody>
                    </Table>
                    {
                        localStorage.type === 'scheduler' ? 
                            <div id="addAppointmentForm">
                                <h2>Add an Appointment</h2>
                                <Form onSubmit={handleSubmit((data) => callAddAppointment(data))}>
                                    <Form.Group className="mb-3" controlId="formPatient">
                                        <Form.Label>Patients</Form.Label>
                                        <Form.Control as="textarea" rows={3} placeholder="Enter Patients" {...register("patients")}/>
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="formDate">
                                        <Form.Label>Date</Form.Label>
                                        <Form.Control type="date" placeholder="Date"{...register("date")}/>
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="formFrom">
                                        <Form.Label>Start Time</Form.Label>
                                        <Form.Control type="datetime-local" placeholder="Start time"{...register("start")}/>
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="formTo">
                                        <Form.Label>End Time</Form.Label>
                                        <Form.Control type="datetime-local" placeholder="End time"{...register("end")}/>
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="formComments">
                                        <Form.Label>Comments</Form.Label>
                                        <Form.Control as="textarea" rows={4} placeholder="Comments" {...register("comments")}/>
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Doctor</Form.Label>
                                        <Form.Select {...register("doctor_email")}>
                                            <option value=""></option>
                                            {
                                                activeDoctors.map(doctor => {
                                                    return <option value={doctor.email}>{doctor.name}</option>
                                                })
                                            }
                                        </Form.Select>
                                    </Form.Group>
                                    <Button variant="primary" type="submit">
                                        Add
                                    </Button>
                                </Form>
                            </div>
                    : '' }
            </div>
                
            }
        </div>
    )
}

export default Appointments;