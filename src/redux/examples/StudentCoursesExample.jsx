import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    useGetStudentCoursesQuery,
    useGetStudentCourseByIdQuery,
    useEnrollInCourseMutation,
} from '@/redux/api/studentApi';
import {
    selectFilters,
    selectPagination,
    setSearchFilter,
    setDifficultyFilter,
    setCategoryFilter,
    setStatusFilter,
    setCurrentPage,
    clearFilters,
} from '@/redux/slices/studentSlice';

/**
 * Example: Student Courses List with Filters and Pagination
 */
export function StudentCoursesExample() {
    const dispatch = useDispatch();
    const filters = useSelector(selectFilters);
    const pagination = useSelector(selectPagination);

    // Build query parameters from Redux state
    const queryParams = {
        search: filters.search || undefined,
        difficulty_level: filters.difficulty_level || undefined,
        category: filters.category || undefined,
        status: filters.status || undefined,
        page: pagination.currentPage,
        per_page: pagination.perPage,
    };

    // Fetch courses with filters and pagination
    const { data, isLoading, error, refetch } = useGetStudentCoursesQuery(queryParams);

    const handleSearchChange = (e) => {
        dispatch(setSearchFilter(e.target.value));
    };

    const handleDifficultyChange = (e) => {
        dispatch(setDifficultyFilter(e.target.value));
    };

    const handleCategoryChange = (e) => {
        dispatch(setCategoryFilter(e.target.value));
    };

    const handleStatusChange = (e) => {
        dispatch(setStatusFilter(e.target.value));
    };

    const handleClearFilters = () => {
        dispatch(clearFilters());
    };

    const handlePageChange = (newPage) => {
        dispatch(setCurrentPage(newPage));
    };

    if (isLoading) return <div>Loading courses...</div>;
    if (error) return <div>Error: {error.message}</div>;

    const courses = data?.data || [];
    const meta = data?.meta || {};

    return (
        <div className="student-courses">
            <h2>Available Courses</h2>

            {/* Filters */}
            <div className="filters">
                <input
                    type="text"
                    placeholder="Search courses..."
                    value={filters.search}
                    onChange={handleSearchChange}
                />

                <select value={filters.difficulty_level} onChange={handleDifficultyChange}>
                    <option value="">All Difficulty Levels</option>
                    <option value="beginner">Beginner</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="advanced">Advanced</option>
                </select>

                <select value={filters.category} onChange={handleCategoryChange}>
                    <option value="">All Categories</option>
                    <option value="programming">Programming</option>
                    <option value="design">Design</option>
                    <option value="business">Business</option>
                    <option value="marketing">Marketing</option>
                </select>

                <select value={filters.status} onChange={handleStatusChange}>
                    <option value="">All Status</option>
                    <option value="active">Active</option>
                    <option value="draft">Draft</option>
                    <option value="archived">Archived</option>
                </select>

                <button onClick={handleClearFilters}>Clear Filters</button>
                <button onClick={refetch}>Refresh</button>
            </div>

            {/* Courses List */}
            <div className="courses-list">
                {courses.length === 0 ? (
                    <p>No courses found</p>
                ) : (
                    courses.map((course) => (
                        <CourseCard key={course.id} course={course} />
                    ))
                )}
            </div>

            {/* Pagination */}
            <div className="pagination">
                <button
                    onClick={() => handlePageChange(pagination.currentPage - 1)}
                    disabled={pagination.currentPage === 1}
                >
                    Previous
                </button>
                <span>
                    Page {meta.current_page || pagination.currentPage} of {meta.last_page || 1}
                </span>
                <button
                    onClick={() => handlePageChange(pagination.currentPage + 1)}
                    disabled={pagination.currentPage >= (meta.last_page || 1)}
                >
                    Next
                </button>
            </div>

            <p>
                Showing {meta.from || 0} to {meta.to || 0} of {meta.total || 0} courses
            </p>
        </div>
    );
}

/**
 * Example: Individual Course Card with Enrollment
 */
function CourseCard({ course }) {
    const [enroll, { isLoading: isEnrolling }] = useEnrollInCourseMutation();

    const handleEnroll = async () => {
        try {
            await enroll(course.id).unwrap();
            alert('Successfully enrolled in course!');
        } catch (err) {
            console.error('Enrollment failed:', err);
            alert('Failed to enroll in course');
        }
    };

    return (
        <div className="course-card">
            <h3>{course.title}</h3>
            <p>{course.description}</p>
            <div className="course-meta">
                <span className="category">{course.category}</span>
                <span className="difficulty">{course.difficulty_level}</span>
                <span className="status">{course.status}</span>
            </div>
            {course.questions && (
                <p className="questions-count">{course.questions.length} questions</p>
            )}
            <button onClick={handleEnroll} disabled={isEnrolling}>
                {isEnrolling ? 'Enrolling...' : 'Enroll Now'}
            </button>
        </div>
    );
}

/**
 * Example: Course Detail View
 */
export function CourseDetailExample({ courseId }) {
    const { data: course, isLoading, error } = useGetStudentCourseByIdQuery(courseId);

    if (isLoading) return <div>Loading course details...</div>;
    if (error) return <div>Error loading course: {error.message}</div>;
    if (!course) return <div>Course not found</div>;

    return (
        <div className="course-detail">
            <h1>{course.title}</h1>
            <p className="description">{course.description}</p>

            <div className="course-info">
                <div className="info-item">
                    <strong>Category:</strong> {course.category}
                </div>
                <div className="info-item">
                    <strong>Difficulty:</strong> {course.difficulty_level}
                </div>
                <div className="info-item">
                    <strong>Status:</strong> {course.status}
                </div>
            </div>

            {course.questions && course.questions.length > 0 && (
                <div className="course-questions">
                    <h2>Course Content</h2>
                    <ul>
                        {course.questions.map((question, index) => (
                            <li key={question.id}>
                                Question {index + 1}: {question.title || question.text}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}

/**
 * Example: Simple Usage Without Redux State
 */
export function SimpleCoursesExample() {
    const [searchTerm, setSearchTerm] = useState('');
    const [difficulty, setDifficulty] = useState('');

    // Direct query with local state
    const { data, isLoading } = useGetStudentCoursesQuery({
        search: searchTerm,
        difficulty_level: difficulty,
        per_page: 12,
    });

    if (isLoading) return <div>Loading...</div>;

    return (
        <div>
            <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />

            <select value={difficulty} onChange={(e) => setDifficulty(e.target.value)}>
                <option value="">All Levels</option>
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
            </select>

            <div className="courses">
                {data?.data?.map((course) => (
                    <div key={course.id}>{course.title}</div>
                ))}
            </div>
        </div>
    );
}
