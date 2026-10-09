import os
import numpy as np
from PIL import Image, ImageDraw, ImageFilter, ImageEnhance
from scipy import ndimage

RAW_PATH = r'd:\Ideaseternal_Projects\client_2_website\company_logo.png'
OUT_DIR = r'd:\Ideaseternal_Projects\client_2_website\studio-website\public\images'
APP_DIR = r'd:\Ideaseternal_Projects\client_2_website\studio-website\src\app'

raw_im = Image.open(RAW_PATH)
raw_rgb = np.array(raw_im.convert('RGB')).astype(float)
h_raw, w_raw = raw_rgb.shape[:2]

# ─────────────────────────────────────────────────────────────
# 1. ISOLATE EMBLEM GEOMETRY ACCURATELY
# ─────────────────────────────────────────────────────────────
crop_x0, crop_y0, crop_x1, crop_y1 = 195, 175, 840, 595
emblem_arr = raw_rgb[crop_y0:crop_y1, crop_x0:crop_x1]
eh, ew = emblem_arr.shape[:2]
gray_e = emblem_arr.mean(axis=2)

Y_e, X_e = np.mgrid[:eh, :ew]

# Right triangle drafting set square in Region A (x <= 383)
hypot_x = 34.0 + (383.0 - 34.0) * (379.0 - Y_e) / (379.0 - 10.0)
in_triangle = (X_e >= hypot_x) & (X_e <= 383) & (Y_e >= 10) & (Y_e <= 379)

in_triangle_solid = in_triangle & (gray_e < 165)
in_triangle_filled = ndimage.binary_fill_holes(in_triangle_solid)

arch_cutout = in_triangle & (~in_triangle_solid)
arch_labeled, num_arch = ndimage.label(arch_cutout)
for a_idx in range(1, num_arch + 1):
    if np.sum(arch_labeled == a_idx) > 500:
        in_triangle_filled[arch_labeled == a_idx] = False

fg_mask_e = np.zeros((eh, ew), dtype=bool)
fg_mask_e[in_triangle_filled] = True

# Region B (x > 383): letter B dark ribbon
in_b = (X_e > 383) & (gray_e < 140) & (Y_e <= 380)
in_b = ndimage.binary_fill_holes(in_b)
fg_mask_e[in_b] = True

# Arch ribbon connecting A to B across x = 383
fg_mask_e[(X_e >= 370) & (X_e <= 400) & (gray_e < 155) & (Y_e >= 100) & (Y_e <= 200)] = True

# Anti-aliasing with signed distance transform
dist_in = ndimage.distance_transform_edt(fg_mask_e)
dist_out = ndimage.distance_transform_edt(~fg_mask_e)
signed_dist = dist_in - dist_out
alpha_e = np.clip(signed_dist + 0.5, 0, 1)

# Fit background for de-fringing
border_mask_e = np.zeros((eh, ew), dtype=bool)
border_mask_e[:15, :] = True
border_mask_e[-15:, 200:] = True
border_mask_e[:, -15:] = True
border_mask_e[:300, :15] = True
X_flat, Y_flat = X_e[border_mask_e], Y_e[border_mask_e]
A_mat = np.column_stack([np.ones_like(X_flat), X_flat, Y_flat, X_flat * Y_flat])
pred_bg_e = np.zeros_like(emblem_arr)
for c in range(3):
    vals = emblem_arr[:, :, c][border_mask_e]
    coeffs, _, _, _ = np.linalg.lstsq(A_mat, vals, rcond=None)
    A_all = np.column_stack([np.ones(eh*ew), X_e.ravel(), Y_e.ravel(), (X_e*Y_e).ravel()])
    pred_bg_e[:, :, c] = (A_all @ coeffs).reshape(eh, ew)

clean_rgb_e = np.copy(emblem_arr)
mask_edge = (alpha_e > 0.02) & (alpha_e < 0.98)
for c in range(3):
    clean_rgb_e[:, :, c][mask_edge] = (emblem_arr[:, :, c][mask_edge] - (1 - alpha_e[mask_edge]) * pred_bg_e[:, :, c][mask_edge]) / alpha_e[mask_edge]
clean_rgb_e = np.clip(clean_rgb_e, 0, 255)

# ─────────────────────────────────────────────────────────────
# 2. ENHANCE EMBLEM RADIANCE & LUMINANCE FOR DARK SURFACES
# ─────────────────────────────────────────────────────────────
# The raw emblem has dark wine tones (mean ~120 R, ~60 G, ~65 B) which blend into #0A0A09.
# We apply a luxury architectural grading:
# 1. Lift red highlights (radiant crimson burgundy: 1.4x red midtones)
# 2. Lift bronze/gold speculars (warm champagne gold: 1.35x on ribbon)
# 3. Preserve crisp white ruler markings and bevels
bright_rgb = np.copy(clean_rgb_e)

