import axios from "axios";
import { userRequest } from "../api/server";

export const updateTeacherDetails = async () => {
        const { data } = await userRequest.get("/students");
        return data;
};

export const updateTeachers = async (payload: any) => {
        const { data } = await userRequest.patch(`/teachers/${payload.id}`, payload);
        return data;
};

export const getUserProfile = async (path:string, id: string) => {
        const { data } = await userRequest.get(`/${path}/${id}`);
        return data;
};
