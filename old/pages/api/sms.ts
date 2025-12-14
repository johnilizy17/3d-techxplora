import Cors from "cors";
import type { NextApiRequest, NextApiResponse } from "next";
// pages/api/send-sms.js (Pages Router)
import { KEYS } from "@/utils/constants";
import axios from "axios";

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
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Only POST requests allowed" });
  }

  const { to, code } = req.body;

  try {

    const response = await axios.post(`https://v3.api.termii.com/api/sms/send`, {
      to,
      from: KEYS.termii_sender, // must be approved sender ID in Termii
      type: "plain",
      sms: `your otp is ${code}`,
      channel: "generic",
      api_key: KEYS.termii_key,
    });

    res.status(200).json(response.data);
  } catch (error: any) {
    res.status(500).json({ error: error.response?.data || error.message });
  }
}
