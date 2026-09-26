import cv2
import os
import time
from PIL import Image

def extract():
    dir1 = os.path.join('public', 'frames')
    dir2 = 'frames'
    os.makedirs(dir1, exist_ok=True)
    os.makedirs(dir2, exist_ok=True)

    video_path = 'download.mp4'
    if not os.path.exists(video_path):
        print(f"Error: {video_path} not found.")
        return

    cap = cv2.VideoCapture(video_path)
    total_frames = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))
    fps = cap.get(cv2.CAP_PROP_FPS)
    width = int(cap.get(cv2.CAP_PROP_FRAME_WIDTH))
    height = int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT))

    print(f"Starting High Quality Extraction (PIL Q95, Method 6): {total_frames} frames ({width}x{height} @ {fps}fps)...")
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

        # Save with PIL at 95% quality and method=6 for maximum sharpness
        pil_img.save(out_path1, 'WEBP', quality=95, method=6)
        
        # Also copy/save to dir2 to guarantee fallback path availability
        pil_img.save(out_path2, 'WEBP', quality=95, method=6)

        if count % 20 == 0 or count == total_frames:
            print(f"Extracted HQ {count}/{total_frames} frames... ({time.time() - t0:.1f}s)")

    cap.release()
    print(f"HQ Extraction complete! All {total_frames} frames saved to '{dir1}' and '{dir2}' in {time.time() - t0:.2f}s.")

if __name__ == '__main__':
    extract()
