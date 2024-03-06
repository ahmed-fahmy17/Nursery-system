const Teacher = require('../models/teacherModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { token } = require('morgan');

module.exports.login = async (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
        let error = new Error("email and password are required");
        error.statusCode = 400;
        throw error;
    }
    if (email == "admin@yahoo.com" && password == "admin@admin") {
        const token = await jwt.sign({ email: "admin@yahoo.com", role: 'admin' }, process.env.JWT_Secret_Key, { expiresIn: '1h' });
        return res.status(200).json({ 'token': token });
    }
    Teacher.findOne({ email: email })
        .then((user) => {
            if (!user) {
                let error = new Error("user not found");
                error.statusCode = 400;
                throw error;
            }
            bcrypt.compare(password, user.password)
                .then(async (valid) => {
                    if (!valid) {
                        let error = new Error("Wrong password");
                        error.statusCode = 400;
                        throw error;
                    }
                    const token = await jwt.sign({ id: user._id, email: user.email, role: 'teacher' }, process.env.JWT_Secret_Key, { expiresIn: '1h' });
                    res.status(200).json({ 'token': token });
                })
        })
}