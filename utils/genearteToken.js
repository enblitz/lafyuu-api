const jwt = require('jsonwebtoken')
const User = require('../models/user')


const ganerateAuthToken = async (id) => {
    const user = await User.findOne({ where: { user_id: id } })
    if(!user){
        throw new Error('User Not Register Yet!')
    }

    const token = jwt.sign({id}, 'usertokonforlafyuuApp')

    return token
}

module.exports = ganerateAuthToken