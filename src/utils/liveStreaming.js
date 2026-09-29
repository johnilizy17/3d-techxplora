/**
 * Live Streaming Utility for Quiz Proctoring
 * Uses WebRTC for real-time video/audio streaming to admin dashboard
 */

class LiveStreamManager {
    constructor() {
        this.peerConnection = null;
        this.localStream = null;
        this.dataChannel = null;
        this.isStreaming = false;
        this.streamId = null;
        this.studentInfo = null;
        this.quizInfo = null;
        this.websocket = null;
        this.reconnectAttempts = 0;
        this.maxReconnectAttempts = 5;
    }

    /**
     * Initialize WebSocket connection to signaling server
     */
    async initializeWebSocket(serverUrl = 'ws://localhost:3001') {
        return new Promise((resolve, reject) => {
            try {
                this.websocket = new WebSocket(serverUrl);

                this.websocket.onopen = () => {
                    console.log('✅ WebSocket connected to signaling server');
                    this.reconnectAttempts = 0;
                    resolve();
                };

                this.websocket.onmessage = async (event) => {
                    const message = JSON.parse(event.data);
                    await this.handleSignalingMessage(message);
                };

                this.websocket.onerror = (error) => {
                    console.error('❌ WebSocket error:', error);
                    reject(error);
                };

                this.websocket.onclose = () => {
                    console.warn('⚠️ WebSocket disconnected');
                    this.handleDisconnect();
                };
            } catch (error) {
                console.error('❌ Failed to initialize WebSocket:', error);
                reject(error);
            }
        });
    }

    /**
     * Handle signaling messages from server
     */
    async handleSignalingMessage(message) {
        switch (message.type) {
            case 'offer':
                await this.handleOffer(message.offer);
                break;
            case 'answer':
                await this.handleAnswer(message.answer);
                break;
            case 'ice-candidate':
                await this.handleIceCandidate(message.candidate);
                break;
            case 'stream-started':
                console.log('✅ Stream started:', message.streamId);
                this.streamId = message.streamId;
                break;
            case 'viewer-joined':
                console.log('👁️ Viewer joined:', message.viewerId);
                break;
            case 'viewer-left':
                console.log('👋 Viewer left:', message.viewerId);
                break;
            default:
                console.log('Unknown message type:', message.type);
        }
    }

    /**
     * Start live streaming
     */
    async startStreaming(cameraStream, screenStream, studentInfo, quizInfo) {
        try {
            this.studentInfo = studentInfo;
            this.quizInfo = quizInfo;

            // Create composite stream (camera + screen)
            this.localStream = new MediaStream();

            // Add camera video and audio
            if (cameraStream) {
                cameraStream.getTracks().forEach(track => {
                    this.localStream.addTrack(track);
                });
            }

            // Add screen video (no audio from screen)
            if (screenStream) {
                const screenVideoTrack = screenStream.getVideoTracks()[0];
                if (screenVideoTrack) {
                    // Clone and label the track
                    const clonedTrack = screenVideoTrack.clone();
                    clonedTrack.label = 'screen';
                    this.localStream.addTrack(clonedTrack);
                }
            }

            // Initialize WebSocket connection
            await this.initializeWebSocket();

            // Create peer connection
            await this.createPeerConnection();

            // Add tracks to peer connection
            this.localStream.getTracks().forEach(track => {
                this.peerConnection.addTrack(track, this.localStream);
            });

            // Create and send offer
            const offer = await this.peerConnection.createOffer({
                offerToReceiveAudio: false,
                offerToReceiveVideo: false
            });

            await this.peerConnection.setLocalDescription(offer);

            // Send offer to signaling server
            this.sendSignalingMessage({
                type: 'start-stream',
                offer: offer,
                studentInfo: {
                    id: studentInfo.id,
                    name: `${studentInfo.first_name} ${studentInfo.last_name}`,
                    email: studentInfo.email
                },
                quizInfo: {
                    id: quizInfo.id,
                    code: quizInfo.quiz_code,
                    title: quizInfo.title
                },
                timestamp: new Date().toISOString()
            });

            this.isStreaming = true;
            console.log('✅ Live streaming started');

            return { success: true, streamId: this.streamId };
        } catch (error) {
            console.error('❌ Failed to start streaming:', error);
            return { success: false, error: error.message };
        }
    }

    /**
     * Create WebRTC peer connection
     */
    async createPeerConnection() {
        const configuration = {
            iceServers: [
                { urls: 'stun:stun.l.google.com:19302' },
                { urls: 'stun:stun1.l.google.com:19302' },
                // Add TURN servers for production
                // {
                //     urls: 'turn:your-turn-server.com:3478',
                //     username: 'username',
                //     credential: 'password'
                // }
            ]
        };

        this.peerConnection = new RTCPeerConnection(configuration);

        // Handle ICE candidates
        this.peerConnection.onicecandidate = (event) => {
            if (event.candidate) {
                this.sendSignalingMessage({
                    type: 'ice-candidate',
                    candidate: event.candidate,
                    streamId: this.streamId
                });
            }
        };

        // Handle connection state changes
        this.peerConnection.onconnectionstatechange = () => {
            console.log('Connection state:', this.peerConnection.connectionState);
            
            if (this.peerConnection.connectionState === 'failed') {
                this.handleConnectionFailure();
            }
        };

        // Create data channel for metadata
        this.dataChannel = this.peerConnection.createDataChannel('metadata');
        
        this.dataChannel.onopen = () => {
            console.log('✅ Data channel opened');
            this.sendMetadata();
        };

        this.dataChannel.onmessage = (event) => {
            console.log('📨 Received message:', event.data);
        };
    }

