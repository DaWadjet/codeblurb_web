/// <reference types="cypress" />
describe("Login Behavior", () => {
  it("Fails when the username field is left empty", () => {
    cy.visit("/login");
    cy.getDataTest("login-submit-button").click();
    cy.getDataTest("login-username-field").should(
      "have.attr",
      "aria-invalid",
      "true"
    );
  });
  it("Fails when the password field is left empty", () => {
    cy.visit("/login");
    cy.getDataTest("login-submit-button").click();
    cy.getDataTest("login-password-field").should(
      "have.attr",
      "aria-invalid",
      "true"
    );
  });
  it("Succeeds when the correct credentials are provided", () => {
    cy.login("cypress");
  });
  it("Fails when incorrect credentials are provided", () => {
    cy.intercept("POST", "/auth/login", (req) => {
      req.reply({
        statusCode: 401,
        body: {
          success: false,
          message: "Invalid credentials",
        },
        headers: {
          "content-type": "application/json",
        },
      });
    }).as("loginCall");
    cy.visit("/login");
    cy.getDataTest("login-username-field").type("cypress");
    cy.getDataTest("login-password-field").type("wrongPassword");
    cy.getDataTest("login-submit-button").click();
    cy.wait("@loginCall");
    cy.get('[data-sonner-toast=""]')
      .should("be.visible")
      .and("have.attr", "data-type", "error");
  });
});
