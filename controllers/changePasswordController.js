const Teacher = require('../models/teacherModel');
const bcrypt = require('bcryptjs');

exports.changePassword = async (req, res, next) => {
    console.log(req.currentUser);
    const teacherId = req.currentUser.id;
    if (!req.body.Password) {
        return res.status(400).json('password not provided');
    }
    const newPassword = await bcrypt.hash(req.body.Password, 10);
    Teacher.findOneAndUpdate({ _id: teacherId }, { password: newPassword })
        .then((teacher) => {
            if (!teacher) {
                return res.status(404).json('teacher not found');
            }
            return res.status(201).json('password updated successfully');
        })
}