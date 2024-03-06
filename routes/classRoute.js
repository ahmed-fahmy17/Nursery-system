const express = require("express");
const classController = require('../controllers/classController');
const { insert_class_validation, update_class_validation, delete_class_validation } = require('../middleware/validation/classValidation');
const authorization = require('../middleware/authorization');

const router = express.Router();

router.route("/class")
    .get(authorization.verifyToken,authorization.isAdmin,classController.get_all_classes)
    .post(authorization.verifyToken,authorization.isAdmin,insert_class_validation, classController.add_class)

router.route("/class/:id")
    .get(authorization.verifyToken,authorization.isAdmin,classController.get_class_by_id)
    .delete(authorization.verifyToken,authorization.isAdmin,delete_class_validation, classController.delete_class)
    .put(authorization.verifyToken,authorization.isAdmin,update_class_validation, classController.update_class)

router.get("/class/child/:id", authorization.verifyToken,authorization.isAdmin,classController.get_class_children_info);

router.get("/class/teacher/:id", authorization.verifyToken,authorization.isAdmin,classController.get_class_supervisor);

module.exports = router;