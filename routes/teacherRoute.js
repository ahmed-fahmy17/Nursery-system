const express = require("express");
const router = express.Router();
const teacherController = require('../controllers/teacherController');
const { insert_validation, update_validation, delete_validation } = require("../middleware/validation/teacherValidation");

router.route('/teacher')
   .get(teacherController.get_all_teachers)
   .post(insert_validation, teacherController.add_teacher);

router.get("/teacher/supervisors", teacherController.get_class_supervisors);

router.route("/teacher/:id")
        .get(teacherController.get_teacher_by_id)
        .delete(delete_validation, teacherController.delete_teacher)
        .put(update_validation, teacherController.update_teacher);

module.exports = router;