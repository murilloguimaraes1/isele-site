import os
import time
from PIL import Image

def process_frames(src_folder, dst_folder, quality=76, step=2, max_width=None):
    if not os.path.exists(src_folder):
        print(f"Error: Source folder '{src_folder}' not found.")
        return 0

    os.makedirs(dst_folder, exist_ok=True)

    # Clean destination folder
    for f in os.listdir(dst_folder):
        if f.endswith('.webp'):
            os.remove(os.path.join(dst_folder, f))

    files = sorted([f for f in os.listdir(src_folder) if f.endswith('.webp')])
    print(f"Processing '{src_folder}' -> '{dst_folder}': total original={len(files)} files, step={step}, Q={quality}...")

    t0 = time.time()
    keep_files = files[::step]
    saved_count = 0

    for idx, f in enumerate(keep_files, start=1):
        src_path = os.path.join(src_folder, f)
        dst_path = os.path.join(dst_folder, f"frame_{idx:04d}.webp")

        with Image.open(src_path) as img:
            # Resize if max_width is specified and image is larger
            if max_width and img.width > max_width:
                target_w = max_width
                target_h = int(img.height * (target_w / img.width))
                img_resized = img.resize((target_w, target_h), Image.Resampling.LANCZOS)
                img_resized.save(dst_path, 'WEBP', quality=quality, method=4)
            else:
                img.save(dst_path, 'WEBP', quality=quality, method=4)
        saved_count += 1

    print(f"Complete! {saved_count} WebP frames saved in '{dst_folder}' in {time.time() - t0:.2f}s.")
    return saved_count

if __name__ == '__main__':
    # 1. Desktop Frames (192 frames @ 76% quality)
    dt_count = process_frames(
        src_folder='frames',
        dst_folder=os.path.join('public', 'frames'),
        quality=76,
        step=2,
        max_width=1920
    )

    # 2. Mobile Frames (170 frames @ 76% quality, max 720px width)
    mb_count = process_frames(
        src_folder='frames_mobile',
        dst_folder=os.path.join('public', 'frames_mobile'),
        quality=76,
        step=2,
        max_width=720
    )

    print(f"\nOptimization Summary: Desktop={dt_count} frames | Mobile={mb_count} frames")
