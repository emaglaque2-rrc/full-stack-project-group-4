import "dotenv/config";
import express from "express";
import cors from "cors";
import type {Request,Response,NextFunction} from "express";
import userRoutes from "./routes/userRoutes";

const app = express();

const frontendUrl = process.env.FRONTEND_URL || "http://localhost:5173";

if (!frontendUrl) {
  throw new Error("FRONTEND_URL is required");
}

app.use(cors({origin: frontendUrl}));

app.use(express.json());

app.use("/api/user", userRoutes);


// Central error handler
app.use((
  error: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  console.error(error);
  res.status(500).json({
    error: "Unexpected server error"
  });
});

export default app;