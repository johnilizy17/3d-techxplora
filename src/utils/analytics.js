/**
 * Google Analytics Utility
 * Provides helper functions for tracking events and page views
 */

/**
 * Track a custom event in Google Analytics
 * @param {string} eventName - Name of the event
 * @param {object} eventData - Additional event data
 */
export const trackEvent = (eventName, eventData = {}) => {
  if (window.gtag) {
    window.gtag('event', eventName, eventData);
  }
};

/**
 * Track a page view
 * @param {string} pagePath - Path of the page
 * @param {string} pageTitle - Title of the page
 */
export const trackPageView = (pagePath, pageTitle) => {
  if (window.gtag) {
    window.gtag('config', 'G-CVJB4QD1L2', {
      page_path: pagePath,
      page_title: pageTitle,
    });
  }
};

/**
 * Track user engagement
 * @param {string} engagementType - Type of engagement (e.g., 'quiz_started', 'course_viewed')
 * @param {object} metadata - Additional metadata
 */
export const trackEngagement = (engagementType, metadata = {}) => {
  trackEvent('engagement', {
    engagement_type: engagementType,
    ...metadata,
  });
};

/**
 * Track quiz completion
 * @param {string} quizCode - Quiz code
 * @param {number} score - Quiz score
 * @param {number} timeSpent - Time spent in seconds
 */
export const trackQuizCompletion = (quizCode, score, timeSpent) => {
  trackEvent('quiz_completed', {
    quiz_code: quizCode,
    score: score,
    time_spent_seconds: timeSpent,
  });
};

/**
 * Track course enrollment
 * @param {string} courseId - Course ID
 * @param {string} courseName - Course name
 */
export const trackCourseEnrollment = (courseId, courseName) => {
  trackEvent('course_enrolled', {
    course_id: courseId,
    course_name: courseName,
  });
};

/**
 * Track user login
 * @param {string} loginMethod - Method of login (e.g., 'email', 'google')
 */
export const trackLogin = (loginMethod = 'email') => {
  trackEvent('login', {
    login_method: loginMethod,
  });
};

/**
 * Track user signup
 * @param {string} userType - Type of user (e.g., 'student', 'teacher', 'admin')
 */
export const trackSignup = (userType) => {
  trackEvent('signup', {
    user_type: userType,
  });
};

/**
 * Track error
 * @param {string} errorType - Type of error
 * @param {string} errorMessage - Error message
 */
export const trackError = (errorType, errorMessage) => {
  trackEvent('error', {
    error_type: errorType,
    error_message: errorMessage,
  });
};

/**
 * Track video view
 * @param {string} videoId - Video ID
 * @param {string} videoTitle - Video title
 * @param {number} duration - Video duration in seconds
 */
export const trackVideoView = (videoId, videoTitle, duration) => {
  trackEvent('video_view', {
    video_id: videoId,
    video_title: videoTitle,
    duration_seconds: duration,
  });
};

/**
 * Track group join
 * @param {string} groupCode - Group code
 * @param {string} groupName - Group name
 */
export const trackGroupJoin = (groupCode, groupName) => {
  trackEvent('group_joined', {
    group_code: groupCode,
    group_name: groupName,
  });
};

/**
 * Track XP earned
 * @param {number} xpAmount - Amount of XP earned
 * @param {string} source - Source of XP (e.g., 'quiz', 'course', 'group')
 */
export const trackXPEarned = (xpAmount, source) => {
  trackEvent('xp_earned', {
    xp_amount: xpAmount,
    source: source,
  });
};

export default {
  trackEvent,
  trackPageView,
  trackEngagement,
  trackQuizCompletion,
  trackCourseEnrollment,
  trackLogin,
  trackSignup,
  trackError,
  trackVideoView,
  trackGroupJoin,
  trackXPEarned,
};
