var db = require('../db');

module.exports.index = function(req, res) {
    var page = parseInt(req.query.page) || 1;  // n 
    var perPage = 8; // x
    //console.log(page);
    
    var start = (page-1)*perPage;
    var end = (page-1)*perPage + perPage; // page * perPage

    var prevPage = page - 1;
    var nextPage = page + 1;
    
    // var npro = db.get('products').value();

    // console.log(npro.length);
    
    

    res.render('products/index.pug', { 
        products : db.get('products').value().slice(start,end),
        page : page,
        prevPage: prevPage,
        nextPage: nextPage
    })
};