## Remapping Comanchería
Hello! This is an interactive platform for teaching historical thinking as a tool to reconsider the traditional framing of American history. As a digital resource for educators and learners, Remapping Comanchería brings together interactive tools and long-form narrative to engage users with the history of the American Southwest from colonial and indigenous perspectives.

## The technical bits
This repository is automatically deployed via CircleCI to [the live site](https://www.scrapethepast.com/scry). You can find the config file in the `.circleci` directory.

Within the `react` directory, you can find the front-end of the app that runs in the browser. Start this up with a simple `npm start` or build it to be deployed from the `build` directory using `npm run build`. You can run unit tests using `npm run test` - these should all pass before making a commit. The front-end was created using [create-react-app](https://create-react-app.dev/) and follows the standard structure for such an app.

The front-end uses [redux](https://redux.js.org/) and [redux-saga](https://redux-saga.js.org/) for state management and asynchronous updates, respectively. You can find all code associated with global state managament in `react/src/modules`.

Within the `node` directory, you will find the code associated with creating and serving the back-end via a [GraphQL](https://graphql.org/) API supported by a [MySQL](https://www.mysql.com/) database. I will add more information on this as development progresses.

## Credit and contact
This project was developed by me, Henry Hill, in the course of my Senior Capstone at the Minerva Schools at KGI with the help of my advisor, Dr. Sonja Ostrow. 

If you would like to contribute to this project, have feedback on how I can make it more effective for students and educators, or are interested in using it in your classroom, you can submit a pull request or e-mail me at henry.hill@minerva.kgi.edu.
