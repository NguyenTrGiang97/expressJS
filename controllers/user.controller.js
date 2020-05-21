var db = require('../db');
const shortid = require('shortid');

module.exports.index = function (request, response) {
    response.render('users/index', {
        users: db.get('users').value()
    });
}

module.exports.search = function (req, res) {
    var q = req.query.q;
    console.log(`q: ${q}`);
    // filter trả về true thì nó sẽ đc lấy ra và cho vào array (matchedUsers)

    var matchedUsers = db.get('users').value().filter(function (user) {
        return user.name.toLowerCase().indexOf(q.toLowerCase()) !== -1;
    })
    //console.log(matchedUsers);

    res.render('users/index', {
        users: matchedUsers,
        q: q
    });
}

module.exports.create = function (req, res) {
    // req: ben phia server doc no ra
    console.log(req.cookies);
    res.render('users/create');
}

module.exports.get = function (req, res) {
    // khi click vào link bên view user thì sẽ lấy đc id truyền vào
    //console.log(req.params.idd);
    var id = req.params.id;

    var user = db.get('users').find({ id: id }).value();

    res.render('users/view', {
        user: user
    });
}

module.exports.postCreate = function (req, res) {
    req.body.id = shortid.generate();
    db.get('users').push(req.body).write()
    //users.push(req.body);
    res.redirect('/users');
};