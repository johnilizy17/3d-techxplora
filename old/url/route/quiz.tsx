import axios from "axios";
import { userRequest } from "../api/server";

export const createQuiz = async (payload: any) => {
        const { data } = await userRequest.post("/quizzes", payload);
        return data;
};

export const submitResult = async (payload: any) => {
        const { data } = await userRequest.post("/answers/submit", payload);
        return data;
};

export const getQuizByID = async (id: any) => {
        const { data } = await userRequest.get(`/quizzes/group/${id}`);
        return data;
};

export const getLeaderByGroup = async (id: any) => {
        const { data } = await userRequest.get(`/leaderboard/group/${id}`);
        return data;
};

export const depositXD = async (payload: any) => {
        const { data } = await userRequest.post(`/xp/add`, payload);
        return data;
};

export const transferXD = async (payload: any) => {
        const { data } = await userRequest.post(`/xp/transfer`, payload);
        return data;
};

export const verifyAccountByEmail = async (payload: any) => {
        const { data } = await userRequest.post(`/xp/verify`, payload);
        return data;
};

export async function getGoogleUser(access_token: string) {
        try {
                const response = await axios.get("https://www.googleapis.com/oauth2/v3/userinfo", {
                        headers: {
                                Authorization: `Bearer ${access_token}`,
                        },
                });

                return response.data; // contains user details
        } catch (error) {
                console.error("Error fetching Google user:", error);
                throw error;
        }
}