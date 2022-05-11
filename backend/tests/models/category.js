const chai = require("chai");
const chaiHttp = require("chai-http");
const bcrypt = require("bcryptjs");

const expect = chai.expect;

chai.use(chaiHttp);

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
