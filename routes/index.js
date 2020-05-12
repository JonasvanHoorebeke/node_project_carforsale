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
/* app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json()); */

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

/* AFFICHER UNE ANNONCE EN PARTICULIER */

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

/* API = permet qu'un élément d'un logiciel parle à une autre élément */
/* Test API */
/* app.get('/api', (req, res) => {
  res.json({
    success: 1,
    message: "This is rest apis working"
  });
}); */

/* GET API all annonces */
router.get('/api', (req, res, next) => {
  db.query('SELECT * FROM tb_annonce', (err, rows, fields) => {
    if(!err)
    res.send(rows);
    else
    console.log(err)
  })
});


/* GET API one annonce */
router.get('/api/:id', (req, res, next) => {
  db.query('SELECT * FROM tb_annonce WHERE id = ?', [req.params.id],(err, rows, fields) => {
    if(!err)
    res.send(rows);
    else
    console.log(err)
  })
});

/* DELETE API annonce */
router.delete('/api/:id', (req, res, next) => {
  db.query('DELETE FROM tb_annonce WHERE id = ?', [req.params.id],(err, rows, fields) => {
    if(!err)
    res.send('Deleted successfully');
    else
    console.log(err)
  })
});

/*UPDATE API annonce*/
/* router.put('/api', (req, res, next) => {
  let emp = req.body;
  var sql = 'SET @id = ?;SET @marque = ?;SET @modele = ?;SET @annee = ?;SET @kilometrage = ?;SET @prix; \
  CALL UserAddOrEdit(@id,@marque,@modele,@annee,@kilometrage,@prix);';
  db.query(sql, [emp.id, emp.marque, emp.modele, emp.annee, emp.kilometrage, emp.prix], (err, rows, fields) => {
    if(!err)
    res.send('Updated successfully');
    else
    console.log(err)
  })
}); */

/*ADD API annonce*/
/* app.post('/adduser', function (req, res) {
  
  let id = req.body.id;
  let marque = req.body.marque;
console.log(id+" "+marque);
  if (!id && !marque) {
      return res.status(400).send({ error:true, message: 'Please provide Information to be add' });
  }

  db.query("INSERT INTO tb_annonce(id, marque) value(?,?) ", [id,marque], function (error, results, fields) {
      if (error) throw error;
      return res.send({ error: false, data: results, message: 'Record has been added' });
  });
}); */

module.exports = router;
