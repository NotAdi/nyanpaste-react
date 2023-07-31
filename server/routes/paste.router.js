const { pasteController } = require('../controllers');
const authMiddleware = require('../middleware/auth.middleware');
const { validate } = require('../middleware/validation.middleware');
const { pasteValidation } = require('../validations');

const router = require('express').Router();
require('../configs/passport');

router.get(
    "/dashboard",
    // pasteController.defPaste

    // authMiddleware,
    pasteController.getAllPastes
);

router.get(
    '/:id',
    validate(pasteValidation.getPasteById),
    pasteController.getPasteById
);
router.post(
    '/',
    validate(pasteValidation.createNewPaste),
    pasteController.createNewPaste
);

router.get(
    '/',
    // authMiddleware,
    pasteController.defPaste
);



module.exports = router;
