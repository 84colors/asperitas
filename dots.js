function createDotCanvas(canvas, options = {}) {
    const ctx = canvas.getContext("2d");
    const parent = canvas.parentElement || document.body;

    const cfg = {
        space: 28,
        dotSize: 3,
        bgColor: "#000000",
        dotColorRgb: [0, 88, 182],
        hoverColorRgb: [0, 30, 100],
        waveSpeed: 0.02,
        waveScale: 0.003,
        alphaMin: -0.3,
        alphaMax: 1,
        blinkSpeed: 1,
        hoverRadius: 120,
        pulseSpeed: 300,
        pulseThickness: 40,
        trailOpacity: 0.12,
        trailEnabled: true,
        ...options,
    };

    let width,
        height,
        dots = [],
        ripples = [];
    let mouseX = null,
        mouseY = null;
    let z = Math.random() * 1000;
    let lastTime = 0;

    /* ---------- Perlin Noise (compact) ---------- */
    const perm = [...Array(256).keys()].sort(() => Math.random() - 0.5);
    const fade = (t) => t * t * t * (t * (t * 6 - 15) + 10);
    const grad = (h, x, y, z) =>
        (h & 1 ? x : -x) + (h & 2 ? y : -y) + (h & 4 ? z : -z);
    function noise(x, y, z) {
        const X = Math.floor(x) & 255;
        const Y = Math.floor(y) & 255;
        const Z = Math.floor(z) & 255;
        x -= Math.floor(x);
        y -= Math.floor(y);
        z -= Math.floor(z);
        const u = fade(x),
            v = fade(y),
            w = fade(z);
        const A = perm[X] + Y,
            AA = perm[A] + Z,
            AB = perm[A + 1] + Z;
        const B = perm[X + 1] + Y,
            BA = perm[B] + Z,
            BB = perm[B + 1] + Z;
        return lerp(
            w,
            lerp(
                v,
                lerp(u, grad(perm[AA], x, y, z), grad(perm[BA], x - 1, y, z)),
                lerp(
                    u,
                    grad(perm[AB], x, y - 1, z),
                    grad(perm[BB], x - 1, y - 1, z)
                )
            ),
            lerp(
                v,
                lerp(
                    u,
                    grad(perm[AA + 1], x, y, z - 1),
                    grad(perm[BA + 1], x - 1, y, z - 1)
                ),
                lerp(
                    u,
                    grad(perm[AB + 1], x, y - 1, z - 1),
                    grad(perm[BB + 1], x - 1, y - 1, z - 1)
                )
            )
        );
    }
    const lerp = (t, a, b) => a + t * (b - a);

    /* ---------- Setup ---------- */
    function resize() {
        width = parent.clientWidth;
        height = parent.clientHeight;
        canvas.width = width;
        canvas.height = height;
        buildDots();
    }

    function buildDots() {
        dots = [];
        const cols = Math.floor(width / cfg.space);
        const rows = Math.floor(height / cfg.space);
        const offsetX = (width - cols * cfg.space) / 2;
        const offsetY = (height - rows * cfg.space) / 2;

        for (let x = 0; x <= cols; x++) {
            for (let y = 0; y <= rows; y++) {
                dots.push({
                    x: offsetX + x * cfg.space,
                    y: offsetY + y * cfg.space,
                    blink: Math.random() * Math.PI * 2,
                });
            }
        }
    }

    /* ---------- Events ---------- */
    canvas.addEventListener("mousemove", (e) => {
        const r = canvas.getBoundingClientRect();
        mouseX = e.clientX - r.left;
        mouseY = e.clientY - r.top;
    });

    canvas.addEventListener("mouseleave", () => {
        mouseX = mouseY = null;
    });

    canvas.addEventListener("click", (e) => {
        const r = canvas.getBoundingClientRect();
        ripples.push({
            x: e.clientX - r.left,
            y: e.clientY - r.top,
            start: performance.now(),
        });
    });

    window.addEventListener("resize", resize);

    /* ---------- Render ---------- */
    function draw(time) {
        requestAnimationFrame(draw);

        if (cfg.trailEnabled) {
            ctx.fillStyle = `rgba(${bgRGB.join(",")},${cfg.trailOpacity})`;
        } else {
            ctx.fillStyle = cfg.bgColor;
        }
        ctx.fillRect(0, 0, width, height);

        dots.forEach((d) => {
            const n =
                (noise(d.x * cfg.waveScale, d.y * cfg.waveScale, z) + 1) / 2;
            const alphaBase = cfg.alphaMin + n * (cfg.alphaMax - cfg.alphaMin);
            const blink =
                (Math.sin(time * 0.001 * cfg.blinkSpeed + d.blink) + 1) / 2;
            let alpha = alphaBase * blink;

            let color = cfg.dotColorRgb;

            if (mouseX !== null) {
                const dist = Math.hypot(d.x - mouseX, d.y - mouseY);
                if (dist < cfg.hoverRadius) {
                    color = cfg.hoverColorRgb;
                    alpha = 1;
                }
            }

            ripples = ripples.filter((r) => {
                const age = (time - r.start) / 1000;
                const dist = Math.hypot(d.x - r.x, d.y - r.y);
                if (
                    Math.abs(dist - age * cfg.pulseSpeed) < cfg.pulseThickness
                ) {
                    color = cfg.hoverColorRgb;
                    alpha = 1;
                }
                return age * cfg.pulseSpeed < Math.max(width, height);
            });

            if (alpha <= 0) return;

            ctx.beginPath();
            ctx.fillStyle = `rgba(${color.join(",")},${alpha})`;
            ctx.arc(d.x, d.y, cfg.dotSize, 0, Math.PI * 2);
            ctx.fill();
        });

        z += cfg.waveSpeed;
    }

    function hexToRgb(hex) {
        hex = hex.replace("#", "");
        if (hex.length === 3) {
            hex = hex
                .split("")
                .map((c) => c + c)
                .join("");
        }
        const num = parseInt(hex, 16);
        return [(num >> 16) & 255, (num >> 8) & 255, num & 255];
    }

    const bgRGB = hexToRgb(cfg.bgColor);

    resize();
    requestAnimationFrame(draw);
}
