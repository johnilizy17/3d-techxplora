import axios from "axios";
import { userRequest } from "../api/server";

export const updateStudentDetails = async (payload: any) => {
        const { data } = await userRequest.put(`/students/${payload.id}`, payload);
        return data;
};

export const getAllAccount = async (id: string) => {
        const { data } = await userRequest.get(`/students/${id}`);
        return data;
};

export const getAllGroupsStudentInfo = async (id: any) => {
        const { data } = await userRequest.get(`/students-groups/${id}`);
        return data;
};
