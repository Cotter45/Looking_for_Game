const chai = require("chai");
const chaiHttp = require("chai-http");

const expect = chai.expect;

chai.use(chaiHttp);

describe("Parks API Routes", function() {

  const baseUrl = "http://localhost:5000";

  it ("should fail", async () => {
    const res = await chai 
      .request(baseUrl)
      .get('/fail')
      
    expect(res).to.have.status(404);
  })

  it ("should return a random park", async () => {
    const res = await chai 
      .request(baseUrl)
      .get('/api/parks/random_park')
      .set('Content-Type', 'application/json')

      expect(res).to.have.status(200);
      expect(res.body).to.be.an('object');
      expect(res.body).to.have.property('title');
  })

  it ("should return a random image", async () => {
    const res = await chai 
      .request(baseUrl)
      .get('/api/parks/random_picture')
      .set('Content-Type', 'application/json')

      expect(res).to.have.status(200);
      expect(res.body).to.be.an('string');
  })
  
  it ("should return a park", async () => {
    const res = await chai
      .request(baseUrl)
      .get('/api/parks/1')
      .set('Content-Type', 'application/json')
    
    expect(res).to.have.status(200);
    expect(res.body).to.be.an('object');
    expect(res.body).to.have.property('title').eq('Acadia');
  })

  it ("should return all parks", async () => {
    const res = await chai
      .request(baseUrl)
      .get('/api/parks')
      .set('Content-Type', 'application/json')
    
    expect(res).to.have.status(200);
    expect(res.body).to.be.an('array');
    expect(res.body[0]).to.have.property('title').eq('Acadia');
  })
});


describe("Cocktails API Routes", function() {

  const baseUrl = "http://localhost:5000";

  it ("should fail", async () => {
    const res = await chai 
      .request(baseUrl)
      .get('/fail')
      
    expect(res).to.have.status(404);
  })

  it ("should return a random image", async () => {
    const res = await chai 
      .request(baseUrl)
      .get('/api/cocktails/random_picture')
      .set('Content-Type', 'application/json')

      expect(res).to.have.status(200);
      expect(res.body).to.be.an('string');
  })

  it ("should return a specific cocktail, its ingredients and picture", async () => {
    const res = await chai 
      .request(baseUrl)
      .get('/api/cocktails/cocktail/2')
      .set('Content-Type', 'application/json')
  
      expect(res).to.have.status(200);
      expect(res.body).to.be.an('object');
      expect(res.body).to.have.property('name');
      expect(res.body).to.have.property('CocktailPictures');
      expect(res.body['CocktailPictures'][0]).to.have.property('location');
  })

  it ("should return a random cocktail, its ingredients and picture", async () => {
    const res = await chai 
      .request(baseUrl)
      .get('/api/cocktails/random_cocktail')
      .set('Content-Type', 'application/json')

      expect(res).to.have.status(200);
      expect(res.body).to.be.an('object');
      expect(res.body).to.have.property('name');
      expect(res.body).to.have.property('CocktailPictures');
      expect(res.body['CocktailPictures'][0]).to.have.property('location');
  });

  it ("should return all cocktails and their ingredients", async () => {
    const res = await chai 
      .request(baseUrl)
      .get('/api/cocktails')
      .set('Content-Type', 'application/json')

      expect(res).to.have.status(200);
      expect(res.body).to.be.an('array');
      expect(res.body[0]).to.have.property('name');
      expect(res.body[0]).to.have.property('CocktailPictures');
      expect(res.body[0]['CocktailPictures'][0]).to.have.property('location');
    })
    
    it ("should return all stock ingredients", async () => {
      const res = await chai 
        .request(baseUrl)
        .get('/api/cocktails/ingredients')
        .set('Content-Type', 'application/json')
      
      expect(res).to.have.status(200);
      expect(res.body).to.be.an('array');
      expect(res.body[0]).to.have.property('name');
    })
  
  it ("should return all ingredients with drinks you can make from them", async () => {
    const res = await chai
      .request(baseUrl)
      .get('/api/cocktails/by_ingredients')
      .set('Content-Type', 'application/json')
    
    expect(res).to.have.status(200);
    expect(res.body).to.be.an('array');
    expect(res.body[0]).to.have.property('name');
    expect(res.body[0]).to.have.property('Cocktails')
    expect(res.body[0]['Cocktails']).to.be.an('array');
    expect(res.body[0]['Cocktails'][0]).to.have.property('name');
    expect(res.body[0]['Cocktails'][0]).to.have.property('CocktailPictures')
    expect(res.body[0]['Cocktails'][0]['CocktailPictures']).to.be.an('array');
    expect(res.body[0]['Cocktails'][0]['CocktailPictures'][0]).to.have.property('location');
  })

});