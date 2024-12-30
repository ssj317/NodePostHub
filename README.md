# NodePostHub
A Node.js application with authentication, profile management, and CRUD operations for posts, including profile picture support. Built using Express and MongoDB for secure and scalable backend services.
This project is a Node.js application that provides user authentication, profile management, and CRUD operations for posts. It also supports profile picture uploads and liking/unliking posts. Built with Express, MongoDB, and EJS for templating, it delivers secure and scalable backend services.

Features

User Authentication: Register and login with hashed passwords using bcrypt and JWT tokens for session management.

Profile Management: Edit user profiles, upload profile pictures, and view personal information.

Post Management: Create, edit, and delete posts linked to user profiles.

Likes: Like or unlike posts.

Profile Picture Uploads: Upload and update profile pictures using multer.

Protected Routes: Middleware to ensure only authenticated users can access certain pages.

Tech Stack

Backend: Node.js, Express.js

Database: MongoDB with Mongoose

Authentication: bcrypt and JWT

File Uploads: multer

Templating Engine: EJS

Installation

Clone the repository:

git clone <repository-url>

Navigate into the project directory:

cd <project-directory>

Install dependencies:

npm install

Start the server:

node app.js

Open the application in your browser:

http://localhost:3000

Directory Structure

.
├── config
│   └── multerconfig.js  # Multer configuration for file uploads
├── models
│   ├── user.js          # User schema and model
│   └── post.js          # Post schema and model
├── public
│   └── static files     # CSS, JS, and images
├── views
│   └── EJS templates    # Templates for rendering views
├── app.js               # Main application file
└── README.md            # Project documentation

API Routes

Authentication Routes

GET / - Home page.

GET /login - Login page.

POST /register - Register a new user.

POST /login - Login a user.

GET /logout - Logout a user.

Profile Routes

GET /profile - View user profile.

GET /upload - Profile picture upload page.

POST /upload - Upload profile picture.

Post Routes

POST /post - Create a new post.

GET /edit/:id - Edit a specific post.

POST /update/:id - Update post content.

GET /like/:id - Like or unlike a post.

Dependencies

express - Web framework.

mongoose - MongoDB ODM.

bcrypt - Password hashing.

jsonwebtoken - Token-based authentication.

multer - File uploads.

cookie-parser - Cookie parsing middleware.

path - Handling file paths.

