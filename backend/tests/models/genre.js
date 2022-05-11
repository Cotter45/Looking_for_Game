const chai = require("chai");
const chaiHttp = require("chai-http");

const expect = chai.expect;

chai.use(chaiHttp);

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
