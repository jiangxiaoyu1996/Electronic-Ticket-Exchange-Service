const express = require('express');
const router = express.Router();

//@route GET api/main/test
//@desc Test main route
//@access Public
router.get('/test', (req, res) => res.json({msg: 'Main works'}));

module.exports = router;