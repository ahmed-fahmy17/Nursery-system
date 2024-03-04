const Teacher = require('../models/teacherModel');
const Class = require('../models/classModel');

exports.get_all_teachers = (req, res, next) => {
    Teacher.find({})
        .then((teachersData) => { res.status(200).json(teachersData) });
}

exports.get_teacher_by_id = (req, res, next) => {
    console.log("jadadncladlalkadklalkdv akvkladv");
    Teacher.find({ _id: req.params.id })
        .then((teacherData) => {
            res.status(200).json(teacherData);
        })
}

exports.add_teacher = (req, res, next) => {
    const newTeacher = new Teacher({ ...req.body });
    newTeacher.save()
        .then((newTeacher) => res.status(200).json({
            message: "Teacher added"
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