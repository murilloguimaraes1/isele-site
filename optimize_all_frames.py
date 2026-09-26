import cv2
import os
import time
from PIL import Image

def optimize_desktop():
    output_dir = os.path.join('public', 'frames')
    os.makedirs(output_dir, exist_ok=True)
    
    # Clean output dir
    for f in os.listdir(output_dir):
        if f.endswith('.webp'):
            os.remove(os.path.join(output_dir, f))

    video_path = 'download.mp4'
    if not os.path.exists(video_path):
        print(f"Error: {video_path} not found.")
        return 0

    cap = cv2.VideoCapture(video_path)
    total_frames = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))
    fps = cap.get(cv2.CAP_PROP_FPS)

    print(f"Optimizing Desktop Frames (step=2, Q=76): source has {total_frames} frames @ {fps}fps...")
    t0 = time.time()

    frame_idx = 0
    saved_count = 0

    while True:
        ret, frame = cap.read()
        if not ret:
            break
        frame_idx += 1
        
        # Downsample to 15fps (every 2nd frame)
        if frame_idx % 2 == 1:
            saved_count += 1
            frame_name = f"frame_{saved_count:04d}.webp"
            out_path = os.path.join(output_dir, frame_name)
            
            # Save WebP at quality 76
            cv2.imwrite(out_path, frame, [int(cv2.IMWRITE_WEBP_QUALITY), 76])

    cap.release()
    print(f"Desktop Optimization complete! {saved_count} frames saved in '{output_dir}' in {time.time() - t0:.2f}s.")
    return saved_count

def optimize_mobile():
    output_dir = os.path.join('public', 'frames_mobile')
    os.makedirs(output_dir, exist_ok=True)

    # Clean output dir
    for f in os.listdir(output_dir):
        if f.endswith('.webp'):
            os.remove(os.path.join(output_dir, f))

    video_path = 'Video Project.mp4'
    if not os.path.exists(video_path):
        print(f"Error: {video_path} not found.")
        return 0

    cap = cv2.VideoCapture(video_path)
    total_frames = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))
    fps = cap.get(cv2.CAP_PROP_FPS)
    orig_w = int(cap.get(cv2.CAP_PROP_FRAME_WIDTH))
    orig_h = int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT))

    target_w = 720
    target_h = int(orig_h * (target_w / orig_w))

    print(f"Optimizing Mobile Frames (step=2, Q=76, 720p): source has {total_frames} frames ({orig_w}x{orig_h} -> {target_w}x{target_h})...")
    t0 = time.time()

    frame_idx = 0
    saved_count = 0

    while True:
        ret, frame = cap.read()
        if not ret:
            break
        frame_idx += 1

        # Downsample to 15fps (every 2nd frame)
        if frame_idx % 2 == 1:
            saved_count += 1
            frame_name = f"frame_{saved_count:04d}.webp"
            out_path = os.path.join(output_dir, frame_name)

            rgb_frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
            pil_img = Image.fromarray(rgb_frame)
            pil_img_resized = pil_img.resize((target_w, target_h), Image.Resampling.LANCZOS)
            pil_img_resized.save(out_path, 'WEBP', quality=76, method=4)

    cap.release()
    print(f"Mobile Optimization complete! {saved_count} frames saved in '{output_dir}' in {time.time() - t0:.2f}s.")
    return saved_count

if __name__ == '__main__':
    dt_count = optimize_desktop()
    mb_count = optimize_mobile()
    print(f"\nSUCCESS: Desktop={dt_count} frames | Mobile={mb_count} frames")