# Red channel boost for burgundy warmth
r = bright_rgb[:, :, 0]
g = bright_rgb[:, :, 1]
b = bright_rgb[:, :, 2]

# Isolate burgundy area (where r > g and r > b)
is_burgundy = (r > g * 1.15) & (r > b * 1.1)
bright_rgb[:, :, 0][is_burgundy] = np.clip(r[is_burgundy] * 1.38 + 15, 0, 255)
bright_rgb[:, :, 1][is_burgundy] = np.clip(g[is_burgundy] * 1.15, 0, 255)
bright_rgb[:, :, 2][is_burgundy] = np.clip(b[is_burgundy] * 1.2, 0, 255)

# Isolate bronze ribbon (where r, g are balanced warm bronze: r ~ 100-180, g ~ 80-150)
is_bronze = (X_e > 375) & (~is_burgundy) & (gray_e < 170)
bright_rgb[:, :, 0][is_bronze] = np.clip(r[is_bronze] * 1.32 + 25, 0, 255)
bright_rgb[:, :, 1][is_bronze] = np.clip(g[is_bronze] * 1.28 + 18, 0, 255)
bright_rgb[:, :, 2][is_bronze] = np.clip(b[is_bronze] * 1.15 + 8, 0, 255)

# Highlights (white graduation marks and reflections where gray > 140)
is_highlight = gray_e >= 140
bright_rgb[:, :, 0][is_highlight] = np.clip(r[is_highlight] * 1.2 + 20, 0, 255)
bright_rgb[:, :, 1][is_highlight] = np.clip(g[is_highlight] * 1.2 + 20, 0, 255)
bright_rgb[:, :, 2][is_highlight] = np.clip(b[is_highlight] * 1.2 + 20, 0, 255)

res_e = np.zeros((eh, ew, 4), dtype=np.uint8)
res_e[:, :, :3] = np.clip(bright_rgb, 0, 255).astype(np.uint8)
res_e[:, :, 3] = (alpha_e * 255).astype(np.uint8)

im_emblem = Image.fromarray(res_e)
bbox_e = im_emblem.getbbox()
im_emblem = im_emblem.crop(bbox_e)

im_emblem.save(os.path.join(OUT_DIR, 'logo-emblem.png'))
im_emblem.save(os.path.join(OUT_DIR, 'logo-mark.png'))
im_emblem.save(os.path.join(OUT_DIR, 'logo-mark-clean.png'))
print(f'Enhanced emblem saved: {im_emblem.size}')

# ─────────────────────────────────────────────────────────────
# 3. EXTRACT WORDMARKS WITH SUBPIXEL PRECISION
# ─────────────────────────────────────────────────────────────
def extract_text_layer(crop_box, threshold=95):
    crop_im = raw_im.crop(crop_box)
    arr_l = np.array(crop_im.convert('L')).astype(float)
    bin_l = arr_l < threshold
    d_in = ndimage.distance_transform_edt(bin_l)
    d_out = ndimage.distance_transform_edt(~bin_l)
    s_dist = d_in - d_out
    alpha_l = np.clip(s_dist + 0.5, 0, 1)
    return alpha_l

def render_colored_layer(alpha, color_rgb):
    h, w = alpha.shape
    res = np.zeros((h, w, 4), dtype=np.uint8)
    res[:, :, :3] = color_rgb
    res[:, :, 3] = (alpha * 255).astype(np.uint8)
    img = Image.fromarray(res)
    bbox = img.getbbox()
    return img.crop(bbox) if bbox else img

# 3A. AFTERBUILD Wordmark
alpha_ab = extract_text_layer((120, 600, 960, 680), threshold=90)

# 3B. STUDIO Wordmark (isolate letters without the outer horizontal rules)
# In raw (200, 680, 880, 735), 'STUDIO' letters are between x=190 and x=500 in local coordinates
# In raw coords: 200 + 190 = 390 to 200 + 500 = 700
alpha_st = extract_text_layer((385, 685, 705, 735), threshold=100)

# 3C. DESIGN • INTERIORS • ARCHITECT
alpha_tg = extract_text_layer((180, 735, 900, 785), threshold=110)

