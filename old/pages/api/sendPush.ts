// pages/api/sendPush.ts
import Cors from "cors";
import type { NextApiRequest, NextApiResponse } from "next";
import admin from "firebase-admin";

// Initialize CORS
const cors = Cors({
  methods: ["POST", "OPTIONS"],
  origin: "*", // Allow all domains; replace with your domain for security
});

// Helper to run middleware
function runMiddleware(req: NextApiRequest, res: NextApiResponse, fn: Function) {
  return new Promise<void>((resolve, reject) => {
    fn(req, res, (result: any) => {
      if (result instanceof Error) return reject(result);
      return resolve();
    });
  });
}

// Firebase service account
const private_key = "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCyJoORNYg1G1BE\nOq4kKq3uoFs2tk0p2pgfoWSaPUzI9YSNJH3DQkaikGZyseSzzxH1MwOgiO+hgL+/\nigur5/JCD5r2KUUOz0QGMHdZ0eQOmcIuvcsxDoFewb1Qgsklr7blaBwqctTsMcfz\nBM0AnL8hWj6kYdIjsnUoMPuZwjd7z3hb0/BzPoxvh+3pZ/W6SXyRPl5ZTY6uVSvl\nzMoc/mxSmBFqrr2fkxlxenoGm2LOH4PcstUu67Ea4OhCm6PQHDFf52DfYt7FRYDc\nnjOvgu8NC1Iq7vqvmp34gayAIYU70r5vFpXa80e7zihX/xnus5Nw2n19Uqq/huer\n6goanZv7AgMBAAECggEAANWJ5wXeSWXxDkVMo2/bJlgGcLza7DWIGNAaW1eqtPGa\nfdoedcVNq+95JsF4w4WfisJeY7F3TcUj/CEIxPS3Ws/Udw8rjVIzHsRMeHoM01Aa\ntKebajyHuNOS1H4/IbfBecKl469HGjrfJ6gkYihZunbSR7Gdj2nMyFiJOZ6CCbZc\nZwJ4WeVKqxqyJQLJ3K7tgAeVxCXDW+7Yf2q+EAsLSl3fzhef2wwOaG8wO7q7hPiN\nh3WnvcPcYDdj/QNC8CcoYuwF7WVpnbypbX9DJl/fZiXtqZDVkOb1FMVS4+BYvPi3\n+3EqPBmZX2AzD/BAApy/snIq2rJqf7TpXJ/42rKaAQKBgQDZTBl6IwNcDcACF5IN\nAXOUPDP1YdR6IoAm/GGd0Ap0k5vaLQToIr8WEHo7zFmn8UYKpPUYg0aX5HF2f+dS\nrX8Jrnq2PAsIOywdOt2teh1pSE/UNYzyCu3FTjUcQqWxqXFIqMterDxcGLCCtly0\nvfxnDGaq0pBq+DqAst/897L7wQKBgQDR4Xk1LIlgrWUms4AV+XzYhEjK6v5/WOPq\nPAyAQ3La601ai9hbmftSGwVoIOZZYct4QQCrCeQliwKUs5kvTLlO9McDE+xyLw02\n7Pmq+xkykCOTWznCi+z6vUS99S6Pux3sWCrUZicm5BGaEzD6Zm29CMvioZhA3jI+\nmYkOPwU2uwKBgGs1PoSh7bBnIEpn8qj0BGAoa8IvKDOx/eQ+NLM1x1LI2OYFvBwD\nuJ9cNdJ2+ez//vyVck9LxXJ/RPOgGzMRYlIWgXiTmyXOe+9X8bL7QrOE983NNeLd\nPX5RHab5wuIqpTeh/+SPuZ/+lmeHLaoG6ha1aZnyFUqReduxZQ1b8DSBAoGARana\nanzq6G0FaxAfjqut9cwKwVe4u5pMpD3kRFqe7+00Ur6iRN1aXwlbBRIOg1KDj9m7\nmAoDcTav1525VcrYo016FRpy2/+kGjwULt2DopXXSRz5kgqR0TQrcgXEu653IzCs\nnq19h1oiQYrnMeX3vMwDqKjMeZOHB+I8bL8cQusCgYEA12gVpUeByDBzA+b8iewq\nLxatrz9AeB9XVE2KNpFoi4Ab5x1T7j2q41xPX9Fq+lD/pRuUTrNdqUm3myHfN8AJ\nhhMCxabHXT6balyVJkSJcpSy0qHEyH2EBrhcEJiG1r8U9BbVZTydyuQ1QE7EpT8M\na84dAfw2JH8/+cMOJE7eeas=\n-----END PRIVATE KEY-----\n"
const serviceAccount = {
  type: "service_account",
  project_id: "xplore-ai-288c9",
  private_key_id: "e16e102cca9ae679a9bc4069867dc196e457bc4b",
  private_key: private_key,
  client_email: "firebase-adminsdk-fbsvc@xplore-ai-288c9.iam.gserviceaccount.com",
  client_id: "116155924985145670486",
};

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount as any),
  });
}

const messaging = admin.messaging();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Run CORS middleware
  await runMiddleware(req, res, cors);
  res.setHeader("Access-Control-Allow-Origin", "*"); // Or your frontend domain
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { token, title, body, data } = req.body;

  if (!token || !title || !body) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    // Ensure all data values are strings
    const stringifiedData: { [key: string]: string } = {};
    if (data) {
      Object.keys(data).forEach((key) => {
        stringifiedData[key] = String(data[key]);
      });
    }

    const response = await messaging.send({
      token,
      notification: { title, body },
      data: stringifiedData,
    });

    return res.status(200).json({ message: "Notification sent", response });
  } catch (error) {
    console.error("Error sending notification:", error);
    return res.status(500).json({ error: "Failed to send notification", details: error });
  }
}
