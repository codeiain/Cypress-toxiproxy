// Test1.spec.js created with Cypress
//
// Start writing your Cypress tests below!
// If you're unfamiliar with how Cypress works,
// check out the link below and learn how to write your first test:
// https://on.cypress.io/writing-first-test

var toxiHost = "http://localhost:8474"
var toxicBody = {
  "listen": "127.0.0.1:12345",
  "name": "mock_test_proxy",
  "upstream": "127.0.0.1:3333"
}

beforeEach(() => {
  cy.task("toxiproxy:createProxy", { "host": toxiHost, "body": JSON.stringify(toxicBody) }).then((data) => {
    console.log("proxy creates");
  })
})

afterEach(() => {
  cy.task("toxiproxy:destroyProxy", { "host": toxiHost, "name": toxicBody.name })
})


describe("visits the page", () => {
  it("tests elements are visible", () => {
    cy.visit("localhost:3000");
    cy.get('input').type("http://localhost:3333/list");
    cy.get("button").click()
    cy.wait(1000)
    cy.get('ul > :nth-child(1)').should('exist');
    cy.get('ul > :nth-child(2)').should('exist');
  });

  it("tests proxy is creates", () => {
    cy.visit("localhost:3000");
    cy.get('input').type("http://localhost:12345/list");
    cy.get("button").click()
    cy.wait(1000)
    cy.get('ul > :nth-child(1)').should('exist');
    cy.get('ul > :nth-child(2)').should('exist');
  })

  it("tests proxy is down", () => {
    cy.task("toxiproxy:ProxyDown", { "host": toxiHost, "proxyName": toxicBody.name }).then((data) => {
      cy.visit("localhost:3000");
      cy.get('input').type("http://localhost:12345/list");
      cy.get("button").click()
      cy.wait(1000)
      cy.get('ul > :nth-child(1)').should('exist');
      cy.get('ul > :nth-child(2)').should('exist');
    })
  })

  it("tests proxy is timeout 2000 but check from elements after 1000", () => {
    var toxic = {
      "type": "timeout",
      "attributes": {
        "delay": "2000"
      }
    }
    cy.task("toxiproxy:addToxic", { "host": toxiHost, "proxyName": toxicBody.name, "details": JSON.stringify(toxic) }).then((data) => {
      cy.visit("localhost:3000");
      cy.get('input').type("http://localhost:12345/list");
      cy.get("button").click()
      cy.wait(1000)
      cy.get('ul > :nth-child(1)').should('exist');
      cy.get('ul > :nth-child(2)').should('exist');
    })
  })
});
