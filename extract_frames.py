import cv2
import os
import time

def extract():
    output_dir = os.path.join('public', 'frames')
    os.makedirs(output_dir, exist_ok=True)

    video_path = 'download.mp4'
    if not os.path.exists(video_path):
        print(f"Error: {video_path} not found.")
        return

    cap = cv2.VideoCapture(video_path)
    total_frames = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))
    fps = cap.get(cv2.CAP_PROP_FPS)
    width = int(cap.get(cv2.CAP_PROP_FRAME_WIDTH))
    height = int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT))

    print(f"Starting extraction: {total_frames} frames ({width}x{height} @ {fps}fps)...")
    t0 = time.time()

    count = 0
    success_count = 0

    while True:
        ret, frame = cap.read()
        if not ret:
            break
        count += 1
        frame_name = f"frame_{count:04d}.webp"
        out_path = os.path.join(output_dir, frame_name)
        
        # Save WebP with high quality (92)
        cv2.imwrite(out_path, frame, [int(cv2.IMWRITE_WEBP_QUALITY), 92])
        success_count += 1

        if count % 50 == 0 or count == total_frames:
            print(f"Extracted {count}/{total_frames} frames... ({time.time() - t0:.1f}s)")

    cap.release()
    print(f"Extraction complete! {success_count} WebP frames saved in '{output_dir}' in {time.time() - t0:.2f}s.")

if __name__ == '__main__':
    extract()
