const Class = require('../models/classModel');
const Child = require('../models/childModel');
const Teacher = require("../models/teacherModel");

exports.get_all_classes = (req, res, next) => {
    Class.find({})
        .then((classData) => { res.status(200).json(classData) });
}

exports.get_class_by_id = (req, res, next) => {
    Class.find({ _id: req.params.id })
        .then((classData) => {
            res.status(200).json(classData);
        })
}

exports.add_class = (req, res, next) => {
    const newClass = new Class({ ...req.body });
    newClass.save()
        .then((newClass) => res.status(200).json({
            message: "Class added"
        }))
}

exports.update_class = (req, res, next) => {
    Class.findOneAndUpdate({ _id: req.params.id }, req.body)
        .then((_class) => {
    res.status(200).json({ Message: "class Updated Successfully" });
});
}

exports.delete_class = (req, res, next) => {
    Class.findOneAndDelete({ _id: req.params.id })
        .then((_class) => {
            if (!_class) {
                let error = new Error("class Not Found");
                error.statusCode = 404;
                throw error;
            }
            res.status(200).json({ message: "class deleted" });
        });
}

exports.get_class_children_info = (req, res, next) => {
    Class.find({ _id: req.params.id })
        .then((_class) => {
            if (!_class) {
                let error = new Error("Class Not Found");
                error.statusCode = 404;
                throw error;
            }
            const childrens = _class[0].children;
            Child.find({}, { _id: 0 }).where('child_id').in(childrens)
                .then((classChildren) => { res.status(200).json(classChildren) });
        });
}

exports.get_class_supervisor = (req, res, next) => {
    Class.findOne({ _id: req.params.id })
        .then(_class => {
            if (_class) {
                Teacher.findOne({ _id: _class.supervisor }, { _id: 0 })
                    .then((data) => { res.status(200).json(data) });
            }
            else {
                let error = new Error("Class Not Found");
                error.statusCode = 404;
                throw error;
            }
        });
}