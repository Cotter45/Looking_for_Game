const chai = require("chai");
const chaiHttp = require("chai-http");

const expect = chai.expect;

chai.use(chaiHttp);

describe ("GAME DB Model Tests", function() {
  const baseUrl = "http://localhost:5000/test";
  const testGame = {
    name: "testGame",
    description: "testDescription",
    image_url: "testImageUrl",
    is_free: true,
    price: "testPrice",
    steam_id: 123456789
  }
  const testGameUpdate = {
    steam_id: 0234567,
  }

  it ("Should create a game and return it", async () => {
    const res = await chai.request(baseUrl)
      .post("/game")
      .send(testGame);
    expect(res.status).to.equal(201);
    expect(res.body).to.have.property("name", testGame.name);
    expect(res.body).to.have.property("description", testGame.description);
    expect(res.body).to.have.property("image_url", testGame.image_url);
    expect(res.body).to.have.property("is_free", testGame.is_free);
    expect(res.body).to.have.property("price", testGame.price);
    expect(res.body).to.have.property("steam_id", testGame.steam_id);
  })

  it("Should return a game and all associations", async () => {
    const res = await chai.request(baseUrl)
      .get(`/game/${testGame.steam_id}`)
      .set('Content-Type', 'application/json')

      expect(res).to.have.status(200);
    expect(res.body).to.have.property('id');
    expect(res.body).to.have.property('name');
    expect(res.body).to.have.property('description');
    expect(res.body).to.have.property('image_url');
    expect(res.body).to.have.property('is_free');
    expect(res.body).to.have.property('price');
    expect(res.body).to.have.property('steam_id');
    expect(res.body).to.have.property('createdAt');
    expect(res.body).to.have.property('updatedAt');

    expect(res.body).to.have.property('UserGames');
    expect(res.body.UserGames).to.be.an('array');

    expect(res.body).to.have.property('Genres');
    expect(res.body.Genres).to.be.an('array');

    expect(res.body).to.have.property('Categories');
    expect(res.body.Categories).to.be.an('array');
  })

  it ("Should update a game", async () => {
    const res = await chai.request(baseUrl)
      .put(`/game/${testGame.steam_id}`)
      .send(testGameUpdate);

    expect(res.status).to.equal(200);
    expect(res.body).to.have.property("steam_id", testGameUpdate.steam_id);
  })

  it ("Should delete a game", async () => {
    const res = await chai.request(baseUrl)
      .delete(`/game/${testGameUpdate.steam_id}`);
    expect(res.status).to.equal(200);
    expect(res.body).to.have.property("message", "Game deleted");
  })
});
