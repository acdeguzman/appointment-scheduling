const base64 = require('base-64');

const login = async (data) => {

    const auth = base64.encode(`${data.name}:${data.password}`);

    const response = await fetch(`http://localhost:3010/api/v1/auth/login`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Basic ${auth}`
        }
    });

    return response.json();
}

export default login;