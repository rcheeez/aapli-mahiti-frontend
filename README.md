# Aapli Mahiti Frontend

**Efficient Data Management at Your Fingertips - Frontend for the Aapli Mahiti Dashboard Application**

## Table of Contents
- [Introduction](#introduction)
- [Features](#features)
- [Usage](#usage)
- [Technologies Used](#technologies-used)
- [Folder Structure](#folder-structure)
- [Contributing](#contributing)

## Introduction
**Aapli Mahiti** is a comprehensive React-based frontend application that powers the **Dashboard** for efficient data management. It enables users to seamlessly interact with the Aapli Mahiti backend API, providing an intuitive and user-friendly interface to view, edit, and manage data entries.

This dashboard is built for ease of use and scalability, making it a perfect fit for administrators and users looking to manage large sets of locality data.

## Features
- **User-Friendly Interface**: Simple and clean UI for efficient navigation and data management.
- **Authentication**: Secure login functionality for authorized access.
- **Dynamic Data Handling**: Perform CRUD (Create, Read, Update, Delete) operations for managing people’s data such as names, emails, and phone numbers.
- **Real-Time Data Updates**: Dynamic data updates on the dashboard without needing a full page reload.
- **Error Handling**: Graceful error handling and feedback for users.
- **Efficient Data Filtering**: Search and filter through data entries.
  
## Installation

### Prerequisites
Before running the application, ensure you have the following installed:
- [Node.js](https://nodejs.org/en/download/)
- [npm](https://www.npmjs.com/get-npm)

## Usage
Once the application is running:
1. Navigate to the login page and authenticate.
2. Access the dashboard to view, add, update, or delete data entries.
3. Filter and search for specific data using the search bar.
4. Navigate through the various sections of the dashboard for different data management functionalities.

## Technologies Used
- **React.js**: JavaScript library for building user interfaces.
- **Axios**: This is for making API requests to the backend.
- **React Router**: For handling client-side routing.
- **ESLint and Prettier**: For code quality and formatting.
  
## Folder Structure

The project is structured as follows:

```
/src
  /assets
    /images          # Static images used in the application
  /components
    /common           # Reusable components (buttons, modals, etc.)
    /AdminLogin       # Components related to the Admin Login
    /Dashboard        # Components related to the Dashboard
    /Toast            # Components related to the Toast
  /services           # API services and configurations
  /styles             # Global CSS styles and themes
  App.js              # Main application component
  index.js            # Application entry point
```

## Contributing
Contributions are welcome! To contribute to the project:
1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature`).
3. Make your changes and commit them (`git commit -am 'Add your feature'`).
4. Push to the branch (`git push origin feature/your-feature`).
5. Create a new Pull Request.

---
