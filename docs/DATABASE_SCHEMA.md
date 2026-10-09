# Database Schema

## MongoDB Models

### Student
- `studentName` (String, required)
- `email` (String, unique, indexed)
- `standard` (String, indexed)
- `registrationId` (String, unique, indexed)

### Course
- `title` (String, required)
- `category` (String, indexed)
- `isPublished` (Boolean, indexed)
- `price` (Number)
