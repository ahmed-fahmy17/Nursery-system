const express = require("express");
const classController = require('../controllers/classController');
const { insert_class_validation, update_class_validation, delete_class_validation } = require('../middleware/validation/classValidation');

const router = express.Router();

router.route("/class")
    .get(classController.get_all_classes)
    .post(insert_class_validation, classController.add_class)

router.route("/class/:id")
    .get(classController.get_class_by_id)
    .delete(delete_class_validation, classController.delete_class)
    .put(update_class_validation, classController.update_class)

router.get("/class/child/:id", classController.get_class_children_info);

router.get("/class/teacher/:id", classController.get_class_supervisor);

module.exports = router;