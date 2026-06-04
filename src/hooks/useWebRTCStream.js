import { useState, useEffect, useRef, useCallback } from 'react';
import { io } from 'socket.io-client';

/**
 * WebRTC Hook for Live Video Streaming
 * Handles peer-to-peer video streaming between students and teachers
 */
export function useWebRTCStream(userId, quizCode, role = 'student') {
    const [isStreaming, setIsStreaming] = useState(false);
    const [error, setError] = useState(null);
    const [peers, setPeers] = useState({}); // { userId: { connection, stream } }
    
    const socketRef = useRef(null);
    const localStreamRef = useRef(null);
    const peerConnectionsRef = useRef({});

    // WebRTC configuration
    const rtcConfig = {
        iceServers: [
            { urls: 'stun:stun.l.google.com:19302' },
            { urls: 'stun:stun1.l.google.com:19302' },
        ]
    };

    /**
     * Initialize socket connection
     */
    useEffect(() => {
        if (!userId || !quizCode) {
            console.log('WebRTC: Missing userId or quizCode', { userId, quizCode });
            return;
        }

        console.log('WebRTC: Initializing connection', { userId, quizCode, role });

        // Connect to signaling server
        const socketUrl = import.meta.env.VITE_SOCKET_URL || 'http://localhost:3001';
        console.log('WebRTC: Connecting to signaling server', socketUrl);
        
        socketRef.current = io(socketUrl, {
            transports: ['websocket', 'polling'],
            secure: socketUrl.startsWith('https'),
        });

        const socket = socketRef.current;

        socket.on('connect', () => {
            console.log('WebRTC: Socket connected', socket.id);
        });

        // Join quiz room
        console.log('WebRTC: Joining quiz room', { userId, quizCode, role });
        socket.emit('join-quiz', { userId, quizCode, role });

        // Handle new peer joining
        socket.on('peer-joined', async ({ peerId, peerRole }) => {
            console.log('WebRTC: Peer joined', { peerId, peerRole, myRole: role });
            
            // Only students create offers to avoid "glare" condition
            // Teachers wait to receive offers from students
            if (role === 'student' && peerRole === 'teacher') {
                console.log('WebRTC: Student creating offer to teacher');
                await createPeerConnection(peerId, true);
            } else if (role === 'teacher' && peerRole === 'student') {
                console.log('WebRTC: Teacher waiting for offer from student');
                // Teacher just creates the peer connection, doesn't send offer
                await createPeerConnection(peerId, false);
            }
        });

        // Handle receiving offer
        socket.on('offer', async ({ from, offer }) => {
            console.log('Received offer from:', from);
            await handleOffer(from, offer);
        });

        // Handle receiving answer
        socket.on('answer', async ({ from, answer }) => {
            console.log('Received answer from:', from);
            await handleAnswer(from, answer);
        });

        // Handle ICE candidate
        socket.on('ice-candidate', async ({ from, candidate }) => {
            console.log('Received ICE candidate from:', from);
            await handleIceCandidate(from, candidate);
        });

        // Handle peer leaving
        socket.on('peer-left', ({ peerId }) => {
            console.log('Peer left:', peerId);
            closePeerConnection(peerId);
        });

        return () => {
            socket.disconnect();
        };
    }, [userId, quizCode, role]);

    /**
     * Create peer connection
     */
    const createPeerConnection = async (peerId, createOffer = false) => {
        try {
            console.log('WebRTC: Creating peer connection', { peerId, createOffer });
            const peerConnection = new RTCPeerConnection(rtcConfig);
            peerConnectionsRef.current[peerId] = peerConnection;

            // Add local stream tracks
            if (localStreamRef.current) {
                console.log('WebRTC: Adding local stream tracks', localStreamRef.current.getTracks().length);
                localStreamRef.current.getTracks().forEach(track => {
                    peerConnection.addTrack(track, localStreamRef.current);
                    console.log('WebRTC: Added track', track.kind);
                });
            } else {
                console.warn('WebRTC: No local stream available to add tracks');
            }

            // Handle ICE candidates
            peerConnection.onicecandidate = (event) => {
                if (event.candidate) {
                    console.log('WebRTC: Sending ICE candidate to', peerId);
                    socketRef.current.emit('ice-candidate', {
                        to: peerId,
                        candidate: event.candidate,
                    });
                }
            };

            // Handle incoming stream
            peerConnection.ontrack = (event) => {
                console.log('WebRTC: Received remote stream from', peerId, event.streams[0]);
                setPeers(prev => ({
                    ...prev,
                    [peerId]: {
                        connection: peerConnection,
                        stream: event.streams[0],
                    }
                }));
            };

            // Handle connection state changes
            peerConnection.onconnectionstatechange = () => {
                console.log('WebRTC: Connection state changed', { peerId, state: peerConnection.connectionState });
                if (peerConnection.connectionState === 'failed') {
                    console.error('WebRTC: Connection failed for peer', peerId);
                    closePeerConnection(peerId);
                }
            };

            // Create and send offer if needed
            if (createOffer) {
                console.log('WebRTC: Creating offer for', peerId);
                const offer = await peerConnection.createOffer();
                await peerConnection.setLocalDescription(offer);
                
                console.log('WebRTC: Sending offer to', peerId);
                socketRef.current.emit('offer', {
                    to: peerId,
                    offer: offer,
                });
            }

            return peerConnection;
        } catch (err) {
            console.error('WebRTC: Error creating peer connection', err);
            setError(err.message);
            return null;
        }
    };

    /**
     * Handle incoming offer
     */
    const handleOffer = async (peerId, offer) => {
        try {
            console.log('WebRTC: Handling offer from', peerId);
            let peerConnection = peerConnectionsRef.current[peerId];
            
            if (!peerConnection) {
                console.log('WebRTC: Creating new peer connection for offer');
                peerConnection = await createPeerConnection(peerId, false);
            }

            // Check if we're in a valid state to set remote description
            if (peerConnection.signalingState !== 'stable') {
                console.warn('WebRTC: Peer connection not in stable state, current state:', peerConnection.signalingState);
                // If we're already handling an offer, ignore this one (polite peer pattern)
                if (role === 'teacher') {
                    console.log('WebRTC: Teacher ignoring duplicate offer');
                    return;
                }
            }

            await peerConnection.setRemoteDescription(new RTCSessionDescription(offer));
            console.log('WebRTC: Remote description set successfully');
            
            const answer = await peerConnection.createAnswer();
            await peerConnection.setLocalDescription(answer);
            console.log('WebRTC: Answer created and set as local description');
            
            socketRef.current.emit('answer', {
                to: peerId,
                answer: answer,
            });
            console.log('WebRTC: Answer sent to', peerId);
        } catch (err) {
            console.error('Error handling offer:', err);
            setError(err.message);
        }
    };

    /**
     * Handle incoming answer
     */
    const handleAnswer = async (peerId, answer) => {
        try {
            console.log('WebRTC: Handling answer from', peerId);
            const peerConnection = peerConnectionsRef.current[peerId];
            if (peerConnection) {
                // Check signaling state before setting remote description
                if (peerConnection.signalingState === 'have-local-offer') {
                    await peerConnection.setRemoteDescription(new RTCSessionDescription(answer));
                    console.log('WebRTC: Answer set as remote description');
                } else {
                    console.warn('WebRTC: Cannot set answer, wrong signaling state:', peerConnection.signalingState);
                }
            } else {
                console.warn('WebRTC: No peer connection found for', peerId);
            }
        } catch (err) {
            console.error('Error handling answer:', err);
            setError(err.message);
        }
    };

    /**
     * Handle ICE candidate
     */
    const handleIceCandidate = async (peerId, candidate) => {
        try {
            const peerConnection = peerConnectionsRef.current[peerId];
            if (peerConnection) {
                // Only add ICE candidate if remote description is set
                if (peerConnection.remoteDescription) {
                    await peerConnection.addIceCandidate(new RTCIceCandidate(candidate));
                    console.log('WebRTC: ICE candidate added for', peerId);
                } else {
                    console.warn('WebRTC: Cannot add ICE candidate, no remote description set yet');
                }
            }
        } catch (err) {
            console.error('Error handling ICE candidate:', err);
        }
    };

    /**
     * Close peer connection
     */
    const closePeerConnection = (peerId) => {
        const peerConnection = peerConnectionsRef.current[peerId];
        if (peerConnection) {
            peerConnection.close();
            delete peerConnectionsRef.current[peerId];
        }
        
        setPeers(prev => {
            const newPeers = { ...prev };
            delete newPeers[peerId];
            return newPeers;
        });
    };

    /**
     * Start streaming (for students)
     */
    const startStreaming = useCallback(async (stream) => {
        try {
            console.log('WebRTC: Starting streaming', { 
                streamId: stream?.id, 
                tracks: stream?.getTracks().length,
                videoTracks: stream?.getVideoTracks().length,
                audioTracks: stream?.getAudioTracks().length
            });
            
            localStreamRef.current = stream;
            setIsStreaming(true);
            setError(null);
            
            // If there are existing peer connections, add the stream tracks to them
            Object.entries(peerConnectionsRef.current).forEach(([peerId, peerConnection]) => {
                console.log('WebRTC: Adding stream to existing peer connection', peerId);
                stream.getTracks().forEach(track => {
                    peerConnection.addTrack(track, stream);
                });
            });
            
            return { success: true };
        } catch (err) {
            console.error('WebRTC: Error starting stream', err);
            setError(err.message);
            return { success: false, error: err.message };
        }
    }, []);

    /**
     * Stop streaming
     */
    const stopStreaming = useCallback(() => {
        // Close all peer connections
        Object.keys(peerConnectionsRef.current).forEach(peerId => {
            closePeerConnection(peerId);
        });

        // Stop local stream
        if (localStreamRef.current) {
            localStreamRef.current.getTracks().forEach(track => track.stop());
            localStreamRef.current = null;
        }

        setIsStreaming(false);
        setPeers({});
    }, []);

    /**
     * Cleanup on unmount
     */
    useEffect(() => {
        return () => {
            stopStreaming();
            if (socketRef.current) {
                socketRef.current.disconnect();
            }
        };
    }, [stopStreaming]);

    return {
        isStreaming,
        peers,
        error,
        startStreaming,
        stopStreaming,
    };
}
