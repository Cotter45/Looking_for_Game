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

describe("CATEGORY DB Model Tests", function() {
  const baseUrl = "http://localhost:5000/test";
  const testCategory = {
    name: "testCategory",
    id: 123456789
  }
  const testCategoryUpdate = {
    name: "testCategoryUpdated",
  }

  it ("Should create a category and return it", async () => {
    const res = await chai.request(baseUrl)
      .post("/category")
      .send(testCategory);
    expect(res.status).to.equal(201);
    expect(res.body).to.have.property("name", testCategory.name);
  })

  it("Should return a category and all associations", async () => {
    const res = await chai.request(baseUrl)
      .get(`/category/${testCategory.name}`)
      .set('Content-Type', 'application/json')

    expect(res).to.have.status(200);
    expect(res.body).to.have.property('id');
    expect(res.body).to.have.property('name');
    expect(res.body).to.have.property('createdAt');
    expect(res.body).to.have.property('updatedAt');

    expect(res.body).to.have.property('Games');
    expect(res.body.Games).to.be.an('array');

    expect(res.body).to.have.property('UserGameCategories');
    expect(res.body.UserGameCategories).to.be.an('array');
  })

  it ("Should update a category", async () => {
    const res = await chai.request(baseUrl)
      .put(`/category/${testCategory.name}`)
      .send(testCategoryUpdate);
    expect(res.status).to.equal(200);
    expect(res.body).to.have.property("name", testCategoryUpdate.name);
  })

  it ("Should delete a category", async () => {
    const res = await chai.request(baseUrl)
      .delete(`/category/${testCategoryUpdate.name}`);
    expect(res.status).to.equal(200);
    expect(res.body).to.have.property("message", "Category deleted");
  })
});

describe("GENRE DB Model Tests", function() {
  const baseUrl = "http://localhost:5000/test";
  const testGenre = {
    genre: "testGenre",
    id: 123456789
  }
  const testGenreUpdate = {
    genre: "testGenreUpdated",
  }

  it ("Should create a genre and return it", async () => {
    const res = await chai.request(baseUrl)
      .post("/genre")
      .send(testGenre);
    expect(res.status).to.equal(201);
    expect(res.body).to.have.property("genre", testGenre.genre);
  })

  it("Should return a genre and all associations", async () => {
    const res = await chai.request(baseUrl)
      .get(`/genre/${testGenre.genre}`)
      .set('Content-Type', 'application/json')

    expect(res).to.have.status(200);
    expect(res.body).to.have.property('id');
    expect(res.body).to.have.property('genre');
    expect(res.body).to.have.property('createdAt');
    expect(res.body).to.have.property('updatedAt');

    expect(res.body).to.have.property('Games');
    expect(res.body.Games).to.be.an('array');

    expect(res.body).to.have.property('UserGameGenres');
    expect(res.body.UserGameGenres).to.be.an('array');
  })

  it ("Should update a genre", async () => {
    const res = await chai.request(baseUrl)
      .put(`/genre/${testGenre.genre}`)
      .send(testGenreUpdate);
    expect(res.status).to.equal(200);
    expect(res.body).to.have.property("genre", testGenreUpdate.genre);
  })

  it ("Should delete a genre", async () => {
    const res = await chai.request(baseUrl)
      .delete(`/genre/${testGenreUpdate.genre}`);
    expect(res.status).to.equal(200);
    expect(res.body).to.have.property("message", "Genre deleted");
  })
});

