# Express TypeScript API with Modular Architecture

A complete Express API built with TypeScript featuring modular architecture, JWT authentication, role-based access control, and a generic repository pattern.

## 🚀 Features

- **Modular Architecture**: Organized into auth, users, courses, and shared modules
- **Entity-Based Design**: Separate entity files for each module
- **JWT Authentication**: Secure authentication with role-based access control
- **Generic Repository Pattern**: Reusable CRUD operations with TypeScript generics
- **Role-Based Access**: ADMIN, COACH, and STUDENT roles with different permissions
- **Zod Validation**: Strong type validation for all DTOs
- **In-Memory Storage**: Data stored in JavaScript objects (resets on restart)
- **Error Handling**: Comprehensive error handling with custom error types

## 🏗️ Project Structure

```
src/
├── auth/
│   ├── auth.controller.ts    # Authentication endpoints
│   ├── auth.service.ts       # Authentication logic
│   ├── auth.routes.ts        # Authentication routes
│   ├── auth.dto.ts          # Authentication DTOs
│   └── auth.entity.ts       # Authentication entities
├── users/
│   ├── users.controller.ts   # User management endpoints
│   ├── users.service.ts      # User management logic
│   ├── users.routes.ts       # User routes
│   ├── users.dto.ts         # User DTOs
│   └── user.entity.ts       # User entity
├── courses/
│   ├── courses.controller.ts # Course management endpoints
│   ├── courses.service.ts    # Course management logic
│   ├── courses.routes.ts     # Course routes
│   ├── courses.dto.ts       # Course DTOs
│   └── course.entity.ts     # Course entity
├── shared/
│   ├── types/
│   │   ├── index.ts         # Type exports
│   │   └── base.entity.ts   # Base entities
│   ├── middlewares/         # Custom middlewares
│   ├── utils/              # Utility functions
│   ├── repository/         # Generic repository
│   └── errors/            # Error handling
└── server.ts              # Application entry point
```

## 📋 Entities

### User Entity
```typescript
interface User extends BaseEntity {
  name: string;
  email: string;
  password: string;
  role: UserRole;
}
```

### Course Entity
```typescript
interface Course extends BaseEntity {
  title: string;
  description: string;
  image?: string;
  creatorId: string;
}
```

### Base Entity
```typescript
interface BaseEntity {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}
```

## 🔐 Role-Based Access Control

### ADMIN
- Can create COACH users
- Can update/delete any course

### COACH
- Can create/update/delete their own courses

### STUDENT
- Default role when registering
- Can only view courses

## 📋 API Endpoints

### Authentication
- `POST /auth/register` - Register as STUDENT
- `POST /auth/login` - Login and get JWT token

### Users
- `GET /users/me` - Get current user profile (protected)
- `PUT /users/me` - Update current profile (protected)
- `POST /users/coach` - Create COACH user (ADMIN only)

### Courses
- `POST /courses` - Create course (COACH/ADMIN only)
- `GET /courses` - Get all courses (public)
- `GET /courses/:id` - Get course by ID (public)
- `PUT /courses/:id` - Update course (creator only)
- `DELETE /courses/:id` - Delete course (creator only)

## 🛠️ Setup Instructions

1. **Clone the repository**
```bash
git clone <repository-url>
cd express-typescript-api
```

2. **Install dependencies**
```bash
npm install
```

3. **Environment Variables**
Create a `.env` file in the root directory:
```env
PORT=3000
JWT_SECRET=your-super-secret-jwt-key
JWT_EXPIRES_IN=7d
NODE_ENV=development
```

4. **Run the application**

Development mode:
```bash
npm run dev
```

Production mode:
```bash
npm run build
npm start
```

## 🧪 API Endpoint Examples

### 🔐 Authentication Endpoints

#### 1. Register a new student
```bash
curl -X POST http://localhost:3000/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"John Doe","email":"john@example.com","password":"password123"}'
```

