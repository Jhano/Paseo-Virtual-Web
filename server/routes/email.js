const { Router } = require("express");
const { confirmacionEmail } = require("../controllers/email");

const router = Router();

router.get('/:token', confirmacionEmail);

module.exports = router;