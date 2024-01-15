# baxture-text-analysis

Baxture Text analysis enables you to upload a text file and then do the analaysis of the text file based on - 
Count words: Number of words in the text file.
Count Unique words: Number of unique words in the text file.
Top k words: The {k} most frequent words in the text (k is user provided parameter).

## Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Routes](#routes)
- [Usage](#usage)
- [Database](#database)

## Prerequisites

- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/)
- [Express](https://expressjs.com/): Web framework for Node.js
- [Prisma CLI](https://www.prisma.io/docs/getting-started/installation)

## Installation

1. **Clone the repository:**

    ```bash
    git clone https://github.com/knmahajan/baxture-text-analysis.git
    cd baxture-text-analysis
    ```

2. **Install dependencies:**

    ```bash
    npm install
    ```

3. **Run database migrations:**

    ```bash
    npx prisma migrate dev --name init
    ```
    init - is the name of migration.

## Configuration

Configuration steps required for the project.

- Create a `.env` file based on the provided `.env.example`.
    - In the "DATABASE_URL", edit the following:
        1. USER: The username of the database user.
        2. PASSWORD: The password for the database user.
        3. HOST: The host where the database server is hosted (typically localhost for dev env).
        4. PORT: The port where the database server is running (typically 3306 for MySQL).
        5. DATABASE: The name of the database.
- Configure your Prisma connection details in the `schema.prisma` file.

## Routes

List and briefly describe the main routes in your application.
- `/`: Home route/Basis route
- `/api/upload`: API Endpoint to upload a text file
- `/api/initiate-task`: API Endpoint to initiate analysis based on the specified task for the specified fileId
- `/api/task-analysis-result`: API Endpoint to retrieve the task analysis result based on taskId

## Usage

Describe how to run and use your application.

    ```bash
    npm start
    ```

    The app will be available at [http://localhost:3000](http://localhost:3000)

## Database

### Database has 2 tables:

1. File
- **id (Int):** Unique identifier for each record. Auto-incremented.
- **fileId (String):** Unique identifier for the file.
- **filename (String):** Name of the uploaded file.
- **uploadDate (DateTime):** Date and time when the file was uploaded.
- **tasks (Task[]):** A relation to the `Task` model. Each file can have multiple associated tasks.

2. Task

- **id (Int):** Unique identifier for each record. Auto-incremented.
- **taskId (String):** Unique identifier for the task.
- **taskName (String):** Name of the task.
- **value (String):** The value associated with the task. Stored as LONGTEXT in the database.
- **file_id (Int):** Foreign key referencing the `id` column in the `File` model.
- **file (File):** A relation to the `File` model. Each task is associated with a specific file.

### Relationships

- **File - Tasks Relationship:** Each `File` can have multiple associated `Task` records. The `tasks` field in the `File` model represents this one-to-many relationship.

- **Task - File Relationship:** Each `Task` is associated with a specific `File` through the `file` field. The `file_id` field serves as the foreign key referencing the `id` column in the `File` model.
