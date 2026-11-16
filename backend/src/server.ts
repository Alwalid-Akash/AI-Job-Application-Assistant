import "dotenv/config";
import express, { Request, Response } from "express";

const app = express();
const PORT = Number(process.env.PORT) || 3000;

// Parse JSON request bodies
app.use(express.json());

// Health check: confirms the server is running
app.get("/api/health", (_req: Request, res: Response) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});