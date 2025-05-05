######################################
# TODOS:

[ ] #* 1. Create the Image function

[ ] #* 2. Create the Text function

[ ] #* 3. Create the Music function

[ ] #* 4. Test it before deploying
######################################

from fastapi import FastAPI, UploadFile
from dotenv import load_dotenv
import os
import requests
import tempfile


# Load API key from .env file
load_dotenv()
API_KEY = os.getenv("API_KEY")
TEXT_URL = "https://api.piapi.ai/v1/chat/completions"
APP_URL = "https://api.piapi.ai//api/v1/task"


app = FastAPI()

# API Handler: Calls the API with specific model and prompt
def call_api(model: str, prompt: str, **kwargs):
    headers = {"Authorization": f"Bearer {API_KEY}"}
    payload = {
        "model": model,
        "prompt": prompt,
        **kwargs
    }
    if model == "gpt-4o-mini":
        try:
            text_response = requests.post(TEXT_URL, headers=headers, json=payload)
            text_response.raise_for_status()
            return text_response.json()
        except Exception as e:
            return Exception(f"API call failed: {str(e)}")
    else:
        try:
            app_response = requests.post(APP_URL, headers=headers, json=payload)
            app_response.raise_for_status()
            return app_response.json()
        except Exception as e:
            return Exception(f"API call failed: {str(e)}")
    

# Input Parser: Processes the input data and saves uploaded files
def parse_input(description: str, voice: str, music_tune: str, files: list[UploadFile]):
    temp_dir = tempfile.mkdtemp()
    uploaded_paths = []
    for file in files:
        file_path = os.path.join(temp_dir, file.filename)
        with open(file_path, "wb") as f:
            f.write(file.file.read())
        uploaded_paths.append(file_path)
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
    response = call_api("gpt-4o-mini", prompt, max_tokens=500)
    components = response['choice'][0]['text'].strip().split(",")
    return components


#* Component Generator

#! Video
def generate_video(description: str, uploaded_files: list, temp_dir: str):
    prompt = f'Generate a 45-second video based on: {description}. Incorporate uploaded images if needed.'
    response = call_api('Qubico/wanx', prompt=prompt, aspect_ratio='9:16', video_length=45, uploaded_files=uploaded_files)
    video_url = response['video_url']
    video_path = os.path.join(temp_dir, "video.mp4")
    with open(video_path, 'wb') as f:
        f.write(requests.get(video_url).content)
    return video_path

#! Audio
def generate_audio(description: str, uploaded_files: list, temp_dir: str):
    prompt = f"Extract or create a short narration script (20-30 words) from: {description}"
    response = call_api('Qubico/tts', prompt=prompt, )

# TODO : Image

# TODO : Music

# TODO : Text