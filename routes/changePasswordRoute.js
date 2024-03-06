const express = require("express");
const router = express.Router();
const changePasswordController = require('../controllers/changePasswordController');
const {update_validation } = require("../middleware/validation/teacherValidation");
const authorization = require('../middleware/authorization');

router.route("/changepassword")
        .put(authorization.verifyToken, authorization.isTeacher, changePasswordController.changePassword);

module.exports = router;