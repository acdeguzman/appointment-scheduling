const generateToken = async (jwt, data) => {

    const token = await jwt.sign({
        exp: Math.floor(Date.now() / 1000) + (60 * 60),
        data: {
            username: data.email,
            type: data.type,
            is_active: data.isActive
        }
    }, process.env.JWT_SECRET);

    return token;
}

module.exports = {
    generateToken
}