from __future__ import annotations
import os
import shutil
from celery import Celery
from dotenv import load_dotenv
from components import analyze_task, generate_video, generate_audio, generate_music, generate_text
from blender import blend_components

load_dotenv()
BROKER_URL = os.getenv("REDIS_BROKER_URL", "redis://localhost:6379/0")
celery_app = Celery('reelforge', broker=BROKER_URL, backend=BROKER_URL)

@celery_app.task(bind=True)
def create_short_video(self, description: str, voice: str, music_tune: str, uploaded_files: list[str], temp_dir: str) -> str:
    """Asynchronously create a short video from the provided assets."""
    components = analyze_task(description)
    generated: dict[str, str | None] = {}
    try:
        generated["video"] = generate_video(description, uploaded_files, temp_dir)
        if "audio" in components and voice != "none":
            generated["audio"] = generate_audio(description, voice, temp_dir)
        if "music" in components and music_tune != "none":
            generated["music"] = generate_music(music_tune, temp_dir)
        if "text" in components:
            generated["text"] = generate_text(description, temp_dir)
        output_video = blend_components(
            video_path=generated.get("video"),
            audio_path=generated.get("audio"),
            music_path=generated.get("music"),
            subtitle_path=generated.get("text"),
            temp_dir=temp_dir,
        )
        static_filename = f"{self.request.id}.mp4"
        static_path = os.path.join("static/videos", static_filename)
        os.makedirs("static/videos", exist_ok=True)
        shutil.copy2(output_video, static_path)
        return static_filename
    finally:
        shutil.rmtree(temp_dir, ignore_errors=True)
