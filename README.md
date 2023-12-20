# TODO Application
<style>
    h3 {
        margin-bottom: 0px;
    }
    p {
        padding-left: 20px;
    }
</style>

<h4>Table of Contents</h4>
<ol>
    <li><a href="#quickstart">QuickStart</a></li>
    <li><a href="#api">API Endpoints</a></li>
    <li><a href="#system">System Overview</a></li>
    <li><a href="#tree">File Tree</a></li>
</ol>

<hr>

<h3 id="quickstart">QuickStart</h3>

Download the repository<br>

Install dependencies with Node Package Manager (NPM)

```
npm install
```
Run the code

```
npm run dev
```


Access API endpoints via browser or Postman

<a href="http://localhost:3000/api/">http://localhost:3000/api/</a>

<hr>

<h3 id="api">API Endpoints</h3>
Here's a list of the available API endpoints with the base URL `http://localhost:3000/api/`, along with notes on their functionality:

### Task Routes
1. `POST /tasks` - Create a new task.
2. `GET /tasks` - Retrieve all tasks.
3. `GET /tasks/:id` - Retrieve a specific task by its ID.
4. `PUT /tasks/:id` - Update a specific task by its ID.
5. `DELETE /tasks/:id` - Delete a specific task by its ID.

### Category Routes
1. `POST /category` - Create a new category.
2. `GET /category` - Retrieve all categories.
3. `GET /category/:id` - Retrieve a specific category by its ID.
4. `PUT /category/:id` - Update a specific category by its ID.
5. `DELETE /category/:id` - Delete a specific category by its ID.

### TimeTracking Routes
1. `POST /time` - Create a new time tracking record.
2. `GET /time` - Retrieve all time tracking records.
3. `GET /time/:id` - Retrieve a specific time tracking record by its ID.
4. `PUT /time/:id` - Update a specific time tracking record by its ID.
5. `DELETE /time/:id` - Delete a specific time tracking record by its ID.

<hr>

<h3 id="system">System Overview</h3>
    - Model-View-Controller Architecture.
    - The database context is defined within the db object in db.js
    - The model layer is controlled using Sequelize ORM and is accessible in the models directory.
    - The view layer is created using React and is found within the view directory.
    - The controller layer contains classes that defines data objects that utilize Sequelize ORM methods and are passed to their respective routes within routes.js.
    - The API is all pulled together within index.js and served using Express.s

<hr>

<h3 id="tree">File Tree:</h3>

```
    .
    ├── controllers
    │   ├── categoryController.js
    │   ├── taskController.js
    │   └── timeTrackingController.js
    ├── models
    │   ├── category.js
    │   ├── task.js
    │   └── timeTracking.js
    ├── db.js
    ├── index.js
    ├── package.json
    ├── README.md
    └── routes.js
```

<hr>