# Dark theme colors (Pure Brilliant White & Luminous Warm Bronze/Gold):
# AFTERBUILD: Pure crisp white [255, 255, 255]
# STUDIO: Warm luminous gold [228, 198, 154]
# TAGLINE: Champagne bronze [212, 182, 142]
ab_dark = render_colored_layer(alpha_ab, [255, 255, 255])
st_dark = render_colored_layer(alpha_st, [228, 198, 154])
tg_dark = render_colored_layer(alpha_tg, [212, 182, 142])

# Light theme colors:
ab_light = render_colored_layer(alpha_ab, [14, 15, 18])
st_light = render_colored_layer(alpha_st, [142, 108, 68])
tg_light = render_colored_layer(alpha_tg, [78, 74, 68])

print('Text layers extracted: AB', ab_dark.size, 'ST', st_dark.size, 'TG', tg_dark.size)

# ─────────────────────────────────────────────────────────────
# 4. COMPOSE OFFICIAL 2-LINE HORIZONTAL LOCKUP
# ─────────────────────────────────────────────────────────────
# Official Lockup Structure (as in client brand specifications):
# [ EMBLEM ]   gap   [ AFTERBUILD   STUDIO ]
#                    [ DESIGN • INTERIORS • ARCHITECT ]
def create_2line_horizontal_lockup(emb_img, ab_img, st_img, tg_img, target_h=140, is_dark=True, add_ambient_glow=False):
    # Scale emblem to target_h
    scale_e = target_h / emb_img.height
    emb_w = int(emb_img.width * scale_e)
    emb_scaled = emb_img.resize((emb_w, target_h), Image.Resampling.LANCZOS)
    
    # Balanced text proportions matching client brand specification:
    # Emblem takes ~31% of width, text takes ~64%, gap is ~5%
    # Text block target width ~ 2.2x emblem width
    target_text_w = int(emb_w * 2.2)
    
    # Line 1: AFTERBUILD (73% of text width) + STUDIO (24% of text width) + gap (3%)
    ab_target_w = int(target_text_w * 0.72)
    scale_ab = ab_target_w / ab_img.width
    ab_h = int(ab_img.height * scale_ab)
    ab_scaled = ab_img.resize((ab_target_w, ab_h), Image.Resampling.LANCZOS)
    
    st_target_w = int(target_text_w * 0.25)
    scale_st = st_target_w / st_img.width
    st_h = int(st_img.height * scale_st)
    st_scaled = st_img.resize((st_target_w, st_h), Image.Resampling.LANCZOS)
    
    gap_ab_st = target_text_w - ab_target_w - st_target_w
    line1_h = max(ab_h, st_h)
    
    # Line 2: DESIGN • INTERIORS • ARCHITECT (spans full text width)
    scale_tg = target_text_w / tg_img.width
    tg_h = int(tg_img.height * scale_tg)
    tg_scaled = tg_img.resize((target_text_w, tg_h), Image.Resampling.LANCZOS)
    
    # Vertical spacing in right text block
    gap_lines = int(target_h * 0.12)
    total_text_h = line1_h + gap_lines + tg_h
    gap_emb_text = int(target_h * 0.20)
    
    pad_right = int(target_h * 0.05)
    total_w = emb_w + gap_emb_text + target_text_w + pad_right
    
    res = Image.new('RGBA', (total_w, target_h), (0, 0, 0, 0))
    
    # Ambient backlight glow for dark theme
    if add_ambient_glow and is_dark:
        glow_layer = Image.new('RGBA', (total_w, target_h), (0, 0, 0, 0))
        draw_g = ImageDraw.Draw(glow_layer)
        glow_cx = emb_w // 2
        glow_cy = target_h // 2
        for r in range(int(target_h * 0.75), 0, -4):
            alpha_g = int(35 * (1 - r / (target_h * 0.75)))
            draw_g.ellipse(
                [(glow_cx - int(r*1.3), glow_cy - r), (glow_cx + int(r*1.3), glow_cy + r)],
                fill=(212, 178, 130, alpha_g)
            )
        glow_blurred = glow_layer.filter(ImageFilter.GaussianBlur(10))
        res.paste(glow_blurred, (0, 0), glow_blurred)
    
    # Paste emblem centered vertically
    res.paste(emb_scaled, (0, 0), emb_scaled)
    
    # Paste text column vertically centered
    y_start = (target_h - total_text_h) // 2
    x_text = emb_w + gap_emb_text
    
    # Line 1: AFTERBUILD
    res.paste(ab_scaled, (x_text, y_start), ab_scaled)
    # Line 1: STUDIO (aligned to baseline of AFTERBUILD)
    y_st = y_start + (ab_h - st_h)
    res.paste(st_scaled, (x_text + ab_target_w + gap_ab_st, y_st), st_scaled)
    
    # Line 2: DESIGN • INTERIORS • ARCHITECT
    y_tg = y_start + line1_h + gap_lines
    res.paste(tg_scaled, (x_text, y_tg), tg_scaled)
    
    bbox = res.getbbox()
    return res.crop(bbox) if bbox else res

