# Vaccine Management System Backend

A backend API for a vaccine management system, built with [NestJS](https://nestjs.com/) and [Postgres](https://www.postgresql.org/).

## Tech Stack

-   [NestJS](https://nestjs.com/) 
-   [TypeOrm](https://typeorm.io/)
-   [Postgres](https://www.postgresql.org/)

## Installation

1.  Clone the repository and navigate to the project directory:

`git clone https://github.com/Bishalsarang/Vaccine-management-System-API` 

2.  Install the dependencies:
`yarn` 

3.  Create a `.env` file in the root directory and set the following environment variables from `.env.example`

4.  Start the development server:

`yarn start:dev` 

The API will be available at [http://localhost:3000/api/v1](http://localhost:3000/api/v1).

## Swagger Documentation

You can find the REST API documentation at [http://localhost:3000/swagger-ui](http://localhost:3000/swagger-ui).

## License

This project is licensed under the MIT License. See the [LICENSE](https://chat.openai.com/chat/LICENSE) file for details.

## TODO

 - [x]  Add prettier, eslint and husky for formatting, fixing errors and pre-commit and pre-push hooks
 - [x] Configure swagger doc
 - [x] Containerize the application
 - [x] Add `docker-compose` service for running the application and the database
 - [x] Add `pico logger` to log all the requests
 - [x] Setup the database connections
 - [x] Add controller, service, entity and repository for `VaccineEntity`
 - [x] Write unit test for Vaccine Services
 - [] Fix issue with the patch /vaccines as it throws error since all fields are required.
 - [x] Add controller, service, entity and repository for `UserEntity`
 - [x] Implement login and signup flow with JWT authentication
 - [x] Add auth guard to make the route private
 - [x] Skip unknown properties being sent in the payload other than defined in DTOs
 - [ ] Add seeders and migration scripts
 - [ ] Add updatedBy, createdBy, deletedBy information in Vaccine
 - [ ] Implement authorization. Only allow admin for CRUD. But for normal user only allow to view
 - [ ] Ability to upload the vaccine image
 - [ ] Update the readme to run the development server, setup the database, run the application
 - [ ] Write unit test for utils
 - [ ] Write the test using the test databse
 - [ ] Refactoring and cleanup: constants, configs, duplicates
 - [ ] Host to free deployment service like heroku