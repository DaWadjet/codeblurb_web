/// <reference types="cypress" />
describe("Route Protection Behavior", () => {
  it("Redirects to login page when trying to access protected routes while logged out", () => {
    cy.visit("/my-courses");
    cy.url().should("include", "/login");
  });
  it("Redirects to login page when trying to access protected routes while logged out - 2", () => {
    cy.visit("/shopping-cart");
    cy.url().should("include", "/login");
  });
  it("Redirects to home page when trying to access login page while logged in", () => {
    cy.login("cypress");
    cy.visit("/login");
    cy.url().should("eq", Cypress.config().baseUrl + "/home");
  });
  it("Redirects to home page when trying to access register page while logged in", () => {
    cy.login("cypress");
    cy.visit("/register");
    cy.url().should("eq", Cypress.config().baseUrl + "/home");
  });
  it("Redirects to home page when trying to access landing page while logged in", () => {
    cy.login("cypress");
    cy.visit("/");
    cy.url().should("eq", Cypress.config().baseUrl + "/home");
  });
  it("Redirects back to the page the user tried to access after logging in", () => {
    cy.visit("/my-courses");
    cy.url().should("include", "/login");
    cy.login("cypress");
    cy.wait(1000);
    cy.url().should("include", "/my-courses");
  });
});
