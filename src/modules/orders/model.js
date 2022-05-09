const { uniqRow } = require("../../lib/pg")

const getOrdersMODEL = async (user_id) => {
    try {
        const order = await uniqRow('select * from orders where user_id = $1', +user_id)
        return order.rows
    } catch (error) {
        console.log(error.message, 'getOrdersMODEL');
    }
}

const postOrdersMODEL = async (user_id,{order_address, order_count, products_id}) => {
    console.log(user_id);
    
    try {
        await uniqRow(`insert into orders (order_address, order_count, products_id, user_id) values ($1,$2,$3,$4)`, order_address, order_count, products_id, +user_id)
    } catch (error) {
        console.log(error.message, 'postOrdersMODEL');
    }
}

module.exports = {
    getOrdersMODEL,
    postOrdersMODEL
}