from pathlib import Path

import imageio.v2 as imageio
import numpy as np
from PIL import Image, ImageEnhance


ROOT = Path(__file__).resolve().parents[1]
OUTPUT = ROOT / "assets" / "video" / "axion-industrial-plant-loop.webm"
SOURCES = [
    ROOT / "assets" / "photography" / "industrial-fermenters-15000l.jpg",
    ROOT / "assets" / "photography" / "vaccine-bioreactor-plant.jpg",
    ROOT / "assets" / "photography" / "weihenstephan-kombikeller.jpg",
]
WIDTH, HEIGHT = 1280, 720
FPS = 24
SECONDS_PER_SCENE = 4


def cover(image: Image.Image, scale: float, pan: float) -> Image.Image:
    base_scale = max(WIDTH / image.width, HEIGHT / image.height)
    size = (round(image.width * base_scale * scale), round(image.height * base_scale * scale))
    resized = image.resize(size, Image.Resampling.LANCZOS)
    x_room = max(0, resized.width - WIDTH)
    y_room = max(0, resized.height - HEIGHT)
    left = round(x_room * (0.15 + 0.7 * pan))
    top = round(y_room * (0.2 + 0.45 * (1 - pan)))
    return resized.crop((left, top, left + WIDTH, top + HEIGHT))


def main() -> None:
    OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    images = []
    for source in SOURCES:
        image = Image.open(source).convert("RGB")
        image = ImageEnhance.Color(image).enhance(0.82)
        image = ImageEnhance.Contrast(image).enhance(1.05)
        images.append(image)

    writer = imageio.get_writer(
        OUTPUT,
        fps=FPS,
        codec="libvpx-vp9",
        bitrate="1400k",
        pixelformat="yuv420p",
        ffmpeg_params=["-row-mt", "1", "-deadline", "good", "-cpu-used", "3"],
    )
    frames_per_scene = FPS * SECONDS_PER_SCENE
    fade_frames = FPS
    try:
        for scene_index, current in enumerate(images):
            following = images[(scene_index + 1) % len(images)]
            for frame_index in range(frames_per_scene):
                progress = frame_index / max(1, frames_per_scene - 1)
                frame = cover(current, 1.0 + 0.055 * progress, progress)
                if frame_index >= frames_per_scene - fade_frames:
                    fade = (frame_index - (frames_per_scene - fade_frames)) / fade_frames
                    next_frame = cover(following, 1.0 + 0.055 * fade, fade)
                    frame = Image.blend(frame, next_frame, fade)
                writer.append_data(np.asarray(frame))
    finally:
        writer.close()

    print(f"Wrote {OUTPUT} ({OUTPUT.stat().st_size / 1024 / 1024:.1f} MiB)")


if __name__ == "__main__":
    main()
