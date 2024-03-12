const User = require('../models/user')

exports.signUp = async (req, res) => {
    try {
        await User.create(req.body)
        console.log('success');
    } catch (error) {
        console.log('error');
    }
}