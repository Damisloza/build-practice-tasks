import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { addTask, listTasks } from './tasks.js';

const port = Number(process.env.PORT) || 3000;
const page = new URL('../public/index.html', import.meta.url);

function sendJson(res, status, body) {
    res.writeHead(status, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(body));
}

const server = createServer(async (req, res) => {
    if (req.method === 'GET' && req.url === '/') {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(await readFile(page));
        return;
    }
    if (req.method === 'GET' && req.url === '/api/tasks') {
        sendJson(res, 200, listTasks());
        return;
    }
    if (req.method === 'POST' && req.url === '/api/tasks') {
        let raw = '';
        for await (const chunk of req) raw += chunk;
        try {
            const { title } = JSON.parse(raw || '{}');
            sendJson(res, 201, addTask(title));
        } catch {
            sendJson(res, 400, { error: 'Body must be JSON' });
        }
        return;
    }
    sendJson(res, 404, { error: 'Not found' });
});

server.listen(port, () => console.log(`Practice app on http://localhost:${port}`));