const http = require("node:http");
const fs = require("node:fs");
const path = require("node:path");

const host = "127.0.0.1";
const port = 3000;

function sendResponse(res, statusCode, contentType, content) {
  res.writeHead(statusCode, { "Content-Type": contentType });
  res.end(content);
}

function sendFile(res, filePath, contentType) {
  fs.readFile(filePath, "utf8", (error, content) => {
    if (error) {
      sendResponse(res, 500, "text/plain; charset=utf-8", "Error interno del servidor");
      return;
    }

    sendResponse(res, 200, contentType, content);
  });
}

const server = http.createServer((req, res) => {
  console.log(`${req.method} ${req.url}`);

  if (req.method === "GET" && req.url === "/") {
    const filePath = path.join(__dirname, "public", "index.html");
    sendFile(res, filePath, "text/html; charset=utf-8");
    return;
  }

  if (req.method === "GET" && req.url === "/script.js") {
    const filePath = path.join(__dirname, "public", "script.js");
    sendFile(res, filePath, "text/javascript; charset=utf-8");
    return;
  }

  if (req.method === "GET" && req.url === "/api/saludo") {
    const data = {
      mensaje: "Hola mundo desde Node.js",
      tecnologia: "Servidor HTTP con JavaScript",
      estado: 200
    };

    sendResponse(res, 200, "application/json; charset=utf-8", JSON.stringify(data));
    return;
  }

  if (req.method === "GET" && req.url === "/api/status") {
    sendResponse(res, 200, "text/plain; charset=utf-8", "Servidor funcionando correctamente");
    return;
  }

  sendResponse(res, 404, "text/plain; charset=utf-8", "Página no encontrada");
});

server.listen(port, host, () => {
  console.log(`Servidor ejecutándose en http://${host}:${port}`);
});