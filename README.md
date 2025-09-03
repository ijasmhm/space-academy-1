# Welcome to your university course management project

## Project info


Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```



## What technologies are used for this project?

Java: The core programming language used for the backend logic.
Spring Boot: A Java-based framework used to create the web application and REST APIs. It simplifies the development of stand-alone, production-grade Spring-based applications.
JPA (Java Persistence API) & Hibernate: Used for object-relational mapping (ORM), which simplifies database interactions by allowing us to work with Java objects instead of writing raw SQL queries.
H2 Database: An in-memory database used for development and testing. It's fast and doesn't require any external setup.
Maven: A build automation and project management tool used to manage the backend project's dependencies and build the application.
As seen in your README.md file, the frontend is built with a modern web stack:

React: A JavaScript library for building user interfaces.
TypeScript: A superset of JavaScript that adds static typing, improving code quality and maintainability.
Vite: A fast build tool and development server for modern web projects.
Tailwind CSS: A utility-first CSS framework for rapidly building custom designs.
shadcn-ui: A collection of re-usable UI components built with Radix UI and Tailwind CSS.

Docker & Docker Compose: Used to containerize both the frontend and backend services, allowing them to run in isolated environments and making the application easy to build, ship, and run anywhere.



## How can I deploy this project?

# Prerequisites:

Git
Docker
Docker Compose

1. First, clone the application's source code from your repository to your deployment server.
git clone <your-repository-url>
cd <your-project-directory>

2.The application is currently configured to use an in-memory H2 database, which is not suitable for production as all data will be lost on restart. The following steps show how to configure it for a persistent PostgreSQL database.

a. Add PostgreSQL Dependency: Add the PostgreSQL driver dependency to your backend/pom.xml file:
<dependency>
    <groupId>org.postgresql</groupId>
    <artifactId>postgresql</artifactId>
    <scope>runtime</scope>
</dependency>

b. Update Application Properties: Modify backend/src/main/resources/application.properties to connect to the PostgreSQL database service that will be created in docker-compose.yml.
spring.datasource.url=jdbc:postgresql://db:5432/yourdb
spring.datasource.username=youruser
spring.datasource.password=yourpassword
spring.datasource.driverClassName=org.postgresql.Driver
spring.jpa.database-platform=org.hibernate.dialect.PostgreSQLDialect
spring.jpa.hibernate.ddl-auto=update

c. Update docker-compose.yml: Modify the docker-compose.yml file to include a PostgreSQL service (db) and configure the backend to use it.
version: '3.8'
services:
  db:
    image: postgres:14-alpine
    ports:
      - "5432:5432"
    environment:
      - POSTGRES_USER=youruser
      - POSTGRES_PASSWORD=yourpassword
      - POSTGRES_DB=yourdb
    volumes:
      - postgres_data:/var/lib/postgresql/data

  backend:
    build: ./backend
    ports:
      - "8080:8080"
    depends_on:
      - db
    environment:
      - SPRING_DATASOURCE_URL=jdbc:postgresql://db:5432/yourdb
      - SPRING_DATASOURCE_USERNAME=youruser
      - SPRING_DATASOURCE_PASSWORD=yourpassword
      - SPRING_JPA_DATABASE-PLATFORM=org.hibernate.dialect.PostgreSQLDialect

  frontend:
    build: ./frontend
    ports:
      - "5173:5173"
    depends_on:
      - backend

volumes:
  postgres_data:

3. Once the configuration is complete, run the following command from the root of your project directory. This will build the Docker images for the frontend and backend services and start the containers.
docker-compose up -d --build

4. After the containers have started, you can access the application:
Frontend: http://<your-server-ip>:5173
Backend API: http://<your-server-ip>:8080
