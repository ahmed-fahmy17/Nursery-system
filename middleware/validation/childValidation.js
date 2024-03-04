const { body, param, query } = require("express-validator");
exports.insert_child_validation = [
    body("fullname")
        .trim()
        .isAlpha().withMessage("Name should contain characters only")
        .isLength({ min: 3 }).withMessage("Name Should be at least 3 letters"),
    body('age')
        .isInt({ min: 2, max: 8 }).withMessage('Age must be between 2 and 8'),
    body('level')
        .isIn(['PreKG', 'KG1', 'KG2']).withMessage('Level must be PreKG, KG1  or KG2'),
    body("address.city")
        .isAlpha().withMessage("city must consist of characters only"),
    body("address.street")
        .isAlpha().withMessage("street must consist of characters only"),
    body("address.building")
        .isAlpha().withMessage("building must consist of characters only"),
];


exports.update_child_validation = [
    body("fullname")
        .optional()
        .trim()
        .isAlpha().withMessage("Name should contain characters only")
        .isLength({ min: 3 }).withMessage("Name Should be at least 3 letters"),
    body('age')
        .optional()
        .isInt({ min: 2, max: 8 }).withMessage('Age must be between 2 and 8'),
    body('level')
        .optional()
        .isIn(['PreKG', 'KG1', 'KG2']).withMessage('Level must be PreKG, KG1  or KG2'),
    body("address.city")
        .optional()
        .isAlpha().withMessage("city must consist of characters only"),
    body("address.street")
        .optional()
        .isAlpha().withMessage("street must consist of characters only"),
    body("address.building")
        .optional()
        .isAlpha().withMessage("building must consist of characters only"),
    body("id")
        .optional()
        .isMongoId({ min: 1 }).withMessage(" ID should be a positive number")
];

exports.delete_child_validation = [
    param('id')
    .isMongoId({ min: 1 }).withMessage("ID Should be positive integer")
]