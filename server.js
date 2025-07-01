const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3000;

// Serve static files from build directory
function serveStaticFile(res, filePath, contentType) {
    fs.readFile(filePath, (err, data) => {
        if (err) {
            res.writeHead(404);
            res.end('File not found');
            return;
        }
        res.writeHead(200, { 'Content-Type': contentType });
        res.end(data);
    });
}

const server = http.createServer((req, res) => {
    // Set CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    // Handle preflight requests
    if (req.method === 'OPTIONS') {
        res.writeHead(200);
        res.end();
        return;
    }

    // Handle API routes (for future OpenAI integration)
    if (req.url === '/api/chat' && req.method === 'POST') {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', () => {
            try {
                const { question } = JSON.parse(body);
                
                // Mock response for now
                const responses = [
                    `I understand you're asking about "${question}". This is a mock response since we're in development mode. In production, this would be a real response from the OpenAI Assistant.`,
                    `That's an interesting question about "${question}". Let me help you with that. This is currently a mock response.`,
                    `Regarding "${question}", here's what I can tell you. This is a development mock response.`,
                    `I'd be happy to help with "${question}". This response is currently mocked for development purposes.`
                ];
                
                const response = {
                    success: true,
                    message: responses[Math.floor(Math.random() * responses.length)]
                };
                
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify(response));
            } catch (error) {
                res.writeHead(400, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: 'Invalid request body' }));
            }
        });
        return;
    }

    // Serve static files from build directory
    let filePath = path.join(__dirname, 'build', req.url === '/' ? 'index.html' : req.url);
    
    // Check if file exists
    fs.access(filePath, fs.constants.F_OK, (err) => {
        if (err) {
            // If file doesn't exist, serve index.html for SPA routing
            if (!req.url.includes('.')) {
                filePath = path.join(__dirname, 'build', 'index.html');
            } else {
                res.writeHead(404);
                res.end('Not Found');
                return;
            }
        }
        
        // Determine content type
        const ext = path.extname(filePath);
        let contentType = 'text/html';
        
        switch (ext) {
            case '.js':
                contentType = 'application/javascript';
                break;
            case '.css':
                contentType = 'text/css';
                break;
            case '.json':
                contentType = 'application/json';
                break;
            case '.png':
                contentType = 'image/png';
                break;
            case '.jpg':
            case '.jpeg':
                contentType = 'image/jpeg';
                break;
            case '.svg':
                contentType = 'image/svg+xml';
                break;
        }
        
        serveStaticFile(res, filePath, contentType);
    });
});

server.listen(PORT, () => {
    console.log(`🚀 AI Chat Assistant PRODUCTION server running on http://localhost:${PORT}`);
    console.log(`📱 Open your browser and navigate to the URL above`);
    console.log(`🔐 The app is ready to use with Supabase authentication`);
    console.log(`📦 Serving production build from /build directory`);
}); 