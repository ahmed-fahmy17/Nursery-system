const Teacher = require('../models/teacherModel');
const Class = require('../models/classModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.get_all_teachers = (req, res, next) => {
    Teacher.find({})
        .then((teachersData) => { res.status(200).json(teachersData) });
}

exports.get_teacher_by_id = (req, res, next) => {
    Teacher.find({ _id: req.params.id })
        .then((teacherData) => {
            res.status(200).json(teacherData);
        })
}


exports.add_teacher = async (req, res, next) => {
    const newTeacher = new Teacher({ ...req.body });
    const oldUser = Teacher.findOne({ email: newTeacher.email });
    if (oldUser.email) {
        let error = new Error("Duplicated email address");
        error.statusCode = 400;
        throw error;
    }
    if(req.file)
        newTeacher.image = req.file.filename;
    //hash password
    newTeacher.password = await bcrypt.hash(newTeacher.password,10);
    const token = await jwt.sign({id:newTeacher._id,email:newTeacher.email,role:'teacher'},process.env.JWT_Secret_Key,{expiresIn:'1h'});
    newTeacher.token = token;
    console.log(newTeacher);

    newTeacher.save()
        .then((newTeacher) => res.status(200).json({
            message: "Teacher registered"
        }))
}

exports.update_teacher = (req, res, next) => {
    Teacher.findOneAndUpdate({ _id: req.params.id }, req.body)
        .then((teacher) => {
            res.status(201).json({ Message: "Teacher Updated Successfully" });
        });
}

exports.delete_teacher = (req, res, next) => {
    Teacher.findOneAndDelete({ _id: req.params.id })
        .then((teacher) => {
            if (!teacher) {
                let error = new Error("Teacher Not Found");
                error.statusCode = 404;
                throw error;
            }
            res.status(200).json({ message: "Teacher deleted" });
        });
}

exports.get_class_supervisors = (req, res, next) => {
    Class.find({}, { _id: 0, Supervisor: 1 }).populate({ path: "Supervisor" })
        .then((supervisor) => {
            if (supervisor)
                res.status(200).json(supervisor)
        });
}

exports.changePassword = async (req, res, next) => {
    const teacherId = req.token.id;
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