const jwt = require("jsonwebtoken");
const { jwt_password } = require("../../config");
const { postProductModel, deleteProductModel, putProductModel } = require("./model");

const postProductCtrl = async (req, res) => {
    try {
        const {products_name, products_description, products_price} = req.body
        if (products_name && products_description && products_price && typeof products_name === 'string' && typeof products_description === 'string' && typeof products_price === 'string' && products_name.length <= 30) {
            if(await postProductModel(jwt.verify(req.body.user_id, jwt_password), req.body)){
                return res.json({
                    status: 200,
                    message: 'product has created'
                })
            } else {
                return res.json({
                    status: 400,
                    message: 'you are not admin'
                })
            }
        } else {
            return res.json({
                status: 400,
                message: 'error on keys'
            })
        }
    } catch (error) {
        console.log(error.message, 'postProductCtrl');
    }
}

const putProductCtrl = async (req, res) => {
    try {
        const {products_id, products_name, products_description, products_price} = req.body
        if (products_id, products_name ? typeof products_name === 'string' : true && products_description ? typeof products_description === 'string' : true && products_price ? typeof products_price === 'string' : true && products_name.length <= 30) {
            if(await putProductModel(jwt.verify(req.body.user_id, jwt_password), req.body)){
                return res.json({
                    status: 200,
                    message: 'product has updated'
                })
            } else {
                return res.json({
                    status: 400,
                    message: 'you are not admin'
                })
            }
        } else {
            return res.json({
                status: 400,
                message: 'error on keys'
            })
        }
    } catch (error) {
        console.log(error.message, 'putProductCtrl');
    }
}

const deleteProductCtrl = async (req, res) => {
    try {
        const {product_id} = req.body
        if (product_id && typeof product_id == 'number') {
            if(await deleteProductModel(jwt.verify(req.body.user_id, jwt_password), req.body)){
                return res.json({
                    status: 200,
                    message: 'product has deleted'
                })
            } else {
                return res.json({
                    status: 400,
                    message: 'you are not admin'
                })
            }
        } else {
            return res.json({
                status: 400,
                message: 'error on keys'
            })
        }
    } catch (error) {
        console.log(error.message, 'postProductCtrl');
    }
}


module.exports = {
    postProductCtrl,
    deleteProductCtrl,
    putProductCtrl
}