# File Upload Implementation Complete! 📁

## ✅ What's Been Added

### 1. **Multer Configuration** 
- **Location**: `shared/utils/upload.ts`
- **Features**: 
  - Image files only (jpg, png, gif, etc.)
  - 5MB file size limit
  - Unique filename generation
  - Storage in `uploads/` directory

### 2. **File Management Utilities**
- **Location**: `shared/utils/file.utils.ts`
- **Features**:
  - Automatic uploads directory creation
  - File deletion when courses are deleted
  - Error handling for file operations

### 3. **Updated Endpoints**

#### **POST /courses** - Create Course with Image
```bash
curl -X POST http://localhost:3000/courses \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -F "title=Course with Image" \
  -F "description=This course has an uploaded image" \
  -F "image=@/path/to/your/image.jpg"
```

#### **PUT /courses/:id** - Update Course with Image
```bash
curl -X PUT http://localhost:3000/courses/COURSE_ID \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -F "title=Updated Course Title" \
  -F "image=@/path/to/new/image.jpg"
```

### 4. **Static File Serving**
- **URL**: `http://localhost:3000/uploads/filename.jpg`
- **Purpose**: Access uploaded images directly

---

## 🧪 Testing the File Upload

### **Step 1: Login as Admin**
```bash
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@no.com","password":"admin123"}'
```
*Copy the token from the response*

### **Step 2: Create Course with Image (Using Form Data)**
```bash
curl -X POST http://localhost:3000/courses \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -F "title=Course with Image Upload" \
  -F "description=This course demonstrates file upload functionality" \
  -F "image=@C:\Users\your-username\Pictures\test-image.jpg"
```

### **Step 3: Verify Image Upload**
The response will include the course data with image path:
```json
{
  "success": true,
  "message": "Course created successfully",
  "data": {
    "id": "abc123",
    "title": "Course with Image Upload",
    "description": "This course demonstrates file upload functionality",
    "image": "/uploads/1234567890-987654321.jpg",
    "creatorId": "admin-id",
    "createdAt": "2025-08-27T...",
    "updatedAt": "2025-08-27T..."
  }
}
```

### **Step 4: Access the Uploaded Image**
```bash
http://localhost:3000/uploads/1234567890-987654321.jpg
```

---

## 🔧 **Postman Testing**

### Create Course with Image:
1. **Method**: POST
2. **URL**: `http://localhost:3000/courses`
3. **Headers**: 
   - `Authorization: Bearer YOUR_TOKEN`
4. **Body**: form-data
   - `title` (text): "My Course"
   - `description` (text): "Course description"
   - `image` (file): Select your image file

### Update Course Image:
1. **Method**: PUT
2. **URL**: `http://localhost:3000/courses/COURSE_ID`
3. **Headers**: 
   - `Authorization: Bearer YOUR_TOKEN`
4. **Body**: form-data
   - `image` (file): Select new image file

---

## 📋 **Key Features**

### ✅ **File Validation**
- Only image files accepted (MIME type check)
- 5MB maximum file size
- Automatic file extension preservation

### ✅ **Unique Naming** 
- Prevents filename conflicts
- Format: `timestamp-random.extension`
- Example: `1693123456789-123456789.jpg`

### ✅ **Storage Management**
- Files stored in `/uploads` directory
- Automatic directory creation on server start
- File cleanup when courses are deleted

### ✅ **Security**
- File type validation
- Size limits enforced
- Protected upload endpoints (authentication required)

---

## 🚀 **Ready to Test!**

The file upload functionality is now fully implemented and ready for testing. You can:

1. **Upload images** when creating courses
2. **Update images** when editing courses
3. **Access images** via direct URLs
4. **Automatic cleanup** when courses are deleted

All endpoints maintain the existing authentication and authorization rules!
