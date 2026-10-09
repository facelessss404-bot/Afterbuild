import os
import shutil
import numpy as np
from PIL import Image, ImageFilter

SRC_FILE = r'd:\Ideaseternal_Projects\client_2_website\company_logo.png'
PUBLIC_IMG_DIR = r'd:\Ideaseternal_Projects\client_2_website\studio-website\public\images'
PUBLIC_DIR = r'd:\Ideaseternal_Projects\client_2_website\studio-website\public'
APP_DIR = r'd:\Ideaseternal_Projects\client_2_website\studio-website\src\app'

os.makedirs(PUBLIC_IMG_DIR, exist_ok=True)

# 1. Copy master company_logo.png and company_logo.jpeg to all public targets
master_im = Image.open(SRC_FILE)
w, h = master_im.size
print(f"Master logo loaded: {w}x{h}, mode: {master_im.mode}")

# Save PNG and JPEG to public/images
master_im.save(os.path.join(PUBLIC_IMG_DIR, 'company_logo.png'), 'PNG', optimize=True)
master_im.convert('RGB').save(os.path.join(PUBLIC_IMG_DIR, 'company_logo.jpeg'), 'JPEG', quality=98)

# Save PNG and JPEG to public root
master_im.save(os.path.join(PUBLIC_DIR, 'company_logo.png'), 'PNG', optimize=True)
master_im.convert('RGB').save(os.path.join(PUBLIC_DIR, 'company_logo.jpeg'), 'JPEG', quality=98)

# Save as logo-card.png (for Studio page and metadata)
master_im.save(os.path.join(PUBLIC_IMG_DIR, 'logo-card.png'), 'PNG', optimize=True)
master_im.convert('RGB').save(os.path.join(PUBLIC_IMG_DIR, 'logo-card.jpg'), 'JPEG', quality=98)

print("Saved official company_logo files and logo-card.")

# 2. Extract transparent emblem & transparent full logo
# In company_logo.png:
# Background is off-white (lum > 210, high lightness)
rgb = np.array(master_im.convert('RGB')).astype(float)
eh, ew = rgb.shape[:2]

# Detect background: corners and borders have lightness > 190
corner_bg = np.array([
    rgb[:20, :20].mean(axis=(0,1)),
    rgb[:20, -20:].mean(axis=(0,1)),
    rgb[-20:, :20].mean(axis=(0,1)),
    rgb[-20:, -20:].mean(axis=(0,1))
]).mean(axis=0)

print(f"Detected ambient background color: {corner_bg}")

# Smooth background removal for dark luxury background
# Alpha is 1 where pixels deviate from ambient background
diff = np.sqrt(np.sum((rgb - corner_bg)**2, axis=2))

# Emblem region (top 60% of image):
# Triangle set-square + ribbon + AB letters
crop_emblem = master_im.crop((180, 180, 850, 600))
crop_emblem.save(os.path.join(PUBLIC_IMG_DIR, 'logo-emblem-full.jpg'), 'JPEG', quality=98)

# Generate favicons
fav_base = master_im.copy()
# Create square crop centered on emblem and wordmark
min_dim = min(w, h)
left = (w - min_dim) // 2
top = (h - min_dim) // 2
sq_crop = fav_base.crop((left, top, left + min_dim, top + min_dim))

sizes = [16, 32, 48, 64, 180, 192, 512]
for s in sizes:
    resized = sq_crop.resize((s, s), Image.Resampling.LANCZOS)
    resized.save(os.path.join(PUBLIC_IMG_DIR, f'favicon-{s}.png'), 'PNG')
    if s == 180:
        resized.save(os.path.join(PUBLIC_IMG_DIR, 'apple-touch-icon.png'), 'PNG')
        resized.save(os.path.join(APP_DIR, 'apple-icon.png'), 'PNG')
    if s == 32:
        resized.save(os.path.join(APP_DIR, 'icon.png'), 'PNG')
        resized.save(os.path.join(PUBLIC_DIR, 'favicon.ico'), format='ICO')
        resized.save(os.path.join(APP_DIR, 'favicon.ico'), format='ICO')

print("All favicons and app icons generated from official company_logo.")
