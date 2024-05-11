/// <reference types="cypress" />

export {};

export const dataAttributes = {
  Landing_GetStartedButton: "landing-get-started-button",
  Login_UsernameField: "login-username-field",
  Login_PasswordField: "login-password-field",
  Login_SubmitButton: "login-submit-button",
  Login_RegisterButton: "login-register-button",
  Login_ErrorMessage: "login-error-message",
  Login_ForgotPasswordButton: "login-forgot-password-button",
  Register_UsernameField: "register-username-field",
  Register_EmailField: "register-email-field",
  Register_PasswordField: "register-password-field",
  Register_ConfirmPasswordField: "register-confirm-password-field",
  Register_SubmitButton: "register-submit-button",
  Register_AlreadyHaveAccountButton: "register-already-have-account-button",
  Register_ErrorMessage: "register-error-message",
  Navbar_LogoutButton: "navbar-logout-button",
  Navbar_ProfileButton: "navbar-profile-button",
  Navbar_Logo: "navbar-logo",
  Navbar_HomeButton: "navbar-home-button",
  Navbar_LoginButton: "navbar-login-button",
  Navbar_RegisterButton: "navbar-register-button",
  Navbar_MyCoursesButton: "navbar-my-courses-button",
  Navbar_ExploreButton: "navbar-explore-button",
  Navbar_ShoppingCartButton: "navbar-shopping-cart-button",
  Navbar_ProfileDropdown: "navbar-profile-dropdown",
  Navbar_ThemeToggleDropdown: "navbar-theme-toggle-dropdown",
  Navbar_ThemeToggleDark: "navbar-theme-toggle-dark",
  Navbar_ThemeToggleLight: "navbar-theme-toggle-light",
  Navbar_ThemeToggleSystem: "navbar-theme-toggle-system",
  Cart_ToggleButton: "cart-toggle-button",
  CheckoutButton: "checkout-button",
  Modal_ConfirmButton: "modal-confirm-button",
  Modal_CancelButton: "modal-cancel-button",
  PurchasableCourseList: "purchasable-course-list",
  CourseCard: "course-card",
  Cart: "cart",
} as const;

export type DataAttribute =
  (typeof dataAttributes)[keyof typeof dataAttributes];

// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
declare global {
  namespace Cypress {
    interface Chainable {
      getDataTest(
        dataTestSelector: DataAttribute
      ): Chainable<JQuery<HTMLElement>>;
      login(username: string): Chainable<void>;
      //   drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
      //   dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
      //   visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
    }
  }
}

Cypress.Commands.add("getDataTest", (dataTestSelector) => {
  return cy.get(`[data-test="${dataTestSelector}"]`);
});
Cypress.Commands.add("login", (username) => {
  cy.intercept("POST", "/auth/login", (req) => {}).as("loginCall");
  cy.visit("/login");
  cy.getDataTest(dataAttributes.Login_UsernameField).type(username);
  cy.getDataTest(dataAttributes.Login_PasswordField).type("testPassword");
  cy.getDataTest(dataAttributes.Login_SubmitButton).click();
  cy.wait("@loginCall");
});
