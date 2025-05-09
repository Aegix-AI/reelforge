######################################
# TODOS:

[x] #* 1. Check the seemless integrations.

[x] #* 2. Recheck the inputs sending from the front-end to the back-end system and fine-tune the functions by them.
######################################

#? PIAPI Main Page: https://piapi.ai/workspace
#? PIAPI API Docs: https://piapi.ai/docs/

######################################
#! READY FOR TESTING
######################################

import shutil
import os
from fastapi import UploadFile, File, Form, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from components import ( parse_input, analyze_task, generate_video, generate_audio, generate_music, generate_text, app )
from blender import blend_components, check_ffmpeg_installation

# Create static directory for videos
os.makedirs("static/videos", exist_ok=True)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=os.getenv("ALLOWED_ORIGINS", "*").split(","),  # For production, set ALLOWED_ORIGINS env var
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Mount static files
app.mount("/static", StaticFiles(directory="static"), name="static")

@app.get("/")
async def root():
    return {"status": "API is running", "version": "1.0.0"}

@app.get("/health")
async def health_check():
    """
    Health check endpoint that verifies critical dependencies
    """
    health_status = {
        "status": "healthy",
        "api_key": os.getenv("API_KEY") is not None,
        "ffmpeg": check_ffmpeg_installation(),
        "static_dir": os.path.exists("static/videos")
    }
    
    # Set overall status
    if not all([health_status["api_key"], health_status["ffmpeg"], health_status["static_dir"]]):
        health_status["status"] = "unhealthy"
        return health_status
        
    return health_status

@app.post("/generate_short")
async def generate_short(
    description: str = Form(...),
    voice: str = Form(...),
    music_tune: str = Form(...),
    subtitles: bool = Form(False),
    variations: int = Form(1),
    logo: UploadFile = File(None)
):
    # Create a list of files (just logo for now)
    files = [logo] if logo and logo.filename else []
    
    # Parse input
    input_data = parse_input(description, voice, music_tune, files)
    temp_dir = input_data["temp_dir"]
    
    try:
        # Analyze task
        components = analyze_task(input_data["description"])
        
        # Generate variations
        output_videos = []
        for i in range(variations):
            # Generate components based on analysis
            generated = {}
            if "video" in components:
                generated["video"] = generate_video(input_data["description"], input_data["uploaded_files"], temp_dir)
            else:
                # Video is required, fallback to generating it
                generated["video"] = generate_video(input_data["description"], input_data["uploaded_files"], temp_dir)
                
            if "audio" in components and voice != "none":
                generated["audio"] = generate_audio(input_data["description"], input_data["voice"], temp_dir)
                
            if "music" in components and music_tune != "none":
                generated["music"] = generate_music(input_data["music_tune"], temp_dir)
                
            if "text" in components and subtitles:
                generated["text"] = generate_text(input_data["description"], temp_dir)
            
            # Blend components
            video_path = generated.get("video")
            if not video_path:
                raise HTTPException(status_code=400, detail="Failed to generate video component")
                
            output_video = blend_components(
                video_path=video_path,
                audio_path=generated.get("audio"),
                music_path=generated.get("music"),
                subtitle_path=generated.get("text"),
                temp_dir=temp_dir
            )
            
            # Copy to static directory for serving
            output_filename = f"output_{i+1}.mp4"
            static_path = os.path.join("static/videos", output_filename)
            shutil.copy2(output_video, static_path)
            
            # Add to output list with proper URL
            video_url = f"/static/videos/{output_filename}"
            output_videos.append(video_url)
            
        # Return output video paths
        return {
            "status": "success",
            "message": f"Generated {variations} short video(s)",
            "videos": output_videos,
            "platforms": ["youtube", "instagram", "tiktok"]
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to generate short: {str(e)}")
    finally:
        # Clean up temporary directory
        shutil.rmtree(temp_dir, ignore_errors=True)

@app.get("/static/videos/{video_name}")
async def get_video(video_name: str):
    video_path = os.path.join("static/videos", video_name)
    if not os.path.exists(video_path):
        raise HTTPException(status_code=404, detail="Video not found")
    return FileResponse(video_path, media_type="video/mp4")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)