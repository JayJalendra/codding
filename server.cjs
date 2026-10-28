var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// server.ts
var import_express = __toESM(require("express"), 1);
var import_vite = require("vite");
var import_socket = require("socket.io");
var import_http = __toESM(require("http"), 1);
var import_https = __toESM(require("https"), 1);
async function startServer() {
  const app = (0, import_express.default)();
  const server = import_http.default.createServer(app);
  const io = new import_socket.Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"]
    }
  });
  const PORT = 3e3;
  app.use(import_express.default.json({ limit: "50mb" }));
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });
  app.get("/api/proxy-pdf", async (req, res) => {
    try {
      const { url } = req.query;
      if (!url || typeof url !== "string") {
        return res.status(400).json({ error: "URL parameter is required" });
      }
      const fetchWithRetry = async (targetUrl, retries = 2) => {
        const options = {
          headers: {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
            "Accept": "application/pdf,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
            "Accept-Language": "en-US,en;q=0.5",
            "Connection": "keep-alive",
            "Referer": "https://ncert.nic.in/"
          },
          rejectUnauthorized: false
        };
        return new Promise((resolve, reject) => {
          const client = targetUrl.startsWith("https") ? import_https.default : import_http.default;
          const request = client.get(targetUrl, options, (proxyRes) => {
            if (proxyRes.statusCode === 301 || proxyRes.statusCode === 302 || proxyRes.statusCode === 307 || proxyRes.statusCode === 308) {
              const redirectUrl = proxyRes.headers.location;
              if (redirectUrl) {
                const nextUrl = redirectUrl.startsWith("http") ? redirectUrl : new URL(redirectUrl, targetUrl).toString();
                return resolve(fetchWithRetry(nextUrl, retries));
              }
            }
            if (proxyRes.statusCode !== 200) {
              return reject(new Error(`Status Code: ${proxyRes.statusCode}`));
            }
            const chunks = [];
            proxyRes.on("data", (chunk) => chunks.push(chunk));
            proxyRes.on("end", () => resolve(Buffer.concat(chunks)));
            proxyRes.on("error", reject);
          });
          request.on("error", reject);
          request.setTimeout(15e3, () => {
            request.destroy();
            reject(new Error("Timeout"));
          });
        }).catch((err) => {
          if (retries > 0) {
            console.log(`Retrying fetch for ${targetUrl}, retries left: ${retries - 1}`);
            return fetchWithRetry(targetUrl, retries - 1);
          }
          throw err;
        });
      };
      try {
        const buffer = await fetchWithRetry(url);
        res.setHeader("Content-Type", "application/pdf");
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.setHeader("Content-Length", buffer.length);
        res.send(buffer);
      } catch (err) {
        console.log(`Direct fetch failed: ${err.message}, trying corsproxy.io...`);
        const proxyUrl = `https://corsproxy.io/?${encodeURIComponent(url)}`;
        const buffer = await fetchWithRetry(proxyUrl, 1);
        res.setHeader("Content-Type", "application/pdf");
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.setHeader("Content-Length", buffer.length);
        res.send(buffer);
      }
    } catch (error) {
      console.error("PDF Proxy error:", error);
      if (!res.headersSent) {
        res.status(500).json({ error: error.message });
      }
    }
  });
  app.get("/api/proxy-model", async (req, res) => {
    try {
      const { url } = req.query;
      if (!url || typeof url !== "string") {
        return res.status(400).json({ error: "URL parameter is required" });
      }
      const client = url.startsWith("https") ? import_https.default : import_http.default;
      const options = {
        headers: {
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
          "Accept": "*/*"
        },
        rejectUnauthorized: false
      };
      const request = client.get(url, options, (proxyRes) => {
        if (proxyRes.statusCode === 301 || proxyRes.statusCode === 302 || proxyRes.statusCode === 307 || proxyRes.statusCode === 308) {
          const redirectUrl = proxyRes.headers.location;
          if (redirectUrl) {
            const nextUrl = redirectUrl.startsWith("http") ? redirectUrl : new URL(redirectUrl, url).toString();
            return res.redirect(307, `/api/proxy-model?url=${encodeURIComponent(nextUrl)}`);
          }
        }
        const contentType = proxyRes.headers["content-type"] || "";
        if (contentType.toLowerCase().includes("text/html")) {
          if (!res.headersSent) {
            res.status(404).json({ error: "Received HTML instead of a valid 3D model (Soft 404)" });
          }
          request.destroy();
          return;
        }
        if (proxyRes.statusCode && proxyRes.statusCode >= 400) {
          if (!res.headersSent) {
            res.status(proxyRes.statusCode).json({ error: `Remote server returned status ${proxyRes.statusCode}` });
          }
          request.destroy();
          return;
        }
        if (!res.headersSent) {
          res.status(proxyRes.statusCode || 200);
          res.setHeader("Access-Control-Allow-Origin", "*");
          res.setHeader("Access-Control-Expose-Headers", "Content-Length, Content-Type, Content-Encoding");
          if (proxyRes.headers["content-type"]) {
            res.setHeader("Content-Type", proxyRes.headers["content-type"]);
          }
          if (proxyRes.headers["content-length"]) {
            res.setHeader("Content-Length", proxyRes.headers["content-length"]);
          }
          if (proxyRes.headers["content-encoding"]) {
            res.setHeader("Content-Encoding", proxyRes.headers["content-encoding"]);
          }
        }
        proxyRes.pipe(res);
      });
      request.on("error", (err) => {
        if (!res.headersSent) {
          res.status(500).json({ error: err.message });
        }
      });
      request.setTimeout(15e3, () => {
        request.destroy();
        if (!res.headersSent) {
          res.status(504).json({ error: "Timeout" });
        }
      });
    } catch (error) {
      console.error("Model Proxy error:", error);
      if (!res.headersSent) {
        res.status(500).json({ error: error.message });
      }
    }
  });
  app.post("/api/generate-3d", async (req, res) => {
    try {
      const { prompt, imageUrl } = req.body;
      const apiKey = process.env.MESHY_API_KEY;
      if (!apiKey) {
        return res.status(400).json({ error: "MESHY_API_KEY is not configured in the environment." });
      }
      let endpoint = "";
      let payload = {};
      if (imageUrl) {
        endpoint = "https://api.meshy.ai/v1/image-to-3d";
        payload = {
          image_url: imageUrl,
          enable_pbr: true
        };
      } else if (prompt) {
        endpoint = "https://api.meshy.ai/v2/text-to-3d";
        payload = {
          mode: "preview",
          prompt,
          art_style: "realistic",
          should_remesh: true
        };
      } else {
        return res.status(400).json({ error: "Must provide prompt or imageUrl" });
      }
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${apiKey}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });
      if (!response.ok) {
        const errorText = await response.text();
        console.error("Meshy API Error:", errorText);
        return res.status(response.status).json({ error: `Meshy API Error: ${errorText}` });
      }
      const data = await response.json();
      res.json({ taskId: data.result });
    } catch (error) {
      console.error("3D Generation error:", error);
      res.status(500).json({ error: error.message });
    }
  });
  app.get("/api/generate-3d/:taskId", async (req, res) => {
    try {
      const { taskId } = req.params;
      const apiKey = process.env.MESHY_API_KEY;
      if (!apiKey) {
        return res.status(400).json({ error: "MESHY_API_KEY is not configured." });
      }
      let response = await fetch(`https://api.meshy.ai/v2/text-to-3d/${taskId}`, {
        headers: { "Authorization": `Bearer ${apiKey}` }
      });
      if (response.status === 404) {
        response = await fetch(`https://api.meshy.ai/v1/image-to-3d/${taskId}`, {
          headers: { "Authorization": `Bearer ${apiKey}` }
        });
      }
      if (!response.ok) {
        const errorText = await response.text();
        return res.status(response.status).json({ error: `Meshy API Error: ${errorText}` });
      }
      const data = await response.json();
      res.json(data);
    } catch (error) {
      console.error("3D Polling error:", error);
      res.status(500).json({ error: error.message });
    }
  });
  const users = {};
  let currentTopic = "Atom";
  let modelTransform = { position: [0, 0, 0], rotation: [0, 0, 0] };
  io.on("connection", (socket) => {
    console.log("User connected:", socket.id);
    users[socket.id] = { id: socket.id, position: [0, 0, 0], rotation: [0, 0, 0] };
    socket.emit("init", {
      users,
      currentTopic,
      modelTransform
    });
    socket.broadcast.emit("user:joined", users[socket.id]);
    socket.on("user:move", (transform) => {
      if (users[socket.id]) {
        users[socket.id].position = transform.position;
        users[socket.id].rotation = transform.rotation;
        socket.broadcast.emit("user:moved", users[socket.id]);
      }
    });
    socket.on("topic:change", (topic) => {
      currentTopic = topic;
      io.emit("topic:changed", topic);
    });
    socket.on("model:move", (transform) => {
      modelTransform = transform;
      socket.broadcast.emit("model:moved", transform);
    });
    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);
      delete users[socket.id];
      io.emit("user:left", socket.id);
    });
  });
  if (process.env.NODE_ENV !== "production") {
    const vite = await (0, import_vite.createServer)({
      server: { middlewareMode: true },
      appType: "spa"
    });
    app.use(vite.middlewares);
  } else {
    app.use(import_express.default.static("dist"));
  }
  server.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}
startServer();
//# sourceMappingURL=server.cjs.map
