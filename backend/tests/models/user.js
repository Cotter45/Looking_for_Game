const chai = require("chai");
const chaiHttp = require("chai-http");
const bcrypt = require("bcryptjs");

const expect = chai.expect;

chai.use(chaiHttp);

describe("USER DB Model Tests", function() {
  const baseUrl = "http://localhost:5000/test";
  const testUser = {
    username: "testUser",
    email: "testUser@test.test",
    hashedPassword: bcrypt.hashSync("testUser"),
    phone_number: "1234567890",
    carrier: "testCarrier",
    profile_picture_url: "testProfilePictureUrl",
  }

  it ("Should create a user and return it", async () => {
    const res = await chai.request(baseUrl)
      .post("/user")
      .send(testUser);
    expect(res.status).to.equal(201);
    expect(res.body).to.have.property("username", testUser.username);
    expect(res.body).to.have.property("email", testUser.email);
    expect(res.body).to.have.property("phone_number", testUser.phone_number);
    expect(res.body).to.have.property("carrier", testUser.carrier);
    expect(res.body).to.have.property("profile_picture_url", testUser.profile_picture_url);
  })

  it("Should return a user and all associations", async () => {
    const res = await chai 
      .request(baseUrl)
      .get(`/user/${testUser.username}`)
      .set('Content-Type', 'application/json')

    expect(res).to.have.status(200);
    expect(res.body).to.have.property('id');
    expect(res.body).to.have.property('username');
    expect(res.body).to.have.property('phone_number');
    expect(res.body).to.have.property('carrier');
    expect(res.body).to.have.property('profile_picture_url');
    expect(res.body).to.have.property('createdAt');
    expect(res.body).to.have.property('updatedAt');

    expect(res.body).to.have.property('Videos');
    expect(res.body.Videos).to.be.an('array');

    expect(res.body).to.have.property('Photos');
    expect(res.body.Photos).to.be.an('array');

    expect(res.body).to.have.property('Messages')
    expect(res.body.Messages).to.be.an('array');

    expect(res.body).to.have.property('UserGameGenres')
    expect(res.body.UserGameGenres).to.be.an('array');

    expect(res.body).to.have.property('UserGameCategories')
    expect(res.body.UserGameCategories).to.be.an('array');

    expect(res.body).to.have.property('UserGames')
    expect(res.body.UserGames).to.be.an('array');

    expect(res.body).to.have.property('userFriends')
    expect(res.body.userFriends).to.be.an('array');
    
    expect(res.body).to.have.property('LookingForGames')
    expect(res.body.LookingForGames).to.be.an('array');
  })

  it ("Should update a user", async () => {
    const res = await chai.request(baseUrl)
      .put(`/user/${testUser.username}`)
      .send({ username: "testUserUpdated" });
    expect(res.status).to.equal(200);
    expect(res.body).to.have.property("username", "testUserUpdated");
  })

  it ("Should delete a user", async () => {
    const res = await chai.request(baseUrl)
      .delete(`/user/testUserUpdated`);
    expect(res.status).to.equal(200);
    expect(res.body).to.have.property("message", "User deleted");
  })
});
