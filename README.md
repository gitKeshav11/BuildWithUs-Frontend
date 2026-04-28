# Build With Us — Full Stack Developer Collaboration Platform

<p align="center">
  <b>Developer Social Network • Projects • Jobs • Hackathons • Team Finder • AI Chat • AI Code Review</b>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Frontend-React%2019-61DAFB?style=for-the-badge&logo=react" />
  <img src="https://img.shields.io/badge/Vite-7.3.1-646CFF?style=for-the-badge&logo=vite" />
  <img src="https://img.shields.io/badge/Backend-Spring%20Boot%203.2.1-6DB33F?style=for-the-badge&logo=springboot" />
  <img src="https://img.shields.io/badge/Java-17-orange?style=for-the-badge&logo=openjdk" />
  <img src="https://img.shields.io/badge/MySQL-8.0-blue?style=for-the-badge&logo=mysql" />
  <img src="https://img.shields.io/badge/Docker-Ready-2496ED?style=for-the-badge&logo=docker" />
</p>

---

## 📌 Project Overview

**Build With Us** is a full-stack platform for developers where users can create profiles, discover other developers, post projects, request collaborators, browse jobs, join hackathons, find teams, use AI chat, and run AI code reviews.

The project contains two applications:

| Part | Folder | Description |
|---|---|---|
| Backend | `BuildWithUs-Backend-main/` | Spring Boot REST API with JWT, OAuth2, MySQL, Redis, Flyway, Cloudinary and Groq AI integration |
| Frontend | `BuildWithUs-Frontend-main/` | React + Vite + TypeScript frontend with public pages, auth pages, dashboard, admin dashboard and AI tools |

---

## 🖼️ Frontend Screenshots

Create the folder below in the frontend repo and place screenshots with these exact names:

```text
BuildWithUs-Frontend-main/docs/screenshots/
├── home-page.png
├── sign-in-page.png
├── developers-page.png
├── projects-page.png
├── jobs-page.png
├── dashboard-page.png
├── ai-chat-page.png
└── ai-code-review-page.png
```

Then this README will show them automatically:

### Home Page
![Home Page](docs/screenshots/home-page.png)

### Sign In Page
![Sign In Page](docs/screenshots/sign-in-page.png)

### Developers Page
![Developers Page](docs/screenshots/developers-page.png)

### Projects Page
![Projects Page](docs/screenshots/projects-page.png)

### Jobs Page
![Jobs Page](docs/screenshots/jobs-page.png)

### Dashboard Page
![Dashboard Page](docs/screenshots/dashboard-page.png)

### AI Chat Page
![AI Chat Page](docs/screenshots/ai-chat-page.png)

### AI Code Review Page
![AI Code Review Page](docs/screenshots/ai-code-review-page.png)

> Recommended screenshot size: `1440 × 900` or `1366 × 768`.

---

## ✨ Main Features

### Backend Features

- User registration and login
- JWT access token and refresh token flow
- OAuth2 login support for Google, GitHub and LinkedIn
- Email verification
- Forgot password and reset password
- Role-based access control
- Admin dashboard APIs
- Developer profile CRUD
- Profile photo and cover image uploads
- Follow/unfollow users
- Job posting, filtering, saving and click tracking
- Project posting, filtering, image upload and collaboration requests
- Hackathon posting and team finder system
- Verification request and admin review flow
- Leaderboard and badge APIs
- Notification APIs
- AI chat conversations
- AI code review requests
- Cloudinary image upload
- Swagger/OpenAPI documentation
- Flyway database migrations
- Docker and Docker Compose support

### Frontend Features

- Modern dark theme landing page
- Responsive navbar and footer
- Public pages for developers, projects, jobs, hackathons, team finder and leaderboard
- Sign in, sign up and forgot password pages
- OAuth callback handler
- Protected dashboard routes
- Dashboard quick actions and profile completion UI
- Profile edit page
- Project creation page
- AI chat page
- AI code review page
- Notifications page
- Verification request page
- Settings page
- Admin dashboard routes
- Axios API integration layer
- Zustand auth store
- React Query setup
- Reusable UI components

---

## 🧱 Tech Stack

### Frontend

| Category | Technology |
|---|---|
| Framework | React 19 |
| Build Tool | Vite 7 |
| Language | TypeScript |
| Routing | React Router DOM 7 |
| State Management | Zustand |
| API State | TanStack React Query |
| HTTP Client | Axios |
| Forms | React Hook Form |
| Validation | Zod |
| UI/Animation | Tailwind CSS 4, Framer Motion, GSAP |
| Icons | Lucide React |
| Charts | Recharts |
| 3D | Three.js, React Three Fiber, Drei |
| Toasts | Sonner |

### Backend

| Category | Technology |
|---|---|
| Language | Java 17 |
| Framework | Spring Boot 3.2.1 |
| Security | Spring Security, JWT, OAuth2 Client |
| Database | MySQL 8 |
| ORM | Spring Data JPA / Hibernate |
| Migration | Flyway |
| Cache/Session | Redis, Spring Session Data Redis |
| API Docs | Springdoc OpenAPI / Swagger UI |
| Mail | Spring Boot Mail |
| Uploads | Cloudinary |
| AI | Groq API through WebClient |
| Build Tool | Maven |
| Containerization | Docker, Docker Compose |
| Utilities | Lombok, MapStruct |

---

## 🗂️ Full Project Folder Structure

```text
BuildWithUs/
├── BuildWithUs-Backend-main/
│   ├── .env.example
│   ├── Dockerfile
│   ├── docker-compose.yml
│   ├── pom.xml
│   └── src/
│       └── main/
│           ├── java/com/buildwithus/
│           │   ├── BuildWithUsApplication.java
│           │   ├── admin/
│           │   ├── ai/
│           │   ├── auth/
│           │   ├── common/
│           │   ├── config/
│           │   ├── exception/
│           │   ├── follow/
│           │   ├── hackathon/
│           │   ├── job/
│           │   ├── leaderboard/
│           │   ├── notification/
│           │   ├── profile/
│           │   ├── project/
│           │   ├── security/
│           │   ├── upload/
│           │   ├── user/
│           │   └── verification/
│           └── resources/
│               ├── application.yml
│               ├── application-docker.yml
│               └── db/migration/
│                   ├── V1__initial_schema.sql
│                   ├── V2__jobs_schema.sql
│                   ├── V3__projects_schema.sql
│                   ├── V4__ai_schema.sql
│                   ├── V5__verification_hackathon_schema.sql
│                   └── V6__leaderboard_notification_schema.sql
│
└── BuildWithUs-Frontend-main/
    ├── .env
    ├── index.html
    ├── package.json
    ├── vite.config.ts
    ├── tsconfig.json
    └── src/
        ├── App.tsx
        ├── main.tsx
        ├── components/
        │   ├── 3d/
        │   ├── home/
        │   ├── layout/
        │   └── ui/
        ├── hooks/
        ├── lib/
        ├── pages/
        │   ├── admin/
        │   ├── auth/
        │   ├── dashboard/
        │   ├── DashboardPage.tsx
        │   ├── DevelopersPage.tsx
        │   ├── DeveloperProfilePage.tsx
        │   ├── HackathonsPage.tsx
        │   ├── HomePage.tsx
        │   ├── JobsPage.tsx
        │   ├── LeaderboardPage.tsx
        │   ├── OAuthCallbackPage.tsx
        │   ├── ProjectsPage.tsx
        │   └── TeamFinderPage.tsx
        ├── services/
        ├── store/
        └── types/
```

---

## 🔐 Environment Variables

### Backend `.env.example`

Create `.env` inside `BuildWithUs-Backend-main/`:

```env
SPRING_PROFILES_ACTIVE=dev

# Database
DB_HOST=localhost
DB_PORT=3306
DB_NAME=buildwithus
DB_USERNAME=root
DB_PASSWORD=your_mysql_password

# JWT
JWT_SECRET=change-this-secret-with-a-long-random-value
JWT_EXPIRATION=86400000
JWT_REFRESH_EXPIRATION=604800000

# Frontend URL
APP_FRONTEND_URL=http://localhost:5173

# Redis
SPRING_DATA_REDIS_ENABLED=false
SPRING_DATA_REDIS_HOST=localhost
SPRING_DATA_REDIS_PORT=6379

# OAuth2 - optional
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
GITHUB_CLIENT_ID=
GITHUB_CLIENT_SECRET=
LINKEDIN_CLIENT_ID=
LINKEDIN_CLIENT_SECRET=

# Cloudinary - optional
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=

# Groq AI - optional
GROQ_API_KEY=
GROQ_MODEL=llama-3.1-8b-instant

# Mail - optional
MAIL_HOST=smtp.gmail.com
MAIL_PORT=587
MAIL_USERNAME=
MAIL_PASSWORD=
```

### Frontend `.env`

Create `.env` inside `BuildWithUs-Frontend-main/`:

```env
VITE_API_BASE_URL=http://localhost:8080/api/v1
VITE_BACKEND_BASE_URL=http://localhost:8080
VITE_OAUTH_CALLBACK_URL=http://localhost:5173/oauth2/redirect
VITE_GA_TRACKING_ID=
VITE_CLOUDINARY_CLOUD_NAME=
VITE_CLOUDINARY_UPLOAD_PRESET=
```

---

## ⚙️ Backend Setup — Without Docker

### 1. Requirements

- Java 17+
- Maven 3.8+
- MySQL 8+
- Redis optional

### 2. Create Database

```sql
CREATE DATABASE buildwithus;
```

### 3. Configure Backend

```bash
cd BuildWithUs-Backend-main
cp .env.example .env
```

Update database username/password in `.env` or `application.yml`.

### 4. Run Backend

```bash
./mvnw spring-boot:run
```

On Windows PowerShell:

```powershell
.\mvnw.cmd spring-boot:run
```

Backend runs at:

```text
http://localhost:8080
```

Swagger UI:

```text
http://localhost:8080/swagger-ui/index.html
```

---

## 🐳 Backend Setup — With Docker Compose

From backend folder:

```bash
cd BuildWithUs-Backend-main
cp .env.example .env
docker compose up --build
```

This starts:

| Service | Port |
|---|---|
| Backend API | `8080` |
| MySQL | `3307:3306` |
| Redis | `6379` |

Useful Docker commands:

```bash
docker compose up --build

docker compose up -d

docker compose logs -f app

docker compose down

docker compose down -v
```

---

## 🎨 Frontend Setup

### 1. Requirements

- Node.js 20+
- npm 10+

### 2. Install Dependencies

```bash
cd BuildWithUs-Frontend-main
npm install
```

### 3. Configure Environment

Create or update `.env`:

```env
VITE_API_BASE_URL=http://localhost:8080/api/v1
VITE_BACKEND_BASE_URL=http://localhost:8080
VITE_OAUTH_CALLBACK_URL=http://localhost:5173/oauth2/redirect
```

### 4. Run Frontend

```bash
npm run dev
```

Frontend runs at:

```text
http://localhost:5173
```

### 5. Production Build

```bash
npm run build
npm run preview
```

---

## 🚀 Full Stack Run Order

Follow this order for smooth setup:

```bash
# 1. Start backend dependencies + backend
cd BuildWithUs-Backend-main
docker compose up --build

# 2. Start frontend in another terminal
cd BuildWithUs-Frontend-main
npm install
npm run dev
```

Open:

```text
Frontend: http://localhost:5173
Backend:  http://localhost:8080
Swagger:  http://localhost:8080/swagger-ui/index.html
```

---

## 🧭 Frontend Routes

### Public Routes

| Route | Page |
|---|---|
| `/` | Home page |
| `/developers` | Developer directory |
| `/developers/:username` | Developer profile |
| `/projects` | Projects listing |
| `/jobs` | Jobs listing |
| `/hackathons` | Hackathons listing |
| `/team-finder` | Team finder posts |
| `/leaderboard` | Leaderboard |

### Auth Routes

| Route | Page |
|---|---|
| `/auth/sign-in` | Sign in |
| `/auth/sign-up` | Sign up |
| `/auth/forgot-password` | Forgot password |
| `/oauth2/redirect` | OAuth callback handler |

### Protected Dashboard Routes

| Route | Page |
|---|---|
| `/dashboard` | User dashboard |
| `/dashboard/profile` | Logged-in profile |
| `/dashboard/profile/edit` | Edit profile |
| `/dashboard/projects` | Dashboard projects |
| `/dashboard/projects/create` | Create project |
| `/dashboard/jobs/saved` | Saved jobs |
| `/dashboard/code-review` | AI code review |
| `/dashboard/ai-chat` | AI chat |
| `/dashboard/verification` | Verification request |
| `/dashboard/hackathons` | Dashboard hackathons |
| `/dashboard/team-posts` | Team posts |
| `/dashboard/notifications` | Notifications |
| `/dashboard/settings` | Settings |
| `/dashboard/following` | Following |
| `/dashboard/followers` | Followers |
| `/dashboard/collaborations` | Collaborations |

### Admin Routes

| Route | Page |
|---|---|
| `/admin` | Admin dashboard |
| `/admin/users` | Admin users |
| `/admin/jobs` | Admin jobs |
| `/admin/verifications` | Admin verification review |
| `/admin/projects` | Admin projects |
| `/admin/hackathons` | Admin hackathons |

---

## 🔌 Backend API Endpoint Map

Base URL:

```text
http://localhost:8080/api/v1
```

### Auth APIs

| Method | Endpoint | Purpose |
|---|---|---|
| POST | `/auth/register` | Register new user |
| POST | `/auth/login` | Login user |
| POST | `/auth/refresh` | Refresh access token |
| POST | `/auth/logout` | Logout user |
| POST | `/auth/forgot-password` | Send reset link/token |
| POST | `/auth/reset-password` | Reset password |
| GET | `/auth/verify` | Verify email |

### User/Profile APIs

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/users/me` | Current user |
| GET | `/users` | List users |
| GET | `/users/search` | Search users |
| POST | `/users/{userId}/block` | Block user |
| POST | `/users/{userId}/unblock` | Unblock user |
| DELETE | `/users/{userId}` | Delete user |
| GET | `/profiles/me` | Current profile |
| PUT | `/profiles/me` | Update profile |
| GET | `/profiles/{username}` | Public profile |
| GET | `/profiles` | List profiles |
| GET | `/profiles/search` | Search profiles |
| GET | `/profiles/filter` | Filter profiles |
| GET | `/profiles/verified` | Verified profiles |
| POST | `/profiles/me/photo` | Upload profile photo |
| POST | `/profiles/me/cover` | Upload cover photo |
| DELETE | `/profiles/me/photo` | Delete profile photo |
| DELETE | `/profiles/me/cover` | Delete cover photo |

### Follow APIs

| Method | Endpoint | Purpose |
|---|---|---|
| POST | `/follow/{userId}` | Follow user |
| DELETE | `/follow/{userId}` | Unfollow user |
| GET | `/follow/followers/{userId}` | Get followers |
| GET | `/follow/following/{userId}` | Get following |
| GET | `/follow/{userId}/stats` | Follow stats |
| GET | `/follow/{userId}/check` | Check follow status |

### Project APIs

| Method | Endpoint | Purpose |
|---|---|---|
| POST | `/projects` | Create project |
| PUT | `/projects/{projectId}` | Update project |
| DELETE | `/projects/{projectId}` | Delete project |
| GET | `/projects/{projectId}` | Project by id |
| GET | `/projects/slug/{slug}` | Project by slug |
| GET | `/projects` | List projects |
| GET | `/projects/search` | Search projects |
| GET | `/projects/filter` | Filter projects |
| GET | `/projects/my-projects` | My projects |
| GET | `/projects/open-collaboration` | Open collaboration projects |
| GET | `/projects/collaborating` | Projects where user collaborates |
| POST | `/projects/{projectId}/collaborate` | Send collaboration request |
| POST | `/projects/collaboration-requests/{requestId}/respond` | Accept/reject collaboration request |
| GET | `/projects/my-collaboration-requests` | My sent requests |
| GET | `/projects/requests-for-my-projects` | Requests for my projects |
| GET | `/projects/{projectId}/requests` | Project requests |
| GET | `/projects/{projectId}/collaborators` | Project collaborators |
| DELETE | `/projects/{projectId}/collaborators/{collaboratorId}` | Remove collaborator |
| POST | `/projects/{projectId}/images` | Upload project image |
| DELETE | `/projects/{projectId}/images/{imageId}` | Delete project image |

### Job APIs

| Method | Endpoint | Purpose |
|---|---|---|
| POST | `/jobs` | Create job |
| PUT | `/jobs/{jobId}` | Update job |
| DELETE | `/jobs/{jobId}` | Delete job |
| GET | `/jobs/{jobId}` | Job by id |
| GET | `/jobs` | List jobs |
| GET | `/jobs/search` | Search jobs |
| GET | `/jobs/filter` | Filter jobs |
| GET | `/jobs/featured` | Featured jobs |
| GET | `/jobs/my-posts` | My job posts |
| POST | `/jobs/{jobId}/save` | Save job |
| DELETE | `/jobs/{jobId}/save` | Unsave job |
| GET | `/jobs/saved` | Saved jobs |
| POST | `/jobs/{jobId}/click` | Track job click |

### Hackathon & Team Finder APIs

| Method | Endpoint | Purpose |
|---|---|---|
| POST | `/hackathons` | Create hackathon |
| PUT | `/hackathons/{hackathonId}` | Update hackathon |
| DELETE | `/hackathons/{hackathonId}` | Delete hackathon |
| GET | `/hackathons/{hackathonId}` | Hackathon by id |
| GET | `/hackathons` | List hackathons |
| GET | `/hackathons/search` | Search hackathons |
| POST | `/hackathons/team-finder` | Create team finder post |
| GET | `/hackathons/team-finder` | List team finder posts |
| GET | `/hackathons/team-finder/type/{type}` | Team finder by type |
| GET | `/hackathons/team-finder/my-posts` | My team posts |
| GET | `/hackathons/{hackathonId}/team-finder` | Team posts by hackathon |
| POST | `/hackathons/team-finder/{postId}/join` | Send join request |
| POST | `/hackathons/team-finder/join-requests/{requestId}/respond` | Accept/reject join request |
| GET | `/hackathons/team-finder/my-join-requests` | My join requests |
| GET | `/hackathons/team-finder/requests-for-my-posts` | Requests for my posts |

### AI APIs

| Method | Endpoint | Purpose |
|---|---|---|
| POST | `/ai/chat/conversations` | Create chat conversation |
| POST | `/ai/chat/conversations/{conversationId}/messages` | Send message |
| GET | `/ai/chat/conversations/{conversationId}` | Conversation details |
| GET | `/ai/chat/conversations` | Conversation list |
| DELETE | `/ai/chat/conversations/{conversationId}` | Delete conversation |
| POST | `/ai/code-review` | Submit code review |
| GET | `/ai/code-review/{reviewId}` | Review by id |
| GET | `/ai/code-review` | Review history |
| DELETE | `/ai/code-review/{reviewId}` | Delete review |

### Admin, Verification, Leaderboard, Notification, Upload APIs

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/admin/stats` | Admin dashboard stats |
| POST | `/verification/request` | Request verification |
| GET | `/verification/status` | Verification status |
| GET | `/verification/pending` | Pending verification requests |
| POST | `/verification/{requestId}/review` | Review verification request |
| GET | `/leaderboard` | Leaderboard list |
| GET | `/leaderboard/me` | Current user's leaderboard entry |
| GET | `/leaderboard/user/{userId}` | User leaderboard entry |
| GET | `/leaderboard/user/{userId}/badges` | User badges |
| GET | `/leaderboard/me/badges` | Current user's badges |
| GET | `/notifications` | Notification list |
| GET | `/notifications/unread-count` | Unread count |
| POST | `/notifications/{notificationId}/read` | Mark one read |
| POST | `/notifications/read-all` | Mark all read |
| DELETE | `/notifications/{notificationId}` | Delete notification |
| POST | `/uploads/image` | Upload image |

---

## 🔄 Authentication Flow

1. User submits email/password from frontend.
2. Frontend calls `POST /api/v1/auth/login`.
3. Backend validates credentials.
4. Backend returns access token, refresh token and user object.
5. Frontend stores values in localStorage:

```text
bwu_access_token
bwu_refresh_token
bwu_user
```

6. Axios interceptor attaches token:

```http
Authorization: Bearer <access_token>
```

7. Protected React routes check localStorage token and user.
8. Backend JWT filter validates token on protected API calls.

---

## 🌐 OAuth2 Flow

Frontend OAuth callback route:

```text
/oauth2/redirect
```

Backend OAuth success should redirect to frontend like:

```text
http://localhost:5173/oauth2/redirect?token=<accessToken>&refreshToken=<refreshToken>
```

Backend OAuth failure should redirect like:

```text
http://localhost:5173/auth/sign-in?error=<message>
```

OAuth providers used in backend:

- Google
- GitHub
- LinkedIn

---

## 🧪 Useful Test Commands

### Backend Health Check

```bash
curl http://localhost:8080/swagger-ui/index.html
```

### Register User

```bash
curl -X POST http://localhost:8080/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Keshav Upadhyay",
    "username": "keshav",
    "email": "keshav@example.com",
    "password": "Password@123"
  }'
```

### Login User

```bash
curl -X POST http://localhost:8080/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "keshav@example.com",
    "password": "Password@123"
  }'
```

### Get Current User

```bash
curl http://localhost:8080/api/v1/users/me \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"
```

---

## 📸 How To Add Real Frontend Screenshots

Run frontend:

```bash
cd BuildWithUs-Frontend-main
npm install
npm run dev
```

Open these pages and capture screenshots:

```text
http://localhost:5173/
http://localhost:5173/auth/sign-in
http://localhost:5173/developers
http://localhost:5173/projects
http://localhost:5173/jobs
http://localhost:5173/dashboard
http://localhost:5173/dashboard/ai-chat
http://localhost:5173/dashboard/code-review
```

Save screenshots here:

```text
BuildWithUs-Frontend-main/docs/screenshots/
```

Use the exact names mentioned in the screenshot section.

---

## 🧯 Troubleshooting

### Backend is not connecting to MySQL

Check:

- MySQL service is running
- Database exists
- `DB_HOST`, `DB_PORT`, `DB_NAME`, `DB_USERNAME`, `DB_PASSWORD` are correct
- Docker uses internal service name like `mysql`, not `localhost`, inside compose network

### Frontend API calls are failing

Check `.env`:

```env
VITE_API_BASE_URL=http://localhost:8080/api/v1
```

Then restart Vite:

```bash
npm run dev
```

### OAuth redirects to wrong URL

Check:

```env
APP_FRONTEND_URL=http://localhost:5173
VITE_OAUTH_CALLBACK_URL=http://localhost:5173/oauth2/redirect
```

Also verify provider redirect URLs in Google/GitHub/LinkedIn developer console.

### CORS issue

Allow frontend origin in backend security/CORS configuration:

```text
http://localhost:5173
```

### Flyway migration error

For local development only, if database is broken:

```sql
DROP DATABASE buildwithus;
CREATE DATABASE buildwithus;
```

Then restart backend so Flyway can recreate tables.

### Docker compose warning: version is obsolete

Remove the top-level `version:` key from `docker-compose.yml` if Docker shows this warning.

---

## ✅ Recommended Development Workflow

```bash
# 1. Clone repository
git clone <repo-url>

# 2. Start backend
cd BuildWithUs-Backend-main
docker compose up --build

# 3. Start frontend
cd ../BuildWithUs-Frontend-main
npm install
npm run dev

# 4. Open app
http://localhost:5173
```

---

## 🤝 Contribution Guide

1. Fork the repository
2. Create a feature branch

```bash
git checkout -b feature/your-feature-name
```

3. Make changes
4. Commit changes

```bash
git add .
git commit -m "feat: add your feature"
```

5. Push branch

```bash
git push origin feature/your-feature-name
```

6. Open a pull request

---

## 👨‍💻 Author

**Keshav Upadhyay**  
Aspiring Software Developer | Backend Enthusiast

---

## 📄 License

This project can be released under the MIT License. Add a `LICENSE` file if you want to officially publish it as open-source.
