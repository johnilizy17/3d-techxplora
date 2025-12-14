import type { NextApiRequest, NextApiResponse } from "next";
import Cors from "cors";
// pages/api/send-sms.js (Pages Router)
import { KEYS } from "@/utils/constants";
import axios from "axios";

// Initialize the cors middleware
const cors = Cors({
  methods: ["GET", "POST", "PUT", "DELETE"],
  origin: "*", // Allow all domains, replace with specific domain for security
});

// Helper to run middleware in Next.js
function runMiddleware(req: NextApiRequest, res: NextApiResponse, fn: Function) {
  return new Promise<void>((resolve, reject) => {
    fn(req, res, (result: any) => {
      if (result instanceof Error) return reject(result);
      return resolve();
    });
  });
}



export default async function handler(req: any, res: any) {

  res.setHeader("Access-Control-Allow-Origin", "*"); // Or your frontend domain
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Only POST requests allowed" });
  }

  const { email, code } = req.body;

  try {

    const response = await axios.post(`https://v3.api.termii.com/api/email/otp/send`, {
      email_address: email,
      code_length: "6",
      code_type: "numeric",
      code: code,
      email_configuration_id: KEYS.email,
      expiration_time: "10", // minutes
      api_key: KEYS.termii_key,
    });

    res.status(200).json(response.data);
  } catch (error: any) {
    res.status(500).json({ error: error.response?.data || error.message });
  }
}
