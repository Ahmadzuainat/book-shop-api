import express from "express";
import dotenv from "dotenv";
import bookRoutes from "./routes/bookRoutes";
import cors from "cors";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

app.use("/book", bookRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
