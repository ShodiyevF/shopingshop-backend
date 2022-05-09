const { uniqRow } = require("../../lib/pg")

const loginMODEL = async ({user_password, user_phone}) => {
    try {
        const check = await uniqRow('select * from users where user_password = $1 and user_phone = $2', user_password, user_phone)
        if (check.rows.length) {
            return check.rows
        } else {
            return false
        }
    } catch (error) {
        console.log(error.message, 'USERS login');
    }
}

const registerMODEL = async ({user_name, user_surname, user_phone, user_password}) => {
    const user = await uniqRow('select * from users where user_phone = $1', user_phone)
    if (!(user.rows.length)) {
        await uniqRow(`insert into users (user_name, user_surname, user_phone, user_password) values ($1,$2,$3,$4)`, user_name, user_surname, user_phone, user_password)
        return true
    } else {
        return false
    }
}

const putUserMODEL = async (updater, user_id, {user_name, user_surname, user_phone, user_password}) => {
    try {
        const user = await uniqRow('select * from users where user_id = $1 and user_role = 2', updater)
        if (user.rows.length) {
            await uniqRow(`update users set user_name = $1, user_surname = $2, user_phone = $3, user_password = $4 where user_id = $5`, user_name, user_surname, user_phone, user_password, user_id)
            return
        }
            
    } catch (error) {
        
    }
}

module.exports = {
    loginMODEL,
    registerMODEL
}