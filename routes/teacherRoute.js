const express = require("express");
const router = express.Router();
const teacherController = require('../controllers/teacherController');
const { insert_validation, update_validation, delete_validation } = require("../middleware/validation/teacherValidation");
const authorization = require('../middleware/authorization');
const multer = require('multer');
const diskStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads');
    },
    filename: function(req, file, cb) {
        const ext = file.mimetype.split('/')[1];
        const fileName = `user-${Date.now()}.${ext}`;
        cb(null, fileName);
    }
})

const fileFilter = (req, file, cb) => {
    const imageType = file.mimetype.split('/')[0];
    
    if(imageType === 'image') {
        return cb(null, true)
    } else {
        return cb(new Error('file must be an image'), false)
    }
}

const upload = multer({ 
    storage: diskStorage,
    fileFilter
})

router.route('/teacher')
        .get(authorization.verifyToken, authorization.isTeacher, teacherController.get_all_teachers);

router.route("/teacher/supervisors")
        .get(authorization.verifyToken, authorization.isAdmin, teacherController.get_class_supervisors);

router.route("/teacher/:id")
        .get(authorization.verifyToken, authorization.isAdmin, teacherController.get_teacher_by_id)
        .delete(authorization.verifyToken, authorization.isAdmin, delete_validation, teacherController.delete_teacher)
        .put(authorization.verifyToken, authorization.isAdmin, update_validation, upload.single('image'),teacherController.update_teacher);

module.exports = router;