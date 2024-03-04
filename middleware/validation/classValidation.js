const { body, param, query } = require("express-validator");
exports.insert_class_validation = [
    body('_id')
        .isMongoId({ min: 1 }).withMessage('ID must be positive integer'),
    body('name')
        .isString().withMessage('Name must be string'),
    body('supervisor')
        .isMongoId().withMessage('Supervisor have to be a valid ObjectId'),
    body('children')
        .isArray().withMessage('Children must be an array')
        .isInt({ min: 1 }).withMessage('child ID must be an integer')
];


exports.update_class_validation = [
    body('_id')
        .optional()
        .isMongoId({ min: 1 }).withMessage('ID must be positive integer'),
    body('name')
        .optional()
        .isString().withMessage('Name must be string'),
    body('supervisor')
        .optional()
        .isMongoId().withMessage('Supervisor have to be a valid ObjectId'),
    body('children')
        .optional()
        .isArray().withMessage('Children must be an array')
        .isInt({ min: 1 }).withMessage('child ID must be an integer')
];

exports.delete_class_validation = [
    param('id')
        .isMongoId({ min: 1 }).withMessage("ID Should be positive Integer")
]