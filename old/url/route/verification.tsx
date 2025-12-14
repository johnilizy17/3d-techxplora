import axios from "axios";
import { userRequest } from "../api/server";

export const verifyQuizCode = async (id: any) => {
    const { data } = await userRequest.get(`/verify-quizzes/${id}`);
    return data;
};

export const getUserByQuiz = async (id: any) => {
    const { data } = await userRequest.get(`/answers/quiz/${id}`);
    return data;
};

export const getQuizLeaderBoard = async (id: any) => {
    const { data } = await userRequest.get(`/leaderboard/quiz/${id}`);
    return data;
};

export const completeQuizCode = async (payload: any) => {
    const { data } = await userRequest.post(`/join-quizzes`, payload);
    return data;
};

export const createQuestion = async (payload: any) => {
    const { data } = await userRequest.post(`/create-question`, payload);
    return data;
};

export const sendInteralEmail = async (payload: any) => {
    const { data } = await userRequest.post(`send-email`, payload);
    return data;
};

export const updateQuestion = async (id:string, payload: any) => {
    const { data } = await userRequest.post(`/upate-questions/${id}`, payload);
    return data;
};
export const completeGroupCode = async (payload: any) => {
    const { data } = await userRequest.post(`/join-group`, payload);
    return data;
};

export const verifyQroupCode = async (id: any) => {
    const { data } = await userRequest.get(`/groups/${id}`);
    return data;
};