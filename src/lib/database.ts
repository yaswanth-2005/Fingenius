
// This is a simple in-memory database simulation
// In a real app, you would use a real database like Prisma with PostgreSQL, MongoDB, etc.

interface User {
  id: string;
  fullName: string;
  email: string;
  passwordHash: string;
  isAuthenticated?: boolean;
  isRegistrationComplete?: boolean;
}

interface UserProfile {
  userId: string;
  age?: string;
  gender?: string;
  income?: string;
  bankBalance?: string;
  propertiesWorth?: string;
  debt?: string;
  insurance?: string;
  medicalCondition?: string;
  lifestyle?: string;
  overallDescription?: string;
}

interface Course {
  id: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  duration: string;
  level: string;
  modules?: CourseModule[];
}

interface CourseModule {
  id: string;
  courseId: string;
  title: string;
  description: string;
  videoUrl: string;
  order: number;
}

// In-memory "database"
const users: User[] = [
  {
    id: '1',
    fullName: 'John Doe',
    email: 'john@example.com',
    passwordHash: 'hashed_password', // in real app, would be properly hashed
    isAuthenticated: true,
    isRegistrationComplete: true,
  },
];

const userProfiles: UserProfile[] = [
  {
    userId: '1',
    age: '35',
    gender: 'male',
    income: '50000',
    bankBalance: '200000',
    propertiesWorth: '5000000',
    debt: '100000',
    insurance: 'Life insurance policy',
    medicalCondition: 'None',
    lifestyle: 'moderate',
    overallDescription: 'Looking to invest for retirement and children\'s education',
  },
];

const courses: Course[] = [
  {
    id: '1',
    title: 'Investment Fundamentals',
    description: 'Learn the basics of investment and build a solid foundation for your financial journey. This course covers key investment types, risk management, and strategic planning.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    duration: '4 hours',
    level: 'Beginner',
    modules: [
      {
        id: '101',
        courseId: '1',
        title: 'Introduction to Investments',
        description: 'Understanding the basics of investments and different asset classes.',
        videoUrl: 'https://example.com/videos/investment-intro.mp4',
        order: 1,
      },
      {
        id: '102',
        courseId: '1',
        title: 'Risk Management',
        description: 'Learn how to assess and manage investment risks.',
        videoUrl: 'https://example.com/videos/risk-management.mp4',
        order: 2,
      },
      {
        id: '103',
        courseId: '1',
        title: 'Building an Investment Portfolio',
        description: 'Strategies for creating a balanced investment portfolio.',
        videoUrl: 'https://example.com/videos/portfolio-building.mp4',
        order: 3,
      },
    ],
  },
  // Add more courses as needed
];

// Database operations
export const db = {
  // User operations
  getUser: (email: string) => {
    return users.find(user => user.email === email);
  },
  
  getUserById: (id: string) => {
    return users.find(user => user.id === id);
  },
  
  createUser: (user: Omit<User, 'id'>) => {
    const newUser = { ...user, id: (users.length + 1).toString() };
    users.push(newUser);
    return newUser;
  },
  
  // Profile operations
  getUserProfile: (userId: string) => {
    return userProfiles.find(profile => profile.userId === userId);
  },
  
  createUserProfile: (profile: UserProfile) => {
    userProfiles.push(profile);
    return profile;
  },
  
  updateUserProfile: (userId: string, data: Partial<UserProfile>) => {
    const index = userProfiles.findIndex(profile => profile.userId === userId);
    if (index >= 0) {
      userProfiles[index] = { ...userProfiles[index], ...data };
      return userProfiles[index];
    }
    return null;
  },
  
  // Course operations
  getAllCourses: () => {
    return courses;
  },
  
  getCourseById: (id: string) => {
    return courses.find(course => course.id === id);
  },
  
  getCourseModules: (courseId: string) => {
    const course = courses.find(course => course.id === courseId);
    return course?.modules || [];
  },
};

export type { User, UserProfile, Course, CourseModule };
