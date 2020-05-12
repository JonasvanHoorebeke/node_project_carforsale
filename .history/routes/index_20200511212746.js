var express = require('express');
var router = express.Router();

var mysql = require('mysql');
var db = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: 'root',
  database: 'db_carforsale',
  debug: false
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET test connection. */
router.get('/testconnect', function(req, res, next){
  if (db != null) {
    res.send('La connexion est établie');
  } else {
    res.send('Échec de la tentative de connexion'); 
  }
});

/* GET generate list of annonces */
router.get('/acheter', function(req, res, next){
  db.query('SELECT * FROM tb_annonce', function(err, rs) {
    res.render('select', {acheter: rs}); // res.render = génère un modèle de vue
  });
});

/* GET form new annonce */
router.get('/form', function(req, res, next){
  res.render('form', { acheter: {} }); // ?
});

/* POST form new annonce */
router.post('/form', function(req, res, next){
  db.query('INSERT INTO tb_annonce SET ?', req.body, function(err, rs){
    res.render('new');
  })
})

/* GET delete annonce */
router.get('/delete', function(req, res, next) {
  db.query('DELETE FROM tb_annonce WHERE id = ?', req.query.id, function(err, rs) {
    res.redirect('/acheter');
  })
});

/* GET update annonce */
router.get('/edit', function(req, res, next) {
  db.query('SELECT * FROM tb_annonce WHERE id = ?', req.query.id, function(err, rs){
    res.render('form', {acheter: rs[0]});
  })
});

/* POST update annonce */
router.post('/edit', function(req, res, next) {
  var param =  [
    req.body,       // data for query
    req.query.id    // condition for update
  ]
  db.query('UPDATE tb_annonce SET ? WHERE id = ?', param, function(err, rs) {
    res.redirect('/acheter');    // go to page select
  })
})

/* GET update annonce */
router.get('/detail', function(req, res, next) {
  db.query('SELECT * FROM tb_annonce WHERE id = ?', req.query.id, function(err, rs){
    res.render('form', {acheter: rs[0]});
  })
});

/* API = permet qu'un élément d'un logiciel parle à une autre élément 
   REST API*/
router.delete('/api/:id', function(req, res, next)) 

module.exports = router;
