/// <reference types="cypress" />
describe("Navigation Bar Behaviour", () => {
  beforeEach(() => {
    cy.visit("/");
  });
  it("lets users access the right pages when logged out", () => {
    cy.wait(1000);
    cy.getDataTest("landing-get-started-button").click();
    cy.url().should("include", "/register");
    cy.getDataTest("navbar-logo").click();
    cy.url().should("eq", Cypress.config().baseUrl + "/");
    cy.getDataTest("landing-get-started-button").should("exist");
    cy.getDataTest("navbar-register-button").click();
    cy.url().should("include", "/register");
    cy.getDataTest("navbar-login-button").click();
    cy.url().should("include", "/login");
  });
  it("lets users toggle theme", () => {
    cy.getDataTest("navbar-theme-toggle-dropdown").click();
    cy.getDataTest("navbar-theme-toggle-dark").should("be.visible").click();
    cy.get("html").should("have.class", "dark");
    // cy.getDataTest("navbar-theme-toggle-dropdown").click();
    cy.getDataTest("navbar-theme-toggle-light").should("be.visible").click();
    cy.get("html").should("not.have.class", "dark");
  });
  it("lets users access the right pages when logged in", () => {
    cy.login("cypress");
    cy.url().should("include", "/home");
    cy.getDataTest("navbar-logo").click();
    cy.url().should("eq", Cypress.config().baseUrl + "/home");
    cy.getDataTest("navbar-explore-button").click();
    cy.url().should("include", "/explore");
    cy.getDataTest("navbar-my-courses-button").click();
    cy.url().should("include", "/my-courses");
    cy.getDataTest("navbar-shopping-cart-button").click();
    cy.url().should("include", "/shopping-cart");
    cy.getDataTest("navbar-profile-dropdown").click();
    cy.getDataTest("navbar-profile-button").should("be.visible").click();
    cy.url().should("include", "/profile");
    cy.getDataTest("navbar-logout-button").should("be.visible").click();
    cy.wait(1000);
    cy.url().should("include", "/login");
  });

  it("only shows the right links when logged out", () => {
    cy.getDataTest("navbar-login-button").should("be.visible");
    cy.getDataTest("navbar-register-button").should("be.visible");
    cy.getDataTest("navbar-profile-button").should("not.exist");
    cy.getDataTest("navbar-logout-button").should("not.exist");
    cy.getDataTest("navbar-profile-dropdown").should("not.exist");
    cy.getDataTest("navbar-theme-toggle-dropdown").should("be.visible");
    cy.getDataTest("navbar-home-button").should("not.exist");
    cy.getDataTest("navbar-explore-button").should("not.exist");
    cy.getDataTest("navbar-my-courses-button").should("not.exist");
    cy.getDataTest("navbar-shopping-cart-button").should("not.exist");
  });

  it("only shows the right links when logged in", () => {
    cy.login("cypress");
    cy.url().should("include", "/home");
    cy.getDataTest("navbar-login-button").should("not.exist");
    cy.getDataTest("navbar-register-button").should("not.exist");
    cy.getDataTest("navbar-profile-dropdown").should("be.visible");
    cy.getDataTest("navbar-theme-toggle-dropdown").should("be.visible");
    cy.getDataTest("navbar-home-button").should("be.visible");
    cy.getDataTest("navbar-explore-button").should("be.visible");
    cy.getDataTest("navbar-my-courses-button").should("be.visible");
    cy.getDataTest("navbar-shopping-cart-button").should("be.visible");
  });
});
