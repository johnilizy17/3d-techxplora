# WebRTC Video Display Fix

## Issue
Video streams were not displaying on the quiz monitoring screen even though WebRTC connections were being established.

## Root Causes Identified

### 1. Room Mismatch (FIXED)
- **Problem**: Student was joining room "24" (quiz.id) while teacher was joining "QZDFC7AF04" (quiz.quiz_code)
- **Solution**: Modified `QuizCameraSetup.jsx` to use `quiz.quiz_code` for WebRTC room joining instead of the URL parameter
- **File**: `v2/src/pages/QuizCameraSetup.jsx`

### 2. Peer Connection Initiation
- **Problem**: Only students were creating offers to teachers, but teachers weren't creating offers to students
- **Solution**: Modified WebRTC hook to allow both students and teachers to create offers when peers join
- **File**: `v2/src/hooks/useWebRTCStream.js`

### 3. Video Display Logic
- **Problem**: Videos were only shown if activity stream data existed, but WebRTC peers might connect before activity data is available
- **Solution**: Added separate section to display all WebRTC peer videos regardless of activity stream data
- **File**: `v2/src/pages/QuizMonitoring.jsx`

## Changes Made

### 1. QuizCameraSetup.jsx
```javascript
// Use the actual quiz_code from the quiz object for WebRTC room
const actualQuizCode = quiz?.quiz_code || quizCode;

// WebRTC streaming hook - use actual quiz_code for room joining
const { startStreaming, stopStreaming, isStreaming: isWebRTCStreaming } = useWebRTCStream(
    user?.id,
    actualQuizCode,  // Changed from quizCode
    'student'
);
```

### 2. useWebRTCStream.js
Added comprehensive logging throughout:
- Socket connection status
- Room joining events
- Peer connection creation
- Track addition
- Stream reception
- Connection state changes

Modified peer connection logic:
```javascript
// Students create offers to teachers, teachers create offers to students
if (role === 'student' && peerRole === 'teacher') {
    console.log('WebRTC: Student creating offer to teacher');
    await createPeerConnection(peerId, true);
} else if (role === 'teacher' && peerRole === 'student') {
    console.log('WebRTC: Teacher creating offer to student');
    await createPeerConnection(peerId, true);
}
```

### 3. QuizMonitoring.jsx
Added separate video display section:
```javascript
{/* Show WebRTC peers even if no activity streams yet */}
{Object.keys(peers).length > 0 && (
    <div className="mb-6">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
            Live Video Streams ({Object.keys(peers).length})
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Object.entries(peers).map(([peerId, peerData]) => (
                <div key={peerId} className="relative aspect-video bg-gray-900 rounded-xl overflow-hidden">
                    <video
                        ref={el => videoRefs.current[peerId] = el}
                        autoPlay
                        playsInline
                        muted
                        className="w-full h-full object-cover"
                    />
                    {/* Live indicator and user label */}
                </div>
            ))}
        </div>
    </div>
)}
```

## Testing Steps

1. **Start Signaling Server**:
   ```bash
   cd signaling-server
   npm start
   ```

2. **Student Side**:
   - Navigate to quiz camera setup page
   - Activate camera
   - Check browser console for WebRTC logs:
     - "WebRTC: Initializing connection"
     - "WebRTC: Socket connected"
     - "WebRTC: Joining quiz room"
     - "WebRTC: Starting streaming"

3. **Teacher Side**:
   - Navigate to quiz monitoring page with same quiz code
   - Check browser console for:
     - "WebRTC: Peer joined"
     - "WebRTC: Creating peer connection"
     - "WebRTC: Received remote stream"
   - Video should appear in "Live Video Streams" section

## Console Logs to Monitor

### Student Console:
```
WebRTC: Initializing connection { userId: 37, quizCode: "QZDFC7AF04", role: "student" }
WebRTC: Socket connected <socket-id>
WebRTC: Joining quiz room { userId: 37, quizCode: "QZDFC7AF04", role: "student" }
WebRTC: Starting streaming { streamId: "...", tracks: 2, videoTracks: 1, audioTracks: 1 }
WebRTC: Peer joined { peerId: 49, peerRole: "teacher", myRole: "student" }
WebRTC: Student creating offer to teacher
WebRTC: Creating peer connection { peerId: 49, createOffer: true }
WebRTC: Adding local stream tracks 2
```

### Teacher Console:
```
WebRTC: Initializing connection { userId: 49, quizCode: "QZDFC7AF04", role: "teacher" }
WebRTC: Socket connected <socket-id>
WebRTC: Joining quiz room { userId: 49, quizCode: "QZDFC7AF04", role: "teacher" }
WebRTC: Peer joined { peerId: 37, peerRole: "student", myRole: "teacher" }
WebRTC: Teacher creating offer to student
WebRTC: Received remote stream from 37 <MediaStream>
QuizMonitoring: Peers updated { peerCount: 1, peerIds: [37] }
QuizMonitoring: Setting video for peer { peerId: 37, hasVideoElement: true, hasStream: true }
```

### Signaling Server Console:
```
Client connected: <socket-id-1>
User 37 (student) joining quiz QZDFC7AF04
Room QZDFC7AF04 now has 1 participants
Client connected: <socket-id-2>
User 49 (teacher) joining quiz QZDFC7AF04
Room QZDFC7AF04 now has 2 participants
Forwarding offer from 37 to 49
Forwarding answer from 49 to 37
Forwarding ICE candidate from 37 to 49
Forwarding ICE candidate from 49 to 37
```

## Troubleshooting

### Video Not Showing
1. Check both browser consoles for errors
2. Verify both users are in the same quiz room (same quiz code)
3. Check signaling server logs to confirm message forwarding
4. Verify camera permissions are granted
5. Check network connectivity (WebRTC requires good connection)

### Connection Failed
1. Check STUN server accessibility
2. Verify firewall settings
3. Check if both users are behind restrictive NATs (may need TURN server)

### No Peer Joined Event
1. Verify signaling server is running
2. Check VITE_SOCKET_URL environment variable
3. Verify quiz codes match exactly

## Next Steps

If video still doesn't display:
1. Check browser console logs for specific errors
2. Verify WebRTC peer connection state
3. Test with different browsers
4. Consider adding TURN server for NAT traversal
5. Add more detailed error handling and user feedback
