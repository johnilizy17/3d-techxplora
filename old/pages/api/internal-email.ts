// pages/api/sendEmail.ts
import type { NextApiRequest, NextApiResponse } from "next";
import nodemailer from "nodemailer";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { to, subject, text } = req.body;

  try {
    // Configure transporter
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com", // or your SMTP provider
      port: 587,
      secure: false, // true if using 465
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Send mail
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to,
      subject,
      html:text,
    });

    return res.status(200).json({ message: "Email sent successfully!" });
  } catch (error: any) {
    console.error("Email error:", error);
    return res.status(500).json({ message: "Failed to send email" });
  }
}
