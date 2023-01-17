const addAppointment = async (data, token) => {
    const response = await fetch(`http://localhost:3010/api/v1/appointments`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(data)
    });

    return response.json();
}

export default addAppointment;