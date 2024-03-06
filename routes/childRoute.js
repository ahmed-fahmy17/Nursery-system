const express = require("express");
const childController = require("../controllers/childController");
const { insert_child_validation, update_child_validation, delete_child_validation } = require('../middleware/validation/childValidation');
const authorization = require('../middleware/authorization');
const router = express.Router();
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


router.route("/child")
        .get(authorization.verifyToken,childController.get_all_children)
        .post(authorization.verifyToken,authorization.isAdmin,insert_child_validation,upload.single('image'), childController.add_child)

router.route("/child/:id")
        .get(authorization.verifyToken,childController.get_child_by_id)
        .delete(authorization.verifyToken,authorization.isAdmin,delete_child_validation, childController.delete_child)
        .put(authorization.verifyToken,authorization.isAdmin,update_child_validation,upload.single('image'), childController.update_child);

module.exports = router;