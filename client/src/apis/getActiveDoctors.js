const getActiveDoctors = async (token) => {
    const response = await fetch(`http://localhost:3010/api/v1/users?type=doctor&status=active`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    });

    const data = await response.json();
    return data;
}

export default getActiveDoctors;