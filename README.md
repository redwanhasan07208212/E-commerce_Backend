📚 Blog Platform
Welcome to the Blog Platform! This backend system empowers users to create, update, and delete blogs while maintaining secure role-based access control. Admins and Users have distinct permissions to ensure proper management and security.

🌟 Key Features
User Registration & Login: Allows users to securely register and log in.
Authentication & Authorization: Ensures role-based access control with JWT.
Admin Controls: Admins can block users or delete any blog.
User Blog Management: Users can create, update, and delete their own blogs.
Public Blog Access: Provides public access to view blogs with advanced search, sort, and filter functionalities.
🚀 Getting Started

1. Clone the Repository
   bash

git clone https://github.com/redwanhasan07208212/BLOG_PROJECT.git  
cd BLOG_PROJECT  
2. Install Dependencies
bash
npm install  
3. Set Up Environment Variables
Rename the .env.example file to .env.
Add your database connection URI and other required details:
env

DATABASE_URL=<Your_MongoDB_URI>  
JWT_SECRET=<Your_Secret_Key>  
PORT=8000  
4. Run the Project
Start the development server:

bash

npm run dev  
🌐 Base URL
Deployed Version: https://assignment-3-seven-murex.vercel.app/

📋 Postman Collection
For detailed information about each API endpoint, request parameters, and responses, please refer to the Postman collection:
Postman Collection Link (Add the link if available)

📂 API Endpoints

1. Authentication
   1.1 Register User
   POST /api/auth/register
   Registers a new user.

1.2 Login User
POST /api/auth/login
Authenticates an existing user and returns a JWT token.

2. Blog Management
   2.1 Create Blog (User Only)
   POST /api/blogs
   Allows logged-in users to create blogs.

2.2 Update Blog (User Only)
PATCH /api/blogs/:id
Allows users to update their own blogs.

2.3 Delete Blog (User Only)
DELETE /api/blogs/:id
Allows users to delete their own blogs.

2.4 Get All Blogs (Public)
GET /api/blogs
Fetches all blogs with support for the following query parameters:

search: Search blogs by title or content (e.g., search=blogtitle).
sortBy: Sort blogs by fields like createdAt or title (e.g., sortBy=title).
sortOrder: Sorting order: asc (ascending) or desc (descending).
filter: Filter blogs by author ID (e.g., author=authorId). 3. Admin Actions
3.1 Block User (Admin Only)
PATCH /api/admin/users/:userId/block
Allows an Admin to block a user.

3.2 Delete Blog (Admin Only)
DELETE /api/admin/blogs/:id
Allows an Admin to delete any blog.

🛡️ Token Authorization
All protected routes require a valid JWT in the header:

http

Authorization: Bearer <token>  
🛠️ Admin Credentials
Use the following credentials to access Admin functionality:

json

{  
 "email": "admin@gmail.com",  
 "password": "123456"  
}  
📂 Models
User Model
Field Type Description
name string Full name of the user.
email string Email address for login and communication.
password string Securely stored password.
role string User role: either admin or user. Default: user.
isBlocked boolean Indicates whether the user is blocked. Default: false.
createdAt Date Timestamp of user creation.
updatedAt Date Timestamp of the last update.
Blog Model
Field Type Description
title string Title of the blog post.
content string Main content of the blog post.
author ObjectId Reference to the User model (blog's author).
isPublished boolean Indicates if the blog is published. Default: true.
createdAt Date Timestamp of blog creation.
updatedAt Date Timestamp of the last update.
💡 Error Handling
All error responses follow a consistent format:

json

{  
 "success": false,  
 "message": "Error description",  
 "statusCode": 400,  
 "error": { "details": "Additional information" },  
 "stack": "Error stack (if available)"  
}  
Common Error Types:
Validation Errors: Invalid input or missing fields.
Authentication Errors: Invalid or missing token.
Authorization Errors: Unauthorized actions.
Resource Not Found: Resource does not exist.
Server Errors: Unexpected internal server issues.
🧑‍💻 Contributors
[Redwan Hasan]
# E-commerce_Backend
