######################################
# TODOS:

# [x] #* 1. Check the algorithms of FFMPEG to create video

# [x] #* 2. Check the seemless integration of FFMPEG and APIs

######################################

import os
import subprocess
import logging
from fastapi import HTTPException

# Configure logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

def check_ffmpeg_installation():
    """
    Check if FFmpeg is properly installed and available
    
    Returns:
        bool: True if FFmpeg is installed, False otherwise
    """
    try:
        result = subprocess.run(['ffmpeg', '-version'], stdout=subprocess.PIPE, stderr=subprocess.PIPE)
        if result.returncode == 0:
            logger.info("FFmpeg is properly installed")
            return True
        else:
            logger.error("FFmpeg returned non-zero exit code")
            return False
    except Exception as e:
        logger.error(f"FFmpeg check failed: {str(e)}")
        return False

# Check FFmpeg on module load
if not check_ffmpeg_installation():
    logger.critical("FFmpeg is not properly installed. Video processing will fail.")

def blend_components(video_path: str, audio_path: str = None, music_path: str = None, subtitle_path: str = None, temp_dir: str = None):
    """
    Blend video, audio, music, and subtitles into a single output video
    
    Args:
        video_path: Path to the video file
        audio_path: Path to the voice audio file (optional)
        music_path: Path to the background music file (optional)
        subtitle_path: Path to the subtitle file (optional)
        temp_dir: Temporary directory to store output
        
    Returns:
        Path to the output video file
    """
    if not os.path.exists(video_path):
        logger.error(f"Video file not found: {video_path}")
        raise HTTPException(status_code=400, detail="Video file not found")
        
    output_path = os.path.join(temp_dir, 'output.mp4')
    cmd = ['ffmpeg', '-i', video_path, '-y']

    # Check if audio and music files exist
    if audio_path and os.path.exists(audio_path):
        cmd.extend(["-i", audio_path])
    else:
        audio_path = None
        
    if music_path and os.path.exists(music_path):
        cmd.extend(["-i", music_path])
    else:
        music_path = None
    
    # Map video and audio streams
    filter_complex = ""
    if audio_path and music_path:
        # Mix voice and music with voice louder than music
        filter_complex = "[1:a]volume=1.0[voice];[2:a]volume=0.5[music];[voice][music]amix=inputs=2:duration=longest[aout]"
        cmd.extend(["-filter_complex", filter_complex, "-map", "0:v", "-map", "[aout]"])
    elif audio_path:
        cmd.extend(["-map", "0:v", "-map", "1:a"])
    elif music_path:
        cmd.extend(["-map", "0:v", "-map", "1:a"])
    else:
        cmd.extend(["-map", "0:v"])
    
    # Add subtitles if present and file exists
    if subtitle_path and os.path.exists(subtitle_path):
        # Escape special characters in file path
        escaped_subtitle_path = subtitle_path.replace(":", "\\:").replace("'", "\\'")
        cmd.extend(["-vf", f"subtitles='{escaped_subtitle_path}'"])
    
    # Set output codec and quality
    cmd.extend([
        "-c:v", "libx264", 
        "-preset", "fast", 
        "-crf", "22", 
        "-c:a", "aac", 
        "-b:a", "192k", 
        "-shortest", 
        output_path
    ])
    
    logger.info(f"Running FFmpeg command: {' '.join(cmd)}")
    
    try:
        # Run FFmpeg process
        process = subprocess.run(cmd, check=True, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
        
        if not os.path.exists(output_path) or os.path.getsize(output_path) == 0:
            logger.error("FFmpeg process completed but output file is missing or empty")
            raise HTTPException(status_code=500, detail="Failed to generate output video")
            
        logger.info(f"Successfully created blended video at {output_path}")
        return output_path
    except subprocess.CalledProcessError as e:
        logger.error(f"FFmpeg error: {e.stderr.decode() if e.stderr else str(e)}")
        raise HTTPException(status_code=500, detail="FFmpeg processing error")
    except Exception as e:
        logger.error(f"Error blending components: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Error blending components: {str(e)}")