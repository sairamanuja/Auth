# Auth-Nodemailer

A Node.js application that demonstrates user authentication and email notifications using Nodemailer.

## Overview

This project provides a basic implementation of user authentication (signup and login) and sends email notifications using Nodemailer. It is built with Node.js, Express, and MongoDB for database storage.

## Features

- User registration and login with email and password.
- Password hashing using bcrypt.
- Email notifications for successful registration using Nodemailer.
- MongoDB for storing user data.
- JWT (JSON Web Token) for secure authentication.

## Prerequisites

Before running the project, ensure you have the following installed:

- Node.js (v14 or higher)
- MongoDB (local or cloud-based like MongoDB Atlas)
- NPM (Node Package Manager)

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/sairamanuja/Auth-Nodemailer.git
   cd Auth-Nodemailer
2. Install dependencies:
   ```bash
   npm install


## Setup Instructions

### 3. Set up environment variables:
Create a `.env` file in the root directory and add the following variables:
   ```.env
MONGODB_URL=<your-mongodb-connection-string>
JWTSECRET=<your-jwt-secret-key>
PORT=<your-port-number>
NODEMAIL_USER=<your-email-address>
NODEMAIL_PASS=<your-email-password>
    
 
