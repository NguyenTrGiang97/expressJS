var express = require('express');

var controller =  require('../controllers/user.controller')
var validate = require('../validate/user.validate');

var authMiddleware = require('../middlewares/auth.middleware');

var router = express.Router();

router.get('/', authMiddleware.requireAuth, controller.index);

router.get('/cookie', function(req, res, next) {
    // gửu cookie lên
    res.cookie('user-id', 123);
    res.send('Hello cookie');
})

router.get('/search', controller.search);

router.get('/create', controller.create);

router.get('/:id', controller.get);

router.post('/create', validate.postCreate, controller.postCreate)

module.exports = router;