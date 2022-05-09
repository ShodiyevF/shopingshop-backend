const { uniqRow } = require("../../lib/pg")

const postProductModel = async (user_id, {products_name, products_description, products_price}) => {
    try {
        const permission = await uniqRow('select * from users where user_id = $1 and user_role = 2', user_id)
        if (permission.rows.length) {
            console.log('asd');
            await uniqRow(`insert into products (products_name, products_description, products_price) values ($1,$2,$3)`, products_name, products_description, products_price)
            return true
        } else {
            return false
        }
    } catch (error) {
        console.log(error.message, 'postProductModel');
    }
}

const putProductModel = async (user_id, {products_id, products_name, products_description, products_price}) => {
    try {
        const permission = await uniqRow('select * from users where user_id = $1 and user_role = 2', user_id)
        if (permission.rows.length) {
            const product = (await uniqRow('select * from products where products_id = $1', products_id)).rows[0]
            await uniqRow(`update products set products_name = $1, products_description = $2, products_price = $3 where products_id = $4`, products_name ? products_name : product.products_name,  products_description ?  products_description : product.products_description, products_price ?  products_price : product.products_price, products_id)
            return true
        } else {
            return false
        }
    } catch (error) {
        console.log(error.message, 'putProductModel');
    }
}

const deleteProductModel = async (user_id, {product_id}) => {
    try {
        const permission = await uniqRow('select * from users where user_id = $1 and user_role = 2', user_id)
        if (permission.rows.length) {
            await uniqRow(`delete from products where products_id = $1`, product_id)
            return true
        } else {
            return false
        }
    } catch (error) {
        console.log(error.message, 'deleteProductModel');
    }
}

module.exports = {
    postProductModel,
    deleteProductModel,
    putProductModel
}