# Express.js MVC Architecture – Beginner Notes

## 1. What is Express.js?

Express.js is a Node.js framework used to build web applications and REST APIs.

It makes it easier to:
- Handle HTTP requests.
- Create API routes.
- Send responses.
- Use middleware.
- Connect with databases.

## 2. What is MVC Architecture?

MVC stands for:

- **M = Model**
- **V = View**
- **C = Controller**

MVC is a software design pattern that organizes code into separate parts. Each part has its own responsibility.

### M – Model
- Model handles the data of an application.
- It is responsible for managing and accessing data.
- It communicates with the database when one is connected.

Example:
```javascript
const getAllStudents = () => {
    return students;
};
```

### V – View
- View is responsible for displaying data to the user.
- It represents the user interface.
- It usually contains HTML pages.

**Note:** In REST APIs, we generally return JSON responses instead of HTML pages, so a separate View folder is not necessary.

### C – Controller
- Controller handles the application logic.
- It receives requests and decides what action should happen.
- It communicates with the Model to get or update data.
- It sends responses back to the client.

Example:
```javascript
const getStudents = (req, res) => {
    const students = Student.getAllStudents();

    res.status(200).json(students);
};
```

## 3. What is Routes?

Routes define the URLs (endpoints) of an application.

They decide which controller function should execute when a particular HTTP request is received.

Example:
```javascript
router.get("/", getStudents);
router.post("/", createStudent);
router.delete("/:id", removeStudent);
```

- GET: Retrieve data.
- POST: Create new data.
- PUT: Update existing data.
- PATCH: Partially update data.
- DELETE: Delete data.

**Remember:** Routes connect URLs with controller functions. They do not usually contain the main application logic.

A route consists of an HTTP method, a URL path (endpoint), and a route handler that defines how the application responds to a particular request.

Bas yaad rakho: Method + Path + Handler = Complete Route.

## 4. Project Folder Structure

```text
student-api/
│
├── models/
│   └── Student.js
│
├── controllers/
│   └── studentController.js
│
├── routes/
│   └── studentRoutes.js
│
├── server.js
│
├── package.json
└── node_modules/
```

### Responsibilities of Each File

| File / Folder | Responsibility |
|---|---|
| models | Handles data |
| controllers | Handles application logic |
| routes | Defines API endpoints |
| server.js | Creates and starts the Express server |
| package.json | Stores project information and dependencies |
| node_modules | Contains installed packages |

## 5. What is server.js?

`server.js` is the main entry point of our application.

It:
- Imports Express.
- Creates an Express application.
- Registers middleware.
- Connects routes.
- Starts the server.

Example:
```javascript
const express = require("express");

const app = express();

app.use(express.json());

const studentRoutes = require("./routes/studentRoutes");

app.use("/api/students", studentRoutes);

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
```

## 6. What is Middleware?

Middleware is a function that runs during the request-response cycle.

It can:
- Read request data.
- Modify request or response objects.
- Execute additional logic.
- Pass control to the next middleware using `next()`.

Example:
```javascript
app.use(express.json());
```

`express.json()` is built-in Express middleware.

It converts incoming JSON request data into a JavaScript object so we can access it through `req.body`.

## 7. What is Express Router?

Express Router allows us to create separate route files instead of writing every route inside server.js.

Example:
```javascript
const express = require("express");

const router = express.Router();

router.get("/", getStudents);

module.exports = router;
```

Importing routes in server.js:

```javascript
const studentRoutes = require("./routes/studentRoutes");

app.use("/api/students", studentRoutes);
```

The final endpoint becomes:

```text
GET /api/students
```

## 8. Important Request and Response Objects

Express provides two important objects:

### Request (req)

`req` contains information about the incoming client request.

Important properties:

**1. req.params**

Used to get values from URL parameters.

Example:
```javascript
router.get("/:id", getStudent);
```

URL:
```text
/api/students/1
```

Access:
```javascript
req.params.id
```

Result: `"1"` (string).

**2. req.body**

Used to access data sent by the client in the request body.

Example:
```javascript
const { name, age } = req.body;
```

**3. req.query**

Used to access query parameters from a URL.

Example:
```text
/api/students?age=22
```

Access:
```javascript
req.query.age
```

### Response (res)

`res` is used to send a response back to the client.

Important methods:

**1. res.status()**

Sets the HTTP status code.

```javascript
res.status(200);
```

**2. res.json()**

Sends a JSON response.

```javascript
res.json({ message: "Success" });
```

**3. res.send()**

Sends a response to the client.

```javascript
res.send("Hello World");
```

## 9. Common HTTP Status Codes

| Status Code | Meaning |
|---|---|
| 200 | OK – Request successful |
| 201 | Created – New resource created |
| 400 | Bad Request – Invalid request |
| 401 | Unauthorized – Authentication required |
| 403 | Forbidden – Access not allowed |
| 404 | Not Found – Resource not found |
| 500 | Internal Server Error |

## 10. What is Nodemon?

Nodemon is a development tool that automatically restarts the Node.js server whenever we make changes to our files.

Install:
```bash
npm install --save-dev nodemon
```

Add scripts in package.json:
```json
"scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js"
}
```

Run the development server:
```bash
npm run dev
```

## 11. What is npm?

NPM stands for Node Package Manager.

It is used to install and manage packages in Node.js projects.

Important commands:

```bash
npm init -y
```
Creates a package.json file with default settings.

```bash
npm install express
```
Installs Express.js.

```bash
npm install --save-dev nodemon
```
Installs Nodemon as a development dependency.

```bash
npm run dev
```
Runs the development script.

## 12. What is module.exports and require()?

Node.js allows us to divide our code into separate files called modules.

**module.exports:**

Used to export functions, objects, or values from a file.

Example:
```javascript
module.exports = {
    getAllStudents,
    addStudent
};
```

**require():**

Used to import an exported module into another file.

Example:
```javascript
const Student = require("../models/Student");
```

Now we can use the exported functions:

```javascript
Student.getAllStudents();
```

## 13. Complete MVC Request-Response Flow

Suppose the client sends:

```text
GET /api/students
```

The following steps happen:

1. **Client:** Sends a request to the Express server.
2. **server.js:** Receives the request and connects it to the student routes.
3. **Routes:** Finds the matching route and calls the controller function.
4. **Controller:** Handles the application logic.
5. **Model:** Provides the requested student data.
6. **Controller:** Receives the data from the Model and sends a JSON response.
7. **Client:** Receives the response.

### MVC Flow Diagram

```text
       CLIENT
          |
          v
       SERVER
          |
          v
        ROUTES
          |
          v
      CONTROLLER
          |
          v
        MODEL
          |
          v
     DATABASE / DATA
          |
          v
        MODEL
          |
          v
      CONTROLLER
          |
          v
     JSON RESPONSE
          |
          v
        CLIENT
```

## 14. Important Things to Remember

- **Model:** Handles data.
- **View:** Displays data to the user.
- **Controller:** Handles application logic.
- **Routes:** Define URLs and connect them to controllers.
- **Middleware:** Runs during the request-response cycle.
- **server.js:** Main entry point of the application.
- **req:** Contains incoming request information.
- **res:** Sends responses to the client.
- **Nodemon:** Automatically restarts the server during development.
- **Express:** A Node.js framework for building web applications and APIs.

### Final Concept

MVC architecture helps us organize our code into separate files. This makes our application easier to understand, maintain, debug, and expand.