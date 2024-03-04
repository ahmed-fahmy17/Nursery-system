const { body, param, query } = require("express-validator");

exports.insert_validation = [
    body("FullName")
        .trim()
        .isAlpha().withMessage("Name should contain characters only")
        .isLength({ min: 3 }).withMessage("Name Should be at least 3 letters"),
    body('Email')
        .isEmail().withMessage("invalid email format"),
    body('Password')
        .isStrongPassword()
        .withMessage("Password have to be at least 8 characters Containing letters, numbers and special characters")
]

exports.update_validation = [
    param("id")
        .isMongoId().withMessage("ID Should be ObjectID"),
    body("FullName").optional()
        .trim()
        .isAlpha().withMessage("Name should contain characters only")
        .isLength({ min: 3 }).withMessage("Name Should be at least 3 letters"),
    body('Password').optional().isStrongPassword()
        .withMessage("Password have to be at least 8 characters Containing letters, numbers and special characters"),
    body('Email')
        .optional()
        .isEmail().withMessage("invalid email format")
]

exports.delete_validation = [
    param('id')
    .isMongoId().withMessage("ID Should be ObjectID")
]