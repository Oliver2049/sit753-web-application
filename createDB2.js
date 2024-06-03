let sqlite3 = require("sqlite3").verbose();
let db1 = new sqlite3.Database("myDB"); // existing database
let db2 = new sqlite3.Database("myDB2"); // new database

let messages = [
  "I need help",
  "Can you assist me?",
  "I have a question.",
  "I need information.",
  "Please contact me.",
];

db2.serialize(function () {
  db2.run(
    "CREATE TABLE IF NOT EXISTS UserContact (id INT, fullname TEXT, email TEXT, message TEXT)"
  );
  db2.run("DELETE FROM UserContact");

  db1.all("SELECT * FROM User", function (err, rows) {
    if (err) {
      console.error(err);
      return;
    }

    let stmt = db2.prepare(
      "INSERT INTO UserContact (id, fullname, email, message) VALUES (?, ?, ?, ?)"
    );

    for (let row of rows) {
      // Use the id, fullname, and email from the User table
      let id = row.id;
      let fullname = row.fullname;
      let email = row.email;

      // Select a random message for each user
      let message = messages[Math.floor(Math.random() * messages.length)];

      stmt.run(id, fullname, email, message);
    }

    stmt.finalize(function () {
      db2.each(
        "SELECT * FROM UserContact",
        function (err, row) {
          console.log(`${row.id} ${row.fullname} ${row.email} ${row.message}`);
        },
        function (err, count) {
          // Close the databases after all operations have completed
          db1.close();
          db2.close();
        }
      );
    });
  });
});
app.post("/contact", function (req, res, next) {
  let fullname = req.body.fullname;
  let email = req.body.email;
  let message = req.body.message;

  db.get(
    `SELECT id, username, password, fullname, orders FROM User WHERE fullname = ? AND email = ?`,
    [fullname, email],
    (err, row) => {
      if (err) {
        return console.error(err.message);
      }

      if (row) {
        console.log("Found you!");
        console.log("Validating information!");
        console.log(
          `Data includes:${row.id} ${fullname}, ${email}, ${message}`
        );
        //update the message for the user in the UserContact table
        let stmt = db2.run(
          `UPDATE UserContact SET message = ? WHERE id = ?`,
          [message, row.id],
          function (err) {
            if (err) {
              return console.error(err.message);
            }
            console.log(`Row(s) updated: ${this.changes}`);
          }
        );
      } else {
        console.log("Invalid username or password.");
      }
    }
  );
  // still display the default web page in public folder, i.e. index.html, for next data entering
  res.status(200).redirect("/contact.html");
});
