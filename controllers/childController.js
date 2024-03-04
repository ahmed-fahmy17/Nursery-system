const Child = require('../models/childModel');

exports.get_all_children = (req, res, next) => {
    Child.find({})
        .then((childData) => { res.status(200).json(childData) });
}

exports.get_child_by_id = (req, res, next) => {
    Child.find({ child_id: Number(req.params.id) })
        .then((childData) => {
            res.status(200).json(childData);
        })
}

exports.add_child = (req, res, next) => {
    const newChild = new Child({ ...req.body});
    newChild.save()
        .then((newChild) => res.status(200).json({
            message: "Child added"
        }))
}

exports.update_child = (req, res, next) => {
    Child.findOneAndUpdate({ child_id: req.params.id }, req.body)
        .then((child) => {
            res.status(200).json({ Message: "Child Updated Successfully" });
        });
}

exports.delete_child = (req, res, next) => {
    Child.findOneAndDelete({ child_id: req.params.id })
        .then((child) => {
            if (!child) {
                let error = new Error("child Not Found");
                error.statusCode = 404;
                throw error;
            }
            res.status(200).json({ message: "child deleted" });
        });
}