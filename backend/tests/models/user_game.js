const chai = require("chai");
const chaiHttp = require("chai-http");

const expect = chai.expect;

chai.use(chaiHttp);

describe("USERGAME DB Model Tests", function() {
  const baseUrl = "http://localhost:5000/test";
  const testUserGame = {
    user_id: 1,
    steam_id: 123456789,
    game_id: 32,
    name: "testGame",
    description: "testDescription",
    image_url: "testImageUrl",
    is_free: true,
    price: 0,
  }
  const testUserGameUpdate = {
    name: "testGameUpdated",
  }

  it ("Should create a user game and return it", async () => {
    const res = await chai.request(baseUrl)
      .post("/userGame")
      .send(testUserGame);
    expect(res.status).to.equal(201);
    expect(res.body).to.have.property("name", testUserGame.name);
  })

  it("Should return a user game and all associations", async () => {
    const res = await chai.request(baseUrl)
      .get(`/userGame/${testUserGame.name}`)
      .set('Content-Type', 'application/json')

    expect(res).to.have.status(200);
    expect(res.body).to.have.property('id');
    expect(res.body).to.have.property('name');
    expect(res.body).to.have.property('createdAt');
    expect(res.body).to.have.property('updatedAt');
    expect(res.body).to.have.property('description');
    expect(res.body).to.have.property('image_url');
    expect(res.body).to.have.property('is_free');
    expect(res.body).to.have.property('price');
    expect(res.body).to.have.property('user_id');
    expect(res.body).to.have.property('game_id');

    expect(res.body).to.have.property('User');
    expect(res.body.User).to.be.an('object');

    expect(res.body).to.have.property('Game');
    expect(res.body.Game).to.be.an('object');

    expect(res.body).to.have.property('LookingForGames');
    expect(res.body.LookingForGames).to.be.an('array');
  })

  it ("Should update a user game", async () => {
    const res = await chai.request(baseUrl)
      .put(`/userGame/${testUserGame.name}`)
      .send(testUserGameUpdate);
    expect(res.status).to.equal(200);
    expect(res.body).to.have.property("name", testUserGameUpdate.name);
  })
  
  it ("Should delete a user game", async () => {
    const res = await chai.request(baseUrl)
      .delete(`/userGame/${testUserGameUpdate.name}`);
    expect(res.status).to.equal(200);
    expect(res.body).to.have.property("message", "Looking for Game deleted");
  })
})

