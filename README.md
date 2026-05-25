# User REST API

REST API for user management built with TypeScript, Express and MongoDB.

---

## Tech Stack

- **Language:** TypeScript
- **Framework:** Express.js
- **Database:** MongoDB and Mongoose
- **Authentication:** JWT (JSON Web Tokens)
- **Validation:** Zod
- **Security:** bcrypt (Password hashing)

---

# Security

- Passwords are hashed using bcrypt
- JWT authentication for protected routes
- Environment variables for sensitive data
- Request body validation with Zod

---

# Getting Started

## 1. Prerequisites

- Node.js (v18 or higher)
- MongoDB

---

## 2. Installation

```bash
git clone https://github.com/Velmora1/UserRestApiTs.git
cd UserRestApiTs
```

---

## 3. Install Dependencies

```bash
npm install
```

---

## 4. Environment Variables Setup

Create a `.env` file in the root directory:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/user-api
JWT_SECRET=your_jwt_secret_key
```

---

## 5. Run the Project

### Development mode

```bash
npm run dev
```

### Production mode

```bash
npm run build
npm start
```

---

# API Endpoints

## Authentication

| Method | Endpoint | Description |
|---|---|---|
| POST | `/auth/register` | Register a new user |
| POST | `/auth/login` | Login user and get JWT token |

---

## Users

| Method | Endpoint | Description | Access |
|---|---|---|---|
| GET | `/users` | Get all users | Public |
| GET | `/users/me` | Get current user profile | Private |
| PATCH | `/users/me/password` | Change current user password | Private |
| DELETE | `/users/me/delete` | Delete current user account | Private |
| DELETE | `/users/:id` | Delete user by ID | Admin |
| PATCH | `/users/updaterole` | Update user role | Admin |

---

# Example Requests

## Register User

```http
POST /auth/register
Content-Type: application/json
```

```json
{
  "username": "john",
  "email": "john@example.com",
  "password": "12345678"
}
```

---

## Login User

```http
POST /auth/login
Content-Type: application/json
```

```json
{
  "email": "john@example.com",
  "password": "12345678"
}
```

---

# Future Improvements

- Refresh Tokens
- Email verification
- Role-based access control
- Swagger/OpenAPI documentation
- Docker support
- Unit and integration tests

---

# License

This project is licensed under the MIT License.