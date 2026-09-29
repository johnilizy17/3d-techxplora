# Redux Setup Documentation

## Overview

This project uses **Redux Toolkit** with **RTK Query** for state management and API calls. The setup includes:

- ✅ Redux store configuration
- ✅ RTK Query base API service
- ✅ Auth, Question, and Teacher slices
- ✅ Complete API endpoints for authentication, questions/quizzes, and teacher management

## 📁 File Structure

```
src/redux/
├── api/
│   ├── baseApi.js          # Base RTK Query configuration
│   ├── authApi.js          # Authentication endpoints
│   ├── questionApi.js      # Question/Quiz endpoints
│   └── teacherApi.js       # Teacher/Course endpoints
├── slices/
│   ├── authSlice.js        # Auth state management
│   ├── questionSlice.js    # Question/Quiz state management
│   └── teacherSlice.js     # Teacher state management
├── store.js                # Redux store configuration
└── examples.jsx            # Usage examples
```

## 🚀 Quick Start

### 1. Update API Base URL

**IMPORTANT:** Update the base URL in `src/redux/api/baseApi.js`:

```javascript
baseQuery: fetchBaseQuery({
  baseUrl: 'https://your-actual-api-url.com', // ⚠️ Change this!
  // ...
}),
```

### 2. Using Redux in Components

#### Import hooks and selectors:

```javascript
import { useDispatch, useSelector } from 'react-redux';
import { selectCurrentUser, logout } from '@/redux/slices/authSlice';
```

#### Access state:

```javascript
const user = useSelector(selectCurrentUser);
const dispatch = useDispatch();
```

#### Dispatch actions:

```javascript
dispatch(logout());
```

### 3. Using RTK Query API Endpoints

#### Import API hooks:

```javascript
import { useLoginMutation, useGetProfileQuery } from '@/redux/api/authApi';
import { useGetCoursesQuery } from '@/redux/api/teacherApi';
```

#### Use queries (GET requests):

```javascript
const { data, isLoading, error, refetch } = useGetCoursesQuery({
  page: 1,
  limit: 10,
});
```

#### Use mutations (POST/PUT/DELETE requests):

```javascript
const [login, { isLoading, error }] = useLoginMutation();

const handleLogin = async () => {
  try {
    const result = await login({ email, password }).unwrap();
    console.log('Success:', result);
  } catch (err) {
    console.error('Error:', err);
  }
};
```

## 📚 Available Slices

### Auth Slice (`authSlice.js`)

**State:**
- `user` - Current user object
- `token` - Authentication token
- `isAuthenticated` - Boolean authentication status

**Actions:**
- `setCredentials({ user, token })` - Set user and token
- `updateUser(userData)` - Update user data
- `logout()` - Clear auth state

**Selectors:**
- `selectCurrentUser(state)` - Get current user
- `selectCurrentToken(state)` - Get auth token
- `selectIsAuthenticated(state)` - Get auth status

### Question Slice (`questionSlice.js`)

**State:**
- `questions` - Array of questions
- `currentQuestion` - Current question object
- `currentQuestionIndex` - Current question index
- `answers` - User answers object
- `quizProgress` - Quiz progress tracking

**Actions:**
- `setQuestions(questions)` - Set questions array
- `setCurrentQuestion(question)` - Set current question
- `nextQuestion()` - Move to next question
- `previousQuestion()` - Move to previous question
- `setAnswer({ questionId, answer })` - Save answer
- `resetQuiz()` - Reset quiz state

**Selectors:**
- `selectQuestions(state)` - Get all questions
- `selectCurrentQuestion(state)` - Get current question
- `selectQuizProgress(state)` - Get quiz progress

### Teacher Slice (`teacherSlice.js`)

**State:**
- `teachers` - Array of teachers
- `selectedTeacher` - Selected teacher object
- `teacherCourses` - Teacher's courses
- `teacherStudents` - Teacher's students
- `teacherProfile` - Teacher profile

