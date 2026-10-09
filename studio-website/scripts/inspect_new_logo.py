import numpy as np
from PIL import Image

im = Image.open(r'd:\Ideaseternal_Projects\client_2_website\company_logo.png')
print('Image size:', im.size)
rgb = np.array(im.convert('RGB'))
gray = rgb.mean(axis=2)

# Find dark text rows (e.g. gray < 120)
dark_rows = np.where((gray < 120).any(axis=1))[0]
print('Dark pixels row range:', dark_rows.min(), 'to', dark_rows.max())

# Let's inspect where AFTERBUILD is
ab_rows = np.where((gray[550:750, :] < 100).any(axis=1))[0] + 550
if len(ab_rows):
    print('AFTERBUILD rows:', ab_rows.min(), 'to', ab_rows.max())
    ab_cols = np.where((gray[ab_rows.min():ab_rows.max()+1, :] < 100).any(axis=0))[0]
    print('AFTERBUILD cols:', ab_cols.min(), 'to', ab_cols.max())

# Let's inspect where STUDIO is
st_rows = np.where((gray[680:780, :] < 120).any(axis=1))[0] + 680
if len(st_rows):
    print('STUDIO rows:', st_rows.min(), 'to', st_rows.max())

# Let's inspect where DESIGN | INTERIORS | ARCHITECT is
tag_rows = np.where((gray[770:860, :] < 140).any(axis=1))[0] + 770
if len(tag_rows):
    print('TAGLINE rows:', tag_rows.min(), 'to', tag_rows.max())
