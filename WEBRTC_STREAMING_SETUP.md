# WebRTC Live Video Streaming Setup

This document explains how to set up and use the live video streaming feature for quiz monitoring.

## Overview

The system uses WebRTC (Web Real-Time Communication) for peer-to-peer video streaming between students taking quizzes and teachers monitoring them. A signaling server facilitates the initial connection setup.

## Architecture

```
Student (Camera) <--WebRTC--> Teacher (Monitor)
        |                           |
        +-----> Signaling Server <--+
```

1. **Student Side**: Captures camera feed and streams it via WebRTC
2. **Teacher Side**: Receives and displays multiple student video feeds
3. **Signaling Server**: Coordinates WebRTC connection setup (offers, answers, ICE candidates)

## Installation

### 1. Install Dependencies

#### Frontend (v2)
```bash
cd v2
npm install socket.io-client
```

#### Signaling Server
```bash
cd signaling-server
npm install
```

### 2. Configure Environment Variables

Create or update `v2/.env`:
```env
VITE_SOCKET_URL=http://localhost:3001
```

For production, use your deployed signaling server URL:
```env
VITE_SOCKET_URL=https://your-signaling-server.com
```

## Running the System

### 1. Start the Signaling Server

```bash
cd signaling-server
npm start
```

For development with auto-reload:
```bash
npm run dev
```

The server will run on port 3001 by default.

### 2. Start the Frontend

```bash
cd v2
npm run dev
```

## How It Works

### Student Flow

1. Student navigates to Quiz Camera Setup page
2. Activates camera and microphone
3. WebRTC streaming automatically starts
4. Video feed is sent to any connected teachers

### Teacher Flow

1. Teacher navigates to Quiz Monitoring page
2. Selects a quiz to monitor
3. Automatically connects to all streaming students
4. Views live video feeds in real-time

## Features

- **Live Video Streaming**: Real-time camera feeds from students
- **Multiple Students**: Monitor multiple students simultaneously
- **Auto-Reconnection**: Handles network interruptions gracefully
- **Low Latency**: Peer-to-peer connection for minimal delay
- **Activity Timeline**: See student actions alongside video feed

## Troubleshooting

### No Video Showing

1. **Check Signaling Server**: Ensure it's running on the correct port
2. **Check Browser Console**: Look for WebRTC errors
3. **Firewall/Network**: Ensure WebRTC ports aren't blocked
4. **HTTPS Required**: WebRTC requires HTTPS in production (except localhost)

### Connection Issues

1. **STUN Servers**: The system uses Google's public STUN servers
2. **TURN Server**: For restrictive networks, you may need a TURN server
3. **Check Socket Connection**: Verify socket.io connection in browser console

### Performance Issues

1. **Bandwidth**: Each video stream requires ~1-2 Mbps
2. **CPU Usage**: Encoding/decoding video is CPU-intensive
3. **Limit Concurrent Streams**: Consider limiting visible streams at once

## Production Deployment

### Signaling Server

Deploy to a cloud service (Heroku, AWS, DigitalOcean, etc.):

```bash
# Example for Heroku
cd signaling-server
heroku create your-app-name
git push heroku main
```

### TURN Server (Optional but Recommended)

For production, set up a TURN server for better connectivity:

```javascript
// Update rtcConfig in useWebRTCStream.js
const rtcConfig = {
    iceServers: [
        { urls: 'stun:stun.l.google.com:19302' },
        {
            urls: 'turn:your-turn-server.com:3478',
            username: 'username',
            credential: 'password'
        }
    ]
};
```

Popular TURN server options:
- **coturn**: Open-source TURN server
- **Twilio**: Managed TURN service
- **Xirsys**: Managed TURN service

### SSL/HTTPS

WebRTC requires HTTPS in production. Ensure your frontend and signaling server use SSL certificates.

## API Reference

### useWebRTCStream Hook

```javascript
const {
    isStreaming,    // Boolean: Is currently streaming
    peers,          // Object: Connected peers { userId: { connection, stream } }
    error,          // String: Error message if any
    startStreaming, // Function: Start streaming with MediaStream
    stopStreaming,  // Function: Stop all streams
} = useWebRTCStream(userId, quizCode, role);
```

**Parameters:**
- `userId`: Current user's ID
- `quizCode`: Quiz code to join
- `role`: 'student' or 'teacher'

## Security Considerations

1. **Authentication**: Ensure only authorized users can join quiz rooms
2. **Room Isolation**: Quiz codes should be unique and hard to guess
3. **Data Privacy**: Video streams are peer-to-peer (not stored by default)
4. **Recording**: If recording is needed, implement server-side recording with proper consent

## Future Enhancements

- [ ] Screen sharing alongside camera
- [ ] Recording and playback
- [ ] Snapshot capture
- [ ] Bandwidth adaptation
- [ ] Grid/gallery view for multiple students
- [ ] Picture-in-picture mode
- [ ] Audio level indicators
- [ ] Connection quality indicators

## Support

For issues or questions:
1. Check browser console for errors
2. Verify signaling server logs
3. Test with simple WebRTC examples first
4. Ensure all dependencies are installed correctly
