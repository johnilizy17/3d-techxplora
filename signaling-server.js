/**
 * Simple WebSocket Signaling Server for Live Streaming
 * Run with: node signaling-server.js
 */

const WebSocket = require('ws');
const http = require('http');

const PORT = 3001;

// Create HTTP server
const server = http.createServer();

// Create WebSocket server
const wss = new WebSocket.Server({ server });

// Store active streams and connections
const streams = new Map();
const admins = new Set();
const students = new Map();

console.log(`🚀 Signaling server starting on port ${PORT}...`);

wss.on('connection', (ws, req) => {
    const clientIp = req.socket.remoteAddress;
    console.log(`✅ New connection from ${clientIp}`);

    ws.on('message', (message) => {
        try {
            const data = JSON.parse(message);
            console.log(`📨 Received: ${data.type}`);

            handleMessage(ws, data);
        } catch (error) {
            console.error('❌ Error parsing message:', error);
        }
    });

    ws.on('close', () => {
        console.log(`👋 Client disconnected`);
        
        // Remove from admins if was admin
        admins.delete(ws);
        
        // Remove stream if was student
        for (const [streamId, stream] of streams.entries()) {
            if (stream.ws === ws) {
                streams.delete(streamId);
                broadcastToAdmins({
                    type: 'stream-stopped',
                    streamId: streamId
                });
                console.log(`🛑 Stream stopped: ${streamId}`);
            }
        }
    });

    ws.on('error', (error) => {
        console.error('❌ WebSocket error:', error);
    });
});

function handleMessage(ws, data) {
    switch (data.type) {
        case 'start-stream':
            handleStartStream(ws, data);
            break;

        case 'get-active-streams':
            handleGetActiveStreams(ws);
            break;

        case 'stop-stream':
            handleStopStream(data);
            break;

        case 'ice-candidate':
            handleIceCandidate(data);
            break;

        case 'answer':
            handleAnswer(data);
            break;

        case 'violation':
            handleViolation(data);
            break;

        case 'progress':
            handleProgress(data);
            break;

        default:
            console.log(`⚠️ Unknown message type: ${data.type}`);
    }
}

function handleStartStream(ws, data) {
    const streamId = `stream-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    
    const stream = {
        id: streamId,
        ws: ws,
        studentInfo: data.studentInfo,
        quizInfo: data.quizInfo,
        progress: {
            currentQuestion: 0,
            totalQuestions: 0
        },
        violations: [],
        violationCount: 0,
        startedAt: new Date().toISOString()
    };

    streams.set(streamId, stream);
    students.set(ws, streamId);

    // Send stream ID back to student
    ws.send(JSON.stringify({
        type: 'stream-started',
        streamId: streamId
    }));

    // Notify all admins
    broadcastToAdmins({
        type: 'stream-started',
        stream: {
            id: streamId,
            studentInfo: stream.studentInfo,
            quizInfo: stream.quizInfo,
            progress: stream.progress,
            violations: stream.violations,
            violationCount: stream.violationCount
        }
    });

    console.log(`✅ Stream started: ${streamId} - ${stream.studentInfo.name}`);
}

function handleGetActiveStreams(ws) {
    // Add to admins set
    admins.add(ws);

    // Send list of active streams
    const activeStreams = Array.from(streams.values()).map(stream => ({
        id: stream.id,
        studentInfo: stream.studentInfo,
        quizInfo: stream.quizInfo,
        progress: stream.progress,
        violations: stream.violations,
        violationCount: stream.violationCount,
        startedAt: stream.startedAt
    }));

    ws.send(JSON.stringify({
        type: 'active-streams',
        streams: activeStreams
    }));

    console.log(`📋 Sent ${activeStreams.length} active streams to admin`);
}

function handleStopStream(data) {
    const stream = streams.get(data.streamId);
    
    if (stream) {
        streams.delete(data.streamId);
        students.delete(stream.ws);

        // Notify admins
        broadcastToAdmins({
            type: 'stream-stopped',
            streamId: data.streamId
        });

        console.log(`🛑 Stream stopped: ${data.streamId}`);
    }
}

function handleIceCandidate(data) {
    // Relay ICE candidate to admins
    broadcastToAdmins({
        type: 'ice-candidate',
        streamId: data.streamId,
        candidate: data.candidate
    });
}

function handleAnswer(data) {
    // Relay answer to student
    const stream = streams.get(data.streamId);
    if (stream && stream.ws) {
        stream.ws.send(JSON.stringify({
            type: 'answer',
            answer: data.answer
        }));
    }
}

function handleViolation(data) {
    const stream = streams.get(data.streamId);
    
    if (stream) {
        stream.violations.push(data.violation);
        stream.violationCount = (stream.violationCount || 0) + 1;

        // Notify admins
        broadcastToAdmins({
            type: 'violation',
            streamId: data.streamId,
            violation: data.violation,
            violationCount: stream.violationCount
        });

        console.log(`⚠️ Violation detected: ${data.streamId} - ${data.violation.type}`);
    }
}

function handleProgress(data) {
    const stream = streams.get(data.streamId);
    
    if (stream) {
        stream.progress = data.progress;

        // Notify admins
        broadcastToAdmins({
            type: 'progress',
            streamId: data.streamId,
            progress: data.progress
        });
    }
}

function broadcastToAdmins(message) {
    const messageStr = JSON.stringify(message);
    let sentCount = 0;

    admins.forEach(admin => {
        if (admin.readyState === WebSocket.OPEN) {
            admin.send(messageStr);
            sentCount++;
        } else {
            // Remove disconnected admins
            admins.delete(admin);
        }
    });

    if (sentCount > 0) {
        console.log(`📡 Broadcast to ${sentCount} admin(s): ${message.type}`);
    }
}

// Start server
server.listen(PORT, () => {
    console.log(`✅ Signaling server running on ws://localhost:${PORT}`);
    console.log(`📊 Ready to handle connections...`);
});

// Graceful shutdown
process.on('SIGINT', () => {
    console.log('\n🛑 Shutting down server...');
    
    wss.clients.forEach(client => {
        client.close();
    });

    server.close(() => {
        console.log('✅ Server closed');
        process.exit(0);
    });
});

// Error handling
process.on('uncaughtException', (error) => {
    console.error('❌ Uncaught exception:', error);
});

process.on('unhandledRejection', (reason, promise) => {
    console.error('❌ Unhandled rejection at:', promise, 'reason:', reason);
});
