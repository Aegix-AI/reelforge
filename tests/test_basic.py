import os
import sys
import pytest

sys.path.insert(0, os.path.join(os.path.dirname(__file__), "..", "software-v0", "back-end"))

pytest.importorskip("fastapi")

from blender import check_ffmpeg_installation


def test_ffmpeg_check():
    assert isinstance(check_ffmpeg_installation(), bool)


celery = pytest.importorskip("celery")
from tasks import create_short_video

def test_task_registered():
    assert create_short_video.name.endswith("create_short_video")
