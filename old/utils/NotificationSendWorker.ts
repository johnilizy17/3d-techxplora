import axios from "axios";
import { KEYS } from "./constants";
import { sendInteralEmail } from "@/url/route/verification";
import { SendGroupNotificationEmail, SendOptEmail } from "./emailDesign";
import { userRequest } from "@/url/api/server";

const API_BASE = KEYS.termii_api;

function generateOTP() {
    return Math.floor(100000 + Math.random() * 900000).toString();
}


export async function sendSMS(to: string) {
    try {
        const code = generateOTP();
        const res = await userRequest.post(`/send-sms`, {
            to,
            code
        });
        return code;
    } catch (err: any) {
        console.error("SMS Error:", err.response?.data || err.message);
        throw err;
    }
}

export async function sendEmailOTP(email: string) {
    const code = generateOTP();

    const { data } = await userRequest.post(`send-email`, {
        to: email,
        subject: "Techxplora Verification Code",
        message: SendOptEmail(code)
    })

    return code;
}
