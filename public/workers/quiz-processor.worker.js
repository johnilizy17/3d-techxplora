// Web Worker for Quiz Processing
// Handles heavy computations for quiz scoring, validation, and analysis

self.addEventListener('message', (event) => {
  const { type, data } = event.data;

  switch (type) {
    case 'CALCULATE_SCORE':
      calculateScore(data);
      break;
    
    case 'VALIDATE_ANSWERS':
      validateAnswers(data);
      break;
    
    case 'ANALYZE_PERFORMANCE':
      analyzePerformance(data);
      break;
    
    case 'PROCESS_BULK_QUESTIONS':
      processBulkQuestions(data);
      break;
    
    case 'GENERATE_STATISTICS':
      generateStatistics(data);
      break;
    
    default:
      self.postMessage({ error: 'Unknown task type' });
  }
});

// Calculate quiz score
function calculateScore(data) {
  const { answers, questions, pointsPerQuestion } = data;
  
  let correctCount = 0;
  let totalPoints = 0;
  const results = [];

  questions.forEach((question, index) => {
    const userAnswer = answers[question.id];
    const correctAnswer = question.correct_answer || question.answer;
    const isCorrect = userAnswer === correctAnswer;

    if (isCorrect) {
      correctCount++;
      totalPoints += pointsPerQuestion || question.points || 1;
    }

    results.push({
      questionId: question.id,
      isCorrect,
      userAnswer,
      correctAnswer,
      points: isCorrect ? (pointsPerQuestion || question.points || 1) : 0
    });
  });

  const percentage = (correctCount / questions.length) * 100;

  self.postMessage({
    type: 'SCORE_CALCULATED',
    result: {
      correctCount,
      totalQuestions: questions.length,
      totalPoints,
      percentage: percentage.toFixed(2),
      results
    }
  });
}

// Validate answers format and completeness
function validateAnswers(data) {
  const { answers, questions } = data;
  
  const validation = {
    isValid: true,
    errors: [],
    warnings: [],
    completeness: 0
  };

  const answeredCount = Object.keys(answers).length;
  validation.completeness = (answeredCount / questions.length) * 100;

  questions.forEach((question) => {
    const answer = answers[question.id];

    if (!answer) {
      validation.warnings.push({
        questionId: question.id,
        message: 'Question not answered'
      });
    }

    if (question.required && !answer) {
      validation.isValid = false;
      validation.errors.push({
        questionId: question.id,
        message: 'Required question not answered'
      });
    }
  });

  self.postMessage({
    type: 'VALIDATION_COMPLETE',
    result: validation
  });
}

// Analyze student performance
function analyzePerformance(data) {
  const { results, timeSpent, questions } = data;
  
  const analysis = {
    strengths: [],
    weaknesses: [],
    averageTimePerQuestion: timeSpent / questions.length,
    difficultyBreakdown: {},
    categoryBreakdown: {}
  };

  // Analyze by difficulty
  questions.forEach((question, index) => {
    const result = results[index];
    const difficulty = question.difficulty || 'medium';
    
    if (!analysis.difficultyBreakdown[difficulty]) {
      analysis.difficultyBreakdown[difficulty] = {
        total: 0,
        correct: 0,
        percentage: 0
      };
    }

    analysis.difficultyBreakdown[difficulty].total++;
    if (result.isCorrect) {
      analysis.difficultyBreakdown[difficulty].correct++;
    }
  });

  // Calculate percentages
  Object.keys(analysis.difficultyBreakdown).forEach(difficulty => {
    const data = analysis.difficultyBreakdown[difficulty];
    data.percentage = (data.correct / data.total) * 100;

    if (data.percentage >= 70) {
      analysis.strengths.push(`${difficulty} questions`);
    } else if (data.percentage < 50) {
      analysis.weaknesses.push(`${difficulty} questions`);
    }
  });

  self.postMessage({
    type: 'ANALYSIS_COMPLETE',
    result: analysis
  });
}

// Process bulk questions (for imports)
function processBulkQuestions(data) {
  const { questions, format } = data;
  const processed = [];
  const errors = [];

  questions.forEach((question, index) => {
    try {
      const processedQuestion = {
        id: question.id || `q_${Date.now()}_${index}`,
        question: question.question || question.text,
        options: question.options || [],
        correct_answer: question.correct_answer || question.answer,
        points: question.points || 1,
        difficulty: question.difficulty || 'medium',
        category: question.category || 'general'
      };

      // Validate required fields
      if (!processedQuestion.question) {
        throw new Error('Question text is required');
      }

      if (!processedQuestion.options || processedQuestion.options.length < 2) {
        throw new Error('At least 2 options are required');
      }

      if (!processedQuestion.correct_answer) {
        throw new Error('Correct answer is required');
      }

      processed.push(processedQuestion);
    } catch (error) {
      errors.push({
        index,
        question: question.question || 'Unknown',
        error: error.message
      });
    }
  });

  self.postMessage({
    type: 'BULK_PROCESSING_COMPLETE',
    result: {
      processed,
      errors,
      successCount: processed.length,
      errorCount: errors.length
    }
  });
}

// Generate statistics
function generateStatistics(data) {
  const { quizzes, students, timeRange } = data;
  
  const stats = {
    totalQuizzes: quizzes.length,
    totalStudents: students.length,
    averageScore: 0,
    completionRate: 0,
    topPerformers: [],
    quizPerformance: []
  };

  // Calculate average score
  let totalScore = 0;
  let completedCount = 0;

  quizzes.forEach(quiz => {
    if (quiz.completed) {
      completedCount++;
      totalScore += quiz.score || 0;
    }

    stats.quizPerformance.push({
      quizId: quiz.id,
      title: quiz.title,
      averageScore: quiz.averageScore || 0,
      completionRate: (quiz.completedCount / quiz.totalStudents) * 100
    });
  });

  stats.averageScore = completedCount > 0 ? totalScore / completedCount : 0;
  stats.completionRate = (completedCount / quizzes.length) * 100;

  // Find top performers
  const studentScores = students.map(student => ({
    id: student.id,
    name: student.name,
    totalScore: student.totalScore || 0,
    quizzesCompleted: student.quizzesCompleted || 0
  }));

  stats.topPerformers = studentScores
    .sort((a, b) => b.totalScore - a.totalScore)
    .slice(0, 10);

  self.postMessage({
    type: 'STATISTICS_GENERATED',
    result: stats
  });
}

// Error handling
self.addEventListener('error', (error) => {
  self.postMessage({
    type: 'ERROR',
    error: error.message
  });
});
