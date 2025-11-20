/**
 * Server.js - 24/7 Streamer Logic
 * Built with StreamLoop Deployer
 */
const express = require('express');
const ffmpeg = require('fluent-ffmpeg');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Configuration
const STREAM_KEY = process.env.STREAM_KEY || "YOUR_STREAM_KEY";
const RTMP_URL = "rtmp://a.rtmp.youtube.com/live2";
const FULL_RTMP_URL = `${RTMP_URL}/${STREAM_KEY}`;

// Video Source (Remote URL or Local File)
// If using a local file in Docker, ensure it is copied to the container
const INPUT_FILE = "video.mp4";

// Keep-alive endpoint for services like Render/Railway
app.get('/', (req, res) => {
    res.send('Stream is running in background...');
});

const startStream = () => {
    console.log('Starting Stream to', RTMP_URL);
    
    ffmpeg(INPUT_FILE)
        .inputOptions([
            '-re',              // Read input at native framerate
            '-stream_loop -1',  // Loop input infinitely
        ])
        .videoCodec('libx264')
        .audioCodec('aac')
        .outputOptions([
            '-preset veryfast',      // CPU usage tradeoff
            '-maxrate 4500k',      // Max bitrate
            '-bufsize 9000k',      // Buffer size
            '-pix_fmt yuv420p', // Pixel format required for YouTube
            '-g 60',              // GOP size (2 seconds)
            '-r 30',               // Framerate
            '-b:a 128k',        // Audio bitrate
            '-ar 44100',        // Audio sample rate
            '-f flv',           // Output format
        ])
        .on('start', (commandLine) => {
            console.log('FFmpeg process started:', commandLine);
        })
        .on('error', (err, stdout, stderr) => {
            console.error('Error:', err.message);
            console.error('ffmpeg stderr:', stderr);
            // Auto restart on failure after 5 seconds
            setTimeout(startStream, 5000);
        })
        .on('end', () => {
            console.log('Stream ended, restarting...');
            startStream();
        })
        .save(FULL_RTMP_URL);
};

// Start the server
app.listen(PORT, () => {
    console.log(`Control server listening on port ${PORT}`);
    // Start streaming process
    startStream();
});
