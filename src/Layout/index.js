import React from "react";
import Header from "./Header";
import NotFound from "./NotFound";
import Home from "./Home";
import Deck from "./Deck";
import Study from "./Study";
import CreateDeck from "./CreateDeck";
import EditDeck from "./EditDeck";
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
            <Route path="/decks/:deckId/study">
            <Study/>
            </Route>
            <Route path="/decks/new">
              <CreateDeck/>
              </Route>
            <Route path="/decks/:deckId">
            <Deck/>
            </Route>
            <Route path="/decks/:deckId/edit">
              <EditDeck />
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