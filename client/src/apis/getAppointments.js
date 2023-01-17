const getAppointments = async (token, filters) => {
    
    let url = `http://localhost:3010/api/v1/appointments`;

    if(filters) {
        url += '?';

        if(filters.from_date) {
            url += `from_date=${filters.from_date}&to_date=${filters.to_date}`
        }
    }
    
    const response = await fetch(url, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    });

    const data = await response.json();
    return data;
}

export default getAppointments;