let sqlite3 = require("sqlite3").verbose();
let db = new sqlite3.Database("myDB"); // file database

db.serialize(function () {
  db.run(
    "CREATE TABLE IF NOT EXISTS User (id INT, username UNIQUE, password TEXT, fullname TEXT, orders INT, email TEXT)"
  );
  db.run("DELETE FROM User");
  db.run(
    `INSERT INTO User (id, username, password, fullname, orders, email) VALUES (1, "mickeym", "cheese123", "Mickey Mouse", 8, "mickey203@email.com")`
  );
  db.run(
    `INSERT INTO User (id, username, password, fullname, orders, email) VALUES (2, "alfred", "pm1903aus", "Alfred Deakin", 6,  "donald456@email.com" )`
  );
  db.run(
    `INSERT INTO User (id, username, password, fullname, orders, email) VALUES (3, "jane", "qwerty", "Jane Smith", 9, "goofy789@email.com" )`
  );
  db.run(
    `INSERT INTO User (id, username, password, fullname, orders, email) VALUES (4, "john", "brian1979", "John Cleese", 4, "minnie123@email.com" )`
  );
  db.run(
    `INSERT INTO User (id, username, password, fullname, orders, email) VALUES (5, "terry", "montyp1969", "Terry Jones ", 5, "daisy321@email.com")`
  );

  console.log("Display all content from all rows of the DB");
  db.each("SELECT * FROM User", function (err, row) {
    console.log(
      `${row.id} ${row.username.padEnd(15)} ${
        row.password
      } ${row.fullname.padEnd(15)} ${row.orders} ${row.email.padEnd(15)}  `
    );
  });
});
db.close();