# Generate master 2-line horizontal lockups
dark_master = create_2line_horizontal_lockup(im_emblem, ab_dark, st_dark, tg_dark, target_h=140, is_dark=True, add_ambient_glow=False)
dark_master.save(os.path.join(OUT_DIR, 'logo-horizontal-dark.png'))

dark_glow = create_2line_horizontal_lockup(im_emblem, ab_dark, st_dark, tg_dark, target_h=140, is_dark=True, add_ambient_glow=True)
dark_glow.save(os.path.join(OUT_DIR, 'logo-horizontal-dark-glow.png'))

light_master = create_2line_horizontal_lockup(im_emblem, ab_light, st_light, tg_light, target_h=140, is_dark=False, add_ambient_glow=False)
light_master.save(os.path.join(OUT_DIR, 'logo-horizontal-light.png'))

# Compact version (Line 1 only: AFTERBUILD STUDIO next to emblem)
def create_compact_horizontal(emb_img, ab_img, st_img, target_h=140, is_dark=True):
    scale_e = target_h / emb_img.height
    emb_w = int(emb_img.width * scale_e)
    emb_scaled = emb_img.resize((emb_w, target_h), Image.Resampling.LANCZOS)
    
    line1_h = int(target_h * 0.48)
    scale_ab = line1_h / ab_img.height
    ab_w = int(ab_img.width * scale_ab)
    ab_scaled = ab_img.resize((ab_w, line1_h), Image.Resampling.LANCZOS)
    
    st_h = int(line1_h * 0.78)
    scale_st = st_h / st_img.height
    st_w = int(st_img.width * scale_st)
    st_scaled = st_img.resize((st_w, st_h), Image.Resampling.LANCZOS)
    
    gap_ab_st = int(target_h * 0.1)
    gap_emb_text = int(target_h * 0.28)
    
    total_w = emb_w + gap_emb_text + ab_w + gap_ab_st + st_w + 10
    res = Image.new('RGBA', (total_w, target_h), (0, 0, 0, 0))
    res.paste(emb_scaled, (0, 0), emb_scaled)
    
    y_start = (target_h - line1_h) // 2
    x_text = emb_w + gap_emb_text
    res.paste(ab_scaled, (x_text, y_start), ab_scaled)
    y_st = y_start + (line1_h - st_h)
    res.paste(st_scaled, (x_text + ab_w + gap_ab_st, y_st), st_scaled)
    
    bbox = res.getbbox()
    return res.crop(bbox) if bbox else res

compact_dark = create_compact_horizontal(im_emblem, ab_dark, st_dark, target_h=140, is_dark=True)
compact_dark.save(os.path.join(OUT_DIR, 'logo-horizontal-dark-compact.png'))

compact_light = create_compact_horizontal(im_emblem, ab_light, st_light, target_h=140, is_dark=False)
compact_light.save(os.path.join(OUT_DIR, 'logo-horizontal-light-compact.png'))

print('Master horizontal lockups generated!')

