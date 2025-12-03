import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import cvRouter from "./routes/cv.route";

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    credentials: true,
    allowedHeaders: ["Content-Type"],
    exposedHeaders: ["Content-Disposition"],
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/cv", cvRouter);

app.listen(process.env.PORT, () => {
  console.log(`Server running on http://localhost:${process.env.PORT}`);
});

app.use((err: any, req: any, res: any, next: any) => {
  console.error("🔥 BACKEND ERROR:", err.message);
  res.status(500).json({ error: err.message });
});
