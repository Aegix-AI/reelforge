######################################
# TODOS:

[x] #* 1. Create the Image function

[x] #* 2. Create the Text function

[x] #* 3. Create the Music function

[x] #* 4. Test it before deploying
######################################

from fastapi import FastAPI, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
import os
import requests
import tempfile
import logging

# Configure logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

# Load API key from .env file
load_dotenv()
API_KEY = os.getenv("API_KEY")
if not API_KEY:
    logger.error("API_KEY not found in .env file. Please set it in your .env file.")
    raise RuntimeError("API_KEY environment variable is required. Please set it in your .env file.")

TEXT_URL = "https://api.piapi.ai/v1/chat/completions"
APP_URL = "https://api.piapi.ai/api/v1/task"  # Fixed double slash in URL


app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# API Handler: Calls the API with specific model and prompt
def call_api(model: str, prompt: str, **kwargs):
    if not API_KEY:
        raise HTTPException(status_code=500, detail="API key not configured")
        
    headers = {"Authorization": f"Bearer {API_KEY}"}
    payload = {
        "model": model,
        "prompt": prompt,
        **kwargs
    }
    
    logger.info(f"Calling API with model: {model}")
    
    if model == "gpt-4o-mini":
        try:
            text_response = requests.post(TEXT_URL, headers=headers, json=payload)
            text_response.raise_for_status()
            return text_response.json()
        except requests.RequestException as e:
            logger.error(f"API call failed: {str(e)}")
            raise HTTPException(status_code=500, detail=f"API call failed: {str(e)}")
    else:
        try:
            app_response = requests.post(APP_URL, headers=headers, json=payload)
            app_response.raise_for_status()
            return app_response.json()
        except requests.RequestException as e:
            logger.error(f"API call failed: {str(e)}")
            raise HTTPException(status_code=500, detail=f"API call failed: {str(e)}")
    

# Input Parser: Processes the input data and saves uploaded files
def parse_input(description: str, voice: str, music_tune: str, files: list[UploadFile]):
    temp_dir = tempfile.mkdtemp()
    uploaded_paths = []
    
    for file in files:
        if file and hasattr(file, 'filename') and file.filename:
            file_path = os.path.join(temp_dir, file.filename)
            try:
                with open(file_path, "wb") as f:
                    f.write(file.file.read())
                uploaded_paths.append(file_path)
            except Exception as e:
                logger.error(f"Error saving file {file.filename}: {str(e)}")
                
    return {
        "description": description,
        "voice": voice,
        "music_tune": music_tune,
        "uploaded_files": uploaded_paths,
        "temp_dir": temp_dir
    }

# Task Analyzer: Analyzes the task and determines required components
def analyze_task(description: str):
    prompt = f"List the components needed for this short (video, audio, music, text): {description}"
    
    try:
        response = call_api("gpt-4o-mini", prompt, max_tokens=500)
        content = response.get('choices', [{}])[0].get('message', {}).get('content', '')
        
        if not content:
            logger.warning("Empty response from API for task analysis")
            return ["video"]  # Default to video if analysis fails
            
        components = content.strip().split(",")
        return [c.strip() for c in components]
    except Exception as e:
        logger.error(f"Task analysis failed: {str(e)}")
        return ["video"]  # Default to video if analysis fails


#* Component Generator

#! Video
def generate_video(description: str, uploaded_files: list, temp_dir: str):
    logger.info(f"Generating video for: {description}")
    prompt = f'Generate a 45-second video based on: {description}. Incorporate uploaded images if needed.'
    
    try:
        response = call_api('Qubico/wanx', prompt=prompt, aspect_ratio='9:16', video_length=45, uploaded_files=uploaded_files)
        video_url = response.get('video_url')
        
        if not video_url:
            raise HTTPException(status_code=500, detail="Failed to generate video, no URL returned")
            
        video_path = os.path.join(temp_dir, "video.mp4")
        video_response = requests.get(video_url)
        video_response.raise_for_status()
        
        with open(video_path, 'wb') as f:
            f.write(video_response.content)
            
        return video_path
    except Exception as e:
        logger.error(f"Video generation failed: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Video generation failed: {str(e)}")

#! Audio
def generate_audio(description: str, voice: str, temp_dir: str):
    logger.info(f"Generating audio with voice type: {voice}")
    
    # Generate script for narration
    script_prompt = f"Create a brief voiceover script (30-45 seconds) for: {description}"
    
    try:
        script_response = call_api("gpt-4o-mini", script_prompt, max_tokens=300)
        script = script_response.get('choices', [{}])[0].get('message', {}).get('content', '').strip()
        
        if not script:
            logger.warning("Empty script generated, skipping audio generation")
            return None
        
        # Generate audio based on script and voice type
        voice_model = "ElevenLabs/Eleven" if voice != "none" else None
        if voice_model:
            voice_id = {
                "male": "Adam",
                "female": "Rachel",
                "ai": "Gigi"
            }.get(voice, "Adam")
            
            response = call_api(voice_model, script, voice_id=voice_id)
            audio_url = response.get('audio_url')
            
            if not audio_url:
                logger.warning("No audio URL returned, skipping audio generation")
                return None
                
            audio_path = os.path.join(temp_dir, "audio.mp3")
            audio_response = requests.get(audio_url)
            audio_response.raise_for_status()
            
            with open(audio_path, 'wb') as f:
                f.write(audio_response.content)
                
            return audio_path
        return None
    except Exception as e:
        logger.error(f"Audio generation failed: {str(e)}")
        # We don't raise an exception here, as audio is optional
        return None

#! Music
def generate_music(music_tune: str, temp_dir: str):
    if music_tune == "none":
        return None
    
    logger.info(f"Generating music with tune: {music_tune}")
    
    # Map music type to appropriate prompt
    music_prompts = {
        "lofi": "Create a lo-fi chill background music for a social media short video",
        "epic": "Create an epic cinematic background music for a social media short video",
        "edm": "Create an energetic EDM background music for a social media short video"
    }
    
    prompt = music_prompts.get(music_tune, "Create a neutral background music for a social media short video")
    
    try:
        response = call_api("MusicGen/melody", prompt, duration=45)
        music_url = response.get('music_url')
        
        if not music_url:
            logger.warning("No music URL returned, skipping music generation")
            return None
            
        music_path = os.path.join(temp_dir, "music.mp3")
        music_response = requests.get(music_url)
        music_response.raise_for_status()
        
        with open(music_path, 'wb') as f:
            f.write(music_response.content)
            
        return music_path
    except Exception as e:
        logger.error(f"Music generation failed: {str(e)}")
        # We don't raise an exception here, as music is optional
        return None

#! Text (Subtitles)
def generate_text(description: str, temp_dir: str):
    logger.info(f"Generating subtitles for: {description}")
    
    # Generate subtitles in SRT format
    prompt = f"Create timed subtitles in SRT format for a 45-second video about: {description}"
    
    try:
        response = call_api("gpt-4o-mini", prompt, max_tokens=800)
        subtitle_text = response.get('choices', [{}])[0].get('message', {}).get('content', '').strip()
        
        if not subtitle_text:
            logger.warning("Empty subtitle text generated, skipping subtitle generation")
            return None
        
        subtitle_path = os.path.join(temp_dir, "subtitles.srt")
        with open(subtitle_path, 'w') as f:
            f.write(subtitle_text)
            
        return subtitle_path
    except Exception as e:
        logger.error(f"Subtitle generation failed: {str(e)}")
        # We don't raise an exception here, as subtitles are optional
        return None