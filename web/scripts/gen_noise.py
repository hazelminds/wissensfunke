import numpy as np
from PIL import Image

def fbm_noise(w, h, octaves=5, seed=0, persistence=0.55, base_freq=4):
    rng = np.random.default_rng(seed)
    total = np.zeros((h, w), dtype=np.float64)
    amp = 1.0
    amp_sum = 0.0
    for o in range(octaves):
        freq = base_freq * (2 ** o)
        gh, gw = max(2, freq), max(2, freq)
        grid = rng.random((gh, gw))
        img = Image.fromarray((grid * 255).astype(np.uint8), mode="L")
        img = img.resize((w, h), Image.BICUBIC)
        layer = np.asarray(img, dtype=np.float64) / 255.0
        total += layer * amp
        amp_sum += amp
        amp *= persistence
    total /= amp_sum
    return total  # 0..1

def normalize(a):
    lo, hi = a.min(), a.max()
    if hi - lo < 1e-9:
        return np.zeros_like(a)
    return (a - lo) / (hi - lo)

if __name__ == "__main__":
    n = fbm_noise(300, 300, seed=1)
    print(n.min(), n.max(), n.mean())
