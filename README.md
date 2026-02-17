# AI Resume Analyzer

<p align="center">
  <img src="Resume-Analyzer-Frontend/public/favicon.png" alt="AI Resume Analyzer Logo" width="100" />
</p>

A full-stack web application that leverages AI to help users analyze their resumes, extract skills, match job postings and prepare for interviews. Built with React, Express.js, MySQL, and Socket.io, it provides a user-friendly interface and integrated with multiple AI APIs.

<p align="center">
  <img src="https://img.shields.io/badge/React-19-blue" />
  <img src="https://img.shields.io/badge/Express.js-Backend-green" />
  <img src="https://img.shields.io/badge/MySQL-Database-orange" />
  <img src="https://img.shields.io/badge/TailwindCSS-Framework-38bdf8" />
  <img src="https://img.shields.io/badge/Node.js-Backend-3c873a" />
  <img src="https://img.shields.io/badge/Redux%20Toolkit-State%20Management-764abc" />
</p>

## 🔗 Live Demo  
https://ai-resume-analyzer-frontend-tt59.onrender.com/

(Note: Signup/login may take a moment due to server cold starts.)

## 🎥 Video Demo

https://github.com/user-attachments/assets/82befca3-8842-467d-a82e-d8f04cdb6d3e

## 🌟 Features

### Resume Management
- **Upload & Store Resumes**: Upload PDF/document resumes and store them securely
- **Resume History**: View and manage all previously uploaded resumes
- **Download Resumes**: Download saved resumes for reference
- **Delete Resumes**: Remove resumes from your profile

### AI-Powered Analysis
- **Skill Extraction**: Automatically extract and analyze skills from your resume using AI
- **Job Matching**: Get AI-powered job recommendations based on your resume
- **Real Job Matching**: Match your profile against real job postings from various sources
- **Resume Statistics**: Track analysis metrics and insights about your resume

### Interview Preparation
- **AI Interview Questions**: Get job-specific interview questions based on job title
- **Detailed Responses**: Receive AI-powered detailed answers to interview questions
- **Multiple Job Roles**: Support for various job titles (Backend, Frontend, React, DevOps, Data Scientist etc.)
- **Interactive Interface**: Explore different interview scenarios

### User Management
- **Authentication**: Secure signup and login with JWT tokens
- **Profile Management**: Update your first name and last name
- **Password Management**: Change your password securely
- **Account Settings**: Manage theme preferences (dark/light mode)
- **Account Deletion**: Option to delete your account and all associated data

### Additional Features
- **Dark/Light Theme**: Toggle between dark and light mode
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Real-time Communication**: Socket.io integration for live updates
- **Inline AI Helper**: Quick AI assistance within the application

## 🛠️ Tech Stack

### Frontend
- **React 19** - UI library
- **Vite** - Build tool and dev server
- **Redux** - State management
- **Tailwind CSS** - Utility-first CSS framework
- **Material-UI** - Component library
- **React Router** - Client-side routing
- **Socket.io Client** - Real-time communication

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MySQL** - Database
- **Socket.io** - WebSocket library
- **Multer** - File upload middleware
- **JWT** - Authentication tokens
- **Bcryptjs** - Password hashing

### AI & APIs
- **Groq SDK** - Alternative AI processing
- **RapidAPI** - Job posting data (external API integration)

## 📋 Project Structure

```
AI-Resume-Analyzer/
├── Resume-Analyzer-Backend/
│   ├── app.js                 # Express server entry point
│   ├── package.json           # Backend dependencies
│   ├── .env                   # Environment variables
│   ├── config/                # Configuration files
│   │   ├── db.js              # Database configuration
│   │   ├── jobService.js      # Job matching service
│   │   ├── jobTitleDetector.js # Job title detection
│   │   └── ...
│   ├── controllers/           # Route controllers
│   │   ├── appController.js   # Main app logic
│   │   └── authController.js  # Authentication logic
│   ├── models/                # Database models
│   │   ├── users/
│   │   ├── resumes/
│   │   ├── skills/
│   │   ├── matchedJobs/
│   │   └── interviewQuestions/
│   ├── routers/               # API routes
│   └── uploads/               # User uploaded files
│
└── Resume-Analyzer-Frontend/
    ├── src/
    │   ├── App.jsx            # Root component
    │   ├── main.jsx           # Entry point
    │   ├── components/        # React components
    │   │   ├── Application.jsx
    │   │   ├── Dashboard.jsx
    │   │   ├── JobMatcher.jsx
    │   │   ├── InterviewPrep.jsx
    │   │   └── ...
    │   ├── services/          # API services
    │   │   └── appServices.js
    │   └── store/             # Redux store
    │       ├── authSlice.js
    │       ├── resumeSlice.js
    │       └── ...
    ├── vite.config.js
    ├── tailwind.config.js
    └── package.json
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- MySQL or MongoDB database
- API Keys for:
  - Groq API
  - RapidAPI (optional, for job postings)

### Backend Setup

1. **Navigate to the backend directory**
   ```bash
   cd Resume-Analyzer-Backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   Create a `.env` file in the backend root with:
   ```env
   JWT_SECRET=your_jwt_secret_key
   GROQ_API_KEY=your_groq_api_key
   GROQ_API_KEY_CHATBOT=your_groq_chatbot_api_key
   RAPIDAPI_KEY=your_rapidapi_key
   
   DB_HOST=your_db_host
   DB_PORT=your_db_port
   DB_USER=your_db_user
   DB_PASSWORD=your_db_password
   DB_NAME=resume_analyzer
   
   USE_FAKE_JOBS=true          # Set to true for testing phase 
   PORT=5000
   ```

