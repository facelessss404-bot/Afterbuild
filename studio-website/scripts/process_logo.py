from PIL import Image, ImageFilter
import numpy as np
from scipy import ndimage
import os

img_path = r'd:\Ideaseternal_Projects\client_2_website\studio-website\public\images\logo-emblem-full.jpg'
raw_path = r'd:\Ideaseternal_Projects\client_2_website\studio-website\public\images\afterbuild-logo-raw.jpg'
out_dir = r'd:\Ideaseternal_Projects\client_2_website\studio-website\public\images'

def make_transparent(im, bg_color_sample):
    rgb = np.array(im.convert('RGB')).astype(float)
    # Background distance from sample
    dist = np.sqrt(np.sum((rgb - bg_color_sample) ** 2, axis=2))
    
    # Seeds for background flood fill (from corners and outer borders)
    h, w = rgb.shape[:2]
    border_mask = np.zeros((h, w), dtype=bool)
    border_mask[0, :] = True
    border_mask[-1, :] = True
    border_mask[:, 0] = True
    border_mask[:, -1] = True
    
    # Background is close to bg_color_sample (dist < 45)
    bg_initial = dist < 50
    # Connected component to borders
    labeled, num_features = ndimage.label(bg_initial)
    border_labels = np.unique(labeled[border_mask])
    border_labels = border_labels[border_labels != 0]
    
    is_outer_bg = np.isin(labeled, border_labels)
    
    # Soft alpha around edges
    # Compute distance from outer background
    dist_from_bg = ndimage.distance_transform_edt(~is_outer_bg)
    alpha = np.clip(dist_from_bg * 90, 0, 255).astype(np.uint8)
    
    res = np.zeros((h, w, 4), dtype=np.uint8)
    res[:, :, :3] = np.array(im.convert('RGB'))
    res[:, :, 3] = alpha
    return Image.fromarray(res)

# Process Emblem
emblem_im = Image.open(img_path)
# Sample top-left corner as bg
bg_sample = np.array(emblem_im.convert('RGB'))[:10, :10].mean(axis=(0,1))
transparent_emblem = make_transparent(emblem_im, bg_sample)

# Crop tight
bbox = transparent_emblem.getbbox()
if bbox:
    transparent_emblem = transparent_emblem.crop(bbox)

transparent_emblem.save(os.path.join(out_dir, 'logo-mark.png'))
print('Saved logo-mark.png, size:', transparent_emblem.size)

# Also create favicon 32x32, 64x64, 192x192
fav = transparent_emblem.copy()
fav.thumbnail((64, 64), Image.Resampling.LANCZOS)
fav.save(os.path.join(out_dir, 'favicon-64.png'))

fav192 = transparent_emblem.copy()
fav192.thumbnail((192, 192), Image.Resampling.LANCZOS)
fav192.save(os.path.join(out_dir, 'favicon-192.png'))

# Save the original card logo as logo-card.png
raw_im = Image.open(raw_path)
raw_im.save(os.path.join(out_dir, 'logo-card.png'), quality=95)
print('Saved logo-card.png')
