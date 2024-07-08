# Project Flashcard-o-matic

This is a flaschard webapp where you could selected a deck with different flash cards, to study from.

You could view cards, study cards, edit cards, delete cards, and add cards.

You could also view, edit, delete, and add different decks.

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

## Notes on the focus of this project:
This project was the final capstone in the Frontend Web Development course of Chegg Skills. It focuses on installing packages using npm, running tests from command line, writing react function components, creating routes (including nested routes) using react router, using hooks, utilizing React's state and props for managing and passing data, integrating API endpoints to fetch and update, and error handling. It uses a modular approach with separate components for different functionalities. Each component handles a specific aspect of the app's functionality, promoting code reusability and maintainability. It had a basic design to it, but I added Bootstrap components to make it look a little better and user-friendly.

The tests are using the Test Framework and Test Runner - Jest, and using Test Utilities from React-Testing-Library.

## WIP
05/28/24: The way that the files are organized right now makes everything work, but I am not really satisfied with the way that it is structured. If this project were to grow, it becomes harder to manage and so I'm currently trying to fix this and make it more organized. Instead of all of the files being under `Layout`, I want to create more directories for the different objects, such as: decks, card, and other components, which something like `Header.js` would fall into. This would require me to update the code as well to make it follow this structure. I also am currently creating the Card component that other components like CardsList and Decks could use, promoting more modularity and encapsulation. If this codebase were to be organized this way, it would be more scalable and stuctured.

06/10/2024: I created a Card.js file and refactored my code to now use this file. The directory also looks better than it used to -> before everything was under layout, but now it's more organized into the different features (`cards` directory holds all of the card component and its functions, `decks` directory holds all of the deck components and its functions, etc.). There are still some bugs that I have to fix while refactoring this, and I also want to create some unit tests and probably add Cypress integration tests instead of the jest tests that were created when I started this project. Stay tuned!

07/08/2024: I upgraded the react version and version of react-testing-library. I also added some unit tests for AddCard. However, one of the tests is failing and I think it is because it is not using the jest mock properly, I'm still trying to figure out how to fix this. Also, since I refactored some code previously, other tests are failing and some functionality is not working and that is also something I still have to fix.

