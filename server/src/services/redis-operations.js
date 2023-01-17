const hGetAll = async (key, redis_client, parseRedisData) => {

    const data = await redis_client.HGETALL(key);
    const parsed_data = parseRedisData(data);

    return parsed_data
}

const hSet = async (key, value, redis_client) => {
    await redis_client.HSET(key, value)
}

const get = async (key, redis_client) => {

    return await redis_client.GET(key);
}

const keys = async (pattern, redis_client) => {
    return await redis_client.KEYS(pattern);
}

const del = async (key, redis_client) => {
    await redis_client.DEL(key);
}

const incr = async (key, redis_client) => {
    await redis_client.INCR(key);
}

module.exports = {
    hGetAll,
    hSet,
    get,
    keys,
    del,
    incr
}