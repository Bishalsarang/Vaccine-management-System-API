

# Vaccine Management System Backend
A backend API for a vaccine management system, built with NestJS, TypeORM and Postgres.


## Tech Stack
- NestJs
- TypeORM
- Postgres
- Jest




## Environment Variables

To run this project, you will need to add the following environment variables to your `.env` file

```
APP_HOST=localhost

# Database settings
DB_TYPE=postgres
DB_HOST=localhost
DB_PORT=54323
DB_USERNAME=admin 
DB_PASSWORD=admin
DB_DATABASE=vaccine_management
DB_SCHEMA=core

#JWT and HASH
SALT_ROUNDS = 10;
SECRET_KEY = secret;

# Cloudinary API KEYS for Image Upload
CLOUDINARY_ENV_NAME = XXXXX
CLOUDINARY_API_KEY = XXXXXXXX
CLOUDINARY_API_SECRET = XXXXXXXXX
```
## Running Locally For the First Time

- Clone the project

```bash
git clone https://github.com/Bishalsarang/Vaccine-management-System-API
```

- Go to the project directory

```bash
  cd vaccine-management-system-api
```

- Install dependencies

```bash
  yarn
```
- Run the database service from `docker-compose.yml`

```bash
   docker-compose up db
```
The docker servicer automatically creates the database withd efault credentials and the database and thes chema.
You can connect to database using the following db configuration
```
# Database settings

DB_TYPE=postgres
DB_HOST=localhost
DB_PORT=54323
DB_USERNAME=admin 
DB_PASSWORD=admin
DB_DATABASE=vaccine_management
DB_SCHEMA=core
```
- Create a `.env` file in the root directory and set the following environment variables from `.env.example`

- Run the migrations which creates the necessary entities: `users` & `vaccines` table 
```bash
  yarn migration:run
```

- Seed the database
 ```bash
   yarn db:seed
```

- Start the development server

```bash
  yarn start:dev
```
The API will be available at http://localhost:3000/api/v1.