**Response (201 Created):**
```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "user": {
      "id": "550e8400-e29b-41d4-a716-446655440000",
      "name": "John Doe",
      "email": "john@example.com",
      "role": "STUDENT",
      "createdAt": "2025-08-27T10:30:00.000Z",
      "updatedAt": "2025-08-27T10:30:00.000Z"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

#### 2. Login
```bash
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"john@example.com","password":"password123"}'
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": {
      "id": "550e8400-e29b-41d4-a716-446655440000",
      "name": "John Doe",
      "email": "john@example.com",
      "role": "STUDENT",
      "createdAt": "2025-08-27T10:30:00.000Z",
      "updatedAt": "2025-08-27T10:30:00.000Z"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

### 👤 User Management Endpoints

#### 3. Get current user profile (Protected)
```bash
curl -X GET http://localhost:3000/users/me \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Profile retrieved successfully",
  "data": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "STUDENT",
    "createdAt": "2025-08-27T10:30:00.000Z",
    "updatedAt": "2025-08-27T10:30:00.000Z"
  }
}
```

#### 4. Update current user profile (Protected)
```bash
curl -X PUT http://localhost:3000/users/me \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." \
  -d '{"name":"John Smith","email":"johnsmith@example.com"}'
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Profile updated successfully",
  "data": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "name": "John Smith",
    "email": "johnsmith@example.com",
    "role": "STUDENT",
    "createdAt": "2025-08-27T10:30:00.000Z",
    "updatedAt": "2025-08-27T11:45:00.000Z"
  }
}
```

#### 5. Create COACH user (ADMIN only)
```bash
curl -X POST http://localhost:3000/users/coach \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer ADMIN_JWT_TOKEN" \
  -d '{"name":"Jane Coach","email":"jane@example.com","password":"coach123"}'
```

**Response (201 Created):**
```json
{
  "success": true,
  "message": "Coach created successfully",
  "data": {
    "id": "660e8400-e29b-41d4-a716-446655440001",
    "name": "Jane Coach",
    "email": "jane@example.com",
    "role": "COACH",
    "createdAt": "2025-08-27T12:00:00.000Z",
    "updatedAt": "2025-08-27T12:00:00.000Z"
  }
}
```

### 📚 Course Management Endpoints

#### 6. Create a course (COACH/ADMIN only)
```bash
curl -X POST http://localhost:3000/courses \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer COACH_OR_ADMIN_JWT_TOKEN" \
  -d '{"title":"JavaScript Basics","description":"Learn JavaScript fundamentals and modern ES6+ features"}'
```

**Response (201 Created):**
```json
{
  "success": true,
  "message": "Course created successfully",
  "data": {
    "id": "770e8400-e29b-41d4-a716-446655440002",
    "title": "JavaScript Basics",
    "description": "Learn JavaScript fundamentals and modern ES6+ features",
    "creatorId": "660e8400-e29b-41d4-a716-446655440001",
    "createdAt": "2025-08-27T12:30:00.000Z",
    "updatedAt": "2025-08-27T12:30:00.000Z"
  }
}
```

#### 7. Get all courses (Public)
```bash
curl -X GET http://localhost:3000/courses
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Courses retrieved successfully",
  "data": [
    {
      "id": "770e8400-e29b-41d4-a716-446655440002",
      "title": "JavaScript Basics",
      "description": "Learn JavaScript fundamentals and modern ES6+ features",
      "creatorId": "660e8400-e29b-41d4-a716-446655440001",
      "createdAt": "2025-08-27T12:30:00.000Z",
      "updatedAt": "2025-08-27T12:30:00.000Z"
    },
    {
      "id": "880e8400-e29b-41d4-a716-446655440003",
      "title": "React Advanced",
      "description": "Master React hooks, context, and advanced patterns",
      "creatorId": "660e8400-e29b-41d4-a716-446655440001",
      "createdAt": "2025-08-27T13:00:00.000Z",
      "updatedAt": "2025-08-27T13:00:00.000Z"
    }
  ]
}
```

#### 8. Get course by ID (Public)
```bash
curl -X GET http://localhost:3000/courses/770e8400-e29b-41d4-a716-446655440002
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Course retrieved successfully",
  "data": {
    "id": "770e8400-e29b-41d4-a716-446655440002",
    "title": "JavaScript Basics",
    "description": "Learn JavaScript fundamentals and modern ES6+ features",
    "creatorId": "660e8400-e29b-41d4-a716-446655440001",
    "createdAt": "2025-08-27T12:30:00.000Z",
    "updatedAt": "2025-08-27T12:30:00.000Z"
  }
}
```

#### 9. Update course (Creator or ADMIN only)
```bash
curl -X PUT http://localhost:3000/courses/770e8400-e29b-41d4-a716-446655440002 \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer CREATOR_OR_ADMIN_JWT_TOKEN" \
  -d '{"title":"Advanced JavaScript","description":"Master JavaScript with advanced concepts, async programming, and modern frameworks"}'
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Course updated successfully",
  "data": {
    "id": "770e8400-e29b-41d4-a716-446655440002",
    "title": "Advanced JavaScript",
    "description": "Master JavaScript with advanced concepts, async programming, and modern frameworks",
    "creatorId": "660e8400-e29b-41d4-a716-446655440001",
    "createdAt": "2025-08-27T12:30:00.000Z",
    "updatedAt": "2025-08-27T14:15:00.000Z"
  }
}
```

#### 10. Delete course (Creator or ADMIN only)
```bash
curl -X DELETE http://localhost:3000/courses/770e8400-e29b-41d4-a716-446655440002 \
  -H "Authorization: Bearer CREATOR_OR_ADMIN_JWT_TOKEN"
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Course deleted successfully"
}
```

### 🚨 Error Response Examples

#### Validation Error (400)
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "field": "email",
      "message": "Invalid email format"
    },
    {
      "field": "password",
      "message": "Password must be at least 6 characters long"
    }
  ]
}
```

#### Unauthorized (401)
```json
{
  "success": false,
  "message": "Authentication required"
}
```

#### Forbidden (403)
```json
{
  "success": false,
  "message": "Insufficient permissions"
}
```

#### Not Found (404)
```json
{
  "success": false,
  "message": "Course not found"
}
```

#### Server Error (500)
```json
{
  "success": false,
  "message": "Internal server error"
}
```

### 🔄 Complete Testing Workflow

Here's a step-by-step workflow to test all functionality:

#### Step 1: Start the server
```bash
npm run dev
```

#### Step 2: Login as default admin
```bash
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@no.com","password":"admin123"}'
```
*Save the returned JWT token as ADMIN_TOKEN*

#### Step 3: Create a COACH user (using admin token)
```bash
curl -X POST http://localhost:3000/users/coach \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer ADMIN_TOKEN" \
  -d '{"name":"Coach Jane","email":"coach@example.com","password":"coach123"}'
```

#### Step 4: Login as COACH
```bash
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"coach@example.com","password":"coach123"}'
```
*Save the returned JWT token as COACH_TOKEN*

#### Step 5: Create a course (as COACH)
```bash
curl -X POST http://localhost:3000/courses \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer COACH_TOKEN" \
  -d '{"title":"Node.js Masterclass","description":"Complete guide to Node.js backend development"}'
```
*Save the returned course ID as COURSE_ID*

#### Step 6: Register as STUDENT
```bash
curl -X POST http://localhost:3000/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Student Bob","email":"student@example.com","password":"student123"}'
```
*Save the returned JWT token as STUDENT_TOKEN*

#### Step 7: View courses (as STUDENT - public access)
```bash
curl -X GET http://localhost:3000/courses
```

#### Step 8: Try to create course (as STUDENT - should fail)
```bash
curl -X POST http://localhost:3000/courses \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer STUDENT_TOKEN" \
  -d '{"title":"Unauthorized Course","description":"This should fail"}'
```
*Expected: 403 Forbidden*

#### Step 9: Update course (as COACH owner)
```bash
curl -X PUT http://localhost:3000/courses/COURSE_ID \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer COACH_TOKEN" \
  -d '{"title":"Advanced Node.js Masterclass","description":"Complete guide to advanced Node.js backend development patterns"}'
```

#### Step 10: Delete course (as ADMIN)
```bash
curl -X DELETE http://localhost:3000/courses/COURSE_ID \
  -H "Authorization: Bearer ADMIN_TOKEN"
```

### 🧪 Postman Collection

For easier testing, you can import this Postman collection:

```json
{
  "info": {
    "name": "Express TypeScript API",
    "description": "Complete API testing collection"
  },
  "auth": {
    "type": "bearer",
    "bearer": [
      {
        "key": "token",
        "value": "{{authToken}}",
        "type": "string"
      }
    ]
  },
  "variable": [
    {
      "key": "baseUrl",
      "value": "http://localhost:3000"
    },
    {
      "key": "authToken",
      "value": ""
    }
  ]
}
```

## 🔧 Default Admin User

On server startup, a default admin user is created:
- **Email**: admin@no.com
- **Password**: admin123
- **Role**: ADMIN

## 📦 Technologies Used

- **Express.js** - Web framework
- **TypeScript** - Type safety
- **JWT** - Authentication
- **Zod** - Schema validation
- **bcryptjs** - Password hashing
- **CORS** - Cross-origin resource sharing
- **dotenv** - Environment variables

### 🔐 Authentication Flow

1. **Registration**: New users are automatically assigned STUDENT role
2. **Login**: Returns JWT token valid for 7 days (configurable)
3. **Protected Routes**: Require `Authorization: Bearer <token>` header
4. **Role-based Access**: Different permissions for ADMIN, COACH, and STUDENT

### 📊 Data Models

#### User Model
- **id**: UUID (auto-generated)
- **name**: String (min 2 characters)
- **email**: String (unique, email format)
- **password**: String (hashed with bcrypt, min 6 characters)
- **role**: Enum (ADMIN, COACH, STUDENT)
- **createdAt**: Date
- **updatedAt**: Date

#### Course Model
- **id**: UUID (auto-generated)
- **title**: String (min 3 characters)
- **description**: String (min 10 characters)
- **image**: String (optional, for future use)
- **creatorId**: UUID (references User)
- **createdAt**: Date
- **updatedAt**: Date

### 🎯 Business Rules

1. **User Registration**:
   - Default role is STUDENT
   - Email must be unique
   - Password is hashed before storage

2. **Course Creation**:
   - Only COACH and ADMIN can create courses
   - Title and description are required
   - CreatorId is automatically set from JWT token

3. **Course Management**:
   - Only course creator or ADMIN can update/delete courses
   - All users can view courses (public access)

4. **User Management**:
   - Only ADMIN can create COACH users
   - Users can update their own profile
   - Password updates require current password (future enhancement)

## 🚀 Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript type checking

## 🔍 Error Codes

- **400** - Bad Request (Validation errors)
- **401** - Unauthorized (Invalid/missing token)
- **403** - Forbidden (Insufficient permissions)
- **404** - Not Found (Resource doesn't exist)
- **500** - Internal Server Error

## �️ Troubleshooting

### Common Issues

#### 1. "Port already in use" error
```bash
# Check what's running on port 3000
netstat -ano | findstr :3000

# Kill the process (replace PID with actual process ID)
taskkill /PID <PID> /F
```

#### 2. JWT Token expired
- Tokens expire after 7 days by default
- Re-login to get a new token
- Check JWT_EXPIRES_IN in .env file

#### 3. CORS issues
- Frontend domain not allowed
- Update CORS configuration in server.ts
- Ensure proper headers are sent

#### 4. Validation errors
- Check request body format
- Ensure all required fields are provided
- Verify data types match DTO schemas

#### 5. Permission denied
- Verify user role has required permissions
- Check if JWT token is valid and properly formatted
- Ensure Authorization header format: `Bearer <token>`

### Development Tips

1. **Hot Reload**: The development server automatically restarts on file changes
2. **Debugging**: Use VS Code debugger with the provided launch configuration
3. **Testing**: Use tools like Postman, Insomnia, or curl for API testing
4. **Logs**: Check terminal output for detailed error messages
5. **Database**: Remember that data is stored in memory and resets on server restart

### Performance Considerations

- **Memory Storage**: Current implementation uses in-memory storage
- **Production Ready**: For production, integrate with a real database (PostgreSQL, MongoDB, etc.)
- **Caching**: Consider implementing Redis for session management
- **Rate Limiting**: Add rate limiting middleware for API protection
- **Logging**: Implement structured logging (Winston, Pino)

