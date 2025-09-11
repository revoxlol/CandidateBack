## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user  
- `GET /api/auth/profile` - Get current user (protected)
- `GET /api/auth/validate` - Validate token (protected)

### Candidates (All protected)
- `GET /api/candidates` - Get all candidates with filtering/pagination
- `POST /api/candidates` - Create new candidate
- `GET /api/candidates/stats` - Get dashboard statistics
- `GET /api/candidates/:id` - Get single candidate
- `PATCH /api/candidates/:id` - Update candidate
- `DELETE /api/candidates/:id` - Delete candidate


## Testing The Auth Points With JSON : 

1. ##  Register a new user:

Method: POST
URL: http://localhost:3000/api/auth/register
Headers: Content-Type: application/json
Body :

{
  "email": "recruiter@company.com",
  "password": "password123",
  "firstName": "John",
  "lastName": "Doe"
}

## Login As A Recruiter 
Login with the user:

Method: POST
URL: http://localhost:3000/api/auth/login
Headers: Content-Type: application/json
Body :

{
  "email": "recruiter@company.com",
  "password": "password123"
}


## Create a candidate :

Method: POST
URL: http://localhost:3000/api/candidates
Headers:

Content-Type: application/json
Authorization: Bearer YOUR-ACCESS-TOKEN-HERE (paste the token from login)


Body (raw JSON):

json{
  "name": "Jane Smith",
  "email": "jane.smith@email.com",
  "phone": "+1234567890",
  "position": "Software Engineer",
  "status": "Applied",
  "notes": "Excellent candidate with 5 years experience"
}
