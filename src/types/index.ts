// Auth / Common Types
export interface Skill {
  id: number;
  name: string;
}

export interface TechStackItem {
  id: number;
  name: string;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  category: 'ACHIEVEMENT' | 'SKILL' | 'CONTRIBUTION' | 'SPECIAL';
  earnedAt?: string;
}

export interface User {
  id: string;
  username: string;
  email: string;
  fullName: string;

  // Backend-compatible auth fields
  roles?: string[];
  role?: 'USER' | 'ADMIN';
  authProvider?: string;
  emailVerified?: boolean;
  isActive?: boolean;
  lastLoginAt?: string;

  // Profile / optional frontend fields
  profilePhotoUrl?: string;
  coverPhotoUrl?: string;
  bio?: string;
  headline?: string;
  skills?: Skill[] | string[];
  techStacks?: TechStackItem[] | string[];
  techStack?: string[];
  githubUrl?: string;
  linkedinUrl?: string;
  portfolioUrl?: string;
  twitterUrl?: string;
  location?: string;
  website?: string;

  // Optional UI-only or enriched fields
  isVerified?: boolean;
  verificationStatus?: 'NONE' | 'PENDING' | 'APPROVED' | 'REJECTED';
  availabilityStatus?: 'AVAILABLE' | 'BUSY' | 'OPEN_TO_OPPORTUNITIES';
  isAvailable?: boolean;
  followersCount?: number;
  followingCount?: number;
  projectsCount?: number;
  leaderboardScore?: number;
  badges?: Badge[];

  createdAt?: string;
  updatedAt?: string;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
  tokenType?: string;
  expiresIn?: number;
  user?: User;
}

export interface SignInRequest {
  email: string;
  password: string;
}

export interface SignUpRequest {
  fullName: string;
  username: string;
  email: string;
  password: string;
}

// Profile Types
export interface Profile extends User {
  isFollowing?: boolean;
}

// Project Types
export interface Project {
  id: string;
  title: string;
  shortDescription: string;
  detailedDescription?: string;
  techStack: string[];
  githubUrl?: string;
  githubRepoUrl?: string;
  liveUrl?: string;
  liveDemoUrl?: string;
  documentationUrl?: string;
  websiteUrl?: string;
  images?: string[];
  collaborationStatus?: string;
  collaborators?: User[];
  collaboratorsNeeded?: number;
  rolesNeeded?: string[];
  ownerId?: string;
  ownerUsername?: string;
  ownerFullName?: string;
  ownerName?: string;
  ownerProfilePhotoUrl?: string;
  projectStage?: string;
  category?: string;
  tags?: string[];
  likesCount: number;
  viewsCount: number;
  createdAt: string;
  updatedAt: string;
}

// Job Types
export interface Job {
  id: string;
  title: string;
  companyName: string;
  companyLogoUrl?: string;
  location: string;
  jobType: 'FULL_TIME' | 'PART_TIME' | 'CONTRACT' | 'INTERNSHIP' | 'FREELANCE';
  workMode: 'REMOTE' | 'HYBRID' | 'ONSITE';
  description: string;
  requirements: string[] | string;
  skills: string[];
  salaryRange?: string;
  applyLink: string;
  lastDate?: string;
  createdAt: string;
  updatedAt?: string;
  isSaved?: boolean;
}

// Hackathon Types
export interface Hackathon {
  id: string;
  title: string;
  description: string;
  organizer: string;
  prizeInfo: string;
  eventDate: string;
  endDate?: string;
  registrationDeadline?: string;
  registrationLink: string;
  tags?: string[];
  isOnline?: boolean;
  participantsCount?: number;
  thumbnailUrl?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface TeamPost {
  id: string;
  title: string;
  message?: string;
  description?: string;
  hackathon?: Hackathon;
  rolesNeeded?: string[];
  skills?: string[];
  skillsRequired?: string[];
  teamSize?: number;
  currentSize?: number;
  postType?: 'LOOKING_FOR_TEAM' | 'LOOKING_FOR_MEMBERS';
  type?: 'LOOKING_FOR_TEAM' | 'LOOKING_FOR_MEMBERS';
  owner?: User;
  ownerId?: string;
  ownerUsername?: string;
  ownerFullName?: string;
  ownerProfilePhotoUrl?: string;
  createdAt: string;
  updatedAt?: string;
}

// Leaderboard Types
export interface LeaderboardEntry {
  rank: number;
  user: User;
  score: number;
  change?: number;
  badges?: Badge[];
}

// Notification Types
export interface Notification {
  id: string;
  type:
    | 'FOLLOW'
    | 'PROJECT_LIKE'
    | 'COLLABORATION_REQUEST'
    | 'JOB_ALERT'
    | 'BADGE_EARNED'
    | 'VERIFICATION_UPDATE'
    | 'SYSTEM';
  title?: string;
  message: string;
  isRead: boolean;
  link?: string;
  actor?: User;
  createdAt: string;
}

// AI Types
export interface CodeReviewRequest {
  code: string;
  language: string;
  title?: string;
  context?: string;
}

export interface CodeIssue {
  severity: 'ERROR' | 'WARNING' | 'INFO';
  line?: number;
  message: string;
  suggestion?: string;
}

export interface CodeReviewResult {
  id: string;
  summary: string;
  score: number;
  issues: CodeIssue[];
  improvements: string[];
  optimizations: string[];
  securityNotes: string[];
  createdAt: string;
}

export interface ChatMessage {
  id: string;
  role: 'USER' | 'ASSISTANT';
  content: string;
  createdAt: string;
}

export interface ChatConversation {
  id: string;
  title: string;
  messages?: ChatMessage[];
  createdAt: string;
  updatedAt: string;
}

// API Response Types
export interface ApiResponse<T> {
  data: T;
  message: string;
  success: boolean;
}

export interface PaginatedResponse<T> {
  content: T[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
  first: boolean;
  last: boolean;
  hasNext: boolean;
  hasPrevious: boolean;
}

export interface ApiError {
  message: string;
  status: number;
  errors?: Record<string, string>;
}