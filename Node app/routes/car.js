var express = require('express');
var router = express.Router();
const connector = require('../poolconnect');
router.get('/createtable', function (req, res) {
  var sql =
    'CREATE TABLE car(car_id int AUTO_INCREMENT PRIMARY KEY,carname varchar(200),price int,color ENUM("black","blue","grey"),in_stock boolean)';
  connector.query(sql, function (err, results, fields) {
    res.json({ err, results, fields });
  });
});
router.get('/', function (req, res) {
  var sql = 'SELECT * FROM car';
  connector.query(sql, function (err, results) {
    res.json({ err, results });
  });
});
router.post('/', function (req, res) {
  const { carname, price, color, in_stock } = req.body;
  var sql = `INSERT INTO car (carname, price,color,in_stock) VALUES (?,?,?,?)`;
  connector.query(
    sql,
    [carname, price, color, in_stock],
    function (err, results, fields) {
      res.json({ err, results, fields });
    }
  );
});
router.delete('/:car_id', function (req, res) {
  const sql = `DELETE FROM car WHERE car_id=${parseInt(req.params.car_id)}`;
  connector.query(sql, function (err, results, fields) {
    res.json({ err, results, fields });
  });
});
router.put('/update/:car_id', function (req, res) {
  const { car_id } = req.params;
  const { carname, price, color, in_stock } = req.body;
  var sql = `UPDATE car SET car_id=?,carname=?,price=?,color=?,in_stock=? WHERE car_id=${req.params.car_id}`;
  connector.query(
    sql,
    [car_id, carname, price, color, in_stock],
    function (err, results, fields) {
      res.json({ err, results, fields });
    }
  );
});
router.get('/deleteall', function (req, res) {
  const sql = `DELETE FROM car`;
  connector.query(sql, function (err, results, fields) {
    res.json({ err, results, fields });
  });
});
module.exports = router;
