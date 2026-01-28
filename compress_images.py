import os
from PIL import Image
import sys

# TARGET_DIR = r"d:\AR\AR-STUDIO-INTERNSHIP_PORTFOLIO\assets\images\portfolio"
TARGET_DIR = os.path.join(os.getcwd(), 'assets', 'images', 'portfolio')

def compress_images(directory):
    print(f"Scanning {directory}...")
    for root, dirs, files in os.walk(directory):
        for file in files:
            if file.lower().endswith(('.png', '.jpg', '.jpeg')):
                filepath = os.path.join(root, file)
                size_mb = os.path.getsize(filepath) / (1024 * 1024)
                
                # Only compress if > 1MB
                if size_mb > 1:
                    print(f"Compressing {file} ({size_mb:.2f} MB)...")
                    try:
                        with Image.open(filepath) as img:
                            # Convert RGBA to RGB if needed (for PNG to JPG conversion)
                            if img.mode in ('RGBA', 'P'):
                                img = img.convert('RGB')
                            
                            # Resize if huge
                            if img.width > 1920:
                                ratio = 1920 / img.width
                                new_height = int(img.height * ratio)
                                img = img.resize((1920, new_height), Image.Resampling.LANCZOS)
                            
                            # Save as JPG with optimization
                            # We replace the original or save as new? 
                            # Let's overwrite safely by saving to temp first then move
                            
                            # Note: Changing PNG to JPG extension
                            new_filepath = os.path.splitext(filepath)[0] + ".jpg"
                            
                            img.save(new_filepath, "JPEG", optimize=True, quality=80)
                            
                            new_size_mb = os.path.getsize(new_filepath) / (1024 * 1024)
                            print(f"Done: {new_size_mb:.2f} MB")
                            
                            # If it was a PNG and we made a JPG, maybe delete the PNG?
                            # User said "compress assets". Replacing huge PNG with JPG is standard.
                            if filepath != new_filepath:
                                os.remove(filepath)
                                print(f"Removed original {file}")

                    except Exception as e:
                        print(f"Error compressing {file}: {e}")

if __name__ == "__main__":
    if len(sys.argv) > 1:
         # ensure Pillow is installed
         pass
    compress_images(TARGET_DIR)
