let sqlite3 = require("sqlite3").verbose();
let db1 = new sqlite3.Database("myDB"); // existing database
let db3 = new sqlite3.Database("myDB3"); // new database

let tables = [10, 8, 6, 4, 5];
let beertypes = [
  "Lager",
  "Stout",
  "Pale Ale",
  "Pilsner",
  "Porter",
  "Amber Ale",
];
let sizes = ["Tap", "Pint", "Schooner", "Pot"];
let specials = [
  "Fishes and Chips",
  "Grilled Chicken",
  "Fish Tacos",
  "Buffalo Wings",
];
let beernumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];

db3.serialize(function () {
  db3.run(
    "CREATE TABLE IF NOT EXISTS UserOrder (id INT, fullname TEXT, tables INT, beertype TEXT, size TEXT, special TEXT, beernumber INT, orders INT)"
  );
  db3.run("DELETE FROM UserOrder");

  db1.all("SELECT * FROM User", function (err, rows) {
    if (err) {
      console.error(err);
      return;
    }

    let stmt = db3.prepare(
      "INSERT INTO UserOrder (id, fullname, tables, beertype, size, special, beernumber, orders) VALUES (?, ?, ?, ?, ?, ?, ?, ?)"
    );

    for (let row of rows) {
      // Use the id, fullname, and email from the User table
      let id = row.id;
      let fullname = row.fullname;
      let orders = row.orders;

      // Select a random message for each user
      let table = tables[Math.floor(Math.random() * tables.length)];
      let beertype = beertypes[Math.floor(Math.random() * beertypes.length)];
      let size = sizes[Math.floor(Math.random() * sizes.length)];
      let special = specials[Math.floor(Math.random() * specials.length)];
      let beernumber =
        beernumbers[Math.floor(Math.random() * beernumbers.length)];

      stmt.run(
        id,
        fullname,
        table,
        beertype,
        size,
        special,
        beernumber,
        orders
      );
    }

    stmt.finalize(function () {
      db3.each(
        "SELECT * FROM UserOrder",
        function (err, row) {
          console.log(
            `${row.id} ${row.fullname} ${row.tables} ${row.beertype} ${row.size} ${row.special} ${row.beernumber} ${row.orders}`
          );
        },
        function (err, count) {
          // Close the databases after all operations have completed
          db1.close();
          db3.close();
        }
      );
    });
  });
});
