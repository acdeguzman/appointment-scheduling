const register = async (data) => {
    const response = await fetch(`http://localhost:3010/api/v1/auth/register`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });

    return response.json();
}

export default register;