const express = require("express");
const childController = require("../controllers/childController");
const { insert_child_validation, update_child_validation, delete_child_validation } = require('../middleware/validation/childValidation');

const router = express.Router();


router.route("/child")
        .get(childController.get_all_children)
        .post(insert_child_validation, childController.add_child)

router.route("/child/:id")
        .get(childController.get_child_by_id)
        .delete(delete_child_validation, childController.delete_child)
        .put(update_child_validation, childController.update_child);

module.exports = router;