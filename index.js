// Require the express web application framework (https://expressjs.com)
let express = require("express");

// Create a new web application by calling the express function
let app = express();

let sqlite3 = require("sqlite3").verbose();

// persistent file database "myDB".
let db = new sqlite3.Database("myDB");
let db2 = new sqlite3.Database("myDB2");
let db3 = new sqlite3.Database("myDB3");

// Get port from environment and store in Express.
let port = normalizePort(process.env.PORT || "3000");
app.set("port", port);
const path = require("path");
/**
 * Normalize a port into a number, string, or false.
 */
function normalizePort(val) {
  let port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

// Tell our application to serve all the files under the `public_html` directory
app.use(express.static("public_html"));

//Here we are configuring express to use inbuilt body-parser as middle-ware.
app.use(express.urlencoded({ extended: false }));

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "public_html/home.html"));
});

// REST endpoint for STORING the user data into the DB as submitted form the form
app.post("/login", function (req, res, next) {
  let username = req.body.username;
  let password = req.body.password;
  let html = "";

  console.log("Validating login!");
  console.log(`Data includes: ${username}, ${password}`);

  db.get(
    `SELECT id, username, password, fullname, orders FROM User WHERE username = ? AND password = ?`,
    [username, password],
    (err, row) => {
      if (err) {
        return console.error(err.message);
      }

      if (row) {
        console.log("Login valid!");

        html += '<!doctype html><html lang="en">';
        html += "<head>";
        html += "<title>Bootstrap Express/SQLite3 Demo</title>";
        html += '<meta charset="utf-8">';
        html +=
          '<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">';
        html += '<link rel="stylesheet"';
        html +=
          '  href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha2/dist/css/bootstrap.min.css"';
        html +=
          '  integrity="sha384-aFq/bzH65dt+w6FI2ooMVUpc+21e0SRygnTpmBvdBgSdnuTN7QbdgL+OapgHtvPp"';
        html += '  crossorigin="anonymous">';
        html += "</head>";

        html += '<body><div class="container">';
        html += "<h1> Login Successful </h1>";
        html +=
          "<p> Thank you " +
          row.fullname +
          " (username '" +
          row.username +
          "', your login has been successful!) for logging in! </p>";
        html +=
          "<p> Our records show  you have  order  a total of " +
          row.orders +
          " orders.</p>";
        html += "<p> We hope you enjoy your stay! </p>";
        html += "<p>Use the following button to check your order </p>";
        html += '<form action="/checkorder" method="get">';
        html +=
          '<button type="submit" value="Check Order" class="btn btn-primary">Check Order</button>';
        html += "</form>";
        html += "<p>Use the following button to return </p>";
        html += '<form action="/" method="get">';
        html +=
          '<button type="submit" value="Return" class="btn btn-primary">Return</button>';
        html += "</form>";
        html += "</div>";
        html +=
          "<script src='https://code.jquery.com/jquery-3.5.1.slim.min.js' integrity='sha384-DfXdz2htPH0lsSSs5nCTpuj/zySzKfaSGUgYH70mN7JZ2qIks8EELkou1yJwDPn/' crossorigin='anonymous'></script>";
        html += "</body>";
        html += "</html>";
      } else {
        console.log("Invalid username or password.");

        html += '<!doctype html><html lang="en">';
        html += "<head>";
        html += "<title>Bootstrap Express/SQLite3 Demo</title>";
        html += '<meta charset="utf-8">';
        html +=
          '<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">';
        html += '<link rel="stylesheet"';
        html +=
          '  href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha2/dist/css/bootstrap.min.css"';
        html +=
          '  integrity="sha384-aFq/bzH65dt+w6FI2ooMVUpc+21e0SRygnTpmBvdBgSdnuTN7QbdgL+OapgHtvPp"';
        html += '  crossorigin="anonymous">';
        html += "</head>";
        html += '<body><div class="container">';
        html += "<h1> Login Failed </h1>";
        html +=
          "<p> Sorry but your username and password doesn't match our records! </p>";
        html += "</div>";

        html +=
          '<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/js/bootstrap.bundle.min.js" integrity="sha384-w76AqPfDkMBDXo30jS1Sgez6pr3x5MlQ1ZAGC+nuZB+EYdgRZgiwxhTBTkF7CXvN" crossorigin="anonymous"></script>';
        html += "</body>";
        html += "</html>";
      }
      res.send(html);
    }
  );
});

app.post("/contact", function (req, res, next) {
  let fullname = req.body.fullname;
  let email = req.body.email;
  let message = req.body.message;

  db2.get(`SELECT MAX(id) as maxId FROM UserContact`, (err, row) => {
    if (err) {
      return console.error(err.message);
    }

    let id = row.maxId ? row.maxId + 1 : 1;
    console.log("Found you!");
    console.log("Validating information!");
    console.log(`Data includes:${id} ${fullname}, ${email}, ${message}`);

    let stmt = db2.run(
      `INSERT INTO UserContact VALUES ("${id}", "${fullname}", "${email}", "${message}")`
    );
  });

  res.status(200).redirect("/Contact.html");
});

