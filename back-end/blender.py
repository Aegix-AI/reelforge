######################################
# TODOS:

[ ] #* 1. Check the algorithms of FFMPEG to create video

[ ] #* 2. Check the seemless integration of FFMPEG and APIs
######################################

import os
import subprocess


def blend_components(video_path: str, audio_path: str = None, music_path: str = None, subtitle_path: str = None, temp_dir: str = None):
    output_path = os.path.join(temp_dir, 'output.mp4')
    cmd = ['ffmpeg', '-i', video_path, '-y']

    if audio_path:
        cmd.extend(["-i", audio_path])
    if music_path:
        cmd.extend(["-i", music_path])
    
    # Map video and audio streams
    filter_complex = ""
    if audio_path and music_path:
        filter_complex = "[1:a][2:a]amix=inputs=2:duration=longest[aout]"
        cmd.extend(["-filter_complex", filter_complex, "-map", "0:v", "-map", "[aout]"])
    elif audio_path:
        cmd.extend(["-map", "0:v", "-map", "1:a"])
    elif music_path:
        cmd.extend(["-map", "0:v", "-map", "1:a"])
    else:
        cmd.extend(["-map", "0:v"])
    
    # Add subtitles if present
    if subtitle_path:
        cmd.extend(["-vf", f"subtitles={subtitle_path}"])
    
    cmd.extend(["-c:v", "libx264", "-c:a", "aac", "-shortest", output_path])
    subprocess.run(cmd, check=True)
    return output_path