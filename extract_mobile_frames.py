import cv2
import os
import time
from PIL import Image

def extract_mobile():
    dir1 = os.path.join('public', 'frames_mobile')
    dir2 = 'frames_mobile'
    os.makedirs(dir1, exist_ok=True)
    os.makedirs(dir2, exist_ok=True)

    video_path = 'Video Project.mp4'
    if not os.path.exists(video_path):
        print(f"Error: {video_path} not found.")
        return

    cap = cv2.VideoCapture(video_path)
    total_frames = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))
    fps = cap.get(cv2.CAP_PROP_FPS)
    orig_w = int(cap.get(cv2.CAP_PROP_FRAME_WIDTH))
    orig_h = int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT))

    # Target width 720px for mobile HD clarity and ultra-fast loading
    target_w = 720
    target_h = int(orig_h * (target_w / orig_w))

    print(f"Starting Mobile Frame Extraction (9:16 Portrait): {total_frames} frames ({orig_w}x{orig_h} -> {target_w}x{target_h} @ {fps}fps)...")
    t0 = time.time()

    count = 0
    while True:
        ret, frame = cap.read()
        if not ret:
            break
        count += 1
        frame_name = f"frame_{count:04d}.webp"
        out_path1 = os.path.join(dir1, frame_name)
        out_path2 = os.path.join(dir2, frame_name)

        # Convert BGR (cv2) to RGB (PIL)
        rgb_frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
        pil_img = Image.fromarray(rgb_frame)

        # Resize for smooth, crisp mobile hardware playback
        pil_img_resized = pil_img.resize((target_w, target_h), Image.Resampling.LANCZOS)

        # Save as WebP at 85% quality for ultra-fast loading and sharp clarity
        pil_img_resized.save(out_path1, 'WEBP', quality=85, method=4)
        pil_img_resized.save(out_path2, 'WEBP', quality=85, method=4)

        if count % 30 == 0 or count == total_frames:
            print(f"Extracted Mobile {count}/{total_frames} frames... ({time.time() - t0:.1f}s)")

    cap.release()
    print(f"Mobile Extraction complete! All {total_frames} frames saved to '{dir1}' and '{dir2}' in {time.time() - t0:.2f}s.")

if __name__ == '__main__':
    extract_mobile()
