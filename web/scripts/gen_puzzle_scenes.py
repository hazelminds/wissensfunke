# Procedurally generates the three sliding-puzzle images (beach/skyline/macro
# leaf) using layered fractal noise instead of flat vector shapes, since real
# stock photos aren't fetchable from this environment. Regenerate with:
#   pip install Pillow numpy && python3 gen_puzzle_scenes.py ../public
import math
import numpy as np
from PIL import Image, ImageDraw, ImageFilter
from gen_noise import fbm_noise, normalize

SIZE = 900


def lerp_color(c1, c2, t):
    t = np.clip(t, 0, 1)
    return tuple(c1[i] + (c2[i] - c1[i]) * t for i in range(3))


def vertical_gradient(w, h, stops):
    grad = np.zeros((h, 1, 3), dtype=np.float64)
    ys = np.linspace(0, 1, h)
    for y_i, y in enumerate(ys):
        for i in range(len(stops) - 1):
            p0, c0 = stops[i]
            p1, c1 = stops[i + 1]
            if y <= p1 or i == len(stops) - 2:
                t = 0 if p1 == p0 else (y - p0) / (p1 - p0)
                grad[y_i, 0] = lerp_color(c0, c1, t)
                break
    return np.repeat(grad, w, axis=1)


def add_grain(arr, amount=6, seed=0):
    rng = np.random.default_rng(seed)
    noise = rng.normal(0, amount, arr.shape[:2])
    out = arr.copy()
    for c in range(3):
        out[:, :, c] = np.clip(out[:, :, c] + noise, 0, 255)
    return out


def to_img(arr):
    return Image.fromarray(np.clip(arr, 0, 255).astype(np.uint8), mode="RGB")


# ---------------------------------------------------------------- BEACH ----
def make_beach(seed=7):
    w = h = SIZE
    horizon = int(h * 0.34)

    sky = vertical_gradient(w, horizon, [
        (0.0, (52, 142, 202)),
        (0.6, (146, 205, 224)),
        (1.0, (222, 238, 232)),
    ])
    clouds = normalize(fbm_noise(w, horizon, octaves=5, seed=seed, base_freq=3, persistence=0.55))
    cloud_mask = np.clip((clouds - 0.52) * 3.0, 0, 1)
    for c in range(3):
        sky[:, :, c] = sky[:, :, c] * (1 - cloud_mask * 0.8) + 252 * (cloud_mask * 0.8)

    shore_h = h - horizon
    sea = vertical_gradient(w, shore_h, [
        (0.0, (9, 92, 105)),
        (0.30, (14, 128, 138)),
        (0.60, (34, 165, 172)),
        (1.0, (170, 224, 208)),
    ])
    wave_freq_noise = fbm_noise(w, shore_h, octaves=2, seed=seed + 1, base_freq=5, persistence=0.5)
    y_lin = np.linspace(0, 1, shore_h)[:, None]
    bands = np.sin(y_lin * 55 + wave_freq_noise * 22) * 0.5 + 0.5
    depth_fade = y_lin ** 0.6
    wave_highlight = np.clip((bands - 0.70) * 2.6, 0, 1) * depth_fade
    for c in range(3):
        sea[:, :, c] = np.clip(sea[:, :, c] + wave_highlight * 110, 0, 255)
    sparkle = normalize(fbm_noise(w, shore_h, octaves=6, seed=seed + 4, base_freq=20, persistence=0.45))
    sparkle_mask = np.clip((sparkle - 0.72) * 6, 0, 1) * depth_fade
    for c in range(3):
        sea[:, :, c] = np.clip(sea[:, :, c] + sparkle_mask * 160, 0, 255)

    dune = normalize(fbm_noise(w, shore_h, octaves=3, seed=seed + 2, base_freq=3, persistence=0.6))
    sand = vertical_gradient(w, shore_h, [
        (0.0, (238, 212, 158)),
        (0.55, (222, 190, 128)),
        (1.0, (188, 152, 94)),
    ])
    for c in range(3):
        sand[:, :, c] = np.clip(sand[:, :, c] + (dune - 0.5) * 55, 0, 255)
    fine = normalize(fbm_noise(w, shore_h, octaves=6, seed=seed + 3, base_freq=16, persistence=0.5))
    for c in range(3):
        sand[:, :, c] = np.clip(sand[:, :, c] + (fine - 0.5) * 22, 0, 255)

    shoreline_1d = normalize(fbm_noise(w, 4, octaves=3, seed=seed + 5, base_freq=3, persistence=0.6)[0])
    shoreline = shore_h * 0.30 + (shoreline_1d - 0.5) * shore_h * 0.16
    yy = np.arange(shore_h)[:, None]
    shoreline_row = np.broadcast_to(shoreline[None, :], (shore_h, w))
    edge = np.clip((shoreline_row - yy) / 14.0, 0, 1)
    shore = sea * edge[:, :, None] + sand * (1 - edge[:, :, None])
    foam = np.clip(1 - np.abs(yy - shoreline_row) / 9.0, 0, 1)
    for c in range(3):
        shore[:, :, c] = np.clip(shore[:, :, c] + foam * 130, 0, 255)

    out = np.zeros((h, w, 3), dtype=np.float64)
    out[:horizon, :, :] = sky
    out[horizon:, :, :] = shore

    xx, yyf = np.meshgrid(np.arange(w), np.arange(h))
    sun_cx, sun_cy = w * 0.76, h * 0.20
    dist = np.sqrt((xx - sun_cx) ** 2 + (yyf - sun_cy) ** 2)
    glare = np.clip(1 - dist / (w * 0.42), 0, 1) ** 2
    for c in range(3):
        out[:, :, c] = np.clip(out[:, :, c] + glare * 55, 0, 255)

    out = add_grain(out, amount=3.5, seed=seed + 9)
    img = to_img(out)
    img = img.filter(ImageFilter.GaussianBlur(0.5))
    return img


