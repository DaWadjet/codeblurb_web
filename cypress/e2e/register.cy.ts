/// <reference types="cypress" />
describe("Registration Behavior", () => {
  it("Fails when the username field is left empty", () => {
    cy.visit("/register");
    cy.getDataTest("register-submit-button").click();
    cy.getDataTest("register-username-field").should(
      "have.attr",
      "aria-invalid",
      "true"
    );
  });
  it("Fails when the email field is left empty", () => {
    cy.visit("/register");
    cy.getDataTest("register-submit-button").click();
    cy.getDataTest("register-email-field").should(
      "have.attr",
      "aria-invalid",
      "true"
    );
  });
  it("Fails when password is shorter than 8 characters", () => {
    cy.visit("/register");
    cy.getDataTest("register-username-field").type("test");
    cy.getDataTest("register-email-field").type("whatever");
    cy.getDataTest("register-password-field").type("1234567");
    cy.getDataTest("register-confirm-password-field").type("1234567");
    cy.getDataTest("register-submit-button").click();
    cy.getDataTest("register-password-field").should(
      "have.attr",
      "aria-invalid",
      "true"
    );
  });

  it("Fails when password fields contain different values", () => {
    cy.visit("/register");
    cy.getDataTest("register-username-field").type("test");
    cy.getDataTest("register-email-field").type("example@whatever.com");
    cy.getDataTest("register-password-field").type("123456789");
    cy.getDataTest("register-confirm-password-field").type("12345678");
    cy.getDataTest("register-submit-button").click();
    cy.getDataTest("register-confirm-password-field").should(
      "have.attr",
      "aria-invalid",
      "true"
    );
  });

  it("Succeeds when all fields are filled correctly", () => {
    cy.intercept("POST", "/auth/login", (req) => {}).as("loginCall");
    cy.intercept("POST", "/auth/register", (req) => {
      // Do not allow the request to proceed to the backend
      req.reply({
        statusCode: 200,
        body: {
          success: true,
          message: "Registration intercepted for testing purposes",
        },
        headers: {
          "content-type": "application/json",
        },
        delay: 1000,
      });
    }).as("registerCall");

    cy.visit("/register");
    cy.getDataTest("register-username-field").type("cypress");
    cy.getDataTest("register-email-field").type("celevicte@gmail.com");
    cy.getDataTest("register-password-field").type("testPassword");
    cy.getDataTest("register-confirm-password-field").type("testPassword");
    cy.getDataTest("register-submit-button").click();

    cy.wait("@registerCall");
    cy.wait("@loginCall");
    cy.url().should("include", "/home");
  });
});
