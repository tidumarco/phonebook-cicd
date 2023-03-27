describe("phonebook tests", () => {
  it("front page can be opened", () => {
    cy.visit("http://localhost:3001");
    cy.contains("Phonebook");
    cy.contains("Add a new person");
    cy.contains("Search a person");
    cy.contains("Numbers");
  });
  it("add new person form can be filled", function () {
    cy.visit("http://localhost:3001");
    cy.contains("name")
      .closest("div") // navigate up to the closest parent div
      .find("input")
      .type("Giorgio Gustavi");
    cy.contains("number")
      .closest("div") // navigate up to the closest parent div
      .find("input")
      .type("0185-333121");
    cy.contains("add").click();
  });
  it("a person can be searched", function () {
    cy.visit("http://localhost:3001");
    cy.get("input:first").type("Giorgio Gustavi");
    cy.contains("Giorgio Gustavi");
  });
});
