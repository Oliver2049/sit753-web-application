const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("./index.js");
const should = chai.should();

chai.use(chaiHttp);

describe("Endpoints", () => {
  // Test the GET route
  describe("/GET route", () => {
    it("it should GET the home page", (done) => {
      chai
        .request(server)
        .get("/")
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
    });
  });

  // Test the POST /contact route
  describe("/POST contact", () => {
    it("it should POST a contact message", (done) => {
      let contact = {
        fullname: "John Doe",
        email: "john@example.com",
        message: "Hello, this is a test message.",
      };
      chai
        .request(server)
        .post("/contact")
        .send(contact)
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
    });
  });

  // Test the GET /users route
  describe("/GET users", () => {
    it("it should GET all the users", (done) => {
      chai
        .request(server)
        .get("/users")
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
    });
  });
});
