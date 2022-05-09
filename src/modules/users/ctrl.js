const jwt = require('jsonwebtoken');
const { jwt_password } = require('../../config');

const { loginMODEL, registerMODEL } = require("./model");

const loginCTRL = async (req, res) => {
    try {
        if (req.body.user_password && req.body.user_phone && typeof req.body.user_password === 'string' && typeof req.body.user_phone === 'string' && req.body.user_password.length < 30 && req.body.user_phone.length < 13) {
            if (await loginMODEL(req.body)) {
                res.set('id', jwt.sign((await loginMODEL(req.body))[0].user_id, jwt_password))
                return res.json({
                    status: 200,
                    message: 'user has logined',
                    token: jwt.sign((await loginMODEL(req.body))[0].user_id, jwt_password)
                })
            } else {
                return res.json({
                    status: 404,
                    message: 'user has not logined'
                }) 
            }
        } else {
            return res.json({
                status: 400,
                message: 'error on keys'
            })
        }
    } catch (error) {
        console.log(error.message, 'USERS login');
    }
}

const registerCTRL = async (req, res) => {
    try {

        const user_name = req.body.user_name
        const user_surname = req.body.user_surname
        const user_phone = req.body.user_phone
        const user_password = req.body.user_password
        
        if(user_name && user_surname && user_phone && user_password && typeof user_name === 'string' && typeof user_surname === 'string' && user_phone.match(/^998[389][012345789][0-9]{7}$/) && typeof user_password === 'string' && user_name.length <= 30 && user_surname.length <= 32 && user_password.length <= 30){
            if (await registerMODEL(req.body)) {
                return res.json({
                    status: 200,
                    message: 'user has registered'
                })
            } else {
                return res.json({
                    status: 404,
                    message: 'user has not registered, this phone number is have in base'
                })
            }
        } else {
            return res.json({
                status: 400,
                message: 'error on keys !'
            })
        }
    } catch (error) {
        console.log(error.message);
    }
}

module.exports = {
    loginCTRL,
    registerCTRL
}