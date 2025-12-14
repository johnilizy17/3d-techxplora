import { userRequest } from "../api/server";

export const syllabusCreated = async (payload: any) => {
    const { data } = await userRequest.post(`/syllabus`, payload);
    return data;
};

export const syllabusSubTopicCreated = async (payload: any) => {
    const { data } = await userRequest.post(`/syllabus-topics`, payload);
    return data;
};

export const GetSyllabus = async (payload: any) => {
    const { data } = await userRequest.get(`/syllabus`);
    return data;
};
