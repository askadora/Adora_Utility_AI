const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');
const { promisify } = require('util');
const execAsync = promisify(exec);

// Configuration
const config = {
    inputDir: path.join(__dirname, '../../data/raw/audio'),
    outputDir: path.join(__dirname, '../../data/processed/audio'),
    tempDir: path.join(__dirname, '../../data/temp'),
    sampleRate: 16000,
    channels: 1,
    format: 'wav',
    maxDuration: 30, // Maximum duration in seconds
    minDuration: 1,  // Minimum duration in seconds
    targetLoudness: -23, // Target loudness in LUFS
    noiseReduction: true,
    normalize: true,
    trim: true
};

// Create directories if they don't exist
function createDirectories() {
    [config.inputDir, config.outputDir, config.tempDir].forEach(dir => {
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }
    });
}

// Get audio duration using ffprobe
async function getAudioDuration(filePath) {
    try {
        const { stdout } = await execAsync(`ffprobe -v error -show_entries format=duration -of default=noprint_wrappers=1:nokey=1 "${filePath}"`);
        return parseFloat(stdout.trim());
    } catch (error) {
        console.error(`Error getting duration for ${filePath}:`, error);
        return null;
    }
}

// Process audio file
async function processAudioFile(inputFile) {
    const filename = path.basename(inputFile);
    const outputFile = path.join(config.outputDir, filename);
    const tempFile = path.join(config.tempDir, `temp_${filename}`);

    try {
        // Get audio duration
        const duration = await getAudioDuration(inputFile);
        if (duration === null) {
            console.error(`Could not get duration for ${filename}`);
            return;
        }

        // Skip if duration is outside acceptable range
        if (duration < config.minDuration || duration > config.maxDuration) {
            console.log(`Skipping ${filename}: Duration ${duration.toFixed(2)}s is outside acceptable range`);
            return;
        }

        // Build FFmpeg command
        let ffmpegCmd = `ffmpeg -y -i "${inputFile}"`;

        // Add audio filters
        const filters = [];

        if (config.normalize) {
            filters.push(`loudnorm=I=${config.targetLoudness}:LRA=11:TP=-1.5`);
        }

        if (config.noiseReduction) {
            filters.push('highpass=f=200,lowpass=f=3000');
        }

        if (config.trim) {
            filters.push('silenceremove=start_periods=1:start_duration=0.1:start_threshold=-50dB,areverse,silenceremove=start_periods=1:start_duration=0.1:start_threshold=-50dB,areverse');
        }

        if (filters.length > 0) {
            ffmpegCmd += ` -af "${filters.join(',')}"`;
        }

        // Add output parameters
        ffmpegCmd += ` -ar ${config.sampleRate} -ac ${config.channels} -f ${config.format} "${outputFile}"`;

        // Execute FFmpeg command
        await execAsync(ffmpegCmd);
        console.log(`Processed ${filename}`);

        // Clean up temp file if it exists
        if (fs.existsSync(tempFile)) {
            fs.unlinkSync(tempFile);
        }
    } catch (error) {
        console.error(`Error processing ${filename}:`, error);
    }
}

// Main function
async function main() {
    try {
        // Create necessary directories
        createDirectories();

        // Get list of audio files
        const files = fs.readdirSync(config.inputDir)
            .filter(file => file.match(/\.(wav|mp3|m4a|flac)$/i));

        if (files.length === 0) {
            console.log('No audio files found in input directory');
            return;
        }

        console.log(`Found ${files.length} audio files to process`);

        // Process each file
        for (const file of files) {
            const inputFile = path.join(config.inputDir, file);
            await processAudioFile(inputFile);
        }

        console.log('Audio processing completed');
    } catch (error) {
        console.error('Error in main process:', error);
    }
}

// Run the script
main(); 