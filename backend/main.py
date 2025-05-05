######################################
# TODOS:

#* 1. Check the seemless integrations.

#* 2. Recheck the inputs sending from the front-end to the back-end system and fine-tune the functions by them.
######################################

#? PIAPI Main Page: https://piapi.ai/workspace
#? PIAPI API Docs: https://piapi.ai/docs/

######################################
#! NEEDS TO BE TESTED BEFORE DEPLOYING
######################################

import shutil
from fastapi import UploadFile, File, Form
from components import ( parse_input, analyze_task, generate_video, generate_audio, generate_music, generate_text, app )
from blender import blend_components



@app.post("/generate_short")
async def generate_short(
    description: str = Form(...),
    voice: str = Form(...),
    music_tune: str = Form(...),
    files: list[UploadFile] = File(default=[])
):
    # Parse input
    input_data = parse_input(description, voice, music_tune, files)
    temp_dir = input_data["temp_dir"]
    
    try:
        # Analyze task
        components = analyze_task(input_data["description"])
        
        # Generate components based on analysis
        generated = {}
        if "video" in components:
            generated["video"] = generate_video(input_data["description"], input_data["uploaded_files"], temp_dir)
        if "audio" in components:
            generated["audio"] = generate_audio(input_data["description"], input_data["voice"], temp_dir)
        if "music" in components:
            generated["music"] = generate_music(input_data["music_tune"], temp_dir)
        if "text" in components:
            generated["text"] = generate_text(input_data["description"], temp_dir)
        
        # Blend components
        video_path = generated.get("video")
        if not video_path:
            raise Exception("Video component is required")
        output_video = blend_components(
            video_path=video_path,
            audio_path=generated.get("audio"),
            music_path=generated.get("music"),
            subtitle_path=generated.get("text"),
            temp_dir=temp_dir
        )
        
        # Return output video path
        return {"video_url": output_video}
    finally:
        # Clean up temporary directory
        shutil.rmtree(temp_dir, ignore_errors=True)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)