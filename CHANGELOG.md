## WIP
05/28/24: The way that the files are organized right now makes everything work, but I am not really satisfied with the way that it is structured. If this project were to grow, it becomes harder to manage and so I'm currently trying to fix this and make it more organized. Instead of all of the files being under `Layout`, I want to create more directories for the different objects, such as: decks, card, and other components, which something like `Header.js` would fall into. This would require me to update the code as well to make it follow this structure. I also am currently creating the Card component that other components like CardsList and Decks could use, promoting more modularity and encapsulation. If this codebase were to be organized this way, it would be more scalable and stuctured.

06/10/2024: I created a Card.js file and refactored my code to now use this file. The directory also looks better than it used to -> before everything was under layout, but now it's more organized into the different features (`cards` directory holds all of the card component and its functions, `decks` directory holds all of the deck components and its functions, etc.). There are still some bugs that I have to fix while refactoring this, and I also want to create some unit tests and probably add Cypress integration tests instead of the jest tests that were created when I started this project. Stay tuned!

07/08/2024: I upgraded the react version and version of react-testing-library. I also added some unit tests for AddCard. However, one of the tests is failing and I think it is because it is not using the jest mock properly, I'm still trying to figure out how to fix this. Also, since I refactored some code previously, other tests are failing and some functionality is not working and that is also something I still have to fix.

08/21/2024: I know I haven't worked on this in awhile -- I went on vacation and came back and started studying for technical interviews so if I can find time to work on this, I really want to get back to it.

08/24/2024: 
- Installed cypress
- Cypress ui was not showing my react components
- React is at version 18 and uses root instead of reactdom.render
    - Changed it to use root
    - Updated all dependencies
    - Got an error for a dependency and had to delete package-lock.json and node_modules and then run npm install again
- Dependencies fixed and Cypress could run but it was still not showing react components
- Looked into console error T.map() is not a function
    - It was because it was not checking to make sure that the data is in array form before rendering (cypress was loading it quickly so the data was not yet ready)
    - added a check here (in the jsx)
        ```jsx
        // if decks is empty or is not an array, then don't render
        Array.isArray(decks) && decks.map((deck) 
        ```
- Now issue is with the bootstrap components not appearing on the homepage…but it will appear correctly on the other pages
    - checked to see if the request for css was successfully firing — it was
    - checked to see if request for grabbing decks was successfully firing — it was
    - tried to test with just a simple jsx bootstrap component — didn’t work
    - tried to test it with only returning a simple jsx bootstrap component (removed all other functions) — didn’t work
        - Just test another page that is working for now. we just want to make sure that we have tests and that they are working
- The pages work fine (all components load and work) when I run it locally, but for some reason in the tests, it is not working 

08/25/2024: 
- I still need to fix why bootstrap components are not appearing in Cypress but I created some tests to test the things that are working
- Very much WIP. I need to fix functionality in the webapp (delete is not working) plus figure out why it's not working in Cypress before creating more tests.

