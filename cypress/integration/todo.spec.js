/// <reference types="cypress" />

describe("to-do app", () => {
  beforeEach(() => {
    // we include it in our beforeEach function so that it runs before each test
    cy.visit("http://localhost:4200");
  });

  it("displays one todo item by default", () => {
    // We use the `cy.get()` command to get all elements that match the selector.
    // Then, we use `should` to assert that there are two matched items,

    cy.get("[data-test=todo-item]").should("have.length", 1);
  });

  it("can add new todo items", () => {
    const newItem = "Estudar Terraform";

    cy.get("[data-test=new-todo]").click();
    cy.get("[data-test=new-todo-input]").type(`${newItem}{enter}`);

    // Now that we've typed our new item, let's check that it actually was added to the list.
    // Since it's the newest item, it should exist as the last element in the list.
    cy.get("[data-test=todo-item]")
      .should("have.length", 2)
      .last()
      .contains(newItem);
  });

  it("can check off an item as completed", () => {
    cy.get("[data-test=todo-item]")
      .first()
      .find("[data-test=markAsDone]")
      .click();

    // Now that we've checked the button, we can go ahead and make sure
    // that the list element is now marked as completed.
    cy.get("[data-test=todo-item]")
      .first()
      .find("[data-test=markAsDone]")
      .should("not.exist");

    cy.get("[data-test=todo-item]")
      .first()
      .find("[data-test=markAsUndone]")
      .should("exist");
  });

  it("can check off an item as not completed", () => {
    //mark as done
    cy.get("[data-test=todo-item]")
      .first()
      .find("[data-test=markAsDone]")
      .click();

    cy.get("[data-test=todo-item]")
      .first()
      .find("[data-test=markAsUndone]")
      .click();

    // Now that we've checked the button, we can go ahead and make sure
    // that the list element is now marked as completed.
    cy.get("[data-test=todo-item]")
      .first()
      .find("[data-test=markAsUndone]")
      .should("not.exist");

    cy.get("[data-test=todo-item]")
      .first()
      .find("[data-test=markAsDone]")
      .should("exist");
  });

  it("can delete a task", () => {
    cy.get("[data-test=todo-item]")
      .contains("Estudar terraform")
      .find("[data-test=remove]")
      .click();

    // Then we can make sure that our element does not exist
    cy.get("[data-test=todo-item]").should("not.exist");
  });
});
