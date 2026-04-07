import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Loader2 } from 'lucide-react';

/**
 * Universal Video Player Component
 * Supports: YouTube, Google Drive, Direct Video URLs
 */
export default function UniversalVideoPlayer({
    videoUrl,
    onEnded,
    onTimeUpdate,
    onPlay,
    onPause,
    isPlaying: externalIsPlaying,
    onPlayingChange,
    className = '',
    showControls = true,
    autoPlay = false,
    poster = null
}) {
    const [videoType, setVideoType] = useState('unknown');
    const [embedUrl, setEmbedUrl] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [internalIsPlaying, setInternalIsPlaying] = useState(false);
    const videoRef = useRef(null);
    const iframeRef = useRef(null);

    const isPlaying = externalIsPlaying !== undefined ? externalIsPlaying : internalIsPlaying;

    // Detect video type and generate embed URL
    useEffect(() => {
        if (!videoUrl) {
            setVideoType('unknown');
            return;
        }

        const url = videoUrl.toLowerCase();

        // YouTube detection
        if (url.includes('youtube.com') || url.includes('youtu.be')) {
            setVideoType('youtube');
            const videoId = extractYouTubeId(videoUrl);
            if (videoId) {
                setEmbedUrl(`https://www.youtube.com/embed/${videoId}?enablejsapi=1&rel=0`);
            }
        }
        // Google Drive detection
        else if (url.includes('drive.google.com')) {
            setVideoType('drive');
            const fileId = extractDriveFileId(videoUrl);
            if (fileId) {
                setEmbedUrl(`https://drive.google.com/file/d/${fileId}/preview`);
            }
        }
        // Direct video file
        else if (url.match(/\.(mp4|webm|ogg|mov|avi|mkv)(\?|$)/i)) {
            setVideoType('direct');
            setEmbedUrl(videoUrl);
        }
        // Default to direct video
        else {
            setVideoType('direct');
            setEmbedUrl(videoUrl);
        }

        setIsLoading(false);
    }, [videoUrl]);

    // Extract YouTube video ID from various URL formats
    const extractYouTubeId = (url) => {
        const patterns = [
            /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
            /youtube\.com\/watch\?.*v=([^&\n?#]+)/
        ];

        for (const pattern of patterns) {
            const match = url.match(pattern);
            if (match && match[1]) {
                return match[1];
            }
        }
        return null;
    };

    // Extract Google Drive file ID
    const extractDriveFileId = (url) => {
        const patterns = [
            /\/file\/d\/([^\/\?]+)/,
            /id=([^&\n?#]+)/,
            /\/open\?id=([^&\n?#]+)/
        ];

        for (const pattern of patterns) {
            const match = url.match(pattern);
            if (match && match[1]) {
                return match[1];
            }
        }
        return null;
    };

    // Handle play/pause for direct video
    const handlePlayPause = () => {
        if (videoType === 'direct' && videoRef.current) {
            if (isPlaying) {
                videoRef.current.pause();
                setInternalIsPlaying(false);
                onPause?.();
                onPlayingChange?.(false);
            } else {
                videoRef.current.play();
                setInternalIsPlaying(true);
                onPlay?.();
                onPlayingChange?.(true);
            }
        }
    };

    // Handle video events for direct video
    const handleVideoTimeUpdate = () => {
        if (videoRef.current && onTimeUpdate) {
            onTimeUpdate(videoRef.current);
        }
    };

    const handleVideoEnded = () => {
        setInternalIsPlaying(false);
        onPlayingChange?.(false);
        onEnded?.();
    };

    const handleVideoPlay = () => {
        setInternalIsPlaying(true);
        onPlayingChange?.(true);
        onPlay?.();
    };

    const handleVideoPause = () => {
        setInternalIsPlaying(false);
        onPlayingChange?.(false);
        onPause?.();
    };

    if (isLoading) {
        return (
            <div className={`flex items-center justify-center bg-gray-900 ${className}`}>
                <Loader2 className="w-12 h-12 animate-spin text-[#a6b1ff]" />
            </div>
        );
    }

    // Render YouTube embed
    if (videoType === 'youtube') {
        return (
            <div className={`relative ${className}`}>
                <iframe
                    ref={iframeRef}
                    src={embedUrl}
                    className="w-full h-full"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    title="YouTube Video Player"
                />
            </div>
        );
    }

    // Render Google Drive embed
    if (videoType === 'drive') {
        return (
            <div className={`relative ${className}`}>
                <iframe
                    ref={iframeRef}
                    src={embedUrl}
                    className="w-full h-full"
                    frameBorder="0"
                    allow="autoplay"
                    allowFullScreen
                    title="Google Drive Video Player"
                />
            </div>
        );
    }

    // Render direct video
    if (videoType === 'direct') {
        return (
            <div className={`relative ${className}`}>
                {!isPlaying && poster && (
                    <div className="absolute inset-0 z-10">
                        <img
                            src={poster}
                            alt="Video Poster"
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/20" />
                    </div>
                )}

                <video
                    ref={videoRef}
                    className="w-full h-full object-contain bg-black"
                    src={embedUrl}
                    onTimeUpdate={handleVideoTimeUpdate}
                    onEnded={handleVideoEnded}
                    onPlay={handleVideoPlay}
                    onPause={handleVideoPause}
                    controls={showControls && isPlaying}
                    autoPlay={autoPlay}
                    playsInline
                >
                    Your browser does not support the video tag.
                </video>

                {/* Custom Play Button Overlay */}
                {!isPlaying && (
                    <div
                        className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm cursor-pointer z-20"
                        onClick={handlePlayPause}
                    >
                        <div className="relative">
                            <div className="absolute inset-0 rounded-full bg-[#a6b1ff]/20 animate-ping" />
                            <div className="relative w-20 h-20 rounded-full bg-white/90 backdrop-blur-xl flex items-center justify-center border border-white/20 hover:scale-110 transition-all duration-300 shadow-[0_0_30px_rgba(166,177,255,0.4)]">
                                <Play className="w-8 h-8 text-[#a6b1ff] fill-current ml-1" />
                            </div>
                        </div>
                    </div>
                )}
            </div>
        );
    }

    // Fallback for unknown video type
    return (
        <div className={`flex items-center justify-center bg-gray-900 ${className}`}>
            <div className="text-center text-white p-8">
                <p className="text-lg font-bold mb-2">Unable to play video</p>
                <p className="text-sm text-gray-400">Unsupported video format or invalid URL</p>
            </div>
        </div>
    );
}
