import express, { Request, Response } from "express";
import axios from "axios";
import bodyParser from "body-parser";
import cors from "cors";

const app = express();
const port = 4000;

// Middleware
app.use(bodyParser.json());
// un comment for local uncontainerized testing
const REPO_SERVER_URL = "http://localhost:8080";

// SEE NOTE: this url depends on the name of the container in your docker daemon that is exposing port 8080
// const REPO_SERVER_URL = "http://github-fav-repos-reposerver-1:8080";

app.use(cors());

// Endpoints
app.get("/health", (req: Request, res: Response) => {
  res.status(200).json({
    message: "Server is healthy",
  });
});

app.get("/repo/", async (req: Request, res: Response) => {
  try {
    const { data } = await axios.get(`${REPO_SERVER_URL}/repo/`);
    res.json(data);
  } catch (error: any) {
    console.log(error, "the error");
    res.status(500).json({
      message: "Failed to fetch repositories from reposerver",
      error:
        error.code === "ECONNREFUSED" ? "You forgot to start docker" : error,
    });
  }
});

app.post("/repo/", async (req: Request, res: Response) => {
  try {
    const { data } = await axios.post(`${REPO_SERVER_URL}/repo/`, req.body);
    res.json(data);
  } catch (error) {
    res.status(500).json({
      message: "Failed to create repository on reposerver",
      error: JSON.stringify(error),
    });
  }
});

app.delete("/repo/:repoId", async (req: Request, res: Response) => {
  const repoId = req.params.repoId;

  if (!repoId) {
    return res.status(400).json({ message: "Repo ID is required." });
  }

  try {
    await axios.delete(`${REPO_SERVER_URL}/repo/${repoId}`);
    res.json({ message: "Repository deleted successfully on reposerver." });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to delete repository on reposerver" });
  }
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});

// Dummy export to ensure the file is treated as a module.
module.exports = {};
