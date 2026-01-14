import * as XLSX from "xlsx";

/**
 * Extracts questions and options from an Excel file buffer.
 * Expects columns: question_id, question, option, is_correct
 */
export function extractQuestionsFromExcel(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = (e) => {
            try {
                const data = new Uint8Array(e.target.result);
                const workbook = XLSX.read(data, { type: "array" });

                // Assume first sheet
                const worksheet = workbook.Sheets[workbook.SheetNames[0]];
                const rows = XLSX.utils.sheet_to_json(worksheet);

                // Group back into TechXplora JSON format
                const questionsMap = {};

                rows.forEach((row) => {
                    const { question_id, question, option, is_correct } = row;

                    if (!questionsMap[question_id]) {
                        questionsMap[question_id] = {
                            id: question_id,
                            question,
                            options: [],
                        };
                    }

                    questionsMap[question_id].options.push({
                        option,
                        is_correct: Boolean(is_correct),
                    });
                });

                resolve(Object.values(questionsMap));
            } catch (err) {
                reject(err);
            }
        };

        reader.onerror = reject;
        reader.readAsArrayBuffer(file);
    });
}

/**
 * Validates the structure and content of a questions Excel file.
 */
export async function validateQuestionsFile(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = (e) => {
            try {
                const data = new Uint8Array(e.target?.result);
                const workbook = XLSX.read(data, { type: "array" });
                const sheet = workbook.Sheets[workbook.SheetNames[0]];
                const rows = XLSX.utils.sheet_to_json(sheet);

                const requiredColumns = ["question_id", "question", "option", "is_correct"];
                const errors = [];

                if (rows.length === 0) {
                    errors.push("The file is empty.");
                    return resolve({ valid: false, errors });
                }

                // Check if required columns exist
                const firstRowKeys = Object.keys(rows[0]);
                requiredColumns.forEach((col) => {
                    if (!firstRowKeys.includes(col)) {
                        errors.push(`Missing required column: ${col}`);
                    }
                });

                if (errors.length > 0) return resolve({ valid: false, errors });

                const parsedRows = [];

                // Validate row values
                rows.forEach((row, idx) => {
                    const rowNum = idx + 2;

                    if (isNaN(Number(row.question_id))) {
                        errors.push(`Row ${rowNum}: question_id must be a number`);
                    }

                    if (typeof row.question !== "string" || !row.question.trim()) {
                        errors.push(`Row ${rowNum}: question must be a non-empty string`);
                    }

                    if (typeof row.option !== "string" || !row.option.trim()) {
                        errors.push(`Row ${rowNum}: option must be a non-empty string`);
                    }

                    let isCorrect = null;
                    if (typeof row.is_correct === "boolean") {
                        isCorrect = row.is_correct;
                    } else if (typeof row.is_correct === "string") {
                        const val = row.is_correct.toLowerCase();
                        if (val === "true" || val === "1") isCorrect = true;
                        else if (val === "false" || val === "0") isCorrect = false;
                    } else if (typeof row.is_correct === "number") {
                        isCorrect = row.is_correct === 1;
                    }

                    if (isCorrect === null) {
                        errors.push(`Row ${rowNum}: is_correct must be TRUE/FALSE, 1/0, or boolean`);
                    }

                    parsedRows.push({
                        question_id: Number(row.question_id),
                        question: row.question,
                        option: row.option,
                        is_correct: isCorrect ?? false,
                    });
                });

                resolve({ valid: errors.length === 0, errors, rows: parsedRows });
            } catch (err) {
                reject(err);
            }
        };

        reader.onerror = (err) => reject(err);
        reader.readAsArrayBuffer(file);
    });
}

/**
 * Calculates quiz result stats: average score, pass/fail percentages.
 */
export function calculateQuizResultsStats(results) {
    if (!results || results.length === 0) {
        return {
            totalStudents: 0,
            averageScore: 0,
            passPercentage: 0,
            failPercentage: 0
        };
    }

    const totalStudents = results.length;
    const totalScore = results.reduce((acc, curr) => acc + (Number(curr.score) || 0), 0);
    const averageScore = Math.round(totalScore / totalStudents);

    const totalPass = results.filter((r) => r.score >= 50).length;
    const totalFail = totalStudents - totalPass;

    const passPercentage = Math.round((totalPass / totalStudents) * 100);
    const failPercentage = 100 - passPercentage;

    return {
        totalStudents,
        averageScore,
        passPercentage,
        failPercentage
    };
}
