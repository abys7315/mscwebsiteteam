# MSC Team Registration Backend API

A comprehensive backend API for managing Microsoft Student Chapter team member registrations.

## Features

- **Team Member Registration**: Complete CRUD operations for team members
- **Data Validation**: Comprehensive input validation using express-validator
- **Security**: Helmet for security headers, rate limiting, CORS protection
- **Database**: MongoDB with Mongoose ODM
- **Error Handling**: Centralized error handling middleware
- **File Upload**: Support for image uploads (configurable)
- **Pagination**: Paginated results for team member listings

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose
- **Validation**: express-validator
- **Security**: Helmet, express-rate-limit, CORS
- **File Handling**: Multer (for future image uploads)

## Installation

1. Clone the repository and navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   ```bash
   cp .env.example .env
   ```
   Edit `.env` with your configuration.

4. Start MongoDB (local or MongoDB Atlas)

5. Start the server:
   ```bash
   npm run dev  # For development with nodemon
   npm start    # For production
   ```

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Server port | 5001 |
| `NODE_ENV` | Environment | development |
| `MONGODB_URI` | MongoDB connection string | mongodb://localhost:27017/msc-team |
| `CLOUDINARY_CLOUD_NAME` | Cloudinary cloud name | - |
| `CLOUDINARY_API_KEY` | Cloudinary API key | - |
| `CLOUDINARY_API_SECRET` | Cloudinary API secret | - |

## API Endpoints

### Team Members

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/team-members` | Register new team member |
| GET | `/api/team-members` | Get all team members (with pagination) |
| GET | `/api/team-members/:id` | Get single team member |
| PUT | `/api/team-members/:id` | Update team member |
| DELETE | `/api/team-members/:id` | Delete team member |

### Health Check

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/health` | Server health check |

## Request/Response Examples

### Register Team Member
```bash
POST /api/team-members
Content-Type: application/json

{
  "name": "John Doe",
  "regNumber": "12345",
  "email": "john.doe@example.com",
  "contactNumber": "+1234567890",
  "githubLink": "https://github.com/johndoe",
  "linkedinLink": "https://linkedin.com/in/johndoe",
  "resumeLink": "https://example.com/resume.pdf",
  "portfolioLink": "https://johndoe.dev",
  "skills": ["JavaScript", "React", "Node.js"],
  "shortBio": "Passionate developer...",
  "imageUrl": "https://example.com/image.jpg",
  "department": "Technical",
  "role": "Full Stack Developer"
}
```

### Response
```json
{
  "success": true,
  "message": "Team member registered successfully",
  "data": {
    "id": "64f...",
    "name": "John Doe",
    "email": "john.doe@example.com",
    "department": "Technical",
    "role": "Full Stack Developer"
  }
}
```

## Data Model

### TeamMember Schema
- `name`: String (required, 2-100 chars)
- `regNumber`: String (required, unique, max 20 chars)
- `email`: String (required, unique, valid email)
- `contactNumber`: String (required, valid phone)
- `githubLink`: String (optional, valid URL)
- `linkedinLink`: String (optional, valid URL)
- `resumeLink`: String (optional, valid URL)
- `portfolioLink`: String (optional, valid URL)
- `skills`: Array of Strings
- `shortBio`: String (max 500 chars)
- `imagePath`: String (required, Cloudinary URL)
- `department`: String (enum: Admin, Technical, Events, Outreach, Design, Content)
- `role`: String (required, max 100 chars)
- `createdAt`: Date
- `updatedAt`: Date

## Query Parameters

### GET /api/team-members
- `department`: Filter by department
- `page`: Page number (default: 1)
- `limit`: Items per page (default: 10)

Example: `/api/team-members?department=Technical&page=1&limit=5`

## Error Handling

The API returns consistent error responses:

```json
{
  "success": false,
  "message": "Error description",
  "errors": [
    {
      "field": "email",
      "message": "Please provide a valid email"
    }
  ]
}
```

## Development

### Running Tests
```bash
npm test
```

### Code Structure
```
backend/
├── models/          # Database models
├── routes/          # API routes
├── middleware/      # Custom middleware
├── uploads/         # File uploads directory
├── server.js        # Main server file
├── package.json     # Dependencies
├── .env.example     # Environment template
└── README.md        # This file
```

## Image Handling

Images uploaded through the registration form are stored on Cloudinary for scalable deployment. The `imagePath` field in the database contains the full Cloudinary URL, which can be directly used in the frontend to display images.

### Setup Cloudinary

1. Create a Cloudinary account at [cloudinary.com](https://cloudinary.com)
2. Get your Cloud Name, API Key, and API Secret
3. Add them to your `.env` file:
   ```
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret
   ```
4. Images are automatically resized to 300x300 pixels and optimized for web delivery

### Accessing Images

In the frontend, use the `imagePath` directly as the `src` attribute for `<img>` tags:

```jsx
<img src={member.imagePath} alt={member.name} />
```

## Deployment

1. Set `NODE_ENV=production` in environment variables
2. Use a process manager like PM2
3. Set up MongoDB database (MongoDB Atlas recommended)
4. Configure Cloudinary for image storage
5. Configure reverse proxy (nginx) for production

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

MIT License - see LICENSE file for details
