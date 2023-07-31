const router = require('express').Router();
const { authValidation } = require('../validations');
const { validate } = require('../middleware/validation.middleware');
const { authController } = require('../controllers');

router.post("/signup", validate(authValidation.auth), authController.signup);
router.post("/login", validate(authValidation.auth), authController.login);

module.exports = router;