4. **Start the server**
   ```bash
   npm start
   ```
   The backend will run on `http://localhost:5000`

### Frontend Setup

1. **Navigate to the frontend directory**
   ```bash
   cd Resume-Analyzer-Frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   Create a `.env.production` file with:
   ```env
   VITE_API_BASE_URL=http://localhost:5000
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```
   The frontend will run on `http://localhost:5173`

5. **Build for production**
   ```bash
   npm run build
   ```

## 📡 API Endpoints

### Authentication
- `POST /signup-submit` - User registration
- `POST /login-submit` - User login

### Resume Management
- `POST /api/resume/upload` - Upload a resume
- `GET /api/resume/my-resumes/:userId` - Get user's resumes
- `GET /api/resume/download/:resumeId/:userId` - Download resume
- `DELETE /api/resume/delete/:resumeId` - Delete resume

### Analysis
- `POST /api/analyze/extract-skills` - Extract skills from resume
- `POST /api/analyze/match-job` - Match resume against job postings
- `POST /api/jobs/match-real` - Match against real job postings
- `POST /api/stats/update` - Update user statistics

### User Profile
- `GET /api/user/name/:userId` - Get full name
- `GET /api/user/email/:userId` - Get email
- `POST /api/user/profile/update` - Update profile information
- `POST /api/user/password` - Change password
- `DELETE /api/user/delete/:userId` - Delete account

### Interview Preparation
- `GET /api/questions/:jobTitle` - Get interview questions for job title
- `POST /api/ai-response` - Get AI response to interview questions

### User Preferences
- `POST /api/user/theme` - Set theme preference
- `GET /api/user/theme` - Get theme preference

## 🔐 Authentication

The application uses JWT (JSON Web Tokens) for authentication:
- Tokens are stored in localStorage
- All protected routes require a valid JWT token
- Tokens are sent in request headers for API calls

## 🎨 UI Components

### Key Components
- **Header** - Navigation and user menu
- **Sidebar** - Navigation panel
- **Dashboard** - Main user dashboard with statistics
- **Application** - Resume management interface
- **JobMatcher** - Job matching and recommendations
- **InterviewPrep** - Interview preparation module
- **Setting** - User settings and preferences
- **Home** - Landing page

## 🔄 State Management

Redux store manages:
- **Auth State** - User authentication and login status
- **Resume State** - Uploaded resumes and resume data
- **Interview Questions** - Cached interview questions
- **Job Matched** - Matched job listings
- **Theme State** - Dark/light mode preference

## 🌐 Real-time Features

Socket.io is configured for:
- Real-time updates between client and server
- Live notifications and alerts
- Two-way communication for interactive features

## 📝 Database Schema

The application uses MySQL with tables for:
- **Users** - User accounts and authentication
- **Resumes** - User uploaded resumes
- **Skills** - Extracted skills from resumes
- **Matched Jobs** - Job matching results
- **Interview Questions** - Pre-cached interview questions by job title

## 🚨 Error Handling

- JWT token validation on protected routes
- Input validation using express-validator
- Comprehensive error messages in API responses
- CORS configuration for security

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the ISC License.

## 📧 Support

For issues, questions, or suggestions, please create an issue in the repository.

## 🔮 Future Enhancements

- Integration with more job boards
- Enhanced resume parsing with OCR
- Interview video recording and playback
- Resume templates and builders
- Advanced analytics and insights
- Email notifications
- Social sharing features

---

**Built with ❤️ using React, Express, and AI**
