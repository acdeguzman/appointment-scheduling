const Appointment = ({ data }) => {
    return (
        <tr key={data.id}>
            <td>{data.patients}</td>
            <td>{data.date}</td>
            <td>{data.start}</td>
            <td>{data.end}</td>
            <td>{data.comment}</td>
            <td>{data.doctor_email}</td>
            <td>{data.accepted}</td>
        </tr>
    )
}

export default Appointment;