const pg = require('pg')

const pool = new pg.Pool({
    user: 'postgres',
    password: 'test',
    host: 'localhost',
    port: 5432,
    database: 'shopingshop',
})

const uniqRow = async (query, ...arr) => {
    try {
        const client = await pool.connect()
        const data = await client.query(query, arr)
        client.release()
        return data
    } catch (error) {
        console.log(error.message, 'PG');
    }
}

module.exports = {
    uniqRow
}