**Actions:**
- `setTeacherProfile(profile)` - Set teacher profile
- `setTeacherCourses(courses)` - Set courses
- `addCourse(course)` - Add new course
- `updateCourse(course)` - Update course
- `removeCourse(courseId)` - Remove course

**Selectors:**
- `selectTeacherProfile(state)` - Get teacher profile
- `selectTeacherCourses(state)` - Get teacher courses
- `selectTeacherStudents(state)` - Get teacher students

## 🔌 Available API Endpoints

### Auth API (`authApi.js`)

- `useLoginMutation()` - Login user
- `useRegisterMutation()` - Register new user
- `useGetProfileQuery()` - Get user profile
- `useUpdateProfileMutation()` - Update profile
- `useLogoutMutation()` - Logout user
- `useVerifyEmailMutation()` - Verify email
- `useForgotPasswordMutation()` - Request password reset
- `useResetPasswordMutation()` - Reset password

### Question API (`questionApi.js`)

- `useGetQuestionsQuery(params)` - Get all questions
- `useGetQuestionByIdQuery(id)` - Get question by ID
- `useCreateQuestionMutation()` - Create question
- `useUpdateQuestionMutation()` - Update question
- `useDeleteQuestionMutation()` - Delete question
- `useGetQuizzesQuery(params)` - Get all quizzes
- `useGetQuizByIdQuery(id)` - Get quiz by ID
- `useCreateQuizMutation()` - Create quiz
- `useSubmitQuizMutation()` - Submit quiz answers
- `useGetQuizResultsQuery(quizId)` - Get quiz results

### Teacher API (`teacherApi.js`)

- `useGetTeachersQuery(params)` - Get all teachers
- `useGetTeacherByIdQuery(id)` - Get teacher by ID
- `useGetTeacherProfileQuery()` - Get teacher profile
- `useUpdateTeacherProfileMutation()` - Update teacher profile
- `useGetTeacherCoursesQuery(teacherId)` - Get teacher courses
- `useCreateCourseMutation()` - Create course
- `useUpdateCourseMutation()` - Update course
- `useDeleteCourseMutation()` - Delete course
- `useGetCoursesQuery(params)` - Get all courses
- `useGetCourseByIdQuery(id)` - Get course by ID
- `useEnrollStudentMutation()` - Enroll student in course
- `useRemoveStudentMutation()` - Remove student from course

## 💡 Usage Examples

See `src/redux/examples.jsx` for complete working examples of:

- Authentication flow
- Fetching and displaying data
- Managing quiz state
- Teacher dashboard

## 🔧 Configuration

### Adding New Endpoints

To add new endpoints, inject them into `baseApi`:

```javascript
// src/redux/api/myApi.js
import baseApi from './baseApi';

export const myApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getMyData: builder.query({
      query: () => '/my-endpoint',
      providesTags: ['MyData'],
    }),
  }),
});

export const { useGetMyDataQuery } = myApi;
```

### Adding New Slices

Create a new slice file and add it to the store:

```javascript
// src/redux/slices/mySlice.js
import { createSlice } from '@reduxjs/toolkit';

const mySlice = createSlice({
  name: 'myFeature',
  initialState: {},
  reducers: {
    // your reducers
  },
});

export default mySlice.reducer;
```

Then add to store:

```javascript
// src/redux/store.js
import myReducer from './slices/mySlice';

export const store = configureStore({
  reducer: {
    // ...
    myFeature: myReducer,
  },
});
```

## 🐛 Debugging

### Redux DevTools

Install the [Redux DevTools Extension](https://github.com/reduxjs/redux-devtools) to inspect state and actions in your browser.

### Common Issues

1. **"Cannot read property of undefined"** - Make sure the Redux Provider is wrapping your app in `main.jsx`
2. **API calls failing** - Update the base URL in `baseApi.js`
3. **Token not being sent** - Check that `setCredentials` was called with a valid token

## 📖 Resources

- [Redux Toolkit Documentation](https://redux-toolkit.js.org/)
- [RTK Query Documentation](https://redux-toolkit.js.org/rtk-query/overview)
- [React Redux Hooks](https://react-redux.js.org/api/hooks)
