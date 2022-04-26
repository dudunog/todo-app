/// <reference types="cypress" />

describe("to-do app", () => {
  beforeEach(() => {
    // we include it in our beforeEach function so that it runs before each test
    cy.visit("https://example.cypress.io/todo");
  });

  it("displays no todo items by default", () => {
    // We use the `cy.get()` command to get all elements that match the selector.
    // Then, we use `should` to assert that there are two matched items,
    cy.get(".todo-list li").should("have.length", 0);
  });
})
