const express = require("express");
const mysql2 = require("mysql2");
const path = require("path");

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use(express.static(__dirname + "/public"));
app.use(express.static(__dirname));


app.get("/", (req,res) => {
  res.sendFile(path.join(__dirname + "/public" + "style.css"));
});

const mysql2Connection = mysql2.createConnection({
  host : 'localhost',
  user : 'root',
  password : 'root',
  database : 'data',
  multipleStatements: true

});

app.get("/details", function(req, res) {
  mysql2Connection.query("SELECT * FROM details", function(err, result, feiled) {
    if(err) {
      return res.status(400).send(err);
    }
      return res.status(200).send(result);
    
  });
});

app.post("/details",function(req, res) {
  const {
    id,
    name,
    email,
    password,
  } = req.body

  var sql = "INSERT INTO details (id, name, email, password) VALUES ?";
  mysql2Connection.query(sql, [[[id, name, email, password]]], function(err, result, failed) {
    if(err) {
      return res.status(400).send(err);
    }
    return res.status(200).send("Created Successfully");
  });

});

app.put("/details/:id", function(req, res) {
  const { name } = req.body;
  mysql2Connection.query('UPDATE details SET name = ? WHERE id = ?', [name, req.params.id], function (err, results, fields) {
      if (err) { 
          return res.status(400).send(err); 
      }
      return res.status(200).send("Updeted Succesfully");
  });
});

app.delete("/details/:id",function(req, res) {
  mysql2Connection.query("DELETE FROM details WHERE id = ?", [req.params.id], function(err, result, feild) {
      if(err) {
          return res.status(400).send(err);
      }
      return res.status(200).send('Deleted successfully');

  });
});

app.listen(3000, function() {
  console.log("Api is running at 3000...!");  
}); 
  



