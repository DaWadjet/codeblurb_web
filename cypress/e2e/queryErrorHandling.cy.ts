/// <reference types="cypress" />

describe("Handling Errors For Queries", () => {
  it("Refreshes the token when a 401 status code is received", () => {
    let calls = 2;
    cy.intercept("GET", "/shopping/shopping-cart", (req) => {
      if (calls) {
        calls--;
        req.reply({
          delayMs: 1000,
          statusCode: 401,
          body: {
            success: false,
            message: "Token expired",
          },
          headers: {
            "content-type": "application/json",
          },
        });
      } else {
        req.continue();
      }
    }).as("getCartCall");
    cy.intercept("POST", "/auth/refresh", (req) => {}).as("refreshCall");

    cy.login("cypress");
    cy.visit("/shopping-cart");
    cy.wait("@getCartCall");
    cy.wait("@refreshCall");
    cy.wait("@getCartCall");

    cy.url().should("include", "/shopping-cart");
  });
  it("Receives 401 when refreshing and lands on login", () => {
    cy.intercept("GET", "/shopping/shopping-cart", (req) => {
      req.reply({
        delayMs: 1000,
        statusCode: 401,
        body: {
          success: false,
          message: "Token expired",
        },
        headers: {
          "content-type": "application/json",
        },
      });
    }).as("getCartCall");
    cy.intercept("POST", "/auth/refresh", (req) => {
      req.reply({
        statusCode: 401,
        body: {
          success: false,
          message: "Token expired",
        },
        headers: {
          "content-type": "application/json",
        },
      });
    }).as("refreshCall");

    cy.login("cypress");
    cy.visit("/shopping-cart");
    cy.wait("@getCartCall");
    cy.wait("@refreshCall");

    cy.url().should("include", "/login");
  });
});
