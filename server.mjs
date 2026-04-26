import http from 'http';
import fs from 'fs';
import path from 'path';

const PORT = 9000;

const server = http.createServer((req, res) => {
    // 最初に開くファイルを「webindex.html」に指定
    let filePath = req.url === '/' ? './webindex.html' : `.${req.url}`;
    
    const extname = path.extname(filePath);
    let contentType = 'text/html';
    
    if (extname === '.css') contentType = 'text/css';
    if (extname === '.mjs') contentType = 'text/javascript';

    fs.readFile(filePath, (err, content) => {
        if (err) {
            res.writeHead(404);
            res.end('File Not Found: ' + filePath);
        } else {
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content, 'utf-8');
        }
    });
});

server.listen(PORT, () => {
    console.log(`-----------------------------------------`);
    console.log(`サーバー起動！ http://localhost:${PORT} を開いてね`);
    console.log(`-----------------------------------------`);
});
