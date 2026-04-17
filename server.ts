import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";
import cors from "cors";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Use CORS to allow cross-origin requests
  app.use(cors());

  // Serve static files from public directory FIRST with strong streaming headers
  // This is where videos are located
  app.use(express.static(path.join(process.cwd(), 'public'), {
    maxAge: '1d',
    setHeaders: (res, localPath) => {
      res.setHeader('Access-Control-Allow-Origin', '*');
      if (localPath.toLowerCase().endsWith('.mp4')) {
        res.setHeader('Accept-Ranges', 'bytes');
        res.setHeader('Content-Type', 'video/mp4');
      }
    }
  }));

  // API routes
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });

  // Serve built assets in production
  const distPath = path.join(process.cwd(), 'dist');
  
  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { 
        middlewareMode: true,
        cors: true 
      },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    // Production Mode: Serve dist files
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch(err => {
  console.error("Failed to start server:", err);
});
