const chai = require("chai");
const chaiHttp = require("chai-http");

const expect = chai.expect;

chai.use(chaiHttp);

describe('LOOKING_FOR_GAME DB Tests', () => {
  const baseUrl = "http://localhost:5000/test";
  let gameId;
  before( async () => {
    const testUserGame = {
    user_id: 1,
    steam_id: 123456789,
    game_id: 1520,
    name: "testGame",
    description: "testDescription",
    image_url: "testImageUrl",
    is_free: true,
    price: 0,
  }
  const res = await chai.request(baseUrl)
    .post("/user_game")
    .send(testUserGame);

  gameId = res.body.id;
  });
  const updateTestLookingForGame = {
    title: "updateTestLookingForGame",
  }
  
  
  it("Should create a looking_for_game and return it", async () => {
    const testLookingForGame = {
      title: "testLookingForGame",
      image_url: "testImageUrl",
      game_id: gameId,
      creator_id: 1,
    }

    const res = await chai.request(baseUrl)
      .post("/looking_for_game")
      .send(testLookingForGame);

    expect(res.status).to.equal(201);
    expect(res.body).to.have.property("title", testLookingForGame.title);
    expect(res.body).to.have.property("image_url", testLookingForGame.image_url);
    expect(res.body).to.have.property("game_id", testLookingForGame.game_id);
    expect(res.body).to.have.property("creator_id", testLookingForGame.creator_id);
    expect(res.body).to.have.property("createdAt");
    expect(res.body).to.have.property("updatedAt");
  });

  it("Should return a LookingForGame and all associations", async () => {
    const res = await chai.request(baseUrl)
      .get(`/looking_for_game/testLookingForGame`)
      .set('Content-Type', 'application/json')

    expect(res).to.have.status(200);
    expect(res.body).to.have.property('id');
    expect(res.body).to.have.property('title');
    expect(res.body).to.have.property('image_url');
    expect(res.body).to.have.property('game_id');
    expect(res.body).to.have.property('creator_id');
    expect(res.body).to.have.property('createdAt');
    expect(res.body).to.have.property('updatedAt');

    expect(res.body).to.have.property('UserGame');
    expect(res.body.UserGame).to.be.an('object');

    expect(res.body).to.have.property('Users');
    expect(res.body.Users).to.be.an('array');

    expect(res.body).to.have.property('Chats');
    expect(res.body.Chats).to.be.an('array');
  });

  it("Should update a LookingForGame and return it", async () => {
    const res = await chai.request(baseUrl)
      .put(`/looking_for_game/testLookingForGame`)
      .send(updateTestLookingForGame);

    expect(res).to.have.status(200);
    expect(res.body).to.have.property("title", updateTestLookingForGame.title);
  });

  it("Should delete a LookingForGame and return success", async () => {
    const res = await chai.request(baseUrl)
      .delete(`/looking_for_game/${updateTestLookingForGame.title}`);

    expect(res).to.have.status(200);
    expect(res.body).to.have.property("message", "Looking for Game deleted");
  })

  after (async () => {
    const res = await chai.request(baseUrl)
      .delete(`/user_game/testGame`);
    expect(res.status).to.equal(200);
    expect(res.body).to.have.property("message", "Looking for Game deleted");
  })
});