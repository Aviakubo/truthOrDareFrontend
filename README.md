# TruthOrDareFrontEnd

## Future Plans
### Last updated 01/09/2023
- Need to add capabilities for different "packs" or categories of truths & dares
- Would like to add authentication so that users can have their own unique sets of packs
- Might end up removing the player list component so that players can decide their own rules
- Need to add scoring and provide a limit of how many truths and dares you can play in a game
- Want to take the API call and manage it in state to reduce # of API calls but need to assess performance of app
- Still need to build out the design. Have been too focused on functionality and gameplay logic.

## How to Start

1) Clone the back end at https://github.com/Aviakubo/truthOrDareBackend
    - you will need to set up a .env file and a mongoDB account. More on this in the backend readme.
2) Run `npm i` to install dependencies
3) Currently, lines 63 and 69 in the gameplay.component.ts file are responsible for the API calls. You need to point this to your backend.
4) Run `npm run start` to run the app locally.

### App is currently hosted [here](https://truth-or-dare-frontend-an4zezoyf-aviakubo.vercel.app/).