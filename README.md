# Project Flashcard-o-matic

This is a flaschard webapp where you could selected a deck with different flash cards, to study from.

You could view cards, study cards, edit cards, delete cards, and add cards.

You could also view, edit, delete, and add different decks.

The tests are using the Test Framework and Test Runner - Jest, using Test Utilities from React-Testing-Library, and end-to-end and integration tests using Cypress.

![index-card-gif](build/flashcards.gif)

## Installation
To launch the app, please clone this repository and open up to its directory.

1. Install all packages
```npm install```

2. Then run the build
```npm run build```

3. Then start the web app
```npm start```

## Bootstrap
This webapp also uses bootstrap react for designing the react components. If it doesn't get installed with npm install, try this:
```npm install bootstrap@5.3.2```

## Running Cypress tests
1. Make sure that the app is up and running by following the Installation steps above
2. Open Cypress GUI with command
```npx cypress open```
3. Click end to end tests
4. Select the tests you want to run

## Notes on the focus of this project:
This project was the final capstone in the Frontend Web Development course of Chegg Skills. It focuses on installing packages using npm, running tests from command line, writing react function components, creating routes (including nested routes) using react router, using hooks, utilizing React's state and props for managing and passing data, integrating API endpoints to fetch and update, and error handling. It uses a modular approach with separate components for different functionalities. Each component handles a specific aspect of the app's functionality, promoting code reusability and maintainability. It had a basic design to it, but I added Bootstrap components to make it look a little better and user-friendly.