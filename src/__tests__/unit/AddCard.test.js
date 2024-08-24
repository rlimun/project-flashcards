import React from "react";
import "@testing-library/jest-dom";
import { Router } from "react-router-dom";
import { render, screen, waitFor, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import AddCard from "../../Layout/cards/AddCard";
import { createMemoryHistory } from "history";
import { readDeck, createCard } from "../../utils/api";

jest.mock("../utils/api");

// Mock the useParams hook from react-router-dom to return a mock deckId value of 1
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: () => ({ deckId: "1"}),
}));

describe("AddCard", () => {
  beforeEach(() => {
    readDeck.mockResolvedValue({
      name: "Mock Deck",
      id: 1,
      cards: [],
    });
    createCard.mockResolvedValue({
      front: "New Card Front",
      back: "New Card Back",
      deckId: 1,
      id: 1,
    });
  });

  test("renders AddCard component", () => {
    const history = createMemoryHistory();
    history.push("/decks/1/cards/new");
    render(
      <Router history={history}>
        <AddCard />
      </Router>
    );
    expect(screen.getByText("Add Card")).toBeInTheDocument();
  });

  test("renders form inputs", () => {
    const history = createMemoryHistory();
    history.push("/decks/1/cards/new");
    render(
      <Router history={history}>
        <AddCard />
      </Router>
    );
    expect(screen.getByLabelText("Front")).toBeInTheDocument();
    expect(screen.getByLabelText("Back")).toBeInTheDocument();
  });

  test("submits form and creates new card", async () => {
    const history = createMemoryHistory();
    history.push("/decks/1/cards/new");
    render(
      <Router history={history}>
        <AddCard />
      </Router>
    );
    const frontInput = screen.getByLabelText("Front");
    const backInput = screen.getByLabelText("Back");

    await act(async() => {
      userEvent.type(frontInput, "New Front");
      userEvent.type(backInput, "New Back");
      userEvent.click(screen.getByText("Save"));
    })
    
    await waitFor(() => expect(createCard).toHaveBeenCalledTimes(1));
    expect(screen.getByText("Card has been added")).toBeInTheDocument();
  });

  test("clicking Done button navigates to deck page", async () => {
    const history = createMemoryHistory();
    history.push("/decks/1/cards/new");
    render(
      <Router history={history}>
        <AddCard />
      </Router>
    );

    const doneButton = await screen.findByText("Done");
    await act(async() => {
      userEvent.click(doneButton);
    })
    expect(history.location.pathname).toBe("/decks/1");
  });
});
