# MERN Project Readme

## Project Overview

This project is a MERN (MongoDB, Express.js, React, Node.js) stack application that features a video sharing platform. The application has an Admin module and a User module with various functionalities. The frontend is developed using React, and the backend is built with Express.js and Node.js. MongoDB is used for the database.

A live demo of the project is deployed on Vercel: React Video Library : https://react-video-library-client.vercel.app

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Database Schema](#database-schema)
- [Libraries and Dependencies](#libraries-and-dependencies)
- [Contributing](#contributing)
- [License](#license)

## Features

### Admin Module

- **Login**: Admins can log into the system.
- **Manage Videos**:
  - Add new videos.
  - Edit existing videos.
  - Delete videos.

### User Module

- **Register**: Users can register for a new account.
- **Login**: Users can log into the system.
- **View Videos**: Users can view a list of available videos.
- **Interact with Videos**:
  - Comment on videos.
  - Like and dislike videos.

## Installation

### Prerequisites

- Node.js
- MongoDB

### Steps

1. **Clone the repository**:

   ```sh
   git clone <repository-url>
   cd <repository-directory>
   ```

2. **Install server dependencies**:

   ```sh
   cd server
   npm install
   ```

3. **Install client dependencies**:

   ```sh
   cd ../client
   npm install
   ```

4. **Set up environment variables**:
   Create a `.env` file in the `server` directory and add your MongoDB connection string and any other environment variables needed.

5. **Run the application**:
   - Start the backend server:
     ```sh
     cd server
     npm start
     ```
   - Start the frontend server:
     ```sh
     cd ../client
     npm start
     ```

## Usage

### Admin

1. Log in using the admin credentials.
2. Navigate to the video management section.
3. Add, edit, or delete videos as needed.

### User

1. Register for a new account or log in with existing credentials.
2. Browse through the available videos.
3. View, comment, like, or dislike videos.

## Project Structure

```
mern-project/
│
├── client/                  # React frontend
│   ├── public/
│   └── src/
│       ├── components/
│       ├── pages/
│       ├── App.js
│       └── index.js
│
├── server/                  # Node.js and Express backend
│   ├── models/
│   ├── routes/
│   ├── controllers/
│   └── app.js
│
├── README.md
└── package.json
```

## Database Schema

### Collections

- **tbladmin**:

  - `userid: string`
  - `password: string`
  - `email: string`
  - `mobile: string`

- **tblusers**:

  - `userid: string`
  - `userName: string`
  - `password: string`
  - `email: string`
  - `mobile: string`

- **tblCategories**:

  - `CategoryId: number`
  - `CategoryName: string`

- **tblVideos**:

  - `VideoId: number`
  - `Url: string`
  - `Title: string`
  - `Description: string`
  - `Likes: number`
  - `Dislikes: number`
  - `Views: number`
  - `CategoryId: number`

- **tblComments**:
  - `CommentId: number`
  - `VideoId: number`
  - `Comments: string[]`

## Libraries and Dependencies

### Frontend

- **React**: JavaScript library for building user interfaces.
- **react-router-dom**: For routing.
- **react-cookie**: For handling cookies.
- **axios**: For making HTTP requests.
- **formik**: For form handling.
- **bootstrap**: For styling.
- **bootstrap-icons**: For icons.

### Backend

- **Express.js**: Web framework for Node.js.
- **mongoose**: MongoDB object modeling tool.
- **dotenv**: For managing environment variables.

## Contributing

Contributions are welcome! Please fork the repository and create a pull request with your changes. Ensure your code follows the project’s coding standards.

---

Feel free to modify this template to fit the specific details and needs of your project.
