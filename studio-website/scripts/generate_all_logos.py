from PIL import Image, ImageDraw, ImageFilter
import numpy as np
from scipy import ndimage
import os

RAW_PATH = r'd:\Ideaseternal_Projects\client_2_website\studio-website\public\images\afterbuild-logo-raw.jpg'
OUT_DIR = r'd:\Ideaseternal_Projects\client_2_website\studio-website\public\images'
APP_DIR = r'd:\Ideaseternal_Projects\client_2_website\studio-website\src\app'

raw_im = Image.open(RAW_PATH)
raw_rgb = np.array(raw_im.convert('RGB')).astype(float)
h_raw, w_raw = raw_rgb.shape[:2]

# ─────────────────────────────────────────────────────────────
# 1. ISOLATE EMBLEM WITH SUBPIXEL PRECISION & CLEAN GEOMETRY
# ─────────────────────────────────────────────────────────────
# Emblem bounding box in raw image:
# x: 195 to 840, y: 175 to 595
crop_x0, crop_y0, crop_x1, crop_y1 = 195, 175, 840, 595
emblem_arr = raw_rgb[crop_y0:crop_y1, crop_x0:crop_x1]
eh, ew = emblem_arr.shape[:2]
gray_e = emblem_arr.mean(axis=2)

Y_e, X_e = np.mgrid[:eh, :ew]

# Right triangle drafting set square in Region A (x <= 383)
# Vertices in emblem coordinates:
# Apex: (383, 10)
# Bottom-left: (34, 379)
# Bottom-right: (383, 379)
hypot_x = 34.0 + (383.0 - 34.0) * (379.0 - Y_e) / (379.0 - 10.0)
in_triangle = (X_e >= hypot_x) & (X_e <= 383) & (Y_e >= 10) & (Y_e <= 379)

# Inside the triangle: solid burgundy/ruler has gray < 165
# The arch cutout between the ruler and arch ribbon has gray > 180
in_triangle_solid = in_triangle & (gray_e < 165)
in_triangle_filled = ndimage.binary_fill_holes(in_triangle_solid)

# Preserve the arch opening above ruler
arch_cutout = in_triangle & (~in_triangle_solid)
arch_labeled, num_arch = ndimage.label(arch_cutout)
for a_idx in range(1, num_arch + 1):
    if np.sum(arch_labeled == a_idx) > 500:
        in_triangle_filled[arch_labeled == a_idx] = False

fg_mask_e = np.zeros((eh, ew), dtype=bool)
fg_mask_e[in_triangle_filled] = True

# Region B (x > 383):
# Letter B dark ribbon
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

# De-fringe edge pixels
clean_rgb_e = np.copy(emblem_arr)
mask_edge = (alpha_e > 0.02) & (alpha_e < 0.98)
for c in range(3):
    clean_rgb_e[:, :, c][mask_edge] = (emblem_arr[:, :, c][mask_edge] - (1 - alpha_e[mask_edge]) * pred_bg_e[:, :, c][mask_edge]) / alpha_e[mask_edge]
clean_rgb_e = np.clip(clean_rgb_e, 0, 255)

res_e = np.zeros((eh, ew, 4), dtype=np.uint8)
res_e[:, :, :3] = clean_rgb_e.astype(np.uint8)
res_e[:, :, 3] = (alpha_e * 255).astype(np.uint8)

im_emblem = Image.fromarray(res_e)
bbox_e = im_emblem.getbbox()
im_emblem = im_emblem.crop(bbox_e)

# Save pristine emblem files
im_emblem.save(os.path.join(OUT_DIR, 'logo-emblem.png'))
im_emblem.save(os.path.join(OUT_DIR, 'logo-mark.png'))
im_emblem.save(os.path.join(OUT_DIR, 'logo-mark-clean.png'))
print(f'Pristine emblem saved: {im_emblem.size}')

# ─────────────────────────────────────────────────────────────
# 2. ISOLATE WORDMARKS: AFTERBUILD, STUDIO, DESIGN|INTERIORS|ARCHITECT
# ─────────────────────────────────────────────────────────────
def extract_text_layer(crop_box, threshold=95):
    crop_im = raw_im.crop(crop_box)
    arr_l = np.array(crop_im.convert('L')).astype(float)
    h_c, w_c = arr_l.shape
    
    # Letters are very dark < threshold
    bin_l = arr_l < threshold
    
    # Anti-alias
    d_in = ndimage.distance_transform_edt(bin_l)
    d_out = ndimage.distance_transform_edt(~bin_l)
    s_dist = d_in - d_out
    alpha_l = np.clip(s_dist + 0.5, 0, 1)
    return alpha_l, (w_c, h_c)

# 2A. AFTERBUILD Wordmark (rows 600-680, cols 120-960)
alpha_ab, (w_ab, h_ab) = extract_text_layer((120, 600, 960, 680), threshold=90)

# 2B. — STUDIO — Wordmark (rows 680-735, cols 200-880)
alpha_st, (w_st, h_st) = extract_text_layer((200, 680, 880, 735), threshold=100)

# 2C. DESIGN | INTERIORS | ARCHITECT (rows 735-785, cols 180-900)
alpha_tg, (w_tg, h_tg) = extract_text_layer((180, 735, 900, 785), threshold=110)

def render_colored_layer(alpha, color_rgb):
    h, w = alpha.shape
    res = np.zeros((h, w, 4), dtype=np.uint8)
    res[:, :, :3] = color_rgb
    res[:, :, 3] = (alpha * 255).astype(np.uint8)
    img = Image.fromarray(res)
    bbox = img.getbbox()
    return img.crop(bbox) if bbox else img

# Dark theme colors:
# AFTERBUILD: #F3F0EA (243, 240, 234)
# STUDIO: #C5A880 (197, 168, 128)
# TAGLINE: rgba(197, 168, 128, 0.75) -> #BAA380 (186, 163, 128)
ab_dark = render_colored_layer(alpha_ab, [243, 240, 234])
st_dark = render_colored_layer(alpha_st, [197, 168, 128])
tg_dark = render_colored_layer(alpha_tg, [186, 163, 128])

# Light theme colors:
# AFTERBUILD: #111111 (17, 17, 17)
# STUDIO: #8E6F4B (142, 111, 75)
# TAGLINE: #555555 (85, 85, 85)
ab_light = render_colored_layer(alpha_ab, [17, 17, 17])
st_light = render_colored_layer(alpha_st, [142, 111, 75])
tg_light = render_colored_layer(alpha_tg, [85, 85, 85])

print('Rendered wordmarks:', ab_dark.size, st_dark.size, tg_dark.size)

# ─────────────────────────────────────────────────────────────
# 3. COMPOSE MASTER HORIZONTAL LOCKUPS (FOR NAVBAR & FOOTER)
# ─────────────────────────────────────────────────────────────
# Horizontal layout:
# [ EMBLEM ]   gap   [ AFTERBUILD ]
#                    [ — STUDIO — ]
#                    [ DESIGN | INTERIORS | ARCHITECT ]
def create_horizontal_lockup(emblem_img, ab_img, st_img, tg_img, target_h=120, include_tagline=True):
    # Scale emblem to target_h
    scale_e = target_h / emblem_img.height
    emb_scaled = emblem_img.resize((int(emblem_img.width * scale_e), target_h), Image.Resampling.LANCZOS)
    
    # Calculate right text column
    # We want AFTERBUILD to be prominent, STUDIO below, TAGLINE below that
    ab_target_h = int(target_h * 0.44)
    scale_ab = ab_target_h / ab_img.height
    ab_scaled = ab_img.resize((int(ab_img.width * scale_ab), ab_target_h), Image.Resampling.LANCZOS)
    
    st_target_h = int(target_h * 0.22)
    scale_st = st_target_h / st_img.height
    st_scaled = st_img.resize((int(st_img.width * scale_st), st_target_h), Image.Resampling.LANCZOS)
    
    tg_target_h = int(target_h * 0.14)
    scale_tg = tg_target_h / tg_img.height
    tg_scaled = tg_img.resize((int(tg_img.width * scale_tg), tg_target_h), Image.Resampling.LANCZOS)
    
    # Text block total height
    gap_ab_st = int(target_h * 0.06)
    gap_st_tg = int(target_h * 0.05)
    
    text_total_h = ab_scaled.height + gap_ab_st + st_scaled.height
    if include_tagline:
        text_total_h += gap_st_tg + tg_scaled.height
        
    text_w = max(ab_scaled.width, st_scaled.width, tg_scaled.width if include_tagline else 0)
    
    gap_emb_text = int(target_h * 0.28)
    total_w = emb_scaled.width + gap_emb_text + text_w
    
    res = Image.new('RGBA', (total_w, target_h), (0, 0, 0, 0))
    # Paste emblem centered vertically
    res.paste(emb_scaled, (0, 0), emb_scaled)
    
    # Paste text column vertically centered
    y_start = (target_h - text_total_h) // 2
    x_text = emb_scaled.width + gap_emb_text
    
    res.paste(ab_scaled, (x_text, y_start), ab_scaled)
    curr_y = y_start + ab_scaled.height + gap_ab_st
    res.paste(st_scaled, (x_text, curr_y), st_scaled)
    if include_tagline:
        curr_y += st_scaled.height + gap_st_tg
        res.paste(tg_scaled, (x_text, curr_y), tg_scaled)
        
    return res

logo_horiz_dark = create_horizontal_lockup(im_emblem, ab_dark, st_dark, tg_dark, target_h=160, include_tagline=True)
logo_horiz_dark.save(os.path.join(OUT_DIR, 'logo-horizontal-dark.png'))

logo_horiz_light = create_horizontal_lockup(im_emblem, ab_light, st_light, tg_light, target_h=160, include_tagline=True)
logo_horiz_light.save(os.path.join(OUT_DIR, 'logo-horizontal-light.png'))

logo_horiz_dark_compact = create_horizontal_lockup(im_emblem, ab_dark, st_dark, tg_dark, target_h=100, include_tagline=False)
logo_horiz_dark_compact.save(os.path.join(OUT_DIR, 'logo-horizontal-dark-compact.png'))

logo_horiz_light_compact = create_horizontal_lockup(im_emblem, ab_light, st_light, tg_light, target_h=100, include_tagline=False)
logo_horiz_light_compact.save(os.path.join(OUT_DIR, 'logo-horizontal-light-compact.png'))

print('Horizontal lockups created!')

# ─────────────────────────────────────────────────────────────
# 4. COMPOSE MASTER STACKED LOCKUPS (CENTERED)
# ─────────────────────────────────────────────────────────────
def create_stacked_lockup(emblem_img, ab_img, st_img, tg_img, max_w=800):
    scale = max_w / max(emblem_img.width, ab_img.width, st_img.width, tg_img.width)
    emb = emblem_img.resize((int(emblem_img.width * scale * 0.82), int(emblem_img.height * scale * 0.82)), Image.Resampling.LANCZOS)
    ab = ab_img.resize((int(ab_img.width * scale), int(ab_img.height * scale)), Image.Resampling.LANCZOS)
    st = st_img.resize((int(st_img.width * scale * 0.85), int(st_img.height * scale * 0.85)), Image.Resampling.LANCZOS)
    tg = tg_img.resize((int(tg_img.width * scale * 0.78), int(tg_img.height * scale * 0.78)), Image.Resampling.LANCZOS)
    
    gap1 = int(36 * scale)
    gap2 = int(24 * scale)
    gap3 = int(22 * scale)
    
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
# 5. CREATE ULTRA-LUXURY BRAND IDENTITY CARD (FOR STUDIO PAGE)
# ─────────────────────────────────────────────────────────────
# Dimensions: 1200 x 900
card_w, card_h = 1200, 900
card = Image.new('RGB', (card_w, card_h), (14, 15, 18))
draw = ImageDraw.Draw(card)

# Subtle luxury architectural grid lines
grid_step = 60
for x in range(grid_step, card_w, grid_step):
    draw.line([(x, 0), (x, card_h)], fill=(22, 24, 28), width=1)
for y in range(grid_step, card_h, grid_step):
    draw.line([(0, y), (card_w, y)], fill=(22, 24, 28), width=1)

# Outer architectural border
draw.rectangle([(40, 40), (card_w - 40, card_h - 40)], outline=(197, 168, 128, 40), width=1)
draw.rectangle([(48, 48), (card_w - 48, card_h - 48)], outline=(40, 43, 50), width=1)

# Corner crosshairs / register marks
def draw_crosshair(x, y):
    draw.line([(x - 14, y), (x + 14, y)], fill=(197, 168, 128), width=1)
    draw.line([(x, y - 14), (x, y + 14)], fill=(197, 168, 128), width=1)
draw_crosshair(40, 40)
draw_crosshair(card_w - 40, 40)
draw_crosshair(40, card_h - 40)
draw_crosshair(card_w - 40, card_h - 40)

# Paste stacked dark logo centered
card_logo = create_stacked_lockup(im_emblem, ab_dark, st_dark, tg_dark, max_w=640)
logo_x = (card_w - card_logo.width) // 2
logo_y = (card_h - card_logo.height) // 2
card.paste(card_logo, (logo_x, logo_y), card_logo)

# Top badge
card.save(os.path.join(OUT_DIR, 'logo-card.png'), quality=96)
card.save(os.path.join(OUT_DIR, 'logo-card.jpg'), quality=96)
print('Brand identity card saved!')

# ─────────────────────────────────────────────────────────────
# 6. FAVICONS & APP ICONS & METADATA ICONS
# ─────────────────────────────────────────────────────────────
# Crop tight square of emblem for icon
sq_dim = max(im_emblem.width, im_emblem.height)
pad_w = (sq_dim - im_emblem.width) // 2
pad_h = (sq_dim - im_emblem.height) // 2

# High-contrast square emblem on transparent
sq_emblem = Image.new('RGBA', (sq_dim, sq_dim), (0, 0, 0, 0))
sq_emblem.paste(im_emblem, (pad_w, pad_h), im_emblem)

# Favicons
for s in [16, 32, 48, 64, 180, 192, 512]:
    icon_s = sq_emblem.resize((s, s), Image.Resampling.LANCZOS)
    icon_s.save(os.path.join(OUT_DIR, f'favicon-{s}.png'))
    if s == 180:
        icon_s.save(os.path.join(OUT_DIR, 'apple-touch-icon.png'))
        icon_s.save(os.path.join(APP_DIR, 'apple-icon.png'))
    if s == 32 or s == 48:
        icon_s.save(os.path.join(APP_DIR, 'icon.png'))

# Generate favicon.ico containing 16, 32, 48
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
print('Favicons, apple-touch-icon, and ICO files generated successfully!')
