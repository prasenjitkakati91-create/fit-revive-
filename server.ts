import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";
import cors from "cors";
import fs from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(cors());

  // Dedicated Video Stream Handler for MP4 files
  // This handles Range requests manually which is more robust for Safari/iOS
  app.get("/*.mp4", (req, res, next) => {
    // Sanitize path by removing leading slash if present
    const cleanPath = req.path.startsWith('/') ? req.path.substring(1) : req.path;
    const filePath = path.join(process.cwd(), 'public', cleanPath);
    
    let activeFilePath = filePath;
    
    // Check if file exists in public
    if (!fs.existsSync(filePath)) {
      // Try dist as fallback if we are in production
      const fallbackPath = path.join(process.cwd(), 'dist', cleanPath);
      if (!fs.existsSync(fallbackPath)) {
        console.log(`Video file not found in public or dist: ${cleanPath}`);
        return next();
      }
      activeFilePath = fallbackPath;
    }

    const stat = fs.statSync(activeFilePath);
    const fileSize = stat.size;
    const range = req.headers.range;

    if (range) {
      const parts = range.replace(/bytes=/, "").split("-");
      const start = parseInt(parts[0], 10);
      // Handle "bytes=0-" case where parts[1] is empty
      const end = (parts[1] && parts[1] !== "") ? parseInt(parts[1], 10) : fileSize - 1;
      
      const chunksize = (end - start) + 1;
      const file = fs.createReadStream(activeFilePath, { start, end });
      const head = {
        'Content-Range': `bytes ${start}-${end}/${fileSize}`,
        'Accept-Ranges': 'bytes',
        'Content-Length': chunksize,
        'Content-Type': 'video/mp4',
      };
      res.writeHead(206, head);
      file.pipe(res);
    } else {
      const head = {
        'Content-Length': fileSize,
        'Content-Type': 'video/mp4',
        'Accept-Ranges': 'bytes',
      };
      res.writeHead(200, head);
      fs.createReadStream(activeFilePath).pipe(res);
    }
  });

  // Serve static files from public directory
  app.use(express.static(path.join(process.cwd(), 'public'), {
    maxAge: '1d',
    setHeaders: (res) => {
      res.setHeader('Access-Control-Allow-Origin', '*');
    }
  }));

  // API routes
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });

  const distPath = path.join(process.cwd(), 'dist');
  
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