# ------------------------------------------------------------- SKYLINE -----
def make_skyline(seed=21):
    w = h = SIZE
    horizon_y = int(h * 0.66)

    sky = vertical_gradient(w, h, [
        (0.0, (22, 18, 56)),
        (0.35, (68, 38, 88)),
        (0.58, (190, 88, 88)),
        (0.68, (250, 170, 100)),
    ])
    clouds = normalize(fbm_noise(w, h, octaves=5, seed=seed, base_freq=3, persistence=0.5))
    streaks = np.clip((clouds - 0.6) * 2.6, 0, 1)
    streaks[int(h * 0.60):, :] = 0
    tint = (255, 190, 140)
    for c in range(3):
        sky[:, :, c] = sky[:, :, c] * (1 - streaks * 0.5) + tint[c] * (streaks * 0.5)

    xx, yy = np.meshgrid(np.arange(w), np.arange(h))
    sun_cx, sun_cy = w * 0.5, horizon_y * 1.0
    dist = np.sqrt((xx - sun_cx) ** 2 + (yy - sun_cy) ** 2)
    glow = np.clip(1 - dist / (w * 0.30), 0, 1) ** 2
    for c, val in zip(range(3), (255, 200, 140)):
        sky[:, :, c] = np.clip(sky[:, :, c] + glow * (val - sky[:, :, c]) * 0.7, 0, 255)

    img = to_img(sky)
    draw = ImageDraw.Draw(img, "RGBA")

    rng = np.random.default_rng(seed + 5)
    layer_colors = [(20, 16, 38, 255), (13, 10, 28, 255), (6, 5, 15, 255)]
    all_buildings = []
    for layer, color in enumerate(layer_colors):
        x = -20
        top_bias = 0.22 + layer * 0.15
        while x < w + 20:
            bw = int(rng.integers(40, 95))
            bh = int(h * (top_bias + rng.random() * 0.30))
            top = horizon_y - bh
            draw.rectangle([x, top, x + bw, h], fill=color)
            if layer == len(layer_colors) - 1:
                all_buildings.append((x, top, bw))
            x += bw + int(rng.integers(4, 14))

    for (bx, btop, bw) in all_buildings:
        cols = max(1, bw // 14)
        rows = max(1, (horizon_y - btop) // 18)
        for r in range(rows):
            for c in range(cols):
                if rng.random() < 0.38:
                    wx = bx + 6 + c * 14
                    wy = btop + 10 + r * 18
                    if wy > horizon_y - 6 or wx > bx + bw - 6:
                        continue
                    lit = rng.random()
                    color = (255, 200, 110, 235) if lit < 0.7 else (180, 220, 255, 200)
                    draw.rectangle([wx, wy, wx + 6, wy + 10], fill=color)

    band = int(h * 0.22)
    facade = img.crop((0, horizon_y - band, w, horizon_y))
    reflection = facade.transpose(Image.FLIP_TOP_BOTTOM)
    water_h = h - horizon_y
    reflection = reflection.resize((w, max(1, band)))
    refl_arr = np.asarray(reflection.convert("RGB"), dtype=np.float64)
    if refl_arr.shape[0] < water_h:
        pad = np.tile(refl_arr[-1:, :, :], (water_h - refl_arr.shape[0], 1, 1))
        refl_arr = np.concatenate([refl_arr, pad], axis=0)
    else:
        refl_arr = refl_arr[:water_h, :, :]

    fade = np.linspace(1.0, 0.35, water_h)[:, None, None]
    refl_arr = refl_arr * fade
    ripple = fbm_noise(w, water_h, octaves=4, seed=seed + 11, base_freq=14, persistence=0.5)
    ripple_shift = ((ripple - 0.5) * 10).astype(np.int32)
    rippled = np.zeros_like(refl_arr)
    for row in range(water_h):
        shift = int(ripple_shift[row, 0])
        rippled[row] = np.roll(refl_arr[row], shift, axis=0)
    water_img = to_img(rippled)
    water_img = water_img.filter(ImageFilter.GaussianBlur(2.2))

    dark_water = vertical_gradient(w, water_h, [(0.0, (10, 8, 22)), (1.0, (4, 3, 10))])
    water_final = np.asarray(water_img, dtype=np.float64) * 0.75 + dark_water * 0.4
    img.paste(to_img(water_final), (0, horizon_y))

    out = add_grain(np.asarray(img.convert("RGB"), dtype=np.float64), amount=3, seed=seed + 3)
    return to_img(out)


# ----------------------------------------------------------------- MACRO ---
def leaf_mask_and_shade(size, length, width, angle_deg, seed):
    """Render one leaf at high res into its own RGBA layer with shading."""
    pad = int(length * 0.6)
    lw = int(length + pad * 2)
    lh = int(width + pad * 2)
    layer = Image.new("RGBA", (lw, lh), (0, 0, 0, 0))
    d = ImageDraw.Draw(layer, "RGBA")
    cx, cy = lw / 2, lh / 2
    n = 48
    pts_top, pts_bot = [], []
    for i in range(n + 1):
        t = i / n
        lx = (t - 0.5) * length
        ly = width * 0.5 * math.sin(t * math.pi) * (1 - 0.12 * math.sin(t * math.pi * 3))
        pts_top.append((cx + lx, cy - ly))
        pts_bot.append((cx + lx, cy + ly))
    poly = pts_top + pts_bot[::-1]

    base_rgb = np.array([70, 140, 58])
    rng = np.random.default_rng(seed)
    tex = normalize(fbm_noise(lw, lh, octaves=4, seed=seed, base_freq=6, persistence=0.5))
    shade_arr = np.zeros((lh, lw, 4), dtype=np.float64)
    yy, xx = np.mgrid[0:lh, 0:lw]
    along = (xx - cx) / (length / 2 + 1e-6)
    across = (yy - cy) / (width / 2 + 1e-6)
    light = np.clip(1 - (along * 0.35 + across * 0.5), 0.35, 1.35)
    for c in range(3):
        shade_arr[:, :, c] = base_rgb[c] * light + (tex - 0.5) * 18
    edge_dark = np.clip(1 - np.abs(across), 0, 1) ** 0.6
    for c in range(3):
        shade_arr[:, :, c] *= (0.75 + 0.25 * edge_dark)
    shade_arr[:, :, 3] = 255

    mask_img = Image.new("L", (lw, lh), 0)
    ImageDraw.Draw(mask_img).polygon(poly, fill=255)
    mask_img = mask_img.filter(ImageFilter.GaussianBlur(1.0))
    shade_img = to_img(np.clip(shade_arr[:, :, :3], 0, 255)).convert("RGBA")
    shade_img.putalpha(mask_img)

    vein = Image.new("L", (lw, lh), 0)
    vd = ImageDraw.Draw(vein)
    x0, y0 = cx - length / 2, cy
    x1, y1 = cx + length / 2, cy
    vd.line([(x0, y0), (x1, y1)], fill=200, width=2)
    for t in np.linspace(0.12, 0.88, 7):
        mx, my = x0 + (x1 - x0) * t, cy
        vlen = width * 0.34 * math.sin(t * math.pi)
        for s in (-1, 1):
            vd.line([(mx, my), (mx + vlen * 0.2, my + s * vlen)], fill=140, width=1)
    vein = vein.filter(ImageFilter.GaussianBlur(1.2))
    vein_rgba = Image.new("RGBA", (lw, lh), (30, 70, 34, 0))
    vein_alpha = vein.point(lambda v: int(v * 0.55))
    vein_rgba.putalpha(vein_alpha)
    shade_img = Image.alpha_composite(shade_img, vein_rgba)
    shade_img = shade_img.filter(ImageFilter.GaussianBlur(0.6))

    rotated = shade_img.rotate(-angle_deg, expand=True, resample=Image.BICUBIC)
    return rotated


def make_macro(seed=42):
    w = h = SIZE
    rng = np.random.default_rng(seed)
    bg = vertical_gradient(w, h, [
        (0.0, (30, 66, 28)),
        (0.5, (52, 100, 40)),
        (1.0, (20, 50, 24)),
    ])
    canvas = to_img(bg).convert("RGBA")
    draw = ImageDraw.Draw(canvas, "RGBA")
    bokeh_palette = [(255, 230, 140), (222, 240, 168), (255, 250, 214), (150, 205, 128), (255, 205, 128)]
    for _ in range(30):
        r = int(rng.integers(22, 95))
        cx = int(rng.integers(0, w))
        cy = int(rng.integers(0, h))
        color = bokeh_palette[rng.integers(0, len(bokeh_palette))]
        alpha = int(rng.integers(55, 145))
        draw.ellipse([cx - r, cy - r, cx + r, cy + r], fill=color + (alpha,))
    canvas = canvas.filter(ImageFilter.GaussianBlur(20))

    speck = normalize(fbm_noise(w, h, octaves=5, seed=seed + 1, base_freq=6, persistence=0.5))
    arr = np.asarray(canvas.convert("RGB"), dtype=np.float64)
    for c in range(3):
        arr[:, :, c] = np.clip(arr[:, :, c] + (speck - 0.5) * 22, 0, 255)
    canvas = to_img(arr).convert("RGBA")

    shadow = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    sd = ImageDraw.Draw(shadow)
    sd.ellipse([w * 0.12, h * 0.35, w * 0.95, h * 0.95], fill=(0, 0, 0, 90))
    shadow = shadow.filter(ImageFilter.GaussianBlur(30))
    canvas = Image.alpha_composite(canvas, shadow)

    leaf1 = leaf_mask_and_shade(SIZE, length=w * 0.62, width=w * 0.30, angle_deg=-16, seed=seed + 10)
    canvas.alpha_composite(leaf1, (int(w * 0.30 - leaf1.width / 2), int(h * 0.58 - leaf1.height / 2)))
    leaf2 = leaf_mask_and_shade(SIZE, length=w * 0.42, width=w * 0.20, angle_deg=42, seed=seed + 20)
    canvas.alpha_composite(leaf2, (int(w * 0.28 - leaf2.width / 2), int(h * 0.30 - leaf2.height / 2)))

    highlight = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    hd = ImageDraw.Draw(highlight)
    dew_cx, dew_cy, dew_r = w * 0.50, h * 0.46, 13
    hd.ellipse([dew_cx - dew_r, dew_cy - dew_r * 1.3, dew_cx + dew_r, dew_cy + dew_r * 1.3],
               fill=(255, 255, 255, 225))
    hd.ellipse([dew_cx - 4, dew_cy - dew_r, dew_cx + 3, dew_cy - dew_r + 8], fill=(255, 255, 255, 255))
    highlight = highlight.filter(ImageFilter.GaussianBlur(1.2))
    canvas = Image.alpha_composite(canvas, highlight)

    rim = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    rd = ImageDraw.Draw(rim)
    rd.line([(w * 0.05, h * 0.15), (w * 0.55, h * 0.05)], fill=(255, 250, 220, 120), width=6)
    rim = rim.filter(ImageFilter.GaussianBlur(25))
    canvas = Image.alpha_composite(canvas, rim)

    out = canvas.convert("RGB")
    out = add_grain(np.asarray(out, dtype=np.float64), amount=4.5, seed=seed + 4)
    return to_img(out)


if __name__ == "__main__":
    import sys
    outdir = sys.argv[1] if len(sys.argv) > 1 else "."
    make_beach().save(f"{outdir}/puzzle-beach.jpg", quality=92)
    make_skyline().save(f"{outdir}/puzzle-skyline.jpg", quality=92)
    make_macro().save(f"{outdir}/puzzle-macro.jpg", quality=92)
    print("done")
