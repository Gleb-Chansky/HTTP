import http from "http";
import { readdir } from "fs";

const host = "localhost";
const port = 3000;

const requestListener = (req, res) => {
  if (req.url === "/get") {
    if (req.method === "GET") {
      readdir("./files", (err, data) => {
        if (err) {
          res.writeHead(500);
          res.end("Internal server error");
          return;
        }
        res.writeHead(200);
        res.end(data.join(",\n"));
      });
    }
    res.writeHead(405);
    res.end("HTTP method not allowed");
    return;
  }
  if (req.url === "/delete") {
    console.log(req.method);
    if (req.method === "DELETE") {
      res.writeHead(200);
      res.end("Success! Delete page!");
      return;
    }
    res.writeHead(405);
    res.end("HTTP method not allowed");
    return;
  }
  if (req.url === "/post") {
    console.log(req.method);
    if (req.method === "POST") {
      res.writeHead(200);
      res.end("Success! Post page!");
      return;
    }
    res.writeHead(405);
    res.end("HTTP method not allowed");
    return;
  }

  if (req.url === "/redirect") {
    if (req.method === "GET") {
      res.writeHead(301);
      res.end("Ресурс постоянно доступен по адресу /redirected");
    }
  }
};

const server = http.createServer(requestListener);

server.listen(port, host, () => {
  console.log(`Server is started on address: http://${host}:${port}`);
});
