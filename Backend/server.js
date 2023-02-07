var express = require("express");
var url = require("url");
var mysql = require("mysql");
var cors = require("cors");

var con = mysql.createConnection({
  host: "localhost",
  user: "sa",
  password: "saSA@123",
});

Connect_Database();

const app = express();
const port = 3000;
app.use(cors());

app.get("/api/countries", (req, res) => {
  var url_parts = url.parse(req.url, true);
  var query = url_parts.query;

  con.query(
    "SELECT Name FROM test_db.countries where Lower(Name) like '%" +
      query.name +
      "%'",
    function (err, result) {
      if (err) throw err;
      console.log("Result: " + result);
      res.send(result);
    }
  );
});

function Connect_Database() {
  con.connect(function (err) {
    if (err) throw err;
    console.log("Database Server Connected!");
  });
}

app.listen(port, () => console.log(`Node JS Server started on port ${port}!`));
