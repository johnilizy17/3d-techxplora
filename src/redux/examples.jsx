// Example component showing how to use Redux hooks and API endpoints

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    selectCurrentUser,
    selectIsAuthenticated,
    setCredentials,
    logout,
} from '@/redux/slices/authSlice';
import { useLoginMutation, useGetProfileQuery } from '@/redux/api/authApi';
import { useGetCoursesQuery } from '@/redux/api/teacherApi';

/**
 * Example: Using Auth Slice and API
 */
export function AuthExample() {
    const dispatch = useDispatch();
    const user = useSelector(selectCurrentUser);
    const isAuthenticated = useSelector(selectIsAuthenticated);

    // RTK Query mutation hook
    const [login, { isLoading, error }] = useLoginMutation();

    const handleLogin = async (e) => {
        e.preventDefault();
        const credentials = {
            email: 'user@example.com',
            password: 'password123',
        };

        try {
            // Call the login mutation
            const result = await login(credentials).unwrap();

            // Update Redux state with user and token
            dispatch(setCredentials({
                user: result.user,
                token: result.token,
            }));

            console.log('Login successful!', result);
        } catch (err) {
            console.error('Login failed:', err);
        }
    };

    const handleLogout = () => {
        dispatch(logout());
    };

    return (
        <div>
            <h2>Auth Example</h2>
            {isAuthenticated ? (
                <div>
                    <p>Welcome, {user?.name || user?.email}!</p>
                    <button onClick={handleLogout}>Logout</button>
                </div>
            ) : (
                <div>
                    <button onClick={handleLogin} disabled={isLoading}>
                        {isLoading ? 'Logging in...' : 'Login'}
                    </button>
                    {error && <p style={{ color: 'red' }}>Error: {error.message}</p>}
                </div>
            )}
        </div>
    );
}

/**
 * Example: Using RTK Query for data fetching
 */
export function CoursesExample() {
    // RTK Query automatically handles loading, error, and data states
    const { data: courses, isLoading, error, refetch } = useGetCoursesQuery({
        page: 1,
        limit: 10,
    });

    if (isLoading) return <div>Loading courses...</div>;
    if (error) return <div>Error loading courses: {error.message}</div>;

    return (
        <div>
            <h2>Courses</h2>
            <button onClick={refetch}>Refresh</button>
            <ul>
                {courses?.map((course) => (
                    <li key={course.id}>{course.title}</li>
                ))}
            </ul>
        </div>
    );
}

/**
 * Example: Using Question Slice
 */
export function QuizExample() {
    const dispatch = useDispatch();
    const {
        currentQuestion,
        currentQuestionIndex,
        quizProgress,
    } = useSelector((state) => state.question);

    // Import actions from questionSlice
    const { setAnswer, nextQuestion, previousQuestion } = require('@/redux/slices/questionSlice');

    const handleAnswer = (answer) => {
        dispatch(setAnswer({
            questionId: currentQuestion.id,
            answer,
        }));
    };

    const handleNext = () => {
        dispatch(nextQuestion());
    };

    const handlePrevious = () => {
        dispatch(previousQuestion());
    };

    return (
        <div>
            <h2>Quiz Progress</h2>
            <p>Question {currentQuestionIndex + 1} of {quizProgress.totalQuestions}</p>
            <p>Answered: {quizProgress.answeredQuestions}</p>

            {currentQuestion && (
                <div>
                    <h3>{currentQuestion.text}</h3>
                    {/* Render question options and handle answers */}
                    <button onClick={handlePrevious}>Previous</button>
                    <button onClick={handleNext}>Next</button>
                </div>
            )}
        </div>
    );
}

/**
 * Example: Using Teacher Slice
 */
export function TeacherExample() {
    const dispatch = useDispatch();
    const {
        teacherProfile,
        teacherCourses,
        loading,
    } = useSelector((state) => state.teacher);

    const { useGetTeacherProfileQuery, useGetTeacherCoursesQuery } = require('@/redux/api/teacherApi');

    // Fetch teacher data
    const { data: profile } = useGetTeacherProfileQuery();
    const { data: courses } = useGetTeacherCoursesQuery(profile?.id, {
        skip: !profile?.id, // Skip query if no profile ID
    });

    return (
        <div>
            <h2>Teacher Dashboard</h2>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <div>
                    <h3>{profile?.name}</h3>
                    <h4>My Courses ({courses?.length || 0})</h4>
                    <ul>
                        {courses?.map((course) => (
                            <li key={course.id}>{course.title}</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}
