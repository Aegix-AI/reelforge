<p align="center">
  <img src="assets/icon.png" alt="reelforge logo" width="200">
</p>

![ChatGPT](https://img.shields.io/badge/chatGPT-74aa9c?style=for-the-badge&logo=openai&logoColor=white)
![DigitalOcean](https://img.shields.io/badge/DigitalOcean-%230167ff.svg?style=for-the-badge&logo=digitalOcean&logoColor=white)
![Vercel](https://img.shields.io/badge/vercel-%23000000.svg?style=for-the-badge&logo=vercel&logoColor=white)
![Visual Studio Code](https://img.shields.io/badge/Visual%20Studio%20Code-0078d7.svg?style=for-the-badge&logo=visual-studio-code&logoColor=white)
![Python](https://img.shields.io/badge/python-3670A0?style=for-the-badge&logo=python&logoColor=ffdd54)
![Rust](https://img.shields.io/badge/rust-%23000000.svg?style=for-the-badge&logo=rust&logoColor=white)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![PyTorch](https://img.shields.io/badge/PyTorch-%23EE4C2C.svg?style=for-the-badge&logo=PyTorch&logoColor=white)
![Linux](https://img.shields.io/badge/Linux-FCC624?style=for-the-badge&logo=linux&logoColor=black)
![Instagram](https://img.shields.io/badge/Instagram-%23E4405F.svg?style=for-the-badge&logo=Instagram&logoColor=white)
![TikTok](https://img.shields.io/badge/TikTok-%23000000.svg?style=for-the-badge&logo=TikTok&logoColor=white)
![YouTube](https://img.shields.io/badge/YouTube-%23FF0000.svg?style=for-the-badge&logo=YouTube&logoColor=white)


 
# ReelForge

ReelForge is an AI-powered platform that automatically generates engaging short-form videos for YouTube Shorts, Instagram Reels, and TikTok, optimized for maximum engagement.

## Features

- **AI-Generated Shorts**: Create vertical video shorts with a single line description
- **Multiple Platform Support**: Generate content for YouTube, Instagram, and TikTok
- **Customizable Options**: Choose voice, music, subtitles, and more
- **Variations**: Create multiple versions to test what works best
- **One-Click Publishing**: Upload directly to social platforms

## Setup Instructions

### Prerequisites

- Docker and Docker Compose
- PIAPI.ai API key (get yours at https://piapi.ai/workspace)

### Installation

1. Clone the repository:
   ```bash
   https://github.com/Aegix-AI/reelforge.git
   cd reelforge
   ```

2. Set up environment variables:
   ```bash
   # Create .env file in the back-end directory
   cd back-end
   cp .env.example .env
   # Edit .env and add your PIAPI API key
   ```

3. Start the application using Docker Compose:
   ```bash
   cd ..
   docker-compose up
   ```

4. Access the application:
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:8000

### Manual Setup (Without Docker)

#### Backend (Python)

```bash
cd back-end
python -m venv env
source env/bin/activate  # On Windows: env\Scripts\activate
pip install -r requirements.txt
python main.py
```

#### Frontend (Next.js)

```bash
cd front-end
npm install  # or pnpm install
npm run dev  # or pnpm dev
```

## Usage

1. Navigate to http://localhost:3000/generate
2. Enter a description for your short video
3. Customize voice, music, subtitles, and other options
4. Click "Generate AI Short"
5. Preview, download, or publish your generated shorts

## API Documentation

The backend API provides the following endpoints:

- `GET /`: API status check
- `POST /generate_short`: Generate short videos
  - Parameters: description, voice, music_tune, subtitles, variations, logo (file)
- `GET /static/videos/{video_name}`: Access generated videos

## License

This project is licensed under the MIT License - see the LICENSE file for details.
