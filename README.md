# Money Tracker

A full-stack web application for managing personal income and expenses.
The system allows authenticated users to record transactions, track balances, and manage financial activity in a simple dashboard interface.

<img width="405" height="551" alt="image" src="https://github.com/user-attachments/assets/cd32c148-f659-4836-bcd7-9db3960c9f22" />
<img width="388" height="611" alt="image" src="https://github.com/user-attachments/assets/effb9bd4-3ebe-432f-aca9-3422b6520093" />

## Overview

Money Tracker enables users to securely manage financial records by creating and maintaining a list of income and expense transactions. Each user's data is isolated through authentication, ensuring that transactions are accessible only to the respective account.

The application follows a full-stack architecture with a React-based frontend and a Node.js backend connected to a MongoDB database.

## Features

* User authentication (registration and login)
* User-specific transaction management
* Add income and expense transactions
* Delete transactions
* Automatic balance calculation
* Transaction list with categorized entries
* Dashboard layout with modular components
* Chart module placeholder for future analytics

## Technology Stack

**Frontend**

* React.js
* Axios
* CSS

**Backend**

* Node.js
* Express.js
* MongoDB
* Mongoose
* JSON Web Token (JWT) authentication

## Project Structure

```
project-root
│
├── api
│   ├── controllers
│   ├── models
│   │   ├── User.js
│   │   └── Transaction.js
│   ├── routes
│   ├── middleware
│   ├── config
│   └── index.js
│
├── frontend
│   └── client
│       ├── src
│       │   ├── components
│       │   ├── App.js
│       │   └── api.js
│       └── public
│
└── README.md
```

## System Design

The backend exposes RESTful APIs that handle authentication and transaction operations. JWT tokens are used for secure communication between the client and server.

Transactions are stored in MongoDB with a reference to the authenticated user. This ensures data separation across accounts.

The frontend interacts with the backend through Axios requests and dynamically updates the user interface when transactions are added or removed.

## Future Enhancements

* Transaction analytics and charts
* Monthly spending summaries
* Advanced filtering and search
* Export transactions (CSV/PDF)
* Responsive mobile interface
