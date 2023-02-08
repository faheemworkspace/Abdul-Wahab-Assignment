var express = require("express");
var url = require("url");
var mysql = require("mysql");
var cors = require("cors");
const { fail } = require("assert");
var sqlite = require("sqlite3").verbose();

const app = express();
const port = 3000;
const dbPath = `${__dirname}/db/app_db.db`;
var db = null;

InitDB();

app.use(cors());
app.get("/api/countries", (req, res) => {
  var url_parts = url.parse(req.url, true);
  var query = url_parts.query;
  ConnectDB(
    (db) => {
      db.all(
        "SELECT Name FROM Countries where Name like '%" + query.name + "%'",
        (err, result) => {
          console.log(err);
          console.log(result);
          res.send(result);
        }
      );
    },
    (err) => {
      console.log("Connection failed", err);
    }
  );
});

function ConnectDB(successCallback, failureCallback) {
  let db = new sqlite.Database(dbPath, sqlite.OPEN_READONLY, (err) => {
    if (!err) {
      console.log("Database accessed readonly.");
      successCallback(db);
    } else {
      failureCallback();
    }
  });
}

function InitDB() {
  db = new sqlite.Database(dbPath, (err) => {
    if (err) console.log(err);
    else {
      let query = "CREATE TABLE IF NOT EXISTS Countries (Name TEXT NOT NULL);";
      db.run(query, (err) => {
        if (err) console.log(err);
        else {
          let deletequery = "Delete from Countries";
          db.run(deletequery, () => {
            if (err) console.log(err);
            else {
              let insertquery =
                "Insert into Countries VALUES ('Pakistan'),('India'),('Maldives'),('Saudi Arab'),('Kuwait'),('Qatar')";
              db.run(insertquery, (err) => {
                if (err) console.log(err);
                else {
                  db.close((err) => {
                    if (err) console.log(err);
                  });
                }
              });
            }
          });
        }
      });
    }
  });
}

app.listen(port, () => console.log(`Node JS Server started on port ${port}!`));
