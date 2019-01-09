# IBM Demo App

This is the codebase for the IBM job application demo app assignment.  The app is a task managment app with an api for storing task data in a database.  Both the client and api microservice run inside independent containers.

#### Client

- Built with Create-React-App
- Uses the Atlassian UI Component Library
- Uses Jest, Enzyme, and Moxios for component testing and API mocking
- Uses React-Redux for state management

#### API

- Built with Flask and Flask-SQLAlchemy
- Uses an SQLite database for storing task data

#### Containers

- Uses Docker and Docker-Compose
- The client runs inside a NodeJS container
- The API runs inside a Python container


## Running the app

From the root of the project run:

```sh
docker-compose up --build
```

By default, the client will run on **localhost:3000** and the API will run on port **localhost:5000**.  The build process will also run all tests and output test results.


## Running interactive tests

Create-react-app allows you to run tests in an interactive terminal mode.  Although it runs much more slowly when run from within a container, you can access this testing mode by running the command below from the project root.

```sh
docker-compose run tests
```


## API Documentation

Documentation for the API including description of each endpoint and example requests and responses can be seen at the url below.

[https://documenter.getpostman.com/view/6306971/RznEJdi6](https://documenter.getpostman.com/view/6306971/RznEJdi6)


## Issues

- The Atlassian UI library makes use of the emotion css library. This library is generating some warnings and errors related to bugs in the library code.  Some measures have been taken to suppress these but others may appear.  So far none of these issues prevent the app from functioning properly.
- Create-React-App uses ESLint which is generating some warnings.
- There have been some module installation and code compilation errors seen only when running the Docker-Compose build process.  Most of these have been addressed but others may appear.


