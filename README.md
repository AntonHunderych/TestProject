
# Advanced toto list

## Description
Real cool todo list app 

### Prerequisites
- [Node.js](https://nodejs.org/) (version 14.x or higher)
- [npm](https://www.npmjs.com/) (comes with Node.js)
- [Docker](https://www.docker.com/)

### Steps

1. **Clone the repository:**

   ```bash
   git clone https://github.com/AntonHunderych/TestProject.git)
   ```

2. **Install dependencies:**

   Navigate into the project directory and install the necessary packages:

   ```bash
   cd TestProject
   npm install
   ```

3. **Create env file**
  Example 
  ```env
  DB_USERNAME=username
DB_PASSWORD=password
DB_DATABASE=database
DB_HOST=localhost
DB_PORT=5432
```
4. **Run database migrations:**

   After configuring your database, run the migrations to set up the required tables and initial data:

   ```bash
   npm run db:run:migrations
   ```

5. **Start the application:**

   Finally, start the application:

   ```bash
   npm run start:dev
   docker-compose up --build
   ```

   By default, the application will be available at `http://localhost:3000` or a different port as specified in your configuration.

## Contributing

We welcome contributions to this project. Please follow these steps to contribute:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature-name`).
3. Commit your changes (`git commit -am 'Add new feature'`).
4. Push to the branch (`git push origin feature/your-feature-name`).
5. Create a new Pull Request.


---

This README was generated with :heart: by Anton.