# ─────────────────────────────────────────────────────────────
# 5. COMPOSE MASTER STACKED LOCKUPS (CENTERED)
# ─────────────────────────────────────────────────────────────
def create_stacked_lockup(emblem_img, ab_img, st_img, tg_img, max_w=800):
    scale = max_w / max(emblem_img.width, ab_img.width, st_img.width, tg_img.width)
    emb = emblem_img.resize((int(emblem_img.width * scale * 0.88), int(emblem_img.height * scale * 0.88)), Image.Resampling.LANCZOS)
    ab = ab_img.resize((int(ab_img.width * scale), int(ab_img.height * scale)), Image.Resampling.LANCZOS)
    st = st_img.resize((int(st_img.width * scale * 0.85), int(st_img.height * scale * 0.85)), Image.Resampling.LANCZOS)
    tg = tg_img.resize((int(tg_img.width * scale * 0.82), int(tg_img.height * scale * 0.82)), Image.Resampling.LANCZOS)
    
    gap1 = int(32 * scale)
    gap2 = int(22 * scale)
    gap3 = int(20 * scale)
    
    total_h = emb.height + gap1 + ab.height + gap2 + st.height + gap3 + tg.height
    total_w = max(emb.width, ab.width, st.width, tg.width)
    
    res = Image.new('RGBA', (total_w, total_h), (0, 0, 0, 0))
    y = 0
    res.paste(emb, ((total_w - emb.width)//2, y), emb)
    y += emb.height + gap1
    res.paste(ab, ((total_w - ab.width)//2, y), ab)
    y += ab.height + gap2
    res.paste(st, ((total_w - st.width)//2, y), st)
    y += st.height + gap3
    res.paste(tg, ((total_w - tg.width)//2, y), tg)
    return res

logo_stacked_dark = create_stacked_lockup(im_emblem, ab_dark, st_dark, tg_dark, max_w=720)
logo_stacked_dark.save(os.path.join(OUT_DIR, 'logo-stacked-dark.png'))

logo_stacked_light = create_stacked_lockup(im_emblem, ab_light, st_light, tg_light, max_w=720)
logo_stacked_light.save(os.path.join(OUT_DIR, 'logo-stacked-light.png'))
print('Stacked lockups created!')

# ─────────────────────────────────────────────────────────────
# 6. BRAND CARD WITH ARCHITECTURAL GRID & GOLD ACCENTS
# ─────────────────────────────────────────────────────────────
card_w, card_h = 1200, 900
card = Image.new('RGB', (card_w, card_h), (14, 15, 18))
draw = ImageDraw.Draw(card)

grid_step = 60
for x in range(grid_step, card_w, grid_step):
    draw.line([(x, 0), (x, card_h)], fill=(22, 24, 28), width=1)
for y in range(grid_step, card_h, grid_step):
    draw.line([(0, y), (card_w, y)], fill=(22, 24, 28), width=1)

draw.rectangle([(40, 40), (card_w - 40, card_h - 40)], outline=(197, 168, 128, 40), width=1)
draw.rectangle([(48, 48), (card_w - 48, card_h - 48)], outline=(40, 43, 50), width=1)

def draw_crosshair(x, y):
    draw.line([(x - 14, y), (x + 14, y)], fill=(197, 168, 128), width=1)
    draw.line([(x, y - 14), (x, y + 14)], fill=(197, 168, 128), width=1)
draw_crosshair(40, 40)
draw_crosshair(card_w - 40, 40)
draw_crosshair(40, card_h - 40)
draw_crosshair(card_w - 40, card_h - 40)

card_logo = create_stacked_lockup(im_emblem, ab_dark, st_dark, tg_dark, max_w=640)
logo_x = (card_w - card_logo.width) // 2
logo_y = (card_h - card_logo.height) // 2
card.paste(card_logo, (logo_x, logo_y), card_logo)

card.save(os.path.join(OUT_DIR, 'logo-card.png'), quality=96)
card.save(os.path.join(OUT_DIR, 'logo-card.jpg'), quality=96)
print('Brand identity card saved!')

# ─────────────────────────────────────────────────────────────
# 7. HIGH RES FAVICONS
# ─────────────────────────────────────────────────────────────
sq_dim = max(im_emblem.width, im_emblem.height)
pad_w = (sq_dim - im_emblem.width) // 2
pad_h = (sq_dim - im_emblem.height) // 2

sq_emblem = Image.new('RGBA', (sq_dim, sq_dim), (0, 0, 0, 0))
sq_emblem.paste(im_emblem, (pad_w, pad_h), im_emblem)

for s in [16, 32, 48, 64, 180, 192, 512]:
    icon_s = sq_emblem.resize((s, s), Image.Resampling.LANCZOS)
    icon_s.save(os.path.join(OUT_DIR, f'favicon-{s}.png'))
    if s == 180:
        icon_s.save(os.path.join(OUT_DIR, 'apple-touch-icon.png'))
        icon_s.save(os.path.join(APP_DIR, 'apple-icon.png'))
    if s == 32 or s == 48:
        icon_s.save(os.path.join(APP_DIR, 'icon.png'))

fav16 = sq_emblem.resize((16, 16), Image.Resampling.LANCZOS)
fav32 = sq_emblem.resize((32, 32), Image.Resampling.LANCZOS)
fav48 = sq_emblem.resize((48, 48), Image.Resampling.LANCZOS)
fav16.save(
    os.path.join(r'd:\Ideaseternal_Projects\client_2_website\studio-website\public', 'favicon.ico'),
    format='ICO',
    sizes=[(16, 16), (32, 32), (48, 48)]
)
fav16.save(
    os.path.join(APP_DIR, 'favicon.ico'),
    format='ICO',
    sizes=[(16, 16), (32, 32), (48, 48)]
)
print('All brand assets successfully updated with bright, luminous grading!')
