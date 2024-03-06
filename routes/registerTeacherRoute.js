const express = require("express");
const router = express.Router();
const teacherController = require('../controllers/teacherController');
const { insert_validation } = require("../middleware/validation/teacherValidation");
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

router.route('/register')
    .post(insert_validation, insert_validation,upload.single('image'), teacherController.add_teacher);

module.exports = router;