    /**
     * Handle offer from signaling server
     */
    async handleOffer(offer) {
        if (!this.peerConnection) {
            await this.createPeerConnection();
        }

        await this.peerConnection.setRemoteDescription(new RTCSessionDescription(offer));
        
        const answer = await this.peerConnection.createAnswer();
        await this.peerConnection.setLocalDescription(answer);

        this.sendSignalingMessage({
            type: 'answer',
            answer: answer,
            streamId: this.streamId
        });
    }

    /**
     * Handle answer from signaling server
     */
    async handleAnswer(answer) {
        await this.peerConnection.setRemoteDescription(new RTCSessionDescription(answer));
    }

    /**
     * Handle ICE candidate
     */
    async handleIceCandidate(candidate) {
        try {
            await this.peerConnection.addIceCandidate(new RTCIceCandidate(candidate));
        } catch (error) {
            console.error('❌ Error adding ICE candidate:', error);
        }
    }

    /**
     * Send signaling message via WebSocket
     */
    sendSignalingMessage(message) {
        if (this.websocket && this.websocket.readyState === WebSocket.OPEN) {
            this.websocket.send(JSON.stringify(message));
        } else {
            console.error('❌ WebSocket not connected');
        }
    }

    /**
     * Send metadata through data channel
     */
    sendMetadata() {
        if (this.dataChannel && this.dataChannel.readyState === 'open') {
            const metadata = {
                type: 'metadata',
                studentInfo: this.studentInfo,
                quizInfo: this.quizInfo,
                timestamp: new Date().toISOString()
            };
            this.dataChannel.send(JSON.stringify(metadata));
        }
    }

    /**
     * Send violation event
     */
    sendViolation(violation) {
        if (this.dataChannel && this.dataChannel.readyState === 'open') {
            const message = {
                type: 'violation',
                violation: violation,
                timestamp: new Date().toISOString()
            };
            this.dataChannel.send(JSON.stringify(message));
        }

        // Also send via WebSocket as backup
        this.sendSignalingMessage({
            type: 'violation',
            streamId: this.streamId,
            violation: violation
        });
    }

    /**
     * Send quiz progress update
     */
    sendProgress(progress) {
        if (this.dataChannel && this.dataChannel.readyState === 'open') {
            const message = {
                type: 'progress',
                progress: progress,
                timestamp: new Date().toISOString()
            };
            this.dataChannel.send(JSON.stringify(message));
        }
    }

    /**
     * Stop streaming
     */
    async stopStreaming() {
        try {
            // Send stop message
            this.sendSignalingMessage({
                type: 'stop-stream',
                streamId: this.streamId
            });

            // Close data channel
            if (this.dataChannel) {
                this.dataChannel.close();
                this.dataChannel = null;
            }

            // Close peer connection
            if (this.peerConnection) {
                this.peerConnection.close();
                this.peerConnection = null;
            }

            // Close WebSocket
            if (this.websocket) {
                this.websocket.close();
                this.websocket = null;
            }

            // Stop local stream tracks
            if (this.localStream) {
                this.localStream.getTracks().forEach(track => track.stop());
                this.localStream = null;
            }

            this.isStreaming = false;
            this.streamId = null;

            console.log('✅ Live streaming stopped');
            return { success: true };
        } catch (error) {
            console.error('❌ Failed to stop streaming:', error);
            return { success: false, error: error.message };
        }
    }

    /**
     * Handle connection failure
     */
    handleConnectionFailure() {
        console.error('🚨 Connection failed');
        
        if (this.reconnectAttempts < this.maxReconnectAttempts) {
            this.reconnectAttempts++;
            console.log(`🔄 Attempting to reconnect (${this.reconnectAttempts}/${this.maxReconnectAttempts})...`);
            
            setTimeout(() => {
                this.reconnect();
            }, 2000 * this.reconnectAttempts); // Exponential backoff
        } else {
            console.error('❌ Max reconnection attempts reached');
            this.dispatchEvent('connection-failed');
        }
    }

    /**
     * Handle disconnect
     */
    handleDisconnect() {
        if (this.isStreaming && this.reconnectAttempts < this.maxReconnectAttempts) {
            this.reconnectAttempts++;
            console.log(`🔄 Reconnecting (${this.reconnectAttempts}/${this.maxReconnectAttempts})...`);
            
            setTimeout(() => {
                this.reconnect();
            }, 2000 * this.reconnectAttempts);
        }
    }

    /**
     * Reconnect to signaling server
     */
    async reconnect() {
        try {
            await this.initializeWebSocket();
            
            if (this.localStream) {
                await this.startStreaming(
                    this.localStream,
                    null,
                    this.studentInfo,
                    this.quizInfo
                );
            }
        } catch (error) {
            console.error('❌ Reconnection failed:', error);
            this.handleConnectionFailure();
        }
    }

    /**
     * Dispatch custom event
     */
    dispatchEvent(eventName, detail = {}) {
        window.dispatchEvent(new CustomEvent(eventName, { detail }));
    }

    /**
     * Get streaming status
     */
    getStatus() {
        return {
            isStreaming: this.isStreaming,
            streamId: this.streamId,
            connectionState: this.peerConnection?.connectionState,
            iceConnectionState: this.peerConnection?.iceConnectionState,
            dataChannelState: this.dataChannel?.readyState
        };
    }
}

// Create singleton instance
const liveStreamManager = new LiveStreamManager();

export default liveStreamManager;
export { LiveStreamManager };
