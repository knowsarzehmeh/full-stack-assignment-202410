import express, { Express } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import chatRoutes from "./routes/chats";
import ideasRoutes from "./routes/ideas";

const app: Express = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(bodyParser.json());

// Use chat and ideas routes
app.use("/api/chat", chatRoutes);
app.use("/api", ideasRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