app.get("/users", function (req, res) {
  let html = "";

  html += '<!doctype html><html lang="en">';
  html += "<head>";
  html += "<title>Bootstrap Express/SQLite3 Demo</title>";
  html += '<meta charset="utf-8">';
  html +=
    '<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">';
  html += '<link rel="stylesheet"';
  html +=
    '  href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha2/dist/css/bootstrap.min.css"';
  html +=
    '  integrity="sha384-aFq/bzH65dt+w6FI2ooMVUpc+21e0SRygnTpmBvdBgSdnuTN7QbdgL+OapgHtvPp"';
  html += '  crossorigin="anonymous">';
  html += "</head>";

  html += '<body><div class="container">';
  html += "<h3> The User Information Table </h3>";
  html += '<table class="table">';
  html += '<thead class="thead-dark"><tr>';
  html += "<th>ID</th><th>Full Name</th><th>Email</th><th>Message</th>";
  html += "<tr></thead><tbody>";

  db2.all("SELECT * FROM UserContact", function (err, rows) {
    if (err) {
      return console.error(err.message);
    }
    if (rows.length === 0) {
      console.log("Array is empty!");
      html += '<tr><td colspan="3"> No data found </td></tr>';
    } else {
      rows.forEach(function (row) {
        html += "<tr>";
        html += "<td>" + row.id + "</td>";
        html += "<td>" + row.fullname + "</td>";
        html += "<td>" + row.email + "</td>";
        html += "<td>" + row.message + "</td></tr>";
      });
    }

    html += "</tbody></table>";
    html += "</div>";

    html +=
      '<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/js/bootstrap.bundle.min.js" integrity="sha384-w76AqPfDkMBDXo30jS1Sgez6pr3x5MlQ1ZAGC+nuZB+EYdgRZgiwxhTBTkF7CXvN" crossorigin="anonymous"></script>';
    html += "</body>";
    html += "</html>";
    res.send(html);
  });
});

app.post("/order", function (req, res, next) {
  console.log(req.body);
  let fullname = req.body.fullname;
  let tables = parseInt(req.body.tables);
  let beertype = req.body.beertype;
  let size = req.body.size;
  let special = req.body.special;
  let beernumber = parseInt(req.body.beernumber);

  db3.get(
    `SELECT * FROM UserOrder WHERE fullname = ? AND tables = ?`,
    [fullname, tables],
    (err, row) => {
      if (err) {
        return console.error(err.message);
      }

      db3.get(
        `SELECT * FROM UserOrder WHERE fullname = ?`,
        [fullname],
        (err, userRow) => {
          if (err) {
            return console.error(err.message);
          }

          let orders;
          if (userRow) {
            orders = userRow.orders + 1;
          } else {
            orders = 1;
          }

          if (row) {
            db3.run(
              `UPDATE UserOrder SET orders = ? WHERE fullname = ? AND tables = ?`,
              [orders, fullname, tables],
              (err) => {
                if (err) {
                  return console.error(err.message);
                }
                console.log(
                  `Updated orders for ${fullname} in UserOrder to ${orders}`
                );
              }
            );

            db.run(
              `UPDATE User SET orders = ? WHERE fullname = ?`,
              [orders, fullname],
              (err) => {
                if (err) {
                  return console.error(err.message);
                }
                console.log(
                  `Updated orders for ${fullname} in User to ${orders}`
                );
              }
            );
          } else {
            db3.get(`SELECT MAX(id) as maxId FROM UserOrder`, (err, row) => {
              if (err) {
                return console.error(err.message);
              }

              let id = row.maxId ? row.maxId + 1 : 1;
              console.log("Found you!");
              console.log("Validating information!");
              console.log(
                `Data includes:${id} ${fullname}, ${tables}, ${beertype}, ${size}, ${special}, ${beernumber}, ${orders}`
              );

              let stmt = db3.run(
                `INSERT INTO UserOrder VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
                [
                  id,
                  fullname,
                  tables,
                  beertype,
                  size,
                  special,
                  beernumber,
                  orders,
                ]
              );
            });
          }
        }
      );
    }
  );
  function addMinutes(date, minutes) {
    return new Date(date.getTime() + minutes * 60000);
  }
  let orderDate = new Date();
  let serveTime = addMinutes(orderDate, 30);
  const beerPrice = {
    stout: 10,
    pilsner: 8,
    larger: 6,
    porter: 12,
    pale_ale: 9,
    amber_ale: 7,
  };
  const sizePrice = {
    tap: 2,
    pint: 1,
    schooner: 0.75,
    pot: 0.5,
  };
  let numOptions;
  if (Array.isArray(special)) {
    numOptions = special.length;
  } else {
    numOptions = 0;
  }
  let specialCost = numOptions * 11;

  let beerCost =
    (beerPrice[beertype] + sizePrice[size] + specialCost) * beernumber;
  let serviceCost = beerCost * 0.2;
  let sizeCost = sizePrice[size] * beernumber;
  let totalCost = beerCost + serviceCost;
  totalCost = beerCost.toFixed(2);
  console.log("Just received POST data for beer order endpoint!");
  console.log(
    `Data includes: ${fullname}, ${tables}, ${beertype}, ${size}, ${special}, ${beernumber}`
  );
  console.log(`Total cost is: ${totalCost}`);
  let html = "";
  html += '<!doctype html><html lang="en">';
  html += "<head>";
  html += "<title>Beer Receipt</title>";
  html += '<meta charset="utf-8">';
  html +=
    '<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">';
  html += '<link rel="stylesheet"';
  html +=
    '  href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha2/dist/css/bootstrap.min.css"';
  html += '  crossorigin="anonymous">';
  html += "</head>";
  html += '<body><div class="container">';
  html += "<h1> Beer Receipt </h1>";
  html += "<p> Thank you " + fullname + " for ordering beer! </p>";
  html += "<p> Your beer will be ready at " + serveTime + " </p>";
  html += "<p> Your total cost of your order is: </p>";
  html += "<p> Beer Cost: $" + beerCost.toFixed(2) + "</p>";
  html += "<p> Size Cost: $" + sizeCost + "</p>";
  html += "<p> Special food Cost: $" + specialCost + "</p>";
  html += "<p> Service Cost: $" + serviceCost.toFixed(2) + "</p>";
  html += "<p> Total Cost: $" + totalCost + "</p>";
  html += "<h2>Estimated Finish Time</h2>";
  html += "<p> Your beer will be ready at " + serveTime + " </p>";
  html += "<p>Use the following button to return </p>";
  html += '<form action="/" method="get">';
  html +=
    '<button type="submit" value="Return" class="btn btn-primary">Return</button>';
  html += "</form>";
  html += "</div>";

  html +=
    '<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/js/bootstrap.bundle.min.js" integrity="sha384-w76AqPfDkMBDXo30jS1Sgez6pr3x5MlQ1ZAGC+nuZB+EYdgRZgiwxhTBTkF7CXvN" crossorigin="anonymous"></script>';
  html += "</body>";
  html += "</html>";
  res.send(html);
});

app.get("/checkorder", function (req, res) {
  let html = "";

  html += '<!doctype html><html lang="en">';
  html += "<head>";
  html += "<title>Bootstrap Express/SQLite3 Demo</title>";
  html += '<meta charset="utf-8">';
  html +=
    '<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">';
  html += '<link rel="stylesheet"';
  html +=
    '  href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha2/dist/css/bootstrap.min.css"';
  html +=
    '  integrity="sha384-aFq/bzH65dt+w6FI2ooMVUpc+21e0SRygnTpmBvdBgSdnuTN7QbdgL+OapgHtvPp"';
  html += '  crossorigin="anonymous">';
  html += "</head>";

  html += '<body><div class="container">';
  html += "<h3> The User Order Information Table </h3>";
  html += '<table class="table">';
  html += '<thead class="thead-dark"><tr>';
  html +=
    "<th>ID</th><th>Full Name</th><th>Table</th><th>Beer Type</th><th>Size</th><th>Special Food</th><th>Beer Number</th><th>Orders</th>";
  html += "<tr></thead><tbody>";

  db3.all("SELECT * FROM UserOrder", function (err, rows) {
    if (err) {
      return console.error(err.message);
    }
    if (rows.length === 0) {
      console.log("Array is empty!");
      html += '<tr><td colspan="3"> No data found </td></tr>';
    } else {
      rows.forEach(function (row) {
        html += "<tr>";
        html += "<td>" + row.id + "</td>";
        html += "<td>" + row.fullname + "</td>";
        html += "<td>" + row.tables + "</td>";
        html += "<td>" + row.beertype + "</td>";
        html += "<td>" + row.size + "</td>";
        html += "<td>" + row.special + "</td>";
        html += "<td>" + row.beernumber + "</td>";
        html += "<td>" + row.orders + "</td></tr>";
      });
    }
    html += "</tbody></table>";
    html += "<p>Use the following button to return </p>";
    html += '<form action="/" method="get">';
    html +=
      '<button type="submit" value="Return" class="btn btn-primary">Return</button>';
    html += "</form>";
    html += "</div>";

    html +=
      '<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/js/bootstrap.bundle.min.js" integrity="sha384-w76AqPfDkMBDXo30jS1Sgez6pr3x5MlQ1ZAGC+nuZB+EYdgRZgiwxhTBTkF7CXvN" crossorigin="anonymous"></script>';
    html += "</body>";
    html += "</html>";
    res.send(html);
  });
});

// Tell our application to listen to requests at port 3000 on the localhost
app.listen(port, function () {
  // When the application starts, print to the console that our app is
  // running at http://localhost:3000  (where the port number is 3000 by
  // default). Print another message indicating how to shut the server down.
  console.log(`Web server running at: http://localhost:${port}`);
  console.log("Type Ctrl+C to shut down the web server");
});
