/// <reference types="cypress" />

describe("Cart State and Cart Toggle Button Behavior", () => {
  beforeEach(() => {
    cy.login("cypress");
    cy.visit("/shopping-cart");
    cy.intercept("GET", "/shopping/shopping-cart", (req) => {}).as(
      "getCartCall"
    );
    cy.wait("@getCartCall");
    cy.getDataTest("cart").within(() => {
      cy.getDataTest("cart-toggle-button")
        .should(() => undefined)
        .each((button) => {
          cy.wrap(button)
            .click()
            .then(() => {
              cy.document().within(() => {
                cy.getDataTest("modal-confirm-button")
                  .should("be.visible")
                  .click();
              });
            });
        });
    });
  });
  it("Lets users add and remove items to the cart", () => {
    cy.visit("/explore");
    cy.wait(1000);
    cy.getDataTest("cart-toggle-button")
      .first()
      .should("have.attr", "data-in-cart", "false")
      .click();
    cy.get('[data-sonner-toast=""]')
      .should("be.visible")
      .and("have.attr", "data-type", "info");
    cy.getDataTest("cart-toggle-button").and(
      "have.attr",
      "data-in-cart",
      "true"
    );
    cy.getDataTest("navbar-shopping-cart-button").should("include.text", "1");
    cy.getDataTest("cart-toggle-button").first().click();
    cy.getDataTest("modal-cancel-button").should("be.visible").click();
    cy.getDataTest("cart-toggle-button").and(
      "have.attr",
      "data-in-cart",
      "true"
    );
    cy.getDataTest("modal-cancel-button").should("not.exist");
    cy.getDataTest("cart-toggle-button").first().click();
    cy.getDataTest("modal-confirm-button").should("be.visible").click();
    cy.getDataTest("cart-toggle-button").and(
      "have.attr",
      "data-in-cart",
      "false"
    );
    cy.get('[data-sonner-toast=""]')
      .should("be.visible")
      .and("have.attr", "data-type", "info");
    cy.getDataTest("navbar-shopping-cart-button").click();
    cy.url().should("include", "/shopping-cart");
    cy.getDataTest("cart").within(() => {
      cy.getDataTest("course-card").should("have.length", 0);
    });
    cy.getDataTest("checkout-button").should("not.exist");
    cy.getDataTest("cart-toggle-button").first().click();
    cy.getDataTest("navbar-shopping-cart-button").should("include.text", "1");
    cy.getDataTest("cart").within(() => {
      cy.getDataTest("course-card").should("have.length", 1);
    });
    cy.intercept("POST", "/payments/checkout", (req) => {
      req.reply({
        statusCode: 200,
        delay: 1000,
        body: {},
        headers: {
          "content-type": "application/json",
        },
      });
    }).as("checkoutCall");
    cy.getDataTest("checkout-button").should("exist").click();

    cy.wait("@checkoutCall");
    cy.visit("/shopping-cart");
    cy.getDataTest("cart").within(() => {
      cy.getDataTest("course-card").first().click();
    });
    cy.url().should("match", /\/course\/\d+/);
    cy.getDataTest("checkout-button")
      .should("have.attr", "data-in-cart", "true")
      .should("exist")
      .click();
    cy.url().should("include", "/shopping-cart");
    cy.getDataTest("cart").within(() => {
      cy.getDataTest("cart-toggle-button")
        .should("have.length", 1)
        .first()
        .click();
    });
    cy.getDataTest("modal-confirm-button").should("be.visible").click();
    cy.getDataTest("cart").within(() => {
      cy.getDataTest("course-card").should("have.length", 0);
    });
    //bottom row cards
    cy.getDataTest("course-card").first().click();
    cy.url().should("match", /\/course\/\d+/);
    cy.getDataTest("cart-toggle-button")
      .should("have.attr", "data-in-cart", "false")
      .should("exist")
      .click();
    cy.getDataTest("checkout-button")
      .should("have.attr", "data-in-cart", "true")
      .should("exist")
      .click();
  });
});
