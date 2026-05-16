"""Extract hexagon mark from logo.png and make background transparent.

Input:  public/logo.png  (500x500, white bg, hexagon mark + SUBDOMA wordmark)
Output: public/logo-mark.png  (square, transparent bg, hexagon mark only)
"""
from PIL import Image
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
src = ROOT / "public" / "logo.png"
dst = ROOT / "public" / "logo-mark.png"

img = Image.open(src).convert("RGBA")
W, H = img.size
print(f"Source: {W}x{H}")

# Heuristic: scan for non-white pixels to find hexagon bbox (top portion only)
# Wordmark "SUBDOMA" is roughly in bottom 40%, hexagon in top 60% centered
pixels = img.load()
threshold = 220  # pixel is "white-ish" if all RGB > threshold

# Find bbox of hexagon mark by scanning only top half
top_half = img.crop((0, 0, W, H // 2 + 30))
bbox = top_half.getbbox()  # this finds non-zero pixels — but RGB always non-zero
# Manual scan for non-white pixels
min_x, min_y, max_x, max_y = W, H, 0, 0
for y in range(0, H // 2 + 30):
    for x in range(W):
        r, g, b, a = pixels[x, y]
        if r < threshold or g < threshold or b < threshold:
            min_x = min(min_x, x)
            min_y = min(min_y, y)
            max_x = max(max_x, x)
            max_y = max(max_y, y)

print(f"Mark bbox: ({min_x},{min_y}) → ({max_x},{max_y})")

# Add small padding
pad = 8
min_x = max(0, min_x - pad)
min_y = max(0, min_y - pad)
max_x = min(W, max_x + pad)
max_y = min(H, max_y + pad)

# Crop hexagon region
mark = img.crop((min_x, min_y, max_x, max_y))
mw, mh = mark.size
print(f"Cropped: {mw}x{mh}")

# Make white pixels transparent
mark_pixels = mark.load()
for y in range(mh):
    for x in range(mw):
        r, g, b, a = mark_pixels[x, y]
        if r > threshold and g > threshold and b > threshold:
            mark_pixels[x, y] = (0, 0, 0, 0)  # transparent
        else:
            # Keep black-ish pixels solid black
            mark_pixels[x, y] = (0, 0, 0, 255)

# Make it square (pad with transparent)
side = max(mw, mh)
square = Image.new("RGBA", (side, side), (0, 0, 0, 0))
offset_x = (side - mw) // 2
offset_y = (side - mh) // 2
square.paste(mark, (offset_x, offset_y), mark)

square.save(dst)
print(f"Saved: {dst} ({side}x{side})")
