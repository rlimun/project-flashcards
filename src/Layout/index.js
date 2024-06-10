import React from "react";
import Header from "./components/Header";
import NotFound from "./components/NotFound";
import Home from "./components/Home";
import Deck from "./decks/Deck";
import Study from "./Study";
import CreateDeck from "./decks/CreateDeck";
import EditDeck from "./decks/EditDeck";
import AddCard from "./cards/AddCard";
import EditCard from "./cards/EditCard";
import { Route, Switch } from "react-router-dom";



function Layout() {
  return (
    <div>
      <Header />
      <div className="container">
        <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/decks/:deckId/cards/:cardId/edit">
              <EditCard />
            </Route>
            <Route path="/decks/:deckId/cards/new">
              <AddCard />
            </Route>
            <Route path="/decks/:deckId/study">
            <Study/>
            </Route>
            <Route path="/decks/:deckId/edit">
              <EditDeck />
            </Route>
            <Route path="/decks/new">
              <CreateDeck/>
              </Route>
            <Route path="/decks/:deckId">
            <Deck/>
            </Route>
            <Route>
              <NotFound/>
            </Route>
        </Switch>
      </div>
    </div>
  );
}

export default Layout;
