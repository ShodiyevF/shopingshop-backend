const jsonwebtoken = require("jsonwebtoken");
const { jwt_password } = require("../../config");
const { getOrdersMODEL, postOrdersMODEL } = require("./model")

const getOrdersCTRL = async (req, res) => {
    try {
        if (req.body.user_id) {
            return res.json({
                status: 200,
                message: 'data has sended',
                data: await getOrdersMODEL(jsonwebtoken.verify(req.body.user_id, jwt_password))
            })
        } else {
            return res.json({
                status: 400,
                message: 'need token'
            })
        }
    } catch (error) { 
        console.log(error.message, 'getOrdersCTRL');
    }
}

const postOrdersCTRL = async (req, res) => {
    try {
        const {order_address, order_count, products_id, user_id} = req.body
        if(order_address && order_count && products_id && user_id && typeof order_address === 'string' && typeof order_count === 'number' && typeof products_id === 'number' && order_address.length <= 156 && order_count <= 100){
            await postOrdersMODEL(jsonwebtoken.verify(req.body.user_id, jwt_password), req.body)
            return res.json({
                status: 200,
                message: 'order has sended'
            })
        } else {
            return res.json({
                status: 404,
                message: 'error on keys'
            })
        }
    } catch (error) {
        console.log(error.message, 'postOrdersCTRL');
    }
}

module.exports = {
    getOrdersCTRL,
    postOrdersCTRL